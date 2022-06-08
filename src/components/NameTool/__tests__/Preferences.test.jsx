import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Preferences from "../Preferences";

import languages from "../../../constants/languages.json";
import { base64toBlob } from "../../../common";

const userDetails = {createdBy: null,
    createdOn: null,
    id: 1001,
    legalFName: "Abdullah",
    legalLName: "Khan",
    prefLanguage: null,
    prefName: "Aby",
    prefPronunciation: "",
    prefSpeakingSpeed: null,
    prefVoice: null,
    role: null,
    uId: "u1001",
    updatedBy: null,
    updatedOn: null};

describe("Preferences component", () => {
    it("Preferences", async() => {

        const {getByText} = render(<Preferences  languages={languages} userDetails={userDetails} onSavePref={jest.fn()} />);
        expect(await getByText("Preferences")).toBeDefined();
    })
})