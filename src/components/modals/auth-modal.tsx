import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";

import { Variant } from "@/types";

import { ModalProvider } from "@/components/providers/modal-provider";
import { FormLogin } from "@/components/modals/form/form-login";
import { FormRegister } from "@/components/modals/form/form-register";

import { useAuth } from "@/hooks/use-auth";
import { Profile } from "@/components/profile";

export function AuthModal() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [idModal] = useState("auth-modal");
  const { isOpenModal, setIsOpenModal } = useAuth();
  const { user } = useAuth();
  useEffect(() => {
    if (isOpenModal) {
      (document.getElementById(idModal) as any)?.showModal();
    }
  }, [isOpenModal, idModal]);

  return !user ? (
    <>
      <button
        onClick={() => setIsOpenModal(true)}
        className="btn bg-green text-white rounded-full px-6 flex items-center gap-2 transition h-11 min-h-11"
      >
        <FaRegUser />
        Login
      </button>
      {isOpenModal && (
        <ModalProvider
          idModal={idModal}
          setIsModalOpen={setIsOpenModal}
          setVariant={setVariant}
        >
          {variant === "LOGIN" ? (
            <FormLogin setVariant={setVariant} />
          ) : (
            <FormRegister setVariant={setVariant} />
          )}
        </ModalProvider>
      )}
    </>
  ) : (
    <Profile user={user} />
  );
}
