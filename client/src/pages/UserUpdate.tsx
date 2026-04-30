import { useState, type ChangeEvent } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/chat";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const { user, setUser } = useAuthStore();

  const [form, setForm] = useState({
    name: user!.name,
    password: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log("Mis à jour !", data);
      setUser(data);
      navigate("/");
    },
    onError: (error) => {
      console.log("Erreur :", error.message);
    },
  });

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Champ fichier traité séparément
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("password", form.password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-6 tracking-wide uppercase">
        Update Profile
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
        <InputField
          value={form.password}
          onChange={handleForm}
          label="Password"
          type="password"
          name="password"
        />

        {/* Champ fichier pour l'avatar */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded file:border-0 file:text-xs file:font-semibold
                       file:bg-gray-900 file:text-white hover:file:bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <button className="bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold px-5 py-2 rounded transition-colors duration-150">
            UPDATE
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateUser;
