"use client";
import Login from "@/src/components/login";
import Register from "@/src/components/register";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-secondary-700 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/assets/background.svg')] bg-cover bg-no-repeat opacity-10" />

      <div className="flex flex-1 flex-col items-center justify-center mt-15">
        <div className="relative">
          <h1 className="text-[60px] text-center font-dynapuff font-bold text-secondary-400 [text-shadow:-2px_-2px_0_#ECF0FF,0_-2px_0_#ECF0FF,2px_-2px_0_#ECF0FF,-2px_0_0_#ECF0FF,2px_0_0_#ECF0FF,-2px_2px_0_#ECF0FF,0_2px_0_#ECF0FF,2px_2px_0_#ECF0FF,4px_4px_0_#FF479D]">
            A diversão já vai começar!
          </h1>
          <Image
            alt="decoração"
            src="/assets/estrelas.svg"
            width={63}
            height={58}
            className="absolute -right-14 -top-6"
            draggable="false"
          />

          <h2 className="text-[24px] text-center font-nunito font-bold text-[#F1F0F0] mb-10">
            Faça login para entrar.
          </h2>
        </div>

        <div className="w-140 h-fit bg-[#FAFEFC] rounded-xl p-8 shadow-md border-4 border-[#759FFE] mb-22 z-10">
          <div className="w-123 h-14.5 border-4 border-[#759FFE] rounded-4xl px-2.5 flex items-center mb-6 mx-auto">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 h-9.5 font-semibold rounded-4xl p-2 cursor-pointer transition-all ${
                isLogin
                  ? "bg-secondary-400 text-white"
                  : "bg-transparent text-secondary-700"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 h-9.5 font-semibold rounded-4xl p-2 cursor-pointer transition-all ${
                !isLogin
                  ? "bg-secondary-400 text-white"
                  : "bg-transparent text-secondary-700"
              }`}
            >
              Cadastro
            </button>
          </div>

          <Login isLogin={isLogin} setIsLogin={setIsLogin} />
          <Register isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      </div>
    </div>
  );
}