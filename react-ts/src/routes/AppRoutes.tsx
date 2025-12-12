import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage.tsx";
import { EntriesPage } from "../pages/EntriesPage.tsx";
import { NewEntryPage } from "../pages/NewEntryPage.tsx";
import { LoginPage } from "../pages/LoginPage.tsx";
import { RegisterPage } from "../pages/RegisterPage.tsx";
import { UpdateEntryPage } from "../pages/UpdateEntryPage.tsx";
import { PrivateRoute } from "./PrivateRoute.tsx";
import { UserPage } from "../pages/UserPage.tsx";

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
                <Route path="/entries/new" 
                    element={
                        <PrivateRoute>
                            < NewEntryPage /> 
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