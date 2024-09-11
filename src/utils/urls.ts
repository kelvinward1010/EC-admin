interface SearchProps {
    name?: string;
    type?: string;
    isAdmin?: boolean;
}

export function convertToQueryStringUsers(props: SearchProps): string {
    const { name, type, isAdmin } = props;

    const queryParams = [];
    if (name) {
        queryParams.push(`name=${encodeURIComponent(name)}`);
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
