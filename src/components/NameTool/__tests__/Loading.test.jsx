import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component", () => {
    it("Loading", async() => {

        const {getByText} = render(<Loading />);
        expect(await getByText("Loading...")).toBeDefined();
    })
})