"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateGame } from "@/hooks/games/useGames";
import { usePlatforms } from "@/hooks/platforms/usePlatform";
import { useCategories } from "@/hooks/categories/useCategories";
import "./createGame.css";

export default function CrearJuegoPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateGame();
  const { data: platform } = usePlatforms();
  const { data: category } = useCategories();

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    category: "",
    year: "",
    cover: null,
  });

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
    data.append("cover", formData.cover);

    mutate(data, {
      onSuccess: () => {
        router.push("/games");
      },
      onError: () => {
        alert("Error al crear el juego");
      },
    });
  };

  return (
    <div className="page-principal">
      <div className="page-create">
        <div className="view-header">
          <button onClick={() => router.push("/games")} className="back-button">
            <img src="/arrow.png" width={20} height={25} />
          </button>
          <h2 className="view-title">Consultar VideoJuego</h2>
          <button
            onClick={() => router.push("/games")}
            className="close-button"
          >
            <img src="/cancel.png" width={25} height={25} />
          </button>
        </div>

        <div className="create-form-container">
          <label htmlFor="cover" className="image-preview">
            <img
              src={
                formData.cover
                  ? URL.createObjectURL(formData.cover)
                  : "/camera-icon.png"
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
            required
          />

          <form className="form-create" onSubmit={handleSubmit}>
            <input
              className="input-create"
              type="text"
              name="title"
              placeholder="Título"
              onChange={handleChange}
              required
            />

            <select
              className="input-create"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione Consola...</option>
              {platform?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="input-create"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione Categoría...</option>
              {category?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              className="input-create"
              type="file"
              name="cover"
              onChange={handleChange}
              required
            />

            <input
              className="input-create"
              type="number"
              name="year"
              placeholder="Año"
              onChange={handleChange}
              required
            />

            <button
              className="button-create"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Guardando..." : "Guardar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
