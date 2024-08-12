import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCard = async (req, res) => {
    try {
        const card = req.body;

        const createdCard = await prisma.card.create({
            data: {
                question: card.question,
                answer: card.answer,
            },
        });

        if (!createCard) {
            return res.status(500).json({
                message: "card not created, please try again",
            });
        }

        return res
            .status(200)
            .json({ message: "card created successfully", createdCard });
    } catch (error) {
        console.log("error while creating card", error);
    }
};

//requires id
const editCard = async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = req.body;

        const updatedCard = await prisma.card.update({
            where: {
                id: parseInt(cardId),
            },
            data: {
                question: card.question,
                answer: card.answer,
            },
        });

        if (!updatedCard) {
            return res
                .status(500)
                .json({ message: "card not updated, try again" });
        }

        return res
            .status(200)
            .json({ message: "card updated successfully", updatedCard });
    } catch (error) {
        console.log("error while editing card", error);
    }
};

//requires id
const deleteCard = async (req, res) => {
    try {
        const { cardId } = req.params;

        await prisma.card.delete({
            where: {
                id: parseInt(cardId),
            },
        });

        return res.status(200).json({ message: "card updated successfully" });
    } catch (error) {
        console.log("error while deleting card", error);
    }
};

const getAllCards = async (req, res) => {
    try {
        const cards = await prisma.card.findMany();

        if (!cards) {
            return res
                .status(500)
                .json({ message: "all cards not fetched, try again" });
        }

        return res
            .status(200)
            .json({ message: "cards fetched successfully", cards });
    } catch (error) {
        console.log("error while gettin all cards", error);
    }
};

//requires id
const getCard = async (req, res) => {
    try {
        const { cardId } = req.params;

        const card = await prisma.card.findUnique({
            where: {
                id: parseInt(cardId),
            },
        });

        if (!card) {
            return res
                .status(500)
                .json({ message: "card not fetched, try again" });
        }

        return res
            .status(200)
            .json({ message: "card fetched successfully", card });
    } catch (error) {
        console.log("error while gettin card", error);
    }
};

export { createCard, editCard, deleteCard, getAllCards, getCard };
