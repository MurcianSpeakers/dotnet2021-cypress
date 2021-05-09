import { render } from "@testing-library/react";
import { PetForm } from "./PetForm";
import React from 'react';

describe("The PetForm component", () => {
    it("should have a name input", () => {
        const { getAllByTestId } = render(<PetForm addPet={() => {/* do nothing */ }} />);

        expect(getAllByTestId('name-input')).toBeTruthy();
    });
});
