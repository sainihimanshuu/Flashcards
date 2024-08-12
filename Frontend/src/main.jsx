import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import axios from "axios";
import { CardsContextProvider } from "./context/CardsContext.jsx";

import { HomePage, EditPage, CreatePage } from "./pages/index.js";

axios.defaults.baseURL = "http://localhost:8000/api/v1";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/edit/:cardId" element={<EditPage />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CardsContextProvider>
            <RouterProvider router={router} />
        </CardsContextProvider>
    </StrictMode>
);
