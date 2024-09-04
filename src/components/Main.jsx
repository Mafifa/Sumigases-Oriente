import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, ChevronUp, Droplet, Wind, Truck, Star, Zap, Tornado, Shield, Flag, Menu, X } from 'lucide-react'

export default function LandingPage () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold">SumiGases Oriente</a>
            <div className="hidden md:flex space-x-4">
              <a href="#inicio" className="hover:text-blue-200">Inicio</a>
              <a href="#servicios" className="hover:text-blue-200">Servicios</a>
              <a href="#productos" className="hover:text-blue-200">Productos</a>
              <a href="#equipos" className="hover:text-blue-200">Equipos</a>
              <a href="#nosotros" className="hover:text-blue-200">Nosotros</a>
              <a href="#contacto" className="hover:text-blue-200">Contacto</a>
            </div>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-blue-600 bg-opacity-95 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-end p-4">
            <button
              className="text-white"
              onClick={toggleMenu}
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a href="#inicio" className="text-white text-2xl" onClick={closeMenu}>Inicio</a>
            <a href="#servicios" className="text-white text-2xl" onClick={closeMenu}>Servicios</a>
            <a href="#productos" className="text-white text-2xl" onClick={closeMenu}>Productos</a>
            <a href="#equipos" className="text-white text-2xl" onClick={closeMenu}>Equipos</a>
            <a href="#nosotros" className="text-white text-2xl" onClick={closeMenu}>Nosotros</a>
            <a href="#contacto" className="text-white text-2xl" onClick={closeMenu}>Contacto</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="bg-blue-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">SumiGases Oriente</h1>
          <p className="text-xl mb-8">Su proveedor confiable de gases industriales, productos de soldadura y equipos industriales en Venezuela por más de 20 años</p>
          <a href="#contacto" className="bg-white text-blue-700 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">Contáctenos</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard icon={<Droplet size={40} />} title="Gases Líquidos" description="Suministro de gases en estado líquido para diversas aplicaciones industriales." />
            <ServiceCard icon={<Wind size={40} />} title="Gases Comprimidos" description="Variedad de gases comprimidos para satisfacer sus necesidades específicas." />
            <ServiceCard icon={<Flag size={40} />} title="Mezclas Especiales" description="Creación de mezclas de gases personalizadas según sus requerimientos." />
            <ServiceCard icon={<Truck size={40} />} title="Distribución" description="Entrega puntual y segura de gases industriales en toda la región." />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="bg-blue-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Productos de Soldadura</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard icon={<Zap size={40} />} title="Electrodos" description="Amplia gama de electrodos para diferentes tipos de soldadura." />
            <ProductCard icon={<Tornado size={40} />} title="Máquinas de Soldar" description="Equipos de soldadura de alta calidad para profesionales." />
            <ProductCard icon={<Shield size={40} />} title="Equipos de Protección" description="Elementos de seguridad para soldadores y personal industrial." />
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section id="equipos" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Equipos Industriales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EquipmentCard title="Compresores" description="Compresores de aire de alta eficiencia para aplicaciones industriales." />
            <EquipmentCard title="Generadores" description="Generadores eléctricos confiables para respaldo y uso continuo." />
            <EquipmentCard title="Bombas Industriales" description="Bombas de alta calidad para diversos fluidos y aplicaciones." />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="nosotros" className="py-20 bg-gradient-to-b from-blue-100 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Sobre Nosotros</h2>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="self-center lg:w-1/2 mb-12 md:mb-0 md:-mr-24 lg:mb-0">
              <img src="/images.png" alt="SumiGases Oriente Team" className="rounded-lg shadow-2xl" />
            </div>
            <div className="lg:w-1/2 lg:pl-16">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <p className="text-lg text-blue-800 mb-6 leading-relaxed">
                  Con más de <span className="font-bold text-blue-600">20 años de experiencia</span>, SumiGases Oriente se ha consolidado como líder en el suministro de gases industriales, productos de soldadura y equipos industriales en Venezuela. Nuestro compromiso con la calidad y el servicio al cliente nos ha permitido crecer y expandir nuestra gama de productos y servicios a lo largo de los años.
                </p>
                <p className="text-lg text-blue-800 mb-8 leading-relaxed">
                  Nuestra misión es ser el <span className="font-bold text-blue-600">socio confiable</span> que impulsa el progreso industrial en la región, ofreciendo soluciones integrales que abarcan desde gases industriales hasta equipos especializados, siempre con un servicio personalizado que supera las expectativas.
                </p>
                <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 w-6 h-6" />
                    ))}
                  </div>
                  <span className="text-blue-800 font-semibold">4.9/5 basado en 500+ reseñas en 20 años de servicio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="ubicacion" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Nuestra Ubicación</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62909.44448206182!2d-64.66216146348083!3d10.208494475587616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2d75103f2ba7f7%3A0x1fb2622aa9a7f1df!2sLecher%C3%ADa%2C%20Anzo%C3%A1tegui!5e0!3m2!1ses!2sve!4v1684964174991!5m2!1ses!2sve"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Contáctenos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <input type="text" placeholder="Nombre" className="w-full px-4 py-2 rounded-lg text-blue-800" />
                <input type="email" placeholder="Correo Electrónico" className="w-full px-4 py-2 rounded-lg text-blue-800" />
                <textarea placeholder="Mensaje" rows={4} className="w-full px-4 py-2 rounded-lg text-blue-800"></textarea>
                <button type="submit" className="bg-white text-blue-600 py-2 px-6 rounded-lg font-semibold hover:bg-blue-100 transition duration-300">Enviar Mensaje</button>
              </form>
            </div>
            <div className="space-y-6">
              <ContactInfo icon={<MapPin />} text="Lechería, Anzoátegui, Venezuela" />
              <ContactInfo icon={<Phone />} text="+58 123-456-7890" />
              <ContactInfo icon={<Mail />} text="info@sumigasesoriente.com" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 SumiGases Oriente. Más de 20 años sirviendo a la industria venezolana. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Volver arriba"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

function ServiceCard ({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-600">{description}</p>
    </div>
  )
}

function ProductCard ({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-600">{description}</p>
    </div>
  )
}

function EquipmentCard ({ title, description }) {
  return (
    <div className="bg-white rounde
d-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-600">{description}</p>
    </div>
  )
}

function ContactInfo ({ icon, text }) {
  return (
    <div className="flex items-center">
      <div className="mr-4">{icon}</div>
      <p>{text}</p>
    </div>
  )
}