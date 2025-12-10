import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage.tsx";
import { EntriesPage } from "../pages/EntriesPage.tsx";
import { NewEntryPage } from "../pages/NewEntryPage.tsx";
import { LoginPage } from "../pages/LoginPage.tsx";
import { RegisterPage } from "../pages/RegisterPage.tsx";
import { UpdateEntryPage } from "../pages/UpdateEntryPage.tsx";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< HomePage />} />
                <Route path="/entries" element={< EntriesPage /> }></Route>
                <Route path="/entries/new" element={<NewEntryPage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
                <Route path="/entries/update" element={<UpdateEntryPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}