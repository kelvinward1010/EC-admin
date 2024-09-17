import { URL_CREATEORDER } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { IProductInOrder } from "@/utils/data";
import { useMutation } from "react-query";

export interface CreateOrderProps {
    name: string;
    paymentmethod: string;
    idUser: string;
    deliveryaddress: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    products: IProductInOrder[];
    yourinvoice: {
        price: number;
        shipping_price: number;
        totalprice: number;
    };
    status?: string;
    completed?: boolean;
    deliveredAt?: string;
}

export const createOrder = async (data: CreateOrderProps): Promise<any> => {
    const res = await apiClient.post(`${URL_CREATEORDER}`, data);
    return res;
};

type UseCreateOrderOptions = {
    config?: MutationConfig<typeof createOrder>;
};

export const useCreateOrder = ({ config }: UseCreateOrderOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: createOrder,
    });
};
