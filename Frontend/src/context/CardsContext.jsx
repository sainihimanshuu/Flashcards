import { createContext, useContext, useState } from "react";

const CardsContext = createContext(null);

export const useCardsContext = () => {
    return useContext(CardsContext);
};

export const CardsContextProvider = ({ children }) => {
    const [cards, setCards] = useState(null);

    return (
        <CardsContext.Provider value={{ cards, setCards }}>
            {children}
        </CardsContext.Provider>
    );
};
