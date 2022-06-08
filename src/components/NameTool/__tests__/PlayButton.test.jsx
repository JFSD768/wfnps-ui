import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlayButton from "../PlayButton";


describe("PlayButton component", () => {
    it("PlayButton", async() => {

        const {getByText} = render(<PlayButton  url="blobUrl" name="userName"/>);
        expect(await getByText("Click the play button to listen to the recorded audio")).toBeDefined();
    })
})