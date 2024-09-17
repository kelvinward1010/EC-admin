export interface IProductTable {
    key: any;
    _id: string;
    name?: string;
    image?: string;
    description?: string;
    quantity?: number;
    price?: number;
    type?: string;
    appreciation?: [
        {
            star: number;
            idUser: string;
        },
    ];
    createdAt?: string;
    updatedAt?: string;
}
