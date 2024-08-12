import { createContext, useContext, useState } from "react";

const CardsContext = createContext(null);

export const useCardsContext = () => {
    return useContext(CardsContext);
};

export const CardsContextProvider = ({ children }) => {
    const [cards, setCards] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <CardsContext.Provider
            value={{ cards, setCards, currentIndex, setCurrentIndex }}
        >
            {children}
        </CardsContext.Provider>
    );
};
