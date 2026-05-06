import { useState, type ChangeEvent } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@tanstack/react-query";
import { register, type ApiError } from "../api/chat";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { FormErrors } from "../types";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: register,
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
    setForm({ name: "", email: "", password: "" });
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
        Register
      </h2>
      <div className="bg-white rounded-xl shadow-md w-full max-w-sm px-8 py-10">
        <InputField
          value={form.name}
          onChange={handleForm}
          label="Name"
          type="text"
          autoFocus
          name="name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
        )}
        <InputField
          value={form.email}
          onChange={handleForm}
          label="Email"
          type="email"
          name="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
        )}
        <InputField
          value={form.password}
          onChange={handleForm}
          label="Password"
          type="password"
          name="password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
        )}
        {/* <InputField label="Confirm Password" type="password" /> */}
        <div className="flex items-center justify-between mt-2">
          <button className="bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold px-5 py-2 rounded transition-colors duration-150">
            {isPending ? "Chargement..." : "REGISTER"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Register;
