import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Preloader from './components/ui/Preloader';
import Home from './pages/Home';
import Propiedades from './pages/Propiedades';
import PropertyDetail from './pages/PropertyDetail';
import Servicios from './pages/Servicios';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Emprendimientos from './pages/Emprendimientos';
import TorreQuo from './pages/TorreQuo';
import WhatsappButton from './components/ui/WhatsappButton';

function PageWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    // Scroll al tope siempre que cambie la ruta
    window.scrollTo(0, 0);
    setLoading(true);
    
    // Tiempos requeridos: 3s inicial, 1.2s reducido en navegación
    const time = isInitial ? 3000 : 1200;
    
    const timer = setTimeout(() => {
        setLoading(false);
        if (isInitial) setIsInitial(false);
    }, time);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Preloader isLoading={loading} isInitial={isInitial} />
      
      {/* Transición general para hacer aparecer la página sin tirones */}
      <div className={`transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}

function App() {
  // Configuración Maestra de Animaciones al hacer scroll
  useEffect(() => {
    AOS.init({ 
      once: true, // Animaciones no se repiten
      duration: 900,
      easing: 'ease-out-cubic',
      offset: 100
    });
  }, []);

  return (
    <Router>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/propiedad/:id" element={<PropertyDetail />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/emprendimientos/torre-quo" element={<TorreQuo />} />
        </Routes>
      </PageWrapper>
      <WhatsappButton />
    </Router>
  );
}

export default App;