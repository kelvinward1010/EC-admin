interface SearchProps {
    name?: string;
    type?: string;
    isAdmin?: boolean;
    email?: string;
}

export function convertToQueryString(props: SearchProps): string {
    const { name, type, isAdmin, email } = props;

    const queryParams = [];
    if (name) {
        queryParams.push(`name=${encodeURIComponent(name)}`);
    }
    if (email) {
        queryParams.push(`email=${encodeURIComponent(email)}`);
    }
    if (type) {
        queryParams.push(`type=${encodeURIComponent(type)}`);
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
