import type { NewAssignment, NewMember, Category } from "./types";
import { postMembers, postAssignment } from "./api";
import { renderBoard } from "./updateScrumBoard";

const formMember = document.querySelector("#member") as HTMLFormElement;
formMember.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const nameInput = formMember.querySelector("#memberName") as HTMLInputElement;
        const categorySelect = formMember.querySelector("#categoryMember") as HTMLSelectElement;

        const newMember: NewMember = {
            name: nameInput.value,
            category: categorySelect.value as Category
        };

        await postMembers(newMember);
        await renderBoard();

        formMember.reset();
    }
    catch (error) {
        console.log("Failed to create member:", error);
    }
});

const formAssignment = document.querySelector("#assignment") as HTMLFormElement;
formAssignment.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const titleInput = formAssignment.querySelector("#assignmentTitle") as HTMLInputElement;
        const descInput = formAssignment.querySelector("#assignmentDesc") as HTMLInputElement;
        const categorySelect = formAssignment.querySelector("#categoryAssignment") as HTMLSelectElement;

        const newAssignment: NewAssignment = {
            title: titleInput.value,
            description: descInput.value,
            category: categorySelect.value as Category
        };

        await postAssignment(newAssignment);
        await renderBoard();

        formAssignment.reset();
    }
    catch (error) {
        console.log("Failed to create assignment:", error);
    }
})

renderBoard();