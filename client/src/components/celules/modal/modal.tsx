import { ReactNode } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0D0D0D",
    borderRadius: "7px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

Modal.setAppElement("#root");

export type ModalCeluleProps = {
  children: ReactNode;
  handleModal: () => void;
  isOpen: boolean;
};

export function ModalCelule({
  children,
  handleModal,
  isOpen,
}: ModalCeluleProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
}
