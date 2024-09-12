import { IUser } from "@/types/user";

export const calculateTotalValue = (
    data: { type: string; value: number }[],
) => {
    return data.reduce((total, item) => total + item.value, 0);
};

export function addKeyField(arr: IUser[]) {
    return arr?.map((item) => {
        return { ...item, key: item._id };
    });
}
