import { getAssignments, getMembers, patchAssignedTo, patchStatus, deleteAssignment } from "./api";

const newColumn = document.getElementById("new") as HTMLDivElement;
const doingColumn = document.getElementById("doing") as HTMLDivElement;
const doneColumn = document.getElementById("done") as HTMLDivElement;

const newContent = newColumn.querySelector(".content") as HTMLDivElement;
const doingContent = doingColumn.querySelector(".content") as HTMLDivElement;
const doneContent = doneColumn.querySelector(".content") as HTMLDivElement;

export async function renderBoard() {
    try {
        const members = await getMembers();
        const assignments = await getAssignments();

        newContent.innerHTML = "";
        doingContent.innerHTML = "";
        doneContent.innerHTML = "";

        for (const assignment of assignments) {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
            <strong>${assignment.title}</strong><br>
            Description: ${assignment.description}<br>
            Category: ${assignment.category}<br>
            Timestamp: ${assignment.timestamp}<br>
        `;

            if (assignment.status === "new") {
                const select = document.createElement("select");
                const filteredMembers = members.filter(member => member.category === assignment.category);

                for (const member of filteredMembers) {
                    const option = document.createElement("option");
                    option.value = member.id;
                    option.textContent = `${member.name}, ${member.category}`;
                    select.appendChild(option);
                }

                const assignBtn = document.createElement("button");
                assignBtn.textContent = "Assign";

                assignBtn.addEventListener("click", async () => {
                    try {
                        await patchAssignedTo(assignment.id, select.value);
                        renderBoard();
                    }
                    catch (error) {
                        console.log("Failed to assign:", error);
                    }
                });

                card.append(select, assignBtn);
                newContent.appendChild(card);
            }

            else if (assignment.status === "doing") {
                const member = members.find(member => member.id === assignment.assignedTo);

                const memberInfo = document.createElement("p");
                memberInfo.textContent = `Assigned to: ${member?.name}, ${member?.category}`;
                card.appendChild(memberInfo);

                const doneBtn = document.createElement("button");
                doneBtn.textContent = "Mark as done";

                doneBtn.addEventListener("click", async () => {
                    try {
                        await patchStatus(assignment.id);
                        renderBoard();
                    }
                    catch (error) {
                        console.log("Failed to update status:", error);
                    }
                });

                card.appendChild(doneBtn);
                doingContent.appendChild(card);
            }

            else if (assignment.status === "done") {
                const member = members.find(member => member.id === assignment.assignedTo);

                const memberInfo = document.createElement("p");
                memberInfo.textContent = `Assigned to: ${member?.name}, ${member?.category}`;
                card.appendChild(memberInfo);

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";

                deleteBtn.addEventListener("click", async () => {
                    try {
                        await deleteAssignment(assignment.id);
                        renderBoard();
                    }
                    catch (error) {
                        console.log("Failed to delete:", error);
                    }
                });

                card.appendChild(deleteBtn);
                doneContent.appendChild(card);
            }
        }
    }
    catch (error) {
        console.log("Error rendering board:", error);
    }
}