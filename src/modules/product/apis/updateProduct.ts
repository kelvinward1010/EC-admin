import { URL_UPDATEPRODUCT } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

interface UpdateProductProps {
    id?: string;
    name?: string;
    image?: string;
    description?: string;
    quantity?: number;
    price?: number;
    type?: string;
    appreciation?: any[];
}

export const updateProduct = async (data: UpdateProductProps): Promise<any> => {
    const draftData = {
        name: data.name,
        image: data.image,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
        type: data.type,
        appreciation: data.appreciation,
    };
    const res = await apiClient.put(
        `${URL_UPDATEPRODUCT}/${data.id}`,
        draftData,
    );
    return res;
};

type UseUpdateProductOptions = {
    config?: MutationConfig<typeof updateProduct>;
};

export const useUpdateProduct = ({ config }: UseUpdateProductOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: updateProduct,
    });
};
