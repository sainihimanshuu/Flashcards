import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardsContext } from "../context/CardsContext.jsx";
import Button from "./Button.jsx";

export default function Home() {
    const { cards, setCards, currentIndex, setCurrentIndex } =
        useCardsContext();
    const [loading, setLoading] = useState(true);
    const [isAnswer, setIsAnswer] = useState(false);
    //const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/card/getAll")
            .then((res) => {
                setCards(res.data.cards);
                setLoading(false);
            })
            .catch((err) => console.log("error while getting all cards", err));
    }, []);

    const handleDelete = (cardId) => {
        axios
            .delete(`/card/delete/${cardId}`)
            .then((res) => {
                axios
                    .get("/card/getAll")
                    .then((res) => {
                        setCards(res.data.cards);
                        let newIndex;
                        if (currentIndex - 1 >= 0) {
                            newIndex = currentIndex - 1;
                        } else if (currentIndex + 1 < cards.length - 2) {
                            newIndex = currentIndex + 1;
                        } else {
                            newIndex = 0;
                        }
                        setCurrentIndex(newIndex);
                        setLoading(false);
                    })
                    .catch((err) =>
                        console.log("error while getting all cards", err)
                    );
            })
            .catch((err) => {
                console.log("error while deleting card", err);
            });
    };

    return !loading ? (
        cards.length > 0 ? (
            <div className="mt-16">
                <div
                    className="bg-gray-200 shadow-2xl rounded-[20px] w-80 h-[12rem] mx-auto mt-7 p-1 flex items-center justify-center mb-7 clickableDiv"
                    onClick={() => setIsAnswer((prevAns) => !prevAns)}
                >
                    {!isAnswer ? (
                        <p className="text-lg font-semibold">
                            {cards[currentIndex].question}
                        </p>
                    ) : (
                        <p className="text-lg font-semibold">
                            {cards[currentIndex].answer}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    {currentIndex > 0 && (
                        <Button
                            className="circleButton"
                            onClick={() => {
                                setCurrentIndex(
                                    (prevCurrentIndex) => prevCurrentIndex - 1
                                );
                                setIsAnswer(false);
                            }}
                        >
                            {"<-"}
                        </Button>
                    )}
                    <div className="flex justify-center items-center">
                        <Button
                            className="myButton"
                            onClick={() =>
                                navigate(`/edit/${cards[currentIndex].id}`)
                            }
                        >
                            edit
                        </Button>
                        <Button
                            className="myButton"
                            onClick={() => handleDelete(cards[currentIndex].id)}
                        >
                            delete
                        </Button>
                    </div>
                    {currentIndex < cards.length - 1 && (
                        <Button
                            className="circleButton"
                            onClick={() => {
                                setCurrentIndex(
                                    (prevCurrentIndex) => prevCurrentIndex + 1
                                );
                                setIsAnswer(false);
                            }}
                        >
                            {"->"}
                        </Button>
                    )}
                </div>
            </div>
        ) : (
            <h1 className="mt-20 text-3xl font-bold">
                No FlashCards. Create one now.
            </h1>
        )
    ) : (
        <h1>Loading...</h1>
    );
}
