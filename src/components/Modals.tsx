import React, { useState, type FC, type RefObject } from "react";
import type { ModalData } from "../types";
import Modal from "./Modal/Modal";

interface ModalsProps {
    addModalRef: RefObject<((text: string) => void) | null>;
    deleteTopModalRef: RefObject<(() => void) | null>;
}

const Modals: FC<ModalsProps> = ({ addModalRef, deleteTopModalRef }) => {
    const [modals, setModals] = useState<ModalData[]>([]);

    const addModal = (content: React.ReactNode): void => {
        const newModal: ModalData = {
            content: content,
            id: new Date().toString(),
        };
        setModals((prev) => [...prev, newModal]);
    };

    const removeTopModal = () => {
        setModals((prev) => prev.slice(0, -1));
    };

    addModalRef.current = addModal;
    deleteTopModalRef.current = removeTopModal;

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
