import { Variant } from "@/types";
import { IoMdClose } from "react-icons/io";

interface ModalProviderProps {
  children: React.ReactNode;
  setVariant: (value: Variant) => void;
  setIsModalOpen: (value: boolean) => void;
  idModal: string;
}

export function ModalProvider({
  children,
  idModal,
  setVariant,
  setIsModalOpen
}: ModalProviderProps) {
  return (
    <dialog id={idModal} className="modal modal-middle">
      <div className="relative rounded-lg max-w-md md:max-w-2xl w-full">
        {children}
        <form method="dialog">
          <button
            onClick={() => {
              setVariant("LOGIN");
              setIsModalOpen(false);
            }}
            className="absolute top-4 right-4 btn rounded-full hover:outline-none hover:!border-none !size-14 border border-gray-800 shadow-sm"
          >
            <IoMdClose className="!size-6" />
          </button>
        </form>
      </div>
      <form
        method="dialog"
        className="modal-backdrop h-screen w-screen absolute bg-black/80"
      >
        <button
          onClick={() => {
            setVariant("LOGIN");
            setIsModalOpen(false);
          }}
          className="hover:!border-none cursor-default focus-visible:!outline-none"
        />
      </form>
    </dialog>
  );
}
