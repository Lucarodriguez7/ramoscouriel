import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/FooterWeb';
import WhatsappButton from '../components/ui/WhatsappButton';
import { tokkoService } from '../services/tokkoService';
import { 
    Home, Scale, Megaphone, MapPin, 
    ArrowRight, Calculator, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function Servicios() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        propertyType: '',
        m2: '',
        rooms: '',
        address: '',
        name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = (e) => {
        e.preventDefault();
        if (!formData.propertyType || !formData.m2 || !formData.rooms || !formData.address) {
            alert("Por favor, completá todos los campos del Paso 1 para avanzar.");
            return;
        }
        setStep(2);
    };

    const submitTasacion = async (e) => {
        e.preventDefault();
        // Validate Step 2 fields
        if (!formData.name || !formData.phone || !formData.email) {
            alert("Por favor, completá todos tus datos de contacto.");
            return;
        }
        setIsSubmitting(true);
        try {
            await tokkoService.submitTasacion(formData);
            setIsSuccess(true);
            setStep(3); // Paso final de éxito
        } catch (error) {
            console.error(error);
            alert("Hubo un error al enviar el formulario. Por favor, intentá nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const services = [
        {
            title: "Tasaciones Profesionales",
            desc: "Análisis técnico y de mercado preciso para determinar el valor real y competitivo de tu propiedad.",
            icon: Calculator,
        },
        {
            title: "Asesoramiento Legal",
            desc: "Acompañamiento especializado en contratos, trámites registrales y resguardo jurídico en cada operación.",
            icon: Scale,
        },
        {
            title: "Marketing Digital Inmobiliario",
            desc: "Estrategias de posicionamiento premium, fotografía profesional y campañas dirigidas al comprador ideal.",
            icon: Megaphone,
        },
        {
            title: "Relocation & Inversiones",
            desc: "Búsqueda avanzada de propiedades y oportunidades de inversión desde pozo para clientes exigentes.",
            icon: MapPin,
        }
    ];

    const tasacionWhatsappText = encodeURIComponent("Hola! Quiero solicitar una tasación profesional.");

    return (
        <div className="min-h-screen bg-navy text-white selection:bg-accent selection:text-white pt-24 pb-20 overflow-x-hidden">
            <style>
                {`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 1s ease-out forwards;
                    }
                    .delay-200 {
                        animation-delay: 0.2s;
                    }
                `}
            </style>
            
            <Navbar />

            <main>
                {/* Header Animado */}
                <section className="container mx-auto max-w-7xl px-6 pt-16 pb-24 text-center relative z-10">
                    <span className="opacity-0 animate-fade-in-up text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                        Servicios Exclusivos
                    </span>
                    <h1 className="opacity-0 animate-fade-in-up delay-200 font-serif text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight mb-6">
                        Soluciones Inmobiliarias Integrales en <span className="italic text-accent">Buenos Aires</span>
                    </h1>
                    <p className="opacity-0 animate-fade-in-up delay-200 text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                        Ofrecemos un servicio end-to-end diseñado para maximizar el valor de tu patrimonio y garantizar operaciones seguras, rápidas y rentables.
                    </p>
                </section>

                {/* Grid de Servicios */}
                <section className="container mx-auto max-w-7xl px-6 mb-32 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-accent shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(0,123,255,0.15)]"
                            >
                                <div className="w-12 h-12 rounded-full bg-navy-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                                    <service.icon className="w-5 h-5 text-accent" />
                                </div>
                                <h3 className="font-serif text-xl mb-4 group-hover:text-white transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 font-sans text-sm font-light leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sección de Tasación "Flotante" */}
                <section className="container mx-auto max-w-4xl px-6 relative z-20 mb-10">
                    <div className="bg-navy-light/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] shadow-accent/5 p-8 md:p-14 relative overflow-hidden">
                        
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="text-center mb-10 relative z-10">
                            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-white">Solicitar <span className="italic text-accent">Tasación</span></h2>
                            <p className="text-sm font-sans text-gray-400 max-w-lg mx-auto">
                                Conocé el valor real de tu propiedad hoy. Completá los datos y uno de nuestros expertos se pondrá en contacto a la brevedad.
                            </p>
                        </div>

                        {/* Multistep Form */}
                        <div className="relative z-10 max-w-2xl mx-auto">
                            {/* Progress Indicator */}
                            {step < 3 && (
                                <div className="flex items-center justify-center gap-4 mb-10 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
                                    <span className={step >= 1 ? "text-accent" : "text-gray-600"}>1. Propiedad</span>
                                    <ChevronRight className="w-3 h-3 text-gray-600" />
                                    <span className={step >= 2 ? "text-accent" : "text-gray-600"}>2. Datos</span>
                                </div>
                            )}

                            {/* Form Pasos */}
                            <form onSubmit={step === 1 ? nextStep : submitTasacion} className="relative min-h-[280px]">
                                
                                {/* Paso 1: La Propiedad */}
                                <div className={`absolute top-0 w-full transition-all duration-500 ease-in-out ${step === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-bold mb-2 block">Tipo de Propiedad</label>
                                            <select 
                                                name="propertyType"
                                                value={formData.propertyType}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/20 text-white p-3.5 rounded-sm text-sm outline-none focus:border-accent appearance-none transition-colors"
                                            >
                                                <option value="" className="text-black">Seleccionar</option>
                                                <option value="Departamento" className="text-black">Departamento</option>
                                                <option value="Casa" className="text-black">Casa</option>
                                                <option value="Local" className="text-black">Local Comercial</option>
                                                <option value="Terreno" className="text-black">Terreno / Lote</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-bold mb-2 block">Metros Totales</label>
                                            <input 
                                                type="number" 
                                                name="m2"
                                                value={formData.m2}
                                                onChange={handleChange}
                                                placeholder="Ej: 85" 
                                                className="w-full bg-white/5 border border-white/20 text-white p-3.5 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-bold mb-2 block">Ambientes</label>
                                            <input 
                                                type="number" 
                                                name="rooms"
                                                value={formData.rooms}
                                                onChange={handleChange}
                                                placeholder="Ej: 3" 
                                                className="w-full bg-white/5 border border-white/20 text-white p-3.5 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-bold mb-2 block">Dirección / Barrio</label>
                                            <input 
                                                type="text" 
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Ej: Av. del Libertador 4500, Palermo" 
                                                className="w-full bg-white/5 border border-white/20 text-white p-3.5 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex justify-end mt-4">
                                            <button 
                                                type="button" 
                                                onClick={nextStep}
                                                className="bg-white/10 text-white px-8 py-4 font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-navy transition-all duration-300 rounded-sm flex items-center gap-2"
                                            >
                                                Siguiente Paso <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Paso 2: Tus Datos */}
                                <div className={`absolute top-0 w-full transition-all duration-500 ease-in-out ${step === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-bold mb-2 block">Nombre Completo</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Tu nombre" 
                                                className="w-full bg-white/5 border border-white/20 text-white p-3.5 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-bold mb-2 block">WhatsApp</label>
                                            <input 
                                                type="tel" 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+54 9 11..." 
                                                className="w-full bg-white/5 border border-white/20 text-white p-3.5 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-bold mb-2 block">Email</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="tu@email.com" 
                                                className="w-full bg-white/5 border border-white/20 text-white p-3.5 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex justify-between mt-4">
                                            <button 
                                                type="button" 
                                                onClick={() => setStep(1)}
                                                className="text-gray-400 px-2 py-4 font-bold tracking-widest text-xs uppercase hover:text-white transition-all duration-300 rounded-sm"
                                            >
                                                Volver
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={isSubmitting}
                                                className="bg-accent text-white px-8 py-4 font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-navy transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                {isSubmitting ? 'Enviando...' : 'Solicitar Tasación'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Paso 3: Éxito */}
                                <div className={`absolute top-0 w-full transition-all duration-500 ease-in-out text-center pt-8 ${step === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
                                    <h3 className="font-serif text-3xl text-white mb-4">¡Solicitud Enviada!</h3>
                                    <p className="text-gray-400 font-sans text-sm mb-8">
                                        Hemos recibido los datos de tu propiedad. Un asesor de Ramos Couriel se pondrá en contacto a la brevedad para coordinar la tasación.
                                    </p>
                                    <button 
                                        type="button" 
                                        onClick={() => window.location.reload()}
                                        className="text-accent underline tracking-widest font-sans uppercase text-[10px] font-bold"
                                    >
                                        Enviar otra solicitud
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* Fila inferior: Direct WhatsApp para tasaciones */}
                    <div className="text-center mt-8">
                        <span className="text-[10px] text-gray-500 font-sans uppercase tracking-[0.2em] block mb-3">¿Preferís atención inmediata?</span>
                        <a 
                            href={`https://wa.me/5491132307600?text=${tasacionWhatsappText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white bg-[#25D366]/10 border border-[#25D366]/30 px-6 py-3 rounded-sm font-sans font-bold text-xs tracking-widest hover:bg-[#25D366] transition-colors"
                        >
                            Chateá por WhatsApp
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
            <WhatsappButton />
        </div>
    );
}
