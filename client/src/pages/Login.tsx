import { useState, type ChangeEvent } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@tanstack/react-query";
import { login, type ApiError } from "../api/chat";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import type { FormErrors } from "../types";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/");
    },
    onError: (error: ApiError) => {
      setErrors(error.errors);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(form);
    setForm({ email: "", password: "" });
  };

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-6 tracking-wide uppercase">
        Login
      </h2>
      <div className="bg-white rounded-xl shadow-md w-full max-w-sm px-8 py-10">
        <InputField
          value={form.email}
          onChange={handleForm}
          name="email"
          label="Email"
          type="email"
          autoFocus
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
        )}
        <InputField
          value={form.password}
          onChange={handleForm}
          name="password"
          label="Password"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
        )}
        <div className="flex items-center justify-between">
          <button className="bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold px-5 py-2 rounded transition-colors duration-150">
            {isPending ? "Chargement..." : "LOG IN"}
          </button>
          <Link
            to="/register"
            className="cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-150 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
