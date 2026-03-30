import { ArrowUp, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="bg-navy border-t border-white/5 pt-20 pb-10 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="inline-block mb-6 cursor-pointer group">
                            <img
                                src="https://imgur.com/wEI6gth.jpg"
                                alt="Ramos Couriel"
                                className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Expertos en real estate de alta gama en Buenos Aires.
                            Más de 15 años transformando el mercado inmobiliario.
                        </p>
                    </div>

                    {/* Enlaces */}
                    <div>
                        <h4 className="font-serif text-lg mb-6 text-white">Enlaces</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/propiedades" className="hover:text-accent transition-colors">Propiedades</Link></li>
                            <li><Link to="/servicios" className="hover:text-accent transition-colors">Servicios</Link></li>
                            <li><Link to="/nosotros" className="hover:text-accent transition-colors">Nosotros</Link></li>
                            <li><Link to="/contacto" className="hover:text-accent transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-serif text-lg mb-6 text-white">Contacto</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>
                                <a href="mailto:info@ramoscouriel.com.ar" className="font-bold underline decoration-accent underline-offset-4 hover:text-accent transition-colors">
                                    info@ramoscouriel.com.ar
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/Ramos.couriel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent transition-colors group/ig">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover/ig:text-accent"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    @Ramos.couriel
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent transition-colors group/in">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover/in:text-accent"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/5491132307600"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    +54 9 11 3230-7600
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif text-lg mb-6 text-white">Newsletter</h4>
                        <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                            Recibí las mejores oportunidades inmobiliarias en tu correo.
                        </p>
                        <div className="flex bg-white/5 p-1 border border-white/10">
                            <input type="email" placeholder="Tu email" className="bg-transparent p-2 text-xs text-white outline-none w-full placeholder:text-gray-600" />
                            <button className="bg-accent p-2 text-white hover:bg-white hover:text-navy transition-colors"><ArrowRight size={16} /></button>
                        </div>
                    </div>

                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-10">
                    <p className="text-[10px] text-gray-600 tracking-widest uppercase">© 2026 RAMOS COURIEL — Buenos Aires, Argentina</p>
                    <button onClick={scrollToTop} className="text-gray-500 hover:text-white transition-colors"><ArrowUp size={20} /></button>
                </div>
            </div>
        </footer>
    );
}