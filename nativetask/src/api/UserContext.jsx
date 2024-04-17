import React, { useState, useMemo, createContext } from "react";

import { API_URL } from "./API.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const fetchUsers = async () => {
        const response = await fetch(`${API_URL}/api/task`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error();
        }

        return response.json();
    };

    const addUser = async ({ email, password, passwordConfirmation }) => {
        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    passwordConfirmation: passwordConfirmation,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            return data;
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <UserContext.Provider value={{ addUser }}>
            {children}
        </UserContext.Provider>
    );
};
