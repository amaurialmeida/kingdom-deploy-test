import { Nunito, DynaPuff } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import { UserPayload } from "../types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import Header from "../components/header";
import Footer from "../components/footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito",
});

const dynapuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dynapuff",
});

export const metadata = {
  title: "AlphaPlay",
  description: "Plataforma de alfabetização divertida para crianças",
};

async function getUserFromCookie(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) return null;

  try {
    const user = jwtDecode<UserPayload>(token.value);

    if (user.exp < Date.now() / 1000) return null;

    return user;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${dynapuff.variable}`}>
      <body className="bg-secondary-700 min-h-screen">
        <Header />
        <AuthProvider initialUser={user}>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
