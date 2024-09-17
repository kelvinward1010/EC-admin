import { URL_GETORDERS } from "@/constant";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { convertToQueryString } from "@/utils/urls";
import { useQuery } from "react-query";

interface getOrdersProps {
    id?: string;
    status?: string;
    completed?: boolean;
    idUser?: string;
    nameOrder?: string;
}

export const searchOrders = async (data: getOrdersProps): Promise<any> => {
    let convertedQuery = convertToQueryString(data);
    const res = await apiClient.get(`${URL_GETORDERS}${convertedQuery}`);
    return res?.data;
};

type QueryFnType = typeof searchOrders;

type UseSearchOrdersOptions = {
    data: getOrdersProps;
    config?: QueryConfig<QueryFnType>;
};

export const useGetOrders = ({ data, config }: UseSearchOrdersOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        onError: () => {},
        onSuccess: () => {},
        ...config,
        queryKey: ["get-orders", data],
        queryFn: () => searchOrders(data),
    });
};
