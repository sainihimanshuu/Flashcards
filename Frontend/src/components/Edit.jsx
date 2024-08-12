import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input.jsx";
import { useCardsContext } from "../context/CardsContext.jsx";

export default function Edit({ cardId }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const { setCards, currentIndex, setCurrentIndex } = useCardsContext();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/card/get/${cardId}`)
            .then((res) => {
                setQuestion(res.data.card.question);
                setAnswer(res.data.card.answer);
            })
            .catch((err) =>
                console.log("error while getting card for edit", err)
            );
    }, [cardId]);

    const handleEdit = () => {
        axios
            .post(`card/edit/${cardId}`, {
                question,
                answer,
            })
            .then((res) => {
                axios
                    .get("/card/getAll")
                    .then((res) => {
                        console.log("useEffect", res.data);
                        setCards(res.data.cards);
                        setCurrentIndex(currentIndex);
                    })
                    .catch((err) =>
                        console.log("error while getting all cards", err)
                    );
                navigate("/");
            })
            .catch((err) => console.log("error while editing card", err));
    };

    return (
        <div className="w-1/2 p-3 bg-gray-200 shadow-2xl rounded-[20px] mt-16 mx-auto">
            <Input
                className="mt-2"
                type="text"
                placeHolder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <Input
                type="text"
                placeHolder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button className="myButton" onClick={handleEdit}>
                Edit
            </button>
        </div>
    );
}
