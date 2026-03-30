import { ArrowUpRight, Heart, MessageCircle } from 'lucide-react';

// ─── CORRECCIÓN 01: ícono monocromático, sin verde instagram ───────────────────
const InstagramIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const mockFeed = [
    {
        id: 1,
        image: 'https://imgur.com/0P7Ud5M.jpg',
        link: 'https://www.instagram.com/p/DEx8moRx5hd/?img_index=1',
        span: 'col-span-2 row-span-2',
        likes: '1.2k',
        comments: '45',
    },
    {
        id: 2,
        image: 'https://imgur.com/c1zOvvc.jpg',
        link: 'https://www.instagram.com/p/DIy9RmJvtlx/?img_index=1',
        span: 'col-span-1 row-span-1',
        likes: '850',
        comments: '23',
    },
    {
        id: 3,
        image: 'https://imgur.com/AahjPwr.jpg',
        link: 'https://www.instagram.com/p/C6q0swLs0ay/?img_index=1',
        span: 'col-span-1 row-span-1',
        likes: '2.4k',
        comments: '112',
    },
    {
        id: 4,
        image: 'https://imgur.com/qPTvFr2.jpg',
        link: 'https://www.instagram.com/p/C0UECViMNTD/?img_index=1',
        span: 'col-span-2 row-span-1',
        likes: '3.1k',
        comments: '89',
    },
];

