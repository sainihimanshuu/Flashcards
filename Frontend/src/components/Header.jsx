import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="p-8 h-20 flex justify-between items-center shadow-lg ">
            <h1 className="text-xl font-bold">FlashCards App</h1>
            <Button className="myButton" onClick={() => navigate("/create")}>
                Create
            </Button>
        </div>
    );
}
