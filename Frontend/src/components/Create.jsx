import { useState } from "react";
import Input from "./Input.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useCardsContext } from "../context/CardsContext.jsx";

export default function Create() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleCreate = () => {
        axios
            .post("/card/create", {
                question,
                answer,
            })
            .then((res) => {
                setQuestion("");
                setAnswer("");
                navigate("/");
            })
            .catch((err) => console.log("error while creating new card", err));
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
            <button className="myButton" onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}
