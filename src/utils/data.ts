export const calculateTotalValue = (
    data: { type: string; value: number }[],
) => {
    return data.reduce((total, item) => total + item.value, 0);
};

export function addKeyField(arr: any[]) {
    return arr?.map((item) => {
        return { ...item, key: item._id };
    });
}

export interface IProductInOrder {
    _id: string;
    name?: string;
    image?: string;
    quantity?: number;
    price?: number;
    type?: string;
    key: any;
}

export const mapProductsInOrders = (data: any[]): IProductInOrder[] => {
    return data?.map((item) => ({
        _id: item._id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        type: item.type,
        key: item._id,
    })) as IProductInOrder[];
};
