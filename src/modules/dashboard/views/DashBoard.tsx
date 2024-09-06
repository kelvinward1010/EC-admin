import { Card, Flex, Select, Typography } from "antd";
import styles from "./DashBoard.module.scss";
import ColumnChart from "../components/charts/ColumnChart";
import { dataChart } from "../data";
import { CHARTSTYPES, TOTALSTYPES } from "../config";
import { useMemo, useState } from "react";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";

const { Text, Title } = Typography;

export function DashBoard() {
    const [charttype, setCharttype] = useState<string>("Column");
    const [totaltype, setTotaltype] = useState<string>("Day");

    const data = dataChart;

    const handleChange = (value: string) => {
        setCharttype(value);
    };

    const handleChangeTotal = (value: string) => {
        setTotaltype(value);
    };

    const renderedComponent = useMemo(() => {
        if (charttype === "Column") {
            return <ColumnChart data={data} />;
        } else if (charttype === "Bar") {
            return <BarChart data={data} />;
        } else if (charttype === "Pie") {
            return <PieChart data={data} />;
        }
        return null;
    }, [charttype]);

    const LableTop = (
        <Flex justify={"space-between"} align={"center"}>
            <Text strong>{totaltype}</Text>
            <Select
                defaultValue={totaltype}
                onChange={handleChangeTotal}
                style={{ width: "100px" }}
                options={TOTALSTYPES}
            />
        </Flex>
    );

    const LableTop2 = (
        <Flex justify={"space-between"} align={"center"}>
            <Text strong>{charttype}</Text>
            <Select
                defaultValue={charttype}
                onChange={handleChange}
                style={{ width: "100px" }}
                options={CHARTSTYPES}
            />
        </Flex>
    );

    return (
        <div className={styles.container}>
            <Card title={LableTop} bordered={false}>
                <Flex
                    wrap
                    gap={15}
                    justify={"start"}
                    align={"middle"}
                    style={{ width: "100%" }}
                >
                    <Card
                        className={`${styles.containerTotalSale} ${styles.box}`}
                        title={"Total Sales"}
                        bordered={false}
                    >
                        <Flex vertical>
                            <Title level={4}>100</Title>
                            <Text>+8% from current month</Text>
                        </Flex>
                    </Card>
                    <Card
                        className={`${styles.containerTotalOrder} ${styles.box}`}
                        title={"Total Order"}
                        bordered={false}
                    >
                        <Flex vertical>
                            <Title level={4}>100</Title>
                            <Text>+8% from current month</Text>
                        </Flex>
                    </Card>
                    <Card
                        className={`${styles.containerTotalSold} ${styles.box}`}
                        title={"Product Sold"}
                        bordered={false}
                    >
                        <Flex vertical>
                            <Title level={4}>100</Title>
                            <Text>+8% from current month</Text>
                        </Flex>
                    </Card>
                    <Card
                        className={`${styles.containerTotalCustomers} ${styles.box}`}
                        title={"New Customers"}
                        bordered={false}
                    >
                        <Flex vertical>
                            <Title level={4}>100</Title>
                            <Text>+8% from current month</Text>
                        </Flex>
                    </Card>
                </Flex>
            </Card>
            <Card
                className={styles.chartBox}
                title={LableTop2}
                bordered={false}
            >
                {renderedComponent}
            </Card>
        </div>
    );
}
