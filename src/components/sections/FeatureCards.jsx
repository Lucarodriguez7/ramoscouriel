import { HardHat, DraftingCompass, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const expertiseItems = [
    {
        icon: HardHat,
        title: 'Tasaciones & Valuaciones',
        description: 'Análisis de mercado precisos para determinar el valor real de tu propiedad.',
    },
    {
        icon: DraftingCompass,
        title: 'Asesoramiento Premium',
        description: 'Acompañamiento personalizado en cada etapa de compra, venta o inversión.',
    },
    {
        icon: Leaf,
        title: 'Inversiones Inteligentes',
        description: 'Identificamos las mejores oportunidades en desarrollos de pozo y proyectos exclusivos.',
    },
];

const projectCards = [
    {
        image: 'https://imgur.com/bJ7F8Uy.jpg',
        title: 'Torre Quo',
        category: 'Emprendimiento',
        link: '/emprendimientos/torre-quo'
    },
    {
        image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800',
        title: 'Ver Catálogo',
        category: 'Propiedades',
        link: '/propiedades'
    },
];

export default function FeatureCards() {
    return (
        <section className="relative z-20 container mx-auto px-4 md:px-6 mt-[-100px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] items-start">

                {/* ─── COLUMNA IZQUIERDA: Nosotros ─── */}
                <Link to="/nosotros" className="group relative overflow-hidden min-h-[480px] md:min-h-[520px] flex flex-col justify-end p-10 md:p-12 cursor-pointer
                    transition-all duration-500 ease-out
                    hover:scale-105 hover:-translate-y-[10px] hover:border-accent
                    border border-transparent rounded-l-sm"
                >
                    <img
                        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200"
                        alt="Buenos Aires"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40 transition-opacity duration-500" />
                    <div className="absolute inset-0 rounded-l-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-accent/40 shadow-[inset_0_0_30px_rgba(0,123,255,0.08)]" />

                    <div className="relative z-10">
                        <span className="inline-block text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 opacity-80">
                            Quiénes Somos
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-5 leading-snug">
                            Nosotros
                        </h3>
                        <p className="text-sm text-gray-300/90 leading-relaxed mb-8 max-w-[320px] font-light">
                            Con más de 15 años de trayectoria en el mercado inmobiliario
                            de Buenos Aires, ofrecemos un servicio integral de
                            excelencia para cada cliente.
                        </p>
                        <span
                            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.2em] uppercase text-white/70 group-hover:text-accent transition-colors duration-500"
                        >
                            Conocenos
                            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                        </span>
                    </div>
                </Link>

                {/* ─── COLUMNA CENTRAL: Servicios (Glassmorphism) ─── */}
                <Link to="/servicios" className="group relative overflow-hidden min-h-[540px] md:min-h-[600px] flex flex-col p-10 md:p-12 cursor-pointer
                    backdrop-blur-md bg-white/5 border border-white/10
                    transition-all duration-500 ease-out
                    hover:scale-105 hover:-translate-y-[10px] hover:border-accent/60
                    hover:bg-white/[0.07] hover:shadow-[0_0_40px_rgba(0,123,255,0.1)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_1px_0_rgba(0,123,255,0.2)]" />

                    <div className="relative z-10 flex flex-col h-full">
                        <span className="inline-block text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 opacity-80">
                            Qué Hacemos
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-10 leading-snug">
                            Nuestros Servicios
                        </h3>

                        <div className="flex flex-col gap-8 flex-1">
                            {expertiseItems.map(({ icon: Icon, title, description }) => (
                                <div key={title} className="flex gap-5 items-start group/item">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center
                                        transition-all duration-500
                                        group-hover/item:bg-accent/10 group-hover/item:border-accent/30
                                        group-hover:bg-accent/10 group-hover:border-accent/30"
                                    >
                                        <Icon className="w-5 h-5 text-gray-400 transition-colors duration-500 group-hover/item:text-accent group-hover:text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-sans text-sm font-semibold mb-1.5 tracking-wide">
                                            {title}
                                        </h4>
                                        <p className="text-gray-400/80 text-xs leading-relaxed font-light">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <span
                            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.2em] uppercase text-white/70 group-hover:text-accent transition-colors duration-500 mt-10"
                        >
                            Ver Todos los Servicios
                            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                        </span>
                    </div>
                </Link>

                {/* ─── COLUMNA DERECHA: Proyectos ─── */}
                <div className="group relative overflow-hidden min-h-[480px] md:min-h-[520px] flex flex-col p-10 md:p-12 cursor-pointer
                    bg-navy-light/90 border border-white/5
                    transition-all duration-500 ease-out
                    hover:scale-105 hover:-translate-y-[10px] hover:border-accent/50
                    rounded-r-sm"
                >
                    <div className="absolute inset-0 rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-accent/40 shadow-[inset_0_0_30px_rgba(0,123,255,0.06)]" />

                    <div className="relative z-10 flex flex-col h-full">
                        <span className="inline-block text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 opacity-80">
                            Portfolio
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-8 leading-snug">
                            Proyectos
                        </h3>

                        <div className="flex flex-col gap-4 flex-1">
                            {projectCards.map(({ image, title, category, link }) => (
                                <Link
                                    to={link}
                                    key={title}
                                    className="group/card relative overflow-hidden rounded-md aspect-[16/10] cursor-pointer"
                                >
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <span className="text-accent/80 text-[10px] font-sans font-bold tracking-[0.25em] uppercase mb-1 block">
                                            {category}
                                        </span>
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-white font-serif text-lg">
                                                {title}
                                            </h4>
                                            <ArrowRight className="w-4 h-4 text-white/50 transition-all duration-500 group-hover/card:text-accent group-hover/card:translate-x-1" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-md border border-transparent group-hover/card:border-accent/30 transition-all duration-500 pointer-events-none" />
                                </Link>
                            ))}
                        </div>

                        <Link
                            to="/propiedades"
                            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.2em] uppercase text-white/70 hover:text-accent transition-colors duration-500 mt-8"
                        >
                            Ver Todos
                            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}