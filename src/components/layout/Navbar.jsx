import { useState } from 'react';
import { Menu, Search, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-6 bg-navy/20 backdrop-blur-md border-b border-white/5">
                <Link to="/" className="inline-block group cursor-pointer" onClick={closeMenu}>
                    <img
                        src="https://imgur.com/wEI6gth.jpg"
                        alt="Ramos Couriel"
                        className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
                    <Link to="/" className="hover:text-accent transition-colors">Inicio</Link>
                    <Link to="/propiedades" className="hover:text-accent transition-colors">Propiedades</Link>
                    
                    {/* Dropdown Emprendimientos */}
                    <div className="relative group/emp py-4">
                        <Link to="/emprendimientos" className="hover:text-accent transition-colors flex items-center gap-1">
                            Emprendimientos
                        </Link>
                        {/* Dropdown Menu */}
                        <div className="absolute top-12 left-0 min-w-[200px] bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-sm opacity-0 translate-y-2 pointer-events-none group-hover/emp:opacity-100 group-hover/emp:translate-y-0 group-hover/emp:pointer-events-auto transition-all duration-300 shadow-2xl overflow-hidden before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
                            <Link to="/emprendimientos/torre-quo" className="block px-6 py-4 text-white hover:bg-white/10 hover:text-accent transition-colors border-b border-white/5">
                                Torre Quo <span className="text-accent text-[8px] ml-2 px-1 border border-accent rounded-sm">NUEVO</span>
                            </Link>
                            <span className="block px-6 py-4 text-gray-500 cursor-not-allowed">
                                Próximamente
                            </span>
                        </div>
                    </div>

                    <Link to="/servicios" className="hover:text-accent transition-colors">Servicios</Link>
                    <Link to="/nosotros" className="hover:text-accent transition-colors">Nosotros</Link>
                    <Link to="/contacto" className="hover:text-accent transition-colors">Contacto</Link>
                </div>

                <div className="flex items-center gap-6">
                    <Search className="w-5 h-5 text-white/50 cursor-pointer hover:text-white transition-colors" />
                    <a
                        href="https://wa.me/5491132307600"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 bg-accent text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all duration-500 shadow-lg shadow-accent/20"
                    >
                        Contactanos <ArrowRight className="w-3 h-3" />
                    </a>
                    <button onClick={toggleMenu} className="lg:hidden cursor-pointer text-white hover:text-accent transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay Premium */}
            <div 
                className={`fixed inset-0 bg-navy/95 backdrop-blur-2xl z-[60] flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Botón de cierre */}
                <button 
                    onClick={closeMenu} 
                    className="absolute top-8 right-6 text-white/70 hover:text-white hover:rotate-90 transition-all duration-300"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Enlaces Mobile */}
                <div className="flex flex-col items-center gap-7 text-center text-white w-full max-w-sm px-6 overflow-y-auto">
                    <Link to="/" onClick={closeMenu} className="font-serif text-3xl hover:text-accent hover:tracking-widest transition-all duration-300">
                        Inicio
                    </Link>
                    <Link to="/propiedades" onClick={closeMenu} className="font-serif text-3xl hover:text-accent hover:tracking-widest transition-all duration-300">
                        Propiedades
                    </Link>

                    {/* Emprendimientos Mobile Section */}
                    <div className="flex flex-col items-center">
                        <Link to="/emprendimientos" onClick={closeMenu} className="font-serif text-3xl text-accent hover:tracking-widest transition-all duration-300 mb-4">
                            Emprendimientos
                        </Link>
                        <div className="flex flex-col items-center gap-3">
                            <Link to="/emprendimientos/torre-quo" onClick={closeMenu} className="font-sans font-light text-base text-gray-300 hover:text-white transition-colors">
                                ↳ Torre Quo <span className="text-accent text-[8px] ml-1 px-1 border border-accent rounded-sm uppercase tracking-widest font-bold">NUEVO</span>
                            </Link>
                            <span className="font-sans font-light text-base text-gray-600">
                                ↳ Próximamente
                            </span>
                        </div>
                    </div>

                    <Link to="/servicios" onClick={closeMenu} className="font-serif text-3xl hover:text-accent hover:tracking-widest transition-all duration-300">
                        Servicios
                    </Link>
                    <Link to="/nosotros" onClick={closeMenu} className="font-serif text-3xl hover:text-accent hover:tracking-widest transition-all duration-300">
                        Nosotros
                    </Link>
                    <Link to="/contacto" onClick={closeMenu} className="font-serif text-3xl hover:text-accent hover:tracking-widest transition-all duration-300">
                        Contacto
                    </Link>
                    
                    {/* Botón CTA Adicional Mobile */}
                    <div className="mt-8 pt-8 border-t border-white/10 w-full flex justify-center">
                        <a
                            href="https://wa.me/5491132307600"
                            onClick={closeMenu}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all duration-500 shadow-xl shadow-accent/20 w-fit"
                        >
                            Chatear Ahora <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}