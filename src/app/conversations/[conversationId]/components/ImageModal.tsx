import Modal from "@/components/modals/Modal";
import Image from "next/image";

type ImageModalProps = {
  src?: string | null;
  isOpen: boolean;
  onClose: () => void;
};

const ImageModal = ({ src, isOpen, onClose }: ImageModalProps) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image className="object-conver" fill alt="image" src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
