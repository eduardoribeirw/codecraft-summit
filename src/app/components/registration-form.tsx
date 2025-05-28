"use client";

import { useState } from "react";
import { FiUser, FiMail, FiArrowRight, FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email: string;
}

interface FormErrors {
  username?: string;
  email?: string;
}

interface TouchedFields {
  username: boolean;
  email: boolean;
}

type SubmitStatus = "idle" | "success" | "error";

export function RegistrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    username: false,
    email: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.username) {
      newErrors.username = "Por favor, insira seu Nome e Sobrenome.";
    } else if (!data.username.includes(" ")) {
      newErrors.username =
        "Por favor, insira seu nome completo (nome e sobrenome)";
    }

    if (!data.email) {
      newErrors.email = "Por favor, insira seu e-mail";
    } else if (!validateEmail(data.email)) {
      newErrors.email = "Por favor, insira um e-mail válido";
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Se houve um resultado anterior (sucesso ou erro), reseta ao editar para nova tentativa.
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setAnimateButton(false);
    }
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (touched[name as keyof TouchedFields]) {
      const updatedErrors = validateForm(updatedData);
      setErrors(updatedErrors);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const updatedErrors = validateForm(formData);
    setErrors(updatedErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Marca todos os campos como interagidos para que os erros apareçam, se houver.
    setTouched({ username: true, email: true });
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Inicia a animação do botão e bloqueia a submissão
    setAnimateButton(true);
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulação de chamada de API
    setTimeout(() => {
      if (formData.email.toLowerCase() === "example@mail.com") {
        // Erro: fundo vermelho, ícone de X e mensagem de erro.
        setSubmitStatus("error");
        setErrors({
          email:
            "E-mail já cadastrado! Só é possível fazer a inscrição uma vez",
        });
        setIsSubmitting(false);
        // Após 1000ms, retorna à aparência original para nova tentativa.
        setTimeout(() => {
          setSubmitStatus("idle");
          setAnimateButton(false);
        }, 1000);
        return;
      }

      // Sucesso: fundo verde, ícone de check e redirecionamento para /evento
      setSubmitStatus("success");
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      // Após 1000ms, redireciona para a nova rota
      setTimeout(() => {
        router.push("/evento");
      }, 1000);
    }, 1000);
  };

  return (
    <div className="w-full lg:w-[27.56rem] bg-[#191D24] rounded-lg border border-[#21252C] p-7 shadow-lg">
      <h2 className="mb-6 text-xl text-left font-semibold text-[#C8D0DA]">
        Inscrição
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo de Nome Completo */}
        <div className="space-y-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiUser className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nome Completo"
              className={`w-full rounded-lg border bg-[#13161B] px-10 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                errors.username && touched.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-700 focus:ring-slate-600"
              }`}
              disabled={isSubmitting}
            />
          </div>
          {touched.username && errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        {/* Campo de Email */}
        <div className="space-y-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiMail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className={`w-full rounded-lg border bg-[#13161B] px-10 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                errors.email && touched.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-700 focus:ring-slate-600"
              }`}
              disabled={isSubmitting}
            />
          </div>
          {touched.email && errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Botão com animação */}
        <div className="relative">
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative group flex overflow-hidden w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {/* Fundo base do botão */}
            <div className="absolute inset-0 bg-[#2A313C]" />
            {/* Camada animada que preenche o botão:
                Se o submitStatus for "error", o fundo fica vermelho; caso contrário, verde */}
            <div
              className={`absolute inset-0 transition-all duration-1000 ${
                animateButton
                  ? submitStatus === "error"
                    ? "bg-red-500"
                    : "bg-green-500"
                  : "bg-transparent"
              }`}
              style={{ width: animateButton ? "100%" : "0%" }}
            />
            {/* Conteúdo do botão (centralizado) */}
            <div className="w-full relative flex items-center justify-between ">
              {submitStatus === "success" ? (
                <FiCheck size={24} />
              ) : submitStatus === "error" ? (
                <FiX size={24} />
              ) : (
                <>
                  <span>Confirmar</span>
                  <FiArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
