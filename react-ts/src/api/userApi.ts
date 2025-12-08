import { http } from "./httpClient";
import type { UserRequest } from "../types/UserRequest";

export const userApi = {
    register: (data: UserRequest) => http.post("/users/register", data),
    login: (data: UserRequest) => http.post("/users/login", data)
};