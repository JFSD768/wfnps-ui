import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FileUpload from "../FileUpload";
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
    updatedOn: null}

describe("FileUpload component", () => {
    it("FileUpload", async() => {

        const {getByText} = render(<FileUpload userDetails onStopSelect={jest.fn()} />);
        expect(await getByText("Upload File")).toBeDefined();
    })
})