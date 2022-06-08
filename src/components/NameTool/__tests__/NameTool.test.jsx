import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import * as axios from "axios";
import NameTool from "../NameTool";
const employees = [{createdBy: null,
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
    updatedOn: null}]   

jest.mock("axios", () => ({
    get: () => Promise.resolve({data: employees, status: 200})
}));

describe("Name Tool Component", () => {
    it("Autocomplete", async() => {

        const {container} = render(<NameTool />);
        expect(await container.querySelector(".tool-body")).toBeDefined();
        expect(await screen.findByLabelText("Search by Legal First, Legal Last or Preferred Name")).toBeDefined();
        const AutoCompleteSearch = await document.querySelector('#autocompleteSearch');
        expect(screen.queryByRole('listbox')).toBeNull();

        fireEvent.mouseDown(AutoCompleteSearch);
        const ListBox = await screen.findByRole('listbox');
        expect(ListBox).toBeDefined();
        const menuItem1 = await screen.findByText("Khan, Abdullah(Aby)")
        expect(menuItem1).toBeDefined();
        fireEvent.click(menuItem1);
        // expect(await screen.findByText("Pronunciation of Aby")).toBeDefined();
        // expect(await screen.findByText("Legal First Name")).toBeDefined();
    })
})