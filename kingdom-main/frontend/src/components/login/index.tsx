"use client";

import { LoginPops } from "@/src/types";
import { useLoginForm } from "@/src/hooks/useLoginForm";
import { FiEye, FiEyeOff } from "react-icons/fi";

const EyeIcon = ({ visible }: { visible: boolean }) => {
  const Icon = visible ? FiEye : FiEyeOff;
  return (
    <Icon
      size={22}
      style={{ color: "#759FFE" }}
      className={`transition-opacity ${visible ? "opacity-100" : "opacity-60"}`}
    />
  );
};

export default function Login({ isLogin, setIsLogin }: LoginPops) {
  const {
    formAction,
    isPending,
    //state,
    showPassword,
    togglePassword,
  } = useLoginForm();

  if (!isLogin) {
    return null;
  }

  return (
    <form action={formAction} className="w-full">
      <div className="flex flex-col mb-2">
        <label
          htmlFor="email"
          className="text-secondary-700 text-[20px] font-bold font-nunito"
        >
          Insira seu e-mail:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 p-3 outline-2 outline-secondary-400 bg-secondary-100 rounded-xl text-black  focus:none"
          placeholder="responsavel@gmail.com"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label
          htmlFor="password"
          className="text-secondary-700 text-[20px] font-bold font-nunito"
        >
          Insira sua senha:
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="p-3 w-full outline-2 outline-secondary-400 rounded-xl text-black focus:none bg-secondary-100"
            placeholder="********"
          />

          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-3 cursor-pointer hover:opacity-80"
          >
            <EyeIcon visible={showPassword} />
          </button>
        </div>
      </div>

      <div className="flex items-center text-sm mb-4">
        <input
          id="remember"
          type="checkbox"
          className="w-5 h-5 text-secondary-400 border-[#dcdcdc] rounded-md focus:ring-2 focus:ring-[#4C6E91]"
        />
        <label
          htmlFor="remember"
          className="text-[14px] text-secondary-700 ml-2 cursor-pointer"
        >
          Lembre meu acesso
        </label>

        <a
          href="#"
          className="text-secondary-700 hover:underline ml-49 font-bold"
        >
          Esqueceu sua senha?
        </a>
      </div>

      <div className="flex justify-center mt-4">
        <button
          disabled={isPending}
          className={
            "w-28 h-10 text-white text-[20px] rounded-lg font-nunito transition-all bg-secondary-400 cursor-pointer"
          }
        >
          Entrar
        </button>
      </div>

      {/* {state.error && (
        <div className="my-4 p-3 bg-red-100 text-red-700 rounded-md text-sm font-bold text-center">
          {state.error}
        </div>
      )} */}

      <div className="mt-3 text-center text-sm">
        <p className="text-secondary-700 text-[16px]">
          Não possui uma conta?
          <span
            onClick={() => setIsLogin(false)}
            className="text-secondary-700 hover:underline font-bold cursor-pointer ml-1"
          >
            Criar conta
          </span>
        </p>
      </div>
    </form>
  );
}