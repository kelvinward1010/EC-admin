import { Modal, Typography } from "antd";
import styles from "./modalSmall.module.scss";
import { ButtonConfig } from "../buttonconfig";

interface ModalSmallProps {
    ComponentElement?: React.ComponentType;
    title?: string;
    titleButton?: string;
    message?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    onClick?: () => void;
}

const { Title } = Typography;

export function ModalSmall({
    ComponentElement,
    title,
    message,
    open,
    setOpen,
    onClick,
    titleButton,
}: ModalSmallProps) {
    const handleCancel = () => setOpen(false);

    return (
        <div>
            {ComponentElement && <ComponentElement />}
            <Modal
                title={title}
                open={open}
                onCancel={handleCancel}
                centered
                footer={false}
                className={styles.containerModalWarning}
            >
                <div className={styles.center}>
                    <Title className={styles.message} level={4}>
                        {message}
                    </Title>
                    <ButtonConfig
                        className={styles.button}
                        lable={titleButton ?? "OK"}
                        onClick={onClick}
                        type={"default"}
                    />
                </div>
            </Modal>
        </div>
    );
}
