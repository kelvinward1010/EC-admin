import { Pie } from "@ant-design/plots";
import styles from "./PieChart.module.scss";
import { IDataChart } from "../../types";
import { calculateTotalValue } from "@/utils/data";

interface PieChartProps {
    data: any;
}

function PieChart({ data }: PieChartProps) {
    const totalData = calculateTotalValue(data);
    const config = {
        data: data ?? [],
        angleField: "value",
        colorField: "type",
        label: {
            text: (item: IDataChart) => {
                return `${item.type as String}: ${parseFloat(String(((item.value / totalData) * 100).toFixed(2)))}%`;
            },
            position: "outside",
        },
        legend: {
            color: {
                title: false,
                position: "right",
                rowPadding: 5,
            },
        },
    };
    return (
        <div className={styles.container}>
            <Pie {...config} />
        </div>
    );
}

export default PieChart;
