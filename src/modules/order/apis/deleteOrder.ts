import { URL_DELETEORDER } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

interface DeleteOrderProps {
    id?: string;
}

export const deleteOrder = async (data: DeleteOrderProps): Promise<any> => {
    const res = await apiClient.delete(`${URL_DELETEORDER}/${data.id}`);
    return res;
};

type UseDeleteOrderOptions = {
    config?: MutationConfig<typeof deleteOrder>;
};

export const useDeleteOrder = ({ config }: UseDeleteOrderOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: deleteOrder,
    });
};
