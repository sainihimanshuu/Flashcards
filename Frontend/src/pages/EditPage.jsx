import { useParams } from "react-router-dom";
import Edit from "../components/Edit.jsx";

export default function EditPage() {
    const { cardId } = useParams();

    return (
        <div>
            <Edit cardId={cardId} />
        </div>
    );
}
