import { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

// Swiper Injections
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const googleReviews = [
    {
        name: 'Flor Muzi',
        initials: 'FM',
        reviews: 21,
        photos: 27,
        time: 'Hace 2 meses',
        text: 'Excelente nivel de profesionalismo. Encontrar a alguien en el rubro inmobiliario que realmente entienda lo que buscas y te asesore con tanta transparencia no es fácil. Impecable trato.',
        color: 'bg-blue-600'
    },
    {
        name: 'nicolas gamarra',
        initials: 'NG',
        reviews: 12,
        photos: 4,
        time: 'Hace un mes',
        text: 'La experiencia de vender mi propiedad con ellos fue excelente. Se encargaron de absolutamente todo y resolvieron la operación en tiempo récord. 100% recomendables.',
        color: 'bg-emerald-600'
    },
    {
        name: 'Santiago Quiros',
        initials: 'SQ',
        reviews: 5,
        photos: 1,
        time: 'Hace 3 meses',
        text: 'Muy clara la comunicación desde el día uno. Valoro mucho la honestidad con la que tasan las propiedades y el acompañamiento constante hasta la firma de la escritura.',
        color: 'bg-purple-600'
    },
    {
        name: 'Agustin Danza',
        initials: 'AD',
        reviews: 34,
        photos: 15,
        time: 'Hace un mes',
        text: 'El mejor equipo de Buenos Aires para buscar inversiones en pozo. Tienen acceso a proyectos exclusivos antes que nadie y un análisis financiero que da mucha tranquilidad.',
        color: 'bg-rose-600'
    },
    {
        name: 'Diego Sutton',
        initials: 'DS',
        reviews: 8,
        photos: 0,
        time: 'Hace 2 semanas',
        text: 'La calidad del servicio y la atención personalizada destacan a Ramos Couriel por sobre cualquier otra agencia. Fueron súper ejecutivos.',
        color: 'bg-amber-600'
    },
    {
        name: 'jota bwicz',
        initials: 'JB',
        reviews: 2,
        photos: 0,
        time: 'Hace 4 meses',
        text: 'Muy atentos y eficientes. Resolvieron todas mis dudas muy rápido. Los elegiría de nuevo sin pensarlo para mi próxima inversión.',
        color: 'bg-indigo-600'
    },
    {
        name: 'Veronica Guzman Miguel',
        initials: 'VG',
        reviews: 45,
        photos: 32,
        time: 'Hace 3 semanas',
        text: 'Un lujo trabajar con ellos. El diseño de su propuesta de comercialización para nuestra casa y la calidad de las fotos hizo que se venda rapidísimo. Excelentes.',
        color: 'bg-teal-600'
    }
];

export default function Testimonials() {
    const [progress, setProgress] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => setProgress(98), 500); // 98% bar width
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-navy-light py-24 md:py-32 overflow-hidden">
            <style>
                {`
                    .swiper-slide {
                        width: 320px;
                        height: auto;
                        display: flex;
                    }
                    @media (min-width: 768px) {
                        .swiper-slide { width: 400px; }
                    }
                    
                    .review-card {
                        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                        width: 100%;
                    }
                    
                    /* THE HOOK: ACTIVE SLIDE WHITE CSS */
                    .swiper-slide-active .review-card {
                        background-color: white !important;
                        color: #111827 !important;
                        transform: scale(1.05) !important;
                        border-color: transparent !important;
                        box-shadow: 0 40px 60px -15px rgba(0,0,0,0.5), 0 0 40px rgba(0,123,255,0.1);
                        backdrop-filter: none !important;
                    }
                    .swiper-slide-active .review-border-neon {
                        opacity: 0 !important;
                    }
                    .swiper-slide-active .review-title {
                        color: #111827 !important;
                    }
                    .swiper-slide-active .review-sub {
                        color: #6B7280 !important;
                    }
                    .swiper-slide-active .review-txt {
                        color: #374151 !important;
                        line-clamp: none !important;
                        -webkit-line-clamp: unset !important;
                    }
                    .swiper-slide-active .review-google {
                        filter: grayscale(0) !important;
                        opacity: 1 !important;
                    }
                    
                    .swiper-pagination-bullet {
                        background: #374151;
                    }
                    .swiper-pagination-bullet-active {
                        background: #007bff; /* accent color */
                    }
                `}
            </style>

            {/* Efecto Shadow Gradient lateral de la sección (Escenario Inmersivo) */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-navy-light via-navy-light/80 to-transparent pointer-events-none z-[100]" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-navy-light via-navy-light/80 to-transparent pointer-events-none z-[100]" />

            <div className="container mx-auto px-6 relative z-20">
                <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                    <span className="text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                        Nuestra Calificación en Google Business
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-12">
                        Voces que Confían en <br className="hidden md:block" />
                        <span className="italic text-accent">Nuestra Trayectoria</span>
                    </h2>

                    {/* Barra de Calificación Interactiva */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="text-4xl font-sans font-bold text-white">4.9</div>
                                <div className="flex flex-col items-start">
                                    <div className="flex gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400 font-sans tracking-wide">83 opiniones verificadas</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                {/* Google "G" Icon */}
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </div>
                        </div>

                        {/* Progress Bar container */}
                        <div className="w-full bg-navy/50 rounded-full h-3 overflow-hidden border border-white/5">
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent transition-all duration-[2000ms] ease-out shadow-[0_0_15px_rgba(0,123,255,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CARRUSEL SWIPER - EFECTO COVERFLOW 3D */}
            <div className="w-full relative z-50">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="w-full pb-20 pt-10"
                >
                    {googleReviews.map((review, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="review-card relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-8 flex flex-col h-full shadow-2xl">
                                
                                {/* Bordes neón sutil para los slides inactivos */}
                                <div className="review-border-neon absolute inset-0 rounded-xl border border-accent/20 opacity-0 transition-opacity duration-500 pointer-events-none" />

                                {/* Review Header */}
                                <div className="flex items-center gap-4 mb-5">
                                    <div className={`w-12 h-12 rounded-full flex-shrink-0 ${review.color} flex items-center justify-center text-white font-sans font-bold text-lg shadow-inner`}>
                                        {review.initials}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="review-title text-white font-sans text-sm md:text-base font-semibold tracking-wide truncate">
                                            {review.name}
                                        </h4>
                                        <div className="review-sub flex items-center text-gray-500 text-[10px] sm:text-xs font-light mt-1 flex-wrap gap-1">
                                            <span>Local Guide</span>
                                            <span>•</span>
                                            <span>{review.reviews} opiniones</span>
                                            {review.photos > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span>{review.photos} fotos</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-auto flex-shrink-0">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="review-google w-5 h-5 opacity-40 grayscale transition-all duration-500" />
                                    </div>
                                </div>

                                {/* Stars & Time */}
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex gap-[2px]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                                        ))}
                                    </div>
                                    <span className="review-sub text-gray-500 text-xs font-light">{review.time}</span>
                                </div>

                                {/* Review Text */}
                                <p className="review-txt text-gray-300 text-sm leading-relaxed font-light flex-grow line-clamp-4 transition-all duration-500">
                                    {review.text}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
