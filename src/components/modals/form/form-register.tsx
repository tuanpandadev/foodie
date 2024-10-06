import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import { Variant } from "@/types";
import { useAuth } from "@/hooks/use-auth";

import { Input } from "@/components/inputs/input";
import { AuthSocial } from "@/components/auth/auth-social";

const schema = z
  .object({
    email: z.string().email("Email is not valid").min(1, "Email is required"),
    name: z
      .string()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export const FormRegister = ({
  setVariant
}: {
  setVariant: (value: Variant) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    isLoading: isAuthLoading,
    createAccount,
    updateProfileUser
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (
    value: z.infer<typeof schema>
  ) => {
    setIsLoading(true);
    try {
      const data = { ...value, confirmPassword: undefined };

      const { user } = await createAccount(data.email, data.password);
      if (!user) {
        toast.error("Register failed");
        return;
      }

      await updateProfileUser({
        name: data.name
      });

      toast.success("Register successful");

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Register failed");
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isSubmitting && isAuthLoading && isLoading;

  return (
    <div className="card shadow-2xl bg-base-200 flex flex-col text-center gap-y-4 py-8">
      <p className="text-xl font-bold text-black dark:text-white">Register</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body py-4 pt-0 gap-y-4 text-start"
      >
        <Input
          placeholder="Enter your name"
          label="Name"
          id="name"
          icon={<FaRegUser />}
          register={register}
          errors={errors}
          disabled={isSubmitting && isAuthLoading && isLoading}
        />

        <Input
          placeholder="Enter your email"
          label="Email"
          id="email"
          icon={<MdEmail />}
          register={register}
          errors={errors}
          disabled={loading}
          type="email"
        />

        <Input
          placeholder="Enter your password"
          label="Password"
          id="password"
          icon={<RiLockPasswordLine />}
          register={register}
          errors={errors}
          disabled={loading}
          type="password"
        />

        <Input
          placeholder="Enter your confirm password"
          label="Confirm Password"
          id="confirmPassword"
          icon={<RiLockPasswordLine />}
          register={register}
          errors={errors}
          disabled={loading}
          type="password"
        />

        <div className="form-control mt-3">
          <button
            disabled={loading}
            type="submit"
            className="btn bg-green text-white"
          >
            Register
          </button>
        </div>
      </form>
      <div className="w-fit mx-auto flex gap-x-2 items-center">
        <span>Don't have an account?</span>
        <button
          disabled={loading}
          onClick={() => setVariant("LOGIN")}
          className="btn bg-green text-white"
        >
          SignIn Now
        </button>
      </div>
      <AuthSocial />
    </div>
  );
};
