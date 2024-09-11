import { URL_CREATEUSER } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

export interface CreateUserProps {
    name?: string;
    email?: string;
    password?: string;
    image?: string;
}

export const createUser = async (data: CreateUserProps): Promise<any> => {
    const res = await apiClient.post(`${URL_CREATEUSER}`, data);
    return res;
};

type UseCreateUserOptions = {
    config?: MutationConfig<typeof createUser>;
};

export const useCreateUser = ({ config }: UseCreateUserOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: createUser,
    });
};
