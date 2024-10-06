import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import * as z from "zod";
import { Variant } from "@/types";
import { Input } from "@/components/inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useAuth } from "@/hooks/use-auth";

import { AuthSocial } from "@/components/auth/auth-social";

const schema = z.object({
  email: z.string().email("Email is not valid").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const FormLogin = ({
  setVariant
}: {
  setVariant: (value: Variant) => void;
}) => {
  const { loginWithEmailPassword, isLoading } = useAuth();
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
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (
    data: z.infer<typeof schema>
  ) => {
    try {
      await loginWithEmailPassword(data.email, data.password);
      toast.success("Login successful");

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card shadow-2xl bg-base-200 flex flex-col text-center gap-y-4 py-8">
        <p className="text-xl font-bold text-black dark:text-white">Login</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body py-4 pt-0 gap-y-3 text-start"
        >
          <Input
            placeholder="Enter your email"
            label="Email"
            icon={<MdEmail />}
            register={register}
            id="email"
            errors={errors}
            disabled={isSubmitting && isLoading}
            type="email"
          />

          <Input
            placeholder="Enter your password"
            errors={errors}
            icon={<RiLockPasswordLine />}
            id="password"
            label="Password"
            register={register}
            disabled={isSubmitting && isLoading}
            type="password"
          />

          <Link
            to="#"
            className="label-text-alt link link-hover hover:!border-none w-fit self-end text-sm"
          >
            Forgot password?
          </Link>
          <div className="form-control">
            <button
              type="submit"
              className="btn !bg-green !text-white border-none"
            >
              Login
            </button>
          </div>
        </form>
        <div className="w-fit mx-auto flex gap-x-2 items-center">
          <span>Don't have an account?</span>
          <button
            onClick={() => setVariant("REGISTER")}
            className="btn !bg-green !text-white border-none"
          >
            SignUp Now
          </button>
        </div>
        <AuthSocial />
      </div>
    </>
  );
};
