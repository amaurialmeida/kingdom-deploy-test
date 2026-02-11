"use server";

import { parse, ValiError, flatten, InferInput } from "valibot";
import { RegisterState } from "../types";
import { registerSchema } from "../lib/schemas/registerSchema";

type RegisterInput = InferInput<typeof registerSchema>;

export async function RegisterUser(
  prevStare: RegisterState<Partial<RegisterInput>>,
  FormData: FormData,
): Promise<RegisterState<Partial<RegisterInput>>> {
  const rawData = {
    name: FormData.get("name"),
    surname: FormData.get("surname"),
    email: FormData.get("email"),
    password: FormData.get("password"),
    confirmPassword: FormData.get("confirmPassword"),
    pinCode: FormData.get("pinCode"),
    terms: FormData.get("terms") === "on",
  } as Partial<RegisterInput>;

  try {
    const validData = parse(registerSchema, rawData);
    //eslint-disable-next-line
    const { terms, ...dataToSend } = validData;

    await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    return {
      success: true,
      message: "Parabéns! Cadastro realizado com sucesso!",
      inputs: {},
    };
    //eslint-disable-next-line
  } catch (err: any) {
    console.error("ERRO CAPTURADO NO SERVER ACTION:", err);

    if (err instanceof ValiError) {
      return {
        success: false,
        message: err.message,
        errors: flatten<typeof registerSchema>(err.issues).nested,
        inputs: rawData,
      };
    }

    if (err.errors) {
      return {
        success: false,
        message: err.message,
        errors: err.errors,
        inputs: rawData,
      };
    }

    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
        inputs: rawData,
      };
    }
  }

  return {
    success: false,
    message: "Ocorreu um erro inesperado. Tente novamente.",
    inputs: rawData,
  };
}
