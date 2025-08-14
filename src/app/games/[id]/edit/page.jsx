"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useGameById, useUpdateGame } from "@/hooks/games/useGames";
import { usePlatforms } from "@/hooks/platforms/usePlatform";
import { useCategories } from "@/hooks/categories/useCategories";
import "./editGame.css";
import Swal from "sweetalert2";

export default function EditarJuegoPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: games, isLoading } = useGameById(id);
  const { data: platforms } = usePlatforms();
  const { data: categories } = useCategories();
  const { mutate: updateGame, isPending } = useUpdateGame();

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    category: "",
    year: "",
    cover: null,
  });

  useEffect(() => {
    if (games) {
      setFormData({
        title: games.title || "",
        platform: games.platform_id || "",
        category: games.category_id || "",
        year: games.year || "",
        cover: null,
      });
    }
  }, [games]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cover") {
      setFormData({ ...formData, cover: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("platform", formData.platform);
    data.append("category", formData.category);
    data.append("year", formData.year);
    if (formData.cover) data.append("cover", formData.cover);

    updateGame(
      { id, formData: data },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "¡Juego actualizado!",
            text: "Los cambios se guardaron correctamente.",
            confirmButtonText: "Aceptar",
          }).then(() => {
            router.push("/games");
          });
        },
        onError: () => alert("Error al actualizar juego"),
      }
    );
  };

  if (isLoading) return <p className="loading">Cargando juego...</p>;

  return (
    <div className="page-edit">
      <div className="page">
        <div className="view-header">
          <button onClick={() => router.push("/games")} className="back-button">
            <img src="/arrow.png" width={20} height={25} />
          </button>
          <h2 className="view-title">Editar VideoJuego</h2>
          <button
            onClick={() => router.push("/games")}
            className="close-button"
          >
            <img src="/cancel.png" width={25} height={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <label htmlFor="cover" className="image-preview">
            <img
              src={
                formData.cover
                  ? URL.createObjectURL(formData.cover)
                  : games?.cover || "/camera-icon.png"
              }
              alt="Portada"
            />
          </label>
          <input
            id="cover"
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          <div className="form-group">
            <label className="info-label-box">Título:</label>
            <input
              className="info-value-box"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="info-label-box">Consola:</label>
            <select
              className="info-value-box"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
            >
              <option className="info-value-box" value="">
                Seleccione Consola...
              </option>
              {platforms?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="info-label-box">Categoría:</label>
            <select
              className="info-value-box"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option className="info-value-box" value="">
                Seleccione Categoría...
              </option>
              {categories?.map((c) => (
                <option className="info-value-box"  key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="info-label-box">Año:</label>
            <input
              className="info-value-box"
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="save-btn" disabled={isPending}>
            {isPending ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </div>
  );
}
