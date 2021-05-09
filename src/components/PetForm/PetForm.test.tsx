import { render } from "@testing-library/react";
import { PetForm } from "./PetForm";

describe("The PetForm component", () => {
    it("should have a name input", () => {
        const { getAllByTestId } = render(<PetForm addPet={() => { }} />);

        expect(getAllByTestId('name-input')).toBeTruthy();
    });
});
