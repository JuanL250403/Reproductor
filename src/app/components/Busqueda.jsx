import { useState, useEffect } from "react";

export function Busqueda({ setCargando, setCanciones, cargarDatos }) {
    const buscarCancion = async () => {
        setCargando(true)

        const headers = {
            Accept: "application/json",
        };

        const cancionesDatos = await fetch(`https://api.audius.co/v1/tracks/search?query=${busqueda}`, {
            method: "GET",
            headers: headers,
        });

        const datos = await cancionesDatos.json();
        console.log(datos.data)
        setCanciones(datos.data);
        setCargando(false)
    }

    const [busqueda, setBusqueda] = useState()

    useEffect(() => {
        if (!busqueda) {
            cargarDatos();
        }
    }, [busqueda])
    return (
        <div className="flex justify-between">
            <input
                type="text"
                onChange={(e) => setBusqueda(e.currentTarget.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-[90%] px-3 py-2.5 shadow-xs placeholder:text-body"
            />
            <button onClick={() => buscarCancion()} className="bg-orange-400 font-bold h-10 w-10 rounded-full p-2 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-gwhite"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 3a7 7 0 105.293 12.293l4.707 4.707 1.414-1.414-4.707-4.707A7 7 0 0010 3zm-5 7a5 5 0 1110 0 5 5 0 01-10 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}