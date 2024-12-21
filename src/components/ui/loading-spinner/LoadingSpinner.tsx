import { CgSpinner } from "react-icons/cg";

export const LoadingSpinner = () => {
  return (
    <div className="w-10 h-auto flex justify-center">
      <CgSpinner className="animate-spin duration-200" size={25} />
    </div>
  );
};
