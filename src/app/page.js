"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CancionCard } from "./components/CancionCard";
import { Reproduccion } from "./components/Reproduccion";
import { Busqueda } from "./components/Busqueda";
export default function Home() {
  const [canciones, setCanciones] = useState([]);

  const [reproduccion, setReproduccion] = useState();

  const [cargando, setCargando] = useState(false);

  const [cancionCargando, setCancionCargando] = useState(false);

  const audio = useRef();

  async function cargarDatos() {
    setCargando(true);

    const headers = {
      Accept: "application/json",
    };

    const cancionesDatos = await fetch(
      "https://api.audius.co/v1/tracks/trending",
      {
        method: "GET",
        headers: headers,
      },
    );

    const datos = await cancionesDatos.json();
    setCanciones(datos.data);

    setCargando(false);
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  const reproducir = async (id) => {
    setCancionCargando(true);
    const headers = {
      Accept: "application/json",
    };

    const cancionData = await fetch(`https://api.audius.co/v1/tracks/${id}`, {
      method: "GET",
      headers: headers,
    });

    const data = await cancionData.json();
    const reproduccionData = data.data;

    setReproduccion(reproduccionData);

    if (audio.current) {
      if (audio.current.played) {
        audio.current.pause();
      }
    }

    audio.current = new Audio(data.data.stream.url);
    await audio.current.play();

    setCancionCargando(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex h-full   w-full flex-col lg:flex-row bg-white dark:bg-black">
        {/* PANEL IZQUIERDO */}
        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 p-4">

          {reproduccion ? (
            !cancionCargando ? (
              <div className="m-2 h-full lg:m-5">
                <Reproduccion cancion={reproduccion} audio={audio} />
              </div>
            ) : (
              <div className="flex justify-center items-center p-6">
                <Image
                  src={"/img/cargando.png"}
                  width={80}
                  height={80}
                  alt="cargando"
                  className="invert"
                />
              </div>
            )
          ) : (
            ""
          )}
        </div>

        {/* PANEL DERECHO */}
        <div
          className={`w-full lg:w-2/3 flex flex-col ${
            cancionCargando ? "pointer-events-none bg-white/10" : ""
          }`}
        >
          {/* BUSQUEDA */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <Busqueda
              setCanciones={setCanciones}
              setCargando={setCargando}
              cargarDatos={cargarDatos}
            />
          </div>

          {/* LISTA DE CANCIONES */}
          <div className="flex-1 h-full overflow-y-scroll p-4 space-y-2">
            {cargando ? (
              <div className="flex justify-center items-center h-40">
                <Image
                  src={"/img/cargando.png"}
                  width={80}
                  height={80}
                  alt="cargando"
                  className="invert bg-white/20 rounded-xl p-2"
                />
              </div>
            ) : (
              canciones.map((cancion, index) => (
                <CancionCard
                  cancion={cancion}
                  reproducir={reproducir}
                  key={index}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
