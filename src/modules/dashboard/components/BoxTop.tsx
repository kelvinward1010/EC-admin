import { Card } from "antd";
import styles from "./BoxTop.module.scss";

interface BoxTopProps {
    title: string;
    component: React.ReactNode;
    classNameFix?: string;
}

function BoxTop({ title, component, classNameFix }: BoxTopProps) {
    return (
        <Card
            className={`${styles.container} ${classNameFix}`}
            title={title}
            bordered={false}
            style={{ width: 300 }}
        >
            {component}
        </Card>
    );
}

export default BoxTop;
