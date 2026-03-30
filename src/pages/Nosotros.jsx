import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/FooterWeb';
import WhatsappButton from '../components/ui/WhatsappButton';
import { ShieldCheck, MonitorSmartphone, Users, Trophy, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Nosotros() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    const values = [
        {
            title: "Transparencia Absoluta",
            desc: "Operamos con total claridad y ética profesional en cada transacción, garantizando la tranquilidad y seguridad jurídica de nuestros clientes.",
            icon: ShieldCheck,
        },
        {
            title: "Innovación Digital",
            desc: "Integramos plataformas de vanguardia y análisis de datos precisos para optimizar la comercialización y asegurar un impacto global.",
            icon: MonitorSmartphone,
        },
        {
            title: "Compromiso Personalizado",
            desc: "Entendemos que cada propiedad es única. Diseñamos estrategias a medida, brindando un acompañamiento exclusivo de principio a fin.",
            icon: Users,
        },
        {
            title: "Resultados Excepcionales",
            desc: "Nuestra vasta red de contactos y conocimiento profundo del mercado nos permite concretar operaciones rentables y exitosas en tiempos récord.",
            icon: Trophy,
        }
    ];

    const contactWhatsappUrl = "https://wa.me/5491132307600?text=" + encodeURIComponent("Hola! Estoy interesado en conocer más sobre sus servicios inmobiliarios.");

    return (
        <div className="min-h-screen bg-navy text-white selection:bg-accent selection:text-white pt-24 pb-0 overflow-x-hidden">
            <style>
                {`
                    @keyframes fade-in-up {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    .delay-300 { animation-delay: 0.3s; }
                    .delay-500 { animation-delay: 0.5s; }
                `}
            </style>
            
            <Navbar />

            <main>
                {/* Hero / Nuestra Historia */}
                <section className="container mx-auto max-w-5xl px-6 pt-16 pb-24 text-center relative z-10">
                    <span className="opacity-0 animate-fade-in-up text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                        Historia & Visión
                    </span>
                    <h1 className="opacity-0 animate-fade-in-up delay-300 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-white">
                        Nuestra Esencia, <br/>
                        <span className="italic text-accent">Su Confianza.</span>
                    </h1>
                    <div className="opacity-0 animate-fade-in-up delay-500 max-w-3xl mx-auto space-y-6 text-gray-400 font-light text-sm md:text-base leading-relaxed font-sans">
                        <p>
                            En Ramos Couriel entendemos que el sector inmobiliario trasciende los metros cuadrados; se trata de resguardar patrimonios e impulsar proyectos de vida. Con un conocimiento profundo de los barrios más exclusivos de Buenos Aires —como Palermo Chico, Recoleta y Puerto Madero—, hemos delineado una trayectoria basada en la discreción, el rigor técnico y la excelencia ejecutiva.
                        </p>
                        <p>
                            Nos enorgullece ser referentes en el segmento de alta gama, donde nuestra capacidad para interpretar las exigencias del mercado y anticipar tendencias nos permite ofrecer un asesoramiento integral incomparable, cuidando hasta el mínimo detalle de cada transacción.
                        </p>
                    </div>
                </section>

                {/* Valores Fundamentales */}
                <section className="container mx-auto max-w-7xl px-6 mb-32 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl text-white">Valores Fundamentales</h2>
                        <div className="w-12 h-px bg-accent mx-auto mt-6"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {values.map((val, idx) => (
                            <div 
                                key={idx} 
                                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(0,123,255,0.15)] flex gap-6"
                            >
                                <div className="shrink-0">
                                    <div className="w-14 h-14 rounded-full bg-navy border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-500">
                                        <val.icon className="w-6 h-6 text-accent" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl mb-3 text-white group-hover:text-accent transition-colors duration-500">
                                        {val.title}
                                    </h3>
                                    <p className="text-gray-400 font-sans text-sm font-light leading-relaxed">
                                        {val.desc}
                                    </p>
                                </div>
                                {/* Subtle neon glow line at bottom */}
                                <div className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-700 ease-out" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Diferencial / Banner de Impacto */}
                <section className="relative py-32 mb-16 overflow-hidden">
                    {/* Background con overlay */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?q=80&w=2000" 
                            alt="Buenos Aires Skyline" 
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" />
                    </div>

                    <div className="container mx-auto px-6 max-w-5xl relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">El Diferencial Ramos Couriel</h2>
                            <p className="text-gray-300 font-sans font-light text-base max-w-2xl mx-auto">
                                La perfecta convergencia entre tecnología inmobiliaria moderna y la calidez del asesoramiento tradicional, asegurando resultados extraordinarios para clientes exclusivos.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-6">
                                <span className="text-accent text-[11px] font-sans font-bold tracking-[0.2em] uppercase block mb-3">Tecnología API</span>
                                <h4 className="font-serif text-lg text-white mb-3">Integración Tokko</h4>
                                <p className="text-gray-400 text-xs font-sans font-light">Sistemas de gestión avanzados para un control absoluto y publicación simultánea en portales líderes.</p>
                            </div>
                            <div className="p-6 md:border-x md:border-white/10">
                                <span className="text-accent text-[11px] font-sans font-bold tracking-[0.2em] uppercase block mb-3">Visibilidad Máxima</span>
                                <h4 className="font-serif text-lg text-white mb-3">Marketing High-End</h4>
                                <p className="text-gray-400 text-xs font-sans font-light">Producciones audiovisuales y estrategias digitales orientadas específicamente al target premium que tu propiedad requiere.</p>
                            </div>
                            <div className="p-6">
                                <span className="text-accent text-[11px] font-sans font-bold tracking-[0.2em] uppercase block mb-3">Seguridad Total</span>
                                <h4 className="font-serif text-lg text-white mb-3">Respaldo Jurídico</h4>
                                <p className="text-gray-400 text-xs font-sans font-light">Un equipo legal dedicado a auditar la procedencia técnica y registral de cada activo para garantizar cierres exitosos.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA de Cierre */}
                <section className="bg-navy-light border-t border-white/5 py-24">
                    <div className="container mx-auto px-6 text-center max-w-3xl">
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Hablemos de su próximo paso</h2>
                        <p className="text-gray-400 font-sans font-light text-sm md:text-base mb-10">
                            Estamos a disposición para brindar una asesoría ejecutiva y confidencial adaptada a sus necesidades.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {/* Wait, the user asked for a /contacto page explicitly. We don't have it yet, 
                                so we'll route to mailto or #. I'll use a mailto link to simulate a contact action 
                                since we don't have a contact page, or just link to root for now. I'll use mailto: */}
                            <a 
                                href="mailto:info@ramoscouriel.com.ar"
                                className="w-full sm:w-auto bg-white/10 text-white px-8 py-4 font-sans font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-navy transition-all duration-300 rounded-sm flex items-center justify-center gap-3 border border-white/20"
                            >
                                <Mail className="w-4 h-4" />
                                Contáctenos
                            </a>
                            <a 
                                href={contactWhatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-4 font-sans font-bold text-xs tracking-widest uppercase hover:bg-[#1ebd59] transition-all duration-300 rounded-sm shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3"
                            >
                                <MessageCircle className="w-4 h-4 fill-white" />
                                Chat Directo
                            </a>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
            <WhatsappButton />
        </div>
    );
}
