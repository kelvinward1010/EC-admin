import { URL_GETORDER } from "@/constant";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";

interface GetOrderProps {
    id?: string;
}

export const getOrder = async (data: GetOrderProps): Promise<any> => {
    const res = await apiClient.get(`${URL_GETORDER}/${data.id}`);
    return res?.data;
};

type QueryFnType = typeof getOrder;

type GetOrderOptions = {
    data: GetOrderProps;
    config?: QueryConfig<QueryFnType>;
};

export const useGetOrder = ({ data, config }: GetOrderOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        onError: () => {},
        onSuccess: () => {},
        ...config,
        queryKey: ["order"],
        queryFn: () => getOrder(data),
    });
};
