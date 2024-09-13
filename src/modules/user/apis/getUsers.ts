import { URL_GETUSERS } from "@/constant";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { convertToQueryStringUsers } from "@/utils/urls";
import { useQuery } from "react-query";

interface getUsersProps {
    name?: string;
    email?: string;
    isAdmin?: boolean;
}

export const searchUsers = async (data: getUsersProps): Promise<any> => {
    let convertedQuery = convertToQueryStringUsers(data);
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
        queryKey: ["get-users"],
        queryFn: () => searchUsers(data),
    });
};
