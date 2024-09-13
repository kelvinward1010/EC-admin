import { URL_CREATEPRODUCT } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

export interface CreateProductProps {
    name?: string;
    image?: string;
    description?: string;
    quantity?: number;
    price?: number;
    type?: string;
    appreciation?: any[];
}

export const createProduct = async (data: CreateProductProps): Promise<any> => {
    const res = await apiClient.post(`${URL_CREATEPRODUCT}`, data);
    return res;
};

type UseCreateProductOptions = {
    config?: MutationConfig<typeof createProduct>;
};

export const useCreateProduct = ({ config }: UseCreateProductOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: createProduct,
    });
};
