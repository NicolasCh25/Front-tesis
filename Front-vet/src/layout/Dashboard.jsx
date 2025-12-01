import { Link, Outlet, useLocation, useNavigate } from "react-router"
import storeAuth from "../context/storeAuth"
import storeProfile from "../context/storeProfile"
import { useState } from "react"

const Dashboard = () => {

    const { clearToken } = storeAuth()
    const { user } = storeProfile()
    const location = useLocation()
    const navigate = useNavigate()

    const urlActual = location.pathname

    // PREVIEW DE FOTO
    const [preview, setPreview] = useState(
        user?.foto || "https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
    )

    const logout = () => {
        clearToken()
        navigate("/login")
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gray-100">

            {/* -------- SIDEBAR IZQUIERDA -------- */}
            <aside className="w-72 bg-[#17243D] p-6 flex flex-col items-center relative text-white">

                {/* FOTO + BOTÓN FLOTANTE */}
                <div className="relative mb-6">

                    <img
                        src={preview}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                    />

                    {/* Botón flotante foto */}
                    <label
                        htmlFor="fileInput"
                        className="absolute bottom-1 right-1 bg-[#F5BD45] w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition"
                    >
                        <img src="/cameraIcon.png" className="w-5 h-5" />
                    </label>

                    {/* Input oculto */}
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                const url = URL.createObjectURL(file);
                                setPreview(url);
                            }
                        }}
                    />
                </div>

                {/* DATOS USUARIO */}
                {/* CARD DE INFORMACIÓN DEL PERFIL */}
                
                <div className="text-left w-full px-3 mb-6 text-sm font-semibold">
                    
                    <p><b>Nombre:</b> {user?.nombre}</p>
                    <p><b>Apellido:</b> {user?.apellido}</p>
                    <p><b>Correo:</b> {user?.email}</p>
                </div>

                {/* BOTÓN CERRAR SESIÓN */}
                <button
                    onClick={logout}
                    className="bg-red-600 text-white w-40 py-2 rounded-xl font-bold shadow-md hover:bg-red-700"
                >
                    Cerrar Sesión
                </button>

                {/* BÚHO DECORATIVO */}
                <img
                    src="/images/image 12-Photoroom.png"
                    className="absolute bottom-4 w-80"
                />
            </aside>

            {/* -------- CONTENIDO PRINCIPAL -------- */}
            <div className="flex-1 flex flex-col">

                {/* -------- NAV SUPERIOR -------- */}
                <nav className="w-full bg-[#17243D] text-white py-4 px-8 flex justify-between items-center shadow-md">

                    {/* LOGO */}
                    <img src="/images/logoPIC.png" className="w-14" />

                    {/* LINKS */}
                    <ul className="flex gap-10 font-semibold text-lg">

                        <Link
                            className={`${urlActual === '/dashboard' ? 'text-[#F5BD45] underline' : 'hover:text-[#F5BD45]'}`}
                            to="/dashboard"
                        >
                            Panel
                        </Link>

                        <Link
                            className={`${urlActual === '/dashboard/profile' ? 'text-[#F5BD45] underline' : 'hover:text-[#F5BD45]'}`}
                            to="/dashboard/profile"
                        >
                            Perfil
                        </Link>

                        <Link
                            className={`${urlActual === '/dashboard/list' ? 'text-[#F5BD45] underline' : 'hover:text-[#F5BD45]'}`}
                            to="/dashboard/list"
                        >
                            Listar
                        </Link>

                        <Link
                            className={`${urlActual === '/dashboard/create' ? 'text-[#F5BD45] underline' : 'hover:text-[#F5BD45]'}`}
                            to="/dashboard/create"
                        >
                            Crear
                        </Link>

                        <Link
                            className={`${urlActual === '/dashboard/chat' ? 'text-[#F5BD45] underline' : 'hover:text-[#F5BD45]'}`}
                            to="/dashboard/chat"
                        >
                            Charlar
                        </Link>
                    </ul>

                </nav>

                {/* -------- CONTENIDO INTERNO -------- */}
                <main className="p-10 overflow-y-auto bg-gray-100">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default Dashboard
