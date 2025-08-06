'use client';

import styles from "./page.module.css";
import { useState } from "react";
import { useLogin } from "@/hooks/users/useLogin";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutate, isPending } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor completa todos los campos.",
      });
      return;
    }

    mutate(
      { email, password },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "¡Bienvenido!",
            text: "Inicio de sesión exitoso.",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            router.push("/games"); 
          });
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Error de autenticación",
            text: "Credenciales incorrectas.",
          });
        },
      }
    );
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.h1}>
          ninten<p>games</p>
        </h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button} disabled={isPending}>
            {isPending ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </main>
    </div>
  );
}
