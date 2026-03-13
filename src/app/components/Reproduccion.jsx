import { act, useEffect, useRef, useState } from "react"
import Image from "next/image";
export function Reproduccion({ cancion, audio }) {
    const [tiempo, setTiempo] = useState(0)
    const [pausa, setPausa] = useState(false)

    const volumen = useRef(0.5)

    const play = () => {
        setPausa(false)
        audio.current.play()
    };

    const pause = () => {
        setPausa(true)
        audio.current.pause()
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (parseInt(audio.current.currentTime) == cancion.duration) {
                pause()
                setTiempo(0)
            }

            if (pausa) {
                clearInterval(interval)
            }

            setTiempo(audio.current.currentTime)

        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [pausa])

    useEffect(() => {
        setTiempo(0)
        setPausa(false)
    }, [audio.current.src])

    useEffect(() => {
        audio.current.volume = volumen.current;
    }, [audio.current.src])
    const actualizar = (valor) => {
        setTiempo(valor)
        audio.current.currentTime = valor
    }

    const cambiarVolumen = (value) => {
        volumen.current = value
        audio.current.volume = value
    }
    return (
        <div className="flex flex-col justify-between h-[95%] bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-2xl">

            <div className="flex flex-col justify-between items-center w-full m-2">
                <img src={cancion.artwork["480x480"]}
                    width={200}
                    height={150}
                    loading="lazy"
                    alt="portada"
                    className="rounded-2xl" />

            </div>
            <div className="">
                <h1 className="text-white font-semibold text-lg tracking-wide">
                    {cancion.title}
                </h1>
                <p className="text-gray-400 text-sm">
                    {cancion.user.name}
                </p>
                <div className="flex items-center">
                    <input
                        type="range"
                        max={cancion.duration}
                        value={tiempo}
                        onChange={(e) => actualizar(e.currentTarget.value)}
                        className="w-full mr-2 h-2 bg-white/30 rounded-full appearance-none cursor-pointer accent-orange-400 hover:accent-gray-200 transition-all"
                    />
                    <h1 className="m-1 w-15 text-white font-mono text-sm text-right">
                        {parseInt(tiempo / 3600) + ":" + parseInt(tiempo / 60) + ":" + parseInt(tiempo % 60)}
                    </h1>
                </div>
            </div>
            <div className="flex flex-col justify-between h-[30%] items-center">

                <div className="flex justify-center ">
                    {
                        pausa ?
                            <button
                                onClick={() => play()}
                                className="flex items-center justify-center w-26 h-26 bg-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 hover:bg-gray-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-[70%] h-[70%] text-black"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                            :
                            <button
                                onClick={() => pause()}
                                className="flex items-center justify-center w-26 h-26 bg-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 hover:bg-gray-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-[70%] h-[70%] text-black"
                                >
                                    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                                </svg>
                            </button>
                    }
                </div>
                <div className="m-5 h-[30%] flex w-full flex-row items-center justify-between">
                    <input
                        type="range"
                        max={1}
                        step={0.01}
                        onChange={(e) => cambiarVolumen(e.currentTarget.value)}
                        className="h-10 w-full p-2 bg-white/30 rounded-full appearance-none cursor-pointer accent-orange-400 hover:accent-gray-200 transition"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 m-2 text-white">
                        <path d="M3 10v4h4l5 5V5L7 10H3z" />
                        <path d="M16 7.82v8.36c1.48-.68 2.5-2.16 2.5-4.18s-1.02-3.5-2.5-4.18z" />
                    </svg>
                </div>

            </div>
        </div>
    )
}