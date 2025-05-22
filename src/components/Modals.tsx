import { useState, type FC, type RefObject } from "react";
import type { ModalData } from "../types";
import Modal from "./Modal/Modal";

interface ModalsProps {
    ref: RefObject<((text: string) => void) | null>;
}

const Modals: FC<ModalsProps> = ({ ref }) => {
    const [modals, setModals] = useState<ModalData[]>([]);

    const addModal = (text: string): void => {
        const newModal: ModalData = {
            content: text,
            id: new Date().toString(),
        };
        setModals((prev) => [...prev, newModal]);
    };

    ref.current = addModal;

    const removeTopModal = () => {
        setModals((prev) => prev.slice(0, -1));
    };

    return (
        <>
            {modals.map((modal, index) => (
                <Modal
                    remove={() => removeTopModal()}
                    isTop={index === modals.length - 1}
                    key={modal.id}
                >
                    {modal.content}
                </Modal>
            ))}
        </>
    );
};

export default Modals;
