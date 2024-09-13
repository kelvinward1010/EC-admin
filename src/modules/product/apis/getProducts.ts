import { URL_GETPRODUCTS } from "@/constant";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { convertToQueryStringUsers } from "@/utils/urls";
import { useQuery } from "react-query";

interface getProductsProps {
    name?: string;
    type?: string;
}

export const searchProducts = async (data: getProductsProps): Promise<any> => {
    let convertedQuery = convertToQueryStringUsers(data);
    const res = await apiClient.get(`${URL_GETPRODUCTS}${convertedQuery}`);
    return res?.data;
};

type QueryFnType = typeof searchProducts;

type UseSearchProductsOptions = {
    data: getProductsProps;
    config?: QueryConfig<QueryFnType>;
};

export const useGetProducts = ({ data, config }: UseSearchProductsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        onError: () => {},
        onSuccess: () => {},
        ...config,
        queryKey: ["get-products"],
        queryFn: () => searchProducts(data),
    });
};
