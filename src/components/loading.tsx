import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin">
        <AiOutlineLoading3Quarters className="size-16 text-black dark:text-white" />
      </div>
    </div>
  );
}
