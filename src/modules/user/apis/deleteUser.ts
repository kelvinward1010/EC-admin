import { URL_DELETEUSER } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

interface DeleteUserProps {
    id?: string;
}

export const deleteUser = async (data: DeleteUserProps): Promise<any> => {
    const res = await apiClient.delete(`${URL_DELETEUSER}/${data.id}`);
    return res;
};

type UseDeleteUserOptions = {
    config?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({ config }: UseDeleteUserOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: deleteUser,
    });
};
