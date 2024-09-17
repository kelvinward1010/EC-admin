import { URL_UPDATEORDER } from "@/constant";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { IProductInOrder } from "@/utils/data";
import { useMutation } from "react-query";

interface UpdateOrderProps {
    id?: string;
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

export const updateOrder = async (data: UpdateOrderProps): Promise<any> => {
    const draftData = {
        name: data.name,
        paymentmethod: data.paymentmethod,
        idUser: data.idUser,
        deliveryaddress: {
            name: data.deliveryaddress.name,
            email: data.deliveryaddress.email,
            phone: data.deliveryaddress.phone,
            address: data.deliveryaddress.address,
        },
        products: data.products,
        yourinvoice: {
            price: data.yourinvoice.price,
            shipping_price: data.yourinvoice.shipping_price,
            totalprice: data.yourinvoice.totalprice,
        },
        status: data.status,
        completed: data.completed,
        deliveredAt: data.deliveredAt,
    };
    const res = await apiClient.put(`${URL_UPDATEORDER}/${data.id}`, draftData);
    return res;
};

type UseUpdateOrderOptions = {
    config?: MutationConfig<typeof updateOrder>;
};

export const useUpdateOrder = ({ config }: UseUpdateOrderOptions) => {
    return useMutation({
        onMutate: () => {},
        onError: () => {},
        onSuccess: () => {},
        ...config,
        mutationFn: updateOrder,
    });
};
