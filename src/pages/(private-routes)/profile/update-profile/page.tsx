import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/inputs/input";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

import { Loading } from "@/components/loading";

const formUpload = z.object({
  name: z.string().min(1, "Name is required"),
  photo: z.string().url("Photo is not valid").min(1, "Photo is required")
});

export default function UpdateProfilePage() {
  const { isLoading: isAuthLoading, updateProfileUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset: handleResetForm,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof formUpload>>({
    resolver: zodResolver(formUpload),
    defaultValues: {
      name: user?.displayName || "",
      photo: user?.photoURL || ""
    }
  });

  if (isAuthLoading) {
    return <Loading />;
  }

  const handleUpdateProfile: SubmitHandler<z.infer<typeof formUpload>> = async (
    data: z.infer<typeof formUpload>
  ) => {
    setIsLoading(true);
    try {
      const from = location.state?.from?.pathname || "/";

      const { name, photo } = data;
      await updateProfileUser({ name, photoURL: photo });
      navigate(from, { replace: true });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      handleResetForm();
    }
  };

  <div className="form-control gap-y-1">
    <label className="photo">
      <span className="label-text">Upload photo</span>
    </label>
    <input type="file" className="file-input file-input-bordered w-fit" />
  </div>;

  return (
    <div className="section-container flex items-center justify-center h-screen z-[1002]">
      <form
        className="card-body shadow-custom lg:max-w-[50%] mx-10 lg:mx-0"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <h3 className="font-bold text-2xl">Update Profile</h3>
        <Input
          placeholder="Enter your name"
          label="Name"
          icon={<FaRegUser />}
          register={register}
          id="name"
          errors={errors}
          disabled={isSubmitting && isLoading}
          type="name"
          required
        />

        <Input
          placeholder="Choose your file"
          label="Upload photo"
          register={register}
          id="photo"
          errors={errors}
          disabled={isSubmitting && isLoading}
          // type="file"
        />

        <div className="form-control mt-2">
          <button
            type="submit"
            className="btn btn-primary !bg-green !border-none text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
