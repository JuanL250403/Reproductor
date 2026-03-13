'use client'

export function CancionCard({ cancion, reproducir }) {

    return (
        <div className="p-3 rounded-xl transition-all duration-200 hover:bg-white/10 hover:cursor-pointer hover:shadow-lg">

            <div
                className="flex justify-between items-center"
                onClick={() => reproducir(cancion.track_id)}
            >
                <p className="text-gray-300 text-sm font-medium truncate">
                    {cancion.user.name}
                </p>

                <h1 className="text-white font-semibold text-base tracking-wide truncate">
                    {cancion.title}
                </h1>
            </div>

        </div>
    )
}