import React, { useEffect, useState } from 'react';

/**
 * Preloader "Focus Reveal" & Logo Imgur
 * Utiliza la imagen del logo con un efecto de máscara y resplandor para simular exclusividad.
 */
export default function Preloader({ isLoading, isInitial }) {
    const [animationStage, setAnimationStage] = useState('idle'); // 'idle' | 'loading' | 'filled' | 'fade-out'

    useEffect(() => {
        if (isLoading) {
            setAnimationStage('loading');
            
            // Tiempo para el efecto de revelado (fade + glow)
            const fillDelay = isInitial ? 1800 : 700;

            const timer = setTimeout(() => {
                setAnimationStage('filled');
            }, fillDelay);

            return () => clearTimeout(timer);
        } else {
            setAnimationStage('fade-out');
        }
    }, [isLoading, isInitial]);

    return (
        <div 
            className={`fixed inset-0 z-[99999] bg-[#003380] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                animationStage === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <style>
                {`
                    @keyframes logoReveal {
                        0% { 
                            opacity: 0; 
                            filter: blur(20px) brightness(0.5);
                            transform: scale(0.95);
                        }
                        100% { 
                            opacity: 1; 
                            filter: blur(0px) brightness(1.2);
                            transform: scale(1);
                        }
                    }

                    .logo-animated {
                        animation: logoReveal ${isInitial ? '2s' : '0.8s'} cubic-bezier(0.22, 1, 0.36, 1) forwards;
                    }

                    .glow-pulse {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 150px;
                        height: 150px;
                        background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
                        border-radius: 50%;
                        filter: blur(30px);
                        opacity: 0;
                        transition: opacity 1.5s ease;
                    }

                    .glow-pulse.is-active {
                        opacity: 1;
                        animation: pulseGlow 3s infinite alternate;
                    }

                    @keyframes pulseGlow {
                        0% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
                        100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0.5; }
                    }
                `}
            </style>

            <div className="relative flex flex-col items-center">
                {/* Logo Container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                    {/* Glow Layer */}
                    <div className={`glow-pulse ${animationStage === 'filled' ? 'is-active' : ''}`} />
                    
                    {/* Imagen del Logo Realizada */}
                    <img 
                        src="https://imgur.com/TNyCg31.jpg" 
                        alt="Ramos Couriel Logo" 
                        className={`w-full h-full object-contain relative z-10 ${animationStage !== 'idle' ? 'logo-animated' : 'opacity-0'}`}
                        style={{ filter: animationStage === 'filled' ? 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' : 'none' }}
                    />
                </div>

                {/* Subtitle / Loader Text */}
                <div className="mt-4 overflow-hidden h-6 flex items-center justify-center">
                    <span className={`text-white/60 text-[10px] uppercase tracking-[0.6em] font-sans font-light transition-all duration-1000 ${
                        animationStage === 'loading' || animationStage === 'filled' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                        Ramos Couriel
                    </span>
                </div>
            </div>
        </div>
    );
}
