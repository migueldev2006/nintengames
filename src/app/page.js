'use client';
import styles from "./page.module.css";
import { useState } from "react";
import { useLogin } from "@/hooks/users/useLogin"; // asegúrate que existe

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      mutate({ email, password });
    } else {
      alert("Por favor completa todos los campos.");
    }
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
          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>
              Credenciales incorrectas
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
