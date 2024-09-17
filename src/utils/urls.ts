interface SearchProps {
    id?: string;
    name?: string;
    idUser?: string;
    type?: string;
    isAdmin?: boolean;
    nameOrder?: string;
    status?: string;
    completed?: boolean;
}

export function convertToQueryString(props: SearchProps): string {
    const { name, type, isAdmin, nameOrder, id, idUser, status, completed } =
        props;

    const queryParams = [];
    if (id) {
        queryParams.push(`id=${encodeURIComponent(id)}`);
    }
    if (name) {
        queryParams.push(`name=${encodeURIComponent(name)}`);
    }
    if (nameOrder) {
        queryParams.push(`nameOrder=${encodeURIComponent(nameOrder)}`);
    }
    if (type) {
        queryParams.push(`type=${encodeURIComponent(type)}`);
    }
    if (idUser) {
        queryParams.push(`idUser=${encodeURIComponent(idUser)}`);
    }
    if (status) {
        queryParams.push(`status=${encodeURIComponent(status)}`);
    }
    if (completed !== undefined) {
        queryParams.push(`completed=${encodeURIComponent(completed)}`);
    }
    if (isAdmin !== undefined) {
        queryParams.push(`isAdmin=${isAdmin}`);
    }

    // If no parameters are provided, return an empty string
    if (queryParams.length === 0) {
        return "";
    }

    const queryString = queryParams.join("&");
    return `?${queryString}`;
}
