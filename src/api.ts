import type { NewAssignment, NewMember, Member, Assignment } from "./types";

const base_URL = "http://localhost:3000";

const getMembers = async (): Promise<Member[]> => {
    try {
        const res = await fetch(`${base_URL}/members`);
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        throw error;
    }
}

const getAssignments = async (): Promise<Assignment[]> => {
    try {
        const res = await fetch(`${base_URL}/assignments`);
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        throw error
    }
}

const postMembers = async (newMember: NewMember) => {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(newMember),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        const res = await fetch(`${base_URL}/members`, options);
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        throw error;
    }
}

const postAssignment = async (newAssignment: NewAssignment) => {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify(newAssignment),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        const res = await fetch(`${base_URL}/assignments`, options);
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        throw error;
    }

}

const patchAssignedTo = async (id: string, assignedTo: string) => {
    try {
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ assignedTo }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        const res = await fetch(`${base_URL}/assignments/${id}/assign`, options);
        const data = await res.json()
        console.log(data);
        return data;
    }
    catch (error) {
        throw error;
    }

}

const patchStatus = async (id: string) => {
    try {
        const options = {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        const res = await fetch(`${base_URL}/assignments/${id}/done`, options);
        const data = await res.json()
        console.log(data);
        return data;
    }
    catch (error) {
        throw error;
    }

}

const deleteAssignment = async (id: string) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        const res = await fetch(`${base_URL}/assignments/${id}`, options);
        const data = await res.json()
        return data;
    }
    catch (error) {
        throw error;
    }
}

export { getMembers, getAssignments, postMembers, postAssignment, patchAssignedTo, patchStatus, deleteAssignment }