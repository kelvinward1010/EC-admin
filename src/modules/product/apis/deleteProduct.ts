import { URL_DELETEPRODUCT } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

interface DeleteProductProps {
    id?: string;
}

export const deleteProduct = async (data: DeleteProductProps): Promise<any> => {
    const res = await apiClient.delete(`${URL_DELETEPRODUCT}/${data.id}`);
    return res;
};

type UseDeleteProductOptions = {
    config?: MutationConfig<typeof deleteProduct>;
};

export const useDeleteProduct = ({ config }: UseDeleteProductOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: deleteProduct,
    });
};
