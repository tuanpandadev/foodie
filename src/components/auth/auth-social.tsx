import { FaTwitter, FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";

import { useAuth } from "@/hooks/use-auth";

export function AuthSocial() {
  const { signInWithGoogle, setIsOpenModal, isLoading } = useAuth();
  const handleLoginGoogle = async () => {
    try {
      await signInWithGoogle();
      setIsOpenModal(false);

      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <span>Or sign in with</span>
      <div className="flex items-center justify-center gap-x-3">
        <button
          disabled={isLoading}
          className="btn rounded-full hover:bg-blue-800 bg-blue-600 border-none !size-14"
        >
          <FaFacebook className="size-6 text-white" />
        </button>
        <button
          disabled={isLoading}
          className="btn rounded-full hover:bg-blue-300 bg-blue-500 border-none !size-14"
        >
          <FaTwitter className="size-6 text-white" />
        </button>
        <button
          disabled={isLoading}
          className="btn rounded-full hover:bg-[#f73333] bg-[#ff0202] border-none !size-14"
          onClick={handleLoginGoogle}
        >
          <FaGoogle className="!size-6 text-white" />
        </button>
      </div>
    </div>
  );
}
