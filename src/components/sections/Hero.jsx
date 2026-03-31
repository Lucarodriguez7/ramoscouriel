import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen min-h-[700px] w-full flex items-end overflow-hidden pb-32">
            <style>
                {`
                    @keyframes slowZoom {
                        0% { transform: scale(1.05); }
                        50% { transform: scale(1.12); }
                        100% { transform: scale(1.05); }
                    }
                    .animate-slow-zoom {
                        animation: slowZoom 25s ease-in-out infinite;
                    }

                    /* Efecto Cinemático Focus Reveal mediante custom AOS */
                    [data-aos="blur-reveal"] {
                        filter: blur(20px);
                        opacity: 0;
                        transform: translateY(15px) scale(0.98);
                        transition-property: filter, opacity, transform;
                    }
                    [data-aos="blur-reveal"].aos-animate {
                        filter: blur(0px);
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                `}
            </style>
            {/* Background Image con Overlay */}
            <div className="absolute inset-0 z-0 bg-black">
                <div className="w-full h-full flex justify-center">
                    <img
                        src="https://imgur.com/YYktzqH.jpg"
                        alt="Buenos Aires Real Estate"
                        className="w-full h-full object-cover object-top animate-slow-zoom opacity-90"
                    />
                </div>
                {/* Overlay Principal */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/40 mix-blend-multiply" />

                {/* Viñeta Profunda (Vignette) para simular lente cinematográfico */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

                {/* Brillo inferior para transición hacia la página */}
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
            </div>

            {/* Contenido — alineado a la izquierda */}
            <div className="container mx-auto px-6 relative z-10 text-left">
                <div
                    className="max-w-2xl"
                    data-aos="blur-reveal"
                    data-aos-duration="1500"
                    data-aos-delay="300"
                    data-aos-easing="ease-out-cubic"
                >
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight tracking-tight">
                        Expertos en Real Estate <br />

                        en Buenos Aires
                    </h1>

                    <p className="text-gray-300 text-sm md:text-base mb-10 max-w-lg leading-relaxed font-light">
                        Asesoramiento integral en compra, venta e inversión de propiedades
                        premium. Más de 15 años transformando el mercado inmobiliario.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                        <a
                            href="https://wa.me/5491132307600"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-accent text-white px-8 py-3.5 font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-navy transition-all duration-500 shadow-2xl rounded-sm"
                        >
                            Contactanos
                        </a>

                        <Link
                            to="/propiedades"
                            className="border border-white/20 text-white px-8 py-3.5 font-bold tracking-widest text-xs uppercase hover:bg-white/10 transition-all duration-500 backdrop-blur-sm rounded-sm"
                        >
                            Ver Propiedades
                        </Link>
                    </div>
                </div>
            </div>

            {/* Indicador de scroll */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/30">
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
            </div>
        </section>
    );
};

export default Hero;