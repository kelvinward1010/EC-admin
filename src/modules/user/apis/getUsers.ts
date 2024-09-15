import { URL_GETUSERS } from "@/constant";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { convertToQueryString } from "@/utils/urls";
import { useQuery } from "react-query";

interface getUsersProps {
    name?: string;
    email?: string;
    isAdmin?: boolean;
    page?: number;
}

export const searchUsers = async (data: getUsersProps): Promise<any> => {
    let convertedQuery = convertToQueryString(data);
    const res = await apiClient.get(`${URL_GETUSERS}${convertedQuery}`);
    return res?.data;
};

type QueryFnType = typeof searchUsers;

type UseSearchPostsOptions = {
    data: getUsersProps;
    config?: QueryConfig<QueryFnType>;
};

export const useGetUsers = ({ data, config }: UseSearchPostsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        onError: () => {},
        onSuccess: () => {},
        ...config,
        queryKey: ["get-users", data],
        queryFn: () => searchUsers(data),
    });
};
