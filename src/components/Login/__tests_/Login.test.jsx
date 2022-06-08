import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "../Login";


describe("Login component", () => {
    it("Login", async() => {

        const {getByText, getByLabelText} = render(<Login />);
        expect(await getByText("Name Pronunciation Tool")).toBeDefined();
        expect(await getByLabelText("User Name")).toBeDefined();
        expect(await getByLabelText("Password")).toBeDefined();
    })
})