export const calculateTotalValue = (
    data: { type: string; value: number }[],
) => {
    return data.reduce((total, item) => total + item.value, 0);
};
