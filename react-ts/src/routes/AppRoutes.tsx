import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage.tsx";
import { EntriesPage } from "../pages/Entries/EntriesPage.tsx";
import { LoginPage } from "../pages/User/LoginPage.tsx";
import { RegisterPage } from "../pages/User/RegisterPage.tsx";
import { UpdateEntryPage } from "../pages/Entries/UpdateEntryPage.tsx";
import { PrivateRoute } from "./PrivateRoute.tsx";
import { UserPage } from "../pages/User/UserPage.tsx";
import { CategoriesPage } from "../pages/Category/CategoriesPage.tsx";
import { RecurrencesPage } from "../pages/Recurrence/RecurrencesPage.tsx";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/home" 
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    } 
                />
                <Route path="/entries" 
                    element={
                        <PrivateRoute>
                            < EntriesPage /> 
                        </PrivateRoute>
                    }>
                </Route>
                <Route path="/entries/update" 
                    element={
                        <PrivateRoute>
                            < UpdateEntryPage /> 
                        </PrivateRoute>
                    }>
                </Route>
                <Route path="/categories" 
                    element={
                        <PrivateRoute>
                            < CategoriesPage /> 
                        </PrivateRoute>
                    }>
                </Route>
                <Route path="/recurrences" 
                    element={
                        <PrivateRoute>
                            < RecurrencesPage /> 
                        </PrivateRoute>
                    }>
                </Route>
                <Route path="/login" 
                    element={
                        <LoginPage/>
                    }>   
                </Route>
                <Route path="/register" 
                    element={
                        <RegisterPage/>
                    }>
                </Route>
                <Route path="/user" 
                    element={
                        <PrivateRoute>
                            < UserPage /> 
                        </PrivateRoute>
                    }>
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}