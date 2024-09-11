import { URL_GETUSER } from "@/constant";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";

interface GetUserProps {
    id?: string;
}

export const getUser = async (data: GetUserProps): Promise<any> => {
    const res = await apiClient.get(`${URL_GETUSER}/${data.id}`);
    return res?.data;
};

type QueryFnType = typeof getUser;

type GetUserOptions = {
    data: GetUserProps;
    config?: QueryConfig<QueryFnType>;
};

export const useGetUser = ({ data, config }: GetUserOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        onError: () => {},
        onSuccess: () => {},
        ...config,
        queryKey: ["user"],
        queryFn: () => getUser(data),
    });
};
