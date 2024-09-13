import { URL_GETPRODUCT } from "@/constant";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";

interface GetProductProps {
    id?: string;
}

export const getProduct = async (data: GetProductProps): Promise<any> => {
    const res = await apiClient.get(`${URL_GETPRODUCT}/${data.id}`);
    return res?.data;
};

type QueryFnType = typeof getProduct;

type GetUserOptions = {
    data: GetProductProps;
    config?: QueryConfig<QueryFnType>;
};

export const useGetProduct = ({ data, config }: GetUserOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        onError: () => {},
        onSuccess: () => {},
        ...config,
        queryKey: ["product"],
        queryFn: () => getProduct(data),
    });
};