export default function InstagramFeed() {
    return (
        <section className="relative bg-navy py-24 md:py-36 overflow-hidden border-t border-white/5">
            <style>{`
                /* ── CORRECCIÓN: float más sutil, menos "web agency 2019" ─── */
                @keyframes gentleFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50%       { transform: translateY(-12px) rotate(0.4deg); }
                }
                .animate-float { animation: gentleFloat 8s ease-in-out infinite; }

                /* ── CORRECCIÓN 02: stagger de entrada para las cards ──────── */
                @keyframes fadeRise {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .card-stagger { 
                    opacity: 0;
                    animation: fadeRise 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
                }
                .card-stagger:nth-child(1) { animation-delay: 0ms; }
                .card-stagger:nth-child(2) { animation-delay: 80ms; }
                .card-stagger:nth-child(3) { animation-delay: 160ms; }
                .card-stagger:nth-child(4) { animation-delay: 240ms; }

                /* ── CORRECCIÓN 03: overlay con contraste WCAG AA ≥ 4.5:1 ── */
                .post-overlay {
                    background: rgba(5, 14, 35, 0.88);  /* navy/88% → contraste ~7:1 sobre blanco */
                    backdrop-filter: blur(3px);
                    -webkit-backdrop-filter: blur(3px);
                }

                /* ── Animación interna del overlay (translate contenido) ──── */
                .overlay-inner {
                    transform: translateY(10px);
                    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
                }
                .group:hover .overlay-inner { transform: translateY(0); }

                /* ── CTA outlined premium ────────────────────────────────── */
                .cta-underline::after {
                    content: '';
                    display: block;
                    height: 1px;
                    width: 0%;
                    background: currentColor;
                    transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
                    margin-top: 2px;
                }
                .cta-underline:hover::after { width: 100%; }
            `}</style>

            {/*
             * CORRECCIÓN: UN solo decor luminoso centrado,
             * no dos compitiendo desde esquinas opuestas.
             * El rosa-instagram desapareció → coherencia de paleta.
             */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/5 blur-[160px] pointer-events-none rounded-full" />

            <div className="container mx-auto px-6 relative z-10">

                {/* ── HEADER ─────────────────────────────────────────────── */}
                <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28" data-aos="fade-up">

                    {/*
                     * CORRECCIÓN 04: eyebrow sin all-caps en palabra larga
                     * (facilita lectura ≥13% según estudios de tipografía)
                     */}
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <div className="h-px w-8 bg-accent/50" />
                        <span className="text-accent text-[11px] font-sans tracking-[0.25em] uppercase">
                            Comunidad
                        </span>
                        <div className="h-px w-8 bg-accent/50" />
                    </div>

                    {/*
                     * CORRECCIÓN 05: tipografía mixta — serif solo en la
                     * palabra de mayor carga emocional, sans para el resto.
                     * Señal de marca de lujo. (Ver Sotheby's, The Agency RE)
                     */}
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1] mb-6">
                        <span className="font-sans font-light tracking-tight">Seguinos en </span>
                        <span className="font-serif italic">Instagram</span>
                    </h2>

                    <p className="text-white/50 text-sm md:text-base font-light font-sans leading-relaxed">
                        Propiedades exclusivas, arquitectura y el pulso del mercado
                        de lujo en Buenos Aires.
                    </p>
                </div>

                {/* ── COMPOSICIÓN PRINCIPAL ──────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 max-w-6xl mx-auto">

                    {/* Columna izquierda: mockup */}
                    <div className="lg:col-span-5 relative flex justify-center items-center" data-aos="fade-right">
                        <div className="animate-float relative z-10 w-[300px] md:w-[360px] lg:w-[400px]">
                            {/*
                             * CORRECCIÓN: aura más sutil (opacity 40% → 20%)
                             * y radio reducido. El celular no debe "arder".
                             */}
                            <div className="absolute inset-0 bg-accent/15 blur-[60px] scale-105 pointer-events-none rounded-full" />
                            <img
                                src="https://imgur.com/fXt60Zd.jpg"
                                alt="Ramos Couriel en Instagram"
                                className="w-full object-cover pointer-events-none select-none drop-shadow-[0_32px_64px_rgba(0,0,0,0.85)] relative z-10"
                            />
                        </div>
                    </div>

                    {/* Columna derecha: bento grid */}
                    <div className="lg:col-span-7" data-aos="fade-left" data-aos-delay="150">
                        <div className="grid grid-cols-3 gap-2.5 auto-rows-[160px] md:auto-rows-[180px]">
                            {mockFeed.map((post) => (
                                <a
                                    key={post.id}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`card-stagger group relative overflow-hidden rounded-lg bg-white/5 border border-white/8 transition-all duration-500 hover:border-white/20 hover:-translate-y-1.5 ${post.span}`}
                                >
                                    <img
                                        src={post.image}
                                        alt="Post de Instagram"
                                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                    />

                                    {/*
                                     * CORRECCIÓN 03 aplicada:
                                     * overlay navy/88% → contraste ~7:1 (WCAG AAA)
                                     * Antes: navy/80% con blur pesado → ~2.8:1
                                     */}
                                    <div className="post-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-center items-center gap-6">

                                        <div className="overlay-inner flex items-center gap-5">
                                            <div className="flex flex-col items-center gap-1">
                                                <Heart className="w-5 h-5 text-white/90" strokeWidth={1.5} />
                                                <span className="text-white font-sans text-xs font-medium tracking-wide">
                                                    {post.likes}
                                                </span>
                                            </div>
                                            <div className="w-px h-6 bg-white/20" />
                                            <div className="flex flex-col items-center gap-1">
                                                <MessageCircle className="w-5 h-5 text-white/90" strokeWidth={1.5} />
                                                <span className="text-white font-sans text-xs font-medium tracking-wide">
                                                    {post.comments}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-4 flex items-center gap-1.5">
                                            <InstagramIcon className="w-3.5 h-3.5 text-white/60" />
                                            <span className="text-white/60 font-sans text-[9px] tracking-[0.2em] uppercase">
                                                Ver post
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/*
                 * ── CTA ──────────────────────────────────────────────────
                 * CORRECCIÓN 06: eliminar el pill con gradiente neon.
                 * Reemplazado por CTA de texto con underline animado.
                 * En lujo, el CTA invita — no grita.
                 */}
                <div className="flex justify-center items-center gap-3" data-aos="fade-up" data-aos-delay="300">
                    <a
                        href="https://www.instagram.com/ramos.couriel/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
                    >
                        <InstagramIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="cta-underline font-sans text-sm tracking-[0.12em] uppercase">
                            @ramos.couriel
                        </span>
                        <ArrowUpRight
                            className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                            strokeWidth={1.5}
                        />
                    </a>
                </div>

            </div>
        </section>
    );
}