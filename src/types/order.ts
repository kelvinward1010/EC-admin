export interface IOrder {
    _id: string;
    paymentmethod: string;
    idUser: string;
    deliveryaddress: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    products?: [
        {
            key: string;
            _id: string;
            name: string;
            image: string;
            quantity: number;
            price: number;
            star: number;
            type: string;
        },
    ];
    yourinvoice: {
        price: number;
        shipping_price: number;
        totalprice: number;
    };
    status: string;
    completed: boolean;
    deliveredAt: string;
    createdAt: string;
    updatedAt: string;
}
