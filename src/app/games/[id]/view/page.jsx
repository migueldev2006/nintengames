"use client";

import { useRouter, useParams } from "next/navigation";
import { useGameById } from "@/hooks/games/useGames";
import { usePlatforms } from "@/hooks/platforms/usePlatform";
import { useCategories } from "@/hooks/categories/useCategories";
import "./viewGame.css"; // Asegúrate de crear este archivo

export default function ConsultarJuegoPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: game, isLoading } = useGameById(id);
  const { data: platforms } = usePlatforms();
  const { data: categories } = useCategories();

  const platformName = platforms?.find((p) => p.id === game?.platform_id)?.name || "Desconocida";
  const categoryName = categories?.find((c) => c.id === game?.category_id)?.name || "Desconocida";

  if (isLoading || !game) return <p className="loading">Cargando videojuego...</p>;

  return (
    <div className="view-page">
      <div className="view-header">
        <button onClick={() => router.push("/games")} className="back-button">
          <img src="/arrow.png" width={20} height={25}  />
        </button>
        <h2 className="view-title">Consultar VideoJuego</h2>
        <button onClick={() => router.push("/games")} className="close-button">
          <img src="/cancel.png" width={25} height={25} />
        </button>
      </div>

      <div className="image-preview">
        <img
          src={game.cover || "/default.jpg"}
          alt="Portada del juego"
          onError={(e) => (e.target.src = "/default.jpg")}
        />
      </div>

      <div className="info-item">
        <span className="info-label">Título:</span>
        <span className="info-value">{game.title}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Consola:</span>
        <span className="info-value">{platformName}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Categoría:</span>
        <span className="info-value">{categoryName}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Año:</span>
        <span className="info-value">{game.year}</span>
      </div>
    </div>
  );
}
