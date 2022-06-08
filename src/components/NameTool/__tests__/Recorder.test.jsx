import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Recorder from "../Recorder";

const userDetails = {createdBy: null,
    createdOn: null,
    id: 1001,
    legalFName: "Abdullah",
    legalLName: "Khan",
    prefLanguage: null,
    prefName: "Aby",
    prefPronunciation: "prnounciation",
    prefSpeakingSpeed: null,
    prefVoice: null,
    role: null,
    uId: "u1001",
    updatedBy: null,
    updatedOn: null};

describe("Recorder component", () => {
    it("Recorder", async() => {

        const {getByText} = render(<Recorder userDetails={userDetails} onStopSelect= {jest.fn()} />);
        expect(await getByText("Record Aby")).toBeDefined();
    })
})