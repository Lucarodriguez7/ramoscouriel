import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/FooterWeb';
import WhatsappButton from '../components/ui/WhatsappButton';
import { tokkoService } from '../services/tokkoService';
import { Mail, MessageCircle, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contacto() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: 'Compra',
        message: ''
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await tokkoService.submitContact(formData);
            setIsSuccess(true);
            setFormData({ name: '', phone: '', email: '', subject: 'Compra', message: '' });
        } catch (error) {
            console.error(error);
            alert("Hubo un error al enviar el mensaje. Por favor, intentá de nuevo.");
        } finally {
            setIsSubmitting(false);
            // Si hay exito, ocultamos el mensaje despues de un rato
            if(!isSuccess) {
               setTimeout(() => setIsSuccess(false), 5000);
            }
        }
    };

    const whatsappMsg = encodeURIComponent("Hola Ramos Couriel! Me contacto desde la web, me gustaría recibir asesoramiento.");
    const whatsappLink = `https://wa.me/5491132307600?text=${whatsappMsg}`;

    return (
        <div className="min-h-screen bg-navy text-white selection:bg-accent selection:text-white pt-24 flex flex-col overflow-x-hidden">
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

            {/* Main Layout Dos Columnas */}
            <main className="flex-grow container mx-auto max-w-7xl px-6 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* Columna Izquierda (Info) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <span className="opacity-0 animate-fade-in-up bg-white/5 border border-white/10 text-accent text-[10px] font-sans font-bold tracking-[0.3em] uppercase mb-6 px-3 py-1.5 rounded-sm inline-block">
                            Hub de Contacto
                        </span>
                        
                        <h1 className="opacity-0 animate-fade-in-up delay-200 font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
                            Estamos a un paso de su próxima <span className="italic text-accent">inversión</span>
                        </h1>
                        
                        <p className="opacity-0 animate-fade-in-up delay-200 text-gray-400 font-sans font-light text-base mb-12 max-w-md">
                            Nuestro equipo de asesores exclusivos está a disposición para brindarle un servicio confidencial, ágil y de primera categoría.
                        </p>

                        <div className="opacity-0 animate-fade-in-up delay-400 space-y-8">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/50 transition-all duration-300">
                                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-white mb-1 group-hover:text-accent transition-colors">WhatsApp Directo</h4>
                                    <p className="text-gray-400 font-sans font-light text-sm">+54 9 11 3230-7600</p>
                                </div>
                            </a>

                            <a href="mailto:info@ramoscouriel.com.ar" className="flex items-start gap-5 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:border-accent/50 transition-all duration-300">
                                    <Mail className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-white mb-1 group-hover:text-accent transition-colors">Email Corporativo</h4>
                                    <p className="text-gray-400 font-sans font-light text-sm">info@ramoscouriel.ar</p>
                                </div>
                            </a>

                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-white mb-1">Oficina Central</h4>
                                    <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
                                        Juncal 4450/56, Piso 11, Oficina 03<br />
                                        Palermo, CABA.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-white mb-1">Horarios de Atención</h4>
                                    <p className="text-gray-400 font-sans font-light text-sm">Lunes a Viernes de 10:00 a 19:00 hs.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha (Formulario Flotante) */}
                    <div className="lg:col-span-7 mt-12 lg:mt-0 opacity-0 animate-fade-in-up delay-400">
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
                            
                            {/* Glow decorativo suave */}
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

                            <h3 className="font-serif text-3xl mb-8 text-white relative z-10">Envíenos su consulta</h3>
                            
                            {isSuccess ? (
                                <div className="text-center py-16 relative z-10">
                                    <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
                                    <h3 className="font-serif text-2xl text-white mb-2">Mensaje Enviado</h3>
                                    <p className="text-gray-400 font-sans text-sm">
                                        Gracias por contactarse con Ramos Couriel. Recibimos su inquietud y un asesor exclusivo se comunicará a la brevedad.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-[10px] text-gray-500 font-sans uppercase tracking-widest font-bold mb-2 block">Nombre y Apellido</label>
                                            <input 
                                                required
                                                type="text" 
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Su nombre" 
                                                className="w-full bg-navy-light/50 border border-white/10 text-white p-4 rounded-sm text-sm outline-none focus:border-accent focus:bg-white/5 transition-all placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-500 font-sans uppercase tracking-widest font-bold mb-2 block">Teléfono / Celular</label>
                                            <input 
                                                required
                                                type="tel" 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+54 9 11..." 
                                                className="w-full bg-navy-light/50 border border-white/10 text-white p-4 rounded-sm text-sm outline-none focus:border-accent focus:bg-white/5 transition-all placeholder:text-gray-600"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-[10px] text-gray-500 font-sans uppercase tracking-widest font-bold mb-2 block">Correo Electrónico</label>
                                            <input 
                                                required
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="tu@email.com" 
                                                className="w-full bg-navy-light/50 border border-white/10 text-white p-4 rounded-sm text-sm outline-none focus:border-accent focus:bg-white/5 transition-all placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-500 font-sans uppercase tracking-widest font-bold mb-2 block">Asunto</label>
                                            <div className="relative">
                                                <select 
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full bg-navy-light/50 border border-white/10 text-white p-4 rounded-sm text-sm outline-none focus:border-accent focus:bg-white/5 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="Compra" className="text-black">Quiero Comprar</option>
                                                    <option value="Venta" className="text-black">Quiero Vender</option>
                                                    <option value="Alquiler" className="text-black">Quiero Alquilar</option>
                                                    <option value="Tasación" className="text-black">Solicitar Tasación</option>
                                                    <option value="Otro" className="text-black">Otra Consulta</option>
                                                </select>
                                                {/* Custom Chevron Select */}
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] text-gray-500 font-sans uppercase tracking-widest font-bold mb-2 block">Mensaje Adicional</label>
                                        <textarea 
                                            required
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4" 
                                            placeholder="Detalle aquí su requerimiento..." 
                                            className="w-full bg-navy-light/50 border border-white/10 text-white p-4 rounded-sm text-sm outline-none focus:border-accent focus:bg-white/5 transition-all placeholder:text-gray-600 resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="pt-2">
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full bg-accent text-white py-4 rounded-sm font-sans font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-navy transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? 'Enviando Mensaje...' : 'Enviar Mensaje'} <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <p className="text-[10px] text-gray-500 text-center font-sans tracking-wide mt-4">
                                            Sus datos serán tratados con estricta confidencialidad.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </main>

            {/* Mapa Interactivo Bottom */}
            <section className="w-full h-[400px] md:h-[500px] mt-12 bg-navy-light relative opacity-0 animate-fade-in-up delay-400">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.4533038676646!2d-58.4215757!3d-34.5927055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb583b40bb3bd%3A0x64cf9f3b5084f721!2sJuncal%204450%2C%20C1425%20C%C3%ADudad%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Ramos Couriel"
                    className="w-full h-full object-cover grayscale opacity-60 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-700 pointer-events-auto"
                ></iframe>
                {/* Overlay oscuro para no romper el aspecto general on init, se puede interactuar al hacer hover */}
                <div className="absolute inset-0 pointer-events-none bg-navy-light/20 mix-blend-multiply"></div>
            </section>

            <Footer />
            <WhatsappButton />
        </div>
    );
}
