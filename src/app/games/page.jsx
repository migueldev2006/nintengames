"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteGame, useGames } from "@/hooks/games/useGames";
import "./GamesPage.css";
import { usePlatforms } from "@/hooks/platforms/usePlatform";

export default function GamesPage() {
  const router = useRouter();
  const { data: games, isLoading, error } = useGames();
  const { data: platform } = usePlatforms();
  const { mutate: deleteGame } = useDeleteGame();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleAdd = () => router.push("/games/create");
  const handleView = (id) => router.push(`/games/${id}/view`);
  const handleEdit = (id) => router.push(`/games/${id}/edit`);
  const handleDelete = (id) => {
    if (confirm(`¿Eliminar juego con ID ${id}?`)) {
      setDeletingId(id);
      deleteGame(id, {
        onSuccess: () => {
          console.log("Juego eliminado con éxito");
        },
        onError: (err) => {
          alert("Error al eliminar el juego");
          console.error(err);
        },
        onSettled: () => {
          setDeletingId(null);
        },
      });
    }
  };

  return (
    <div className="games-page">
      <div className="games-container">
        <div className="games-header">
          <h2>Administrar Videojuegos</h2>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </div>

        <button onClick={handleAdd} className="add-button">
          <span>➕</span> Adicionar
        </button>

        {isLoading ? (
          <p className="loading">Cargando videojuegos...</p>
        ) : error ? (
          <p className="error">Error: {error.message}</p>
        ) : Array.isArray(games) && games.length > 0 ? (
          <ul className="games-list">
            {games.map((juego) => (
              <li key={juego.id} className="game-card">
                <img
                  src={juego.cover || "/default.jpg"}
                  alt={juego.title || "Juego sin título"}
                  className="game-image"
                />
                <div className="game-info">
                  {platform && (
                    <p className="game-console">
                      {platform.find((p) => p.id === juego.platform_id)?.name ||
                        "Plataforma desconocida"}
                    </p>
                  )}

                  <p className="game-name">{juego.title}</p>
                </div>
                <div className="game-actions">
                  <button
                    className="botonOpciones"
                    onClick={() => handleView(juego.id)}
                    title="Ver"
                  >
                    <img src="./lupa.png" alt="Lupa" width={5} height={5} />
                  </button>
                  <button
                    className="botonOpciones"
                    onClick={() => handleEdit(juego.id)}
                    title="Editar"
                  >
                    <img src="./pencil.png" alt="" width={5} height={5} />
                  </button>
                  <button
                    className="botonOpciones"
                    onClick={() => handleDelete(juego.id)}
                    title="Eliminar"
                    disabled={deletingId === juego.id}
                  >
                    {deletingId === juego.id ? (
                      <span>⏳ Eliminando...</span>
                    ) : (
                      <img src="./trash.png" alt="" width={5} height={5} />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-games">No hay videojuegos disponibles.</p>
        )}
      </div>
    </div>
  );
}
