import { URL_UPDATEUSER } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

interface UpdateUserProps {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    isAdmin?: boolean;
}

export const updateUser = async (data: UpdateUserProps): Promise<any> => {
    const draftData = {
        name: data.name,
        email: data.email,
        image: data.image,
        isAdmin: data.isAdmin,
    };
    const res = await apiClient.put(`${URL_UPDATEUSER}/${data.id}`, draftData);
    return res;
};

type UseUpdateUserOptions = {
    config?: MutationConfig<typeof updateUser>;
};

export const useUpdateAccount = ({ config }: UseUpdateUserOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: updateUser,
    });
};
