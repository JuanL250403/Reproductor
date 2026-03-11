'use client'

export function CancionCard({ cancion, reproducir }) {

    return (
        <div className="p-1 hover:bg-white/10 hover:cursor-pointer">
            <div className="flex justify-between" onClick={() => reproducir(cancion.track_id)}>
                <p>{cancion.user.name}</p>
                <h1 className="text-white font-bold">{cancion.title}</h1>
            </div>
        </div>
    )
}