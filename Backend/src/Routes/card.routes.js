import { Router } from "express";
import {
    createCard,
    editCard,
    deleteCard,
    getAllCards,
    getCard,
} from "../Controllers/card.controllers.js";

const router = Router();

router.route("/create").post(createCard);
router.route("/get/:cardId").get(getCard);
router.route("/edit/:cardId").post(editCard);
router.route("/delete/:cardId").delete(deleteCard);
router.route("/getAll").get(getAllCards);

export default router;
