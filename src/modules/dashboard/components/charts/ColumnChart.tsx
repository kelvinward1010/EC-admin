import { Column } from "@ant-design/plots";
import styles from "./ColumnChart.module.scss";

interface ColumnChartProps {
    data: any;
}

function ColumnChart({ data }: ColumnChartProps) {
    const config = {
        data: data ?? [],
        xField: "type",
        yField: "value",
        label: {
            textBaseline: "bottom",
        },
        style: {
            radiusTopLeft: 10,
            radiusTopRight: 10,
        },
    };
    return (
        <div className={styles.container}>
            <Column {...config} />
        </div>
    );
}

export default ColumnChart;
