import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/FooterWeb';
import WhatsappButton from '../components/ui/WhatsappButton';
import { ArrowRight, Building2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Emprendimientos() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    const projects = [
        {
            id: 'torre-quo',
            title: 'Torre Quo',
            status: 'Lanzamiento',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200',
            description: 'Un ícono de altura emplazado en el punto norte de la ciudad de Buenos Aires. Diseño joven, moderno y contemporáneo pensado para vivir al máximo.',
            link: '/emprendimientos/torre-quo',
            active: true
        },
        {
            id: 'proyecto-nunez',
            title: 'Proyecto Núñez',
            status: 'Próximamente',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&blur=10',
            description: 'Un nuevo estándar de vida urbana se aproxima al corredor norte de la ciudad. Una propuesta inigualable de diseño y exclusividad.',
            link: '#',
            active: false
        }
    ];

    return (
        <div className="min-h-screen bg-navy text-white selection:bg-accent selection:text-white pt-24 pb-0 overflow-x-hidden">
            <style>
                {`
                    @keyframes fade-in-up {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    .delay-200 { animation-delay: 0.2s; }
                    .delay-400 { animation-delay: 0.4s; }
                `}
            </style>
            
            <Navbar />

            <main>
                {/* Hero Emprendimientos */}
                <section className="container mx-auto max-w-6xl px-6 pt-16 pb-20 text-center relative z-10">
                    <span className="opacity-0 animate-fade-in-up text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                        Desarrollos Exclusivos
                    </span>
                    <h1 className="opacity-0 animate-fade-in-up delay-200 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-white max-w-4xl mx-auto">
                        Nuestros Emprendimientos:<br/>
                        <span className="italic text-accent">El Futuro del Real Estate</span>
                    </h1>
                    <p className="opacity-0 animate-fade-in-up delay-400 max-w-2xl mx-auto text-gray-400 font-light text-sm md:text-base leading-relaxed font-sans">
                        Descubra proyectos arquitectónicos de vanguardia que redefinen el skyline de Buenos Aires. Espacios pensados para habitar, invertir y trascender.
                    </p>
                </section>

                {/* Grid de Proyectos */}
                <section className="container mx-auto max-w-6xl px-6 mb-32 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {projects.map((project, idx) => (
                            <div 
                                key={project.id} 
                                className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden transition-all duration-700 ease-out flex flex-col opacity-0 animate-fade-in-up hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,123,255,0.1)] hover:border-accent/40 ${idx === 0 ? 'delay-200' : 'delay-400'}`}
                            >
                                {/* Imagen del proyecto */}
                                <div className="relative h-72 md:h-80 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className={`w-full h-full object-cover transition-transform duration-1000 ${project.active ? 'group-hover:scale-110' : 'grayscale contrast-125'} `}
                                    />
                                    {/* Badge */}
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md rounded-sm border ${project.active ? 'bg-accent/80 text-white border-accent' : 'bg-black/60 text-gray-300 border-white/20'}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    {project.id === 'torre-quo' && (
                                        <div className="absolute top-6 right-6 z-20 w-12 h-12 bg-white flex items-center justify-center rounded-sm font-serif text-black font-bold text-lg shadow-xl">
                                            Q
                                        </div>
                                    )}
                                </div>
                                
                                {/* Contenido */}
                                <div className="p-8 md:p-10 flex flex-col flex-grow">
                                    <h3 className="font-serif text-3xl mb-4 text-white group-hover:text-accent transition-colors duration-500">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 font-sans text-sm font-light leading-relaxed mb-8 flex-grow">
                                        {project.description}
                                    </p>
                                    
                                    {/* CTA */}
                                    {project.active ? (
                                        <Link 
                                            to={project.link}
                                            className="inline-flex items-center justify-between w-full bg-white/10 border border-white/20 text-white px-6 py-4 font-sans font-bold text-xs tracking-widest uppercase hover:bg-accent hover:border-accent transition-all duration-300 rounded-sm"
                                        >
                                            Ver Proyecto <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    ) : (
                                        <button 
                                            disabled
                                            className="inline-flex items-center justify-between w-full bg-white/5 text-gray-500 px-6 py-4 font-sans font-bold text-xs tracking-widest uppercase rounded-sm border border-white/5 cursor-not-allowed"
                                        >
                                            Más Información <Clock className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
            <WhatsappButton />
        </div>
    );
}
