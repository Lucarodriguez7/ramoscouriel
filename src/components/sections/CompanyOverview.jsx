import { useState, useEffect, useRef } from 'react';

const companyValues = [
    'Excelencia Inmobiliaria.',
    'Inversiones Inteligentes.',
    'Confianza & Transparencia.',
    'Servicio Personalizado.',
    'Visión de Mercado.',
];

const stats = [
    { label: 'Años en el Mercado', value: '+15' },
    { label: 'Propiedades Vendidas', value: '+350' },
    { label: 'Clientes Satisfechos', value: '+500' },
];

function useTypewriter(phrases, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2200) {
    const [text, setText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const current = phrases[phraseIndex];

        if (!isDeleting && text === current) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
        } else {
            const delta = isDeleting ? deletingSpeed : typingSpeed;
            timeoutRef.current = setTimeout(() => {
                setText(
                    isDeleting
                        ? current.substring(0, text.length - 1)
                        : current.substring(0, text.length + 1)
                );
            }, delta);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

    return text;
}

export default function CompanyOverview() {
    const typedValue = useTypewriter(companyValues);

    return (
        <section id="nosotros" className="bg-white py-28 md:py-32 px-6 text-navy">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

                    <div>
                        <span className="text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-5 block">
                            Nuestra Filosofía
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-navy">
                            Sobre <span className="italic">Ramos Couriel</span>
                        </h2>

                        <div className="mb-10 min-h-[60px] flex items-center">
                            <p className="font-serif text-2xl md:text-3xl text-accent/90 italic leading-snug">
                                {typedValue}
                                <span className="inline-block w-[2px] h-[1.1em] bg-accent ml-1 align-middle animate-pulse" />
                            </p>
                        </div>

                        <p className="text-gray-500 leading-relaxed mb-10 max-w-lg font-light text-[15px]">
                            Desde hace más de 15 años acompañamos a inversores, familias
                            y desarrolladores en sus decisiones inmobiliarias más
                            importantes. Nuestro compromiso es brindar un servicio
                            de excelencia, con transparencia y un profundo conocimiento
                            del mercado de Buenos Aires.
                        </p>

                        <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl md:text-4xl font-serif font-bold text-accent">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-400 mt-2 font-sans">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[450px] md:h-[520px] overflow-hidden rounded-sm shadow-2xl">
                        <img
                            src="https://imgur.com/KH44UOe.jpg"
                            className="object-cover w-full h-full"
                            alt="Oficina Ramos Couriel"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
                    </div>

                </div>
            </div>
        </section>
    );
}