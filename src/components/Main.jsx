import React, { useState, useEffect } from 'react';
import { Ship, Star, MapPin, Clock, ChevronRight } from "lucide-react";

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState({
    slide: 1,
    move: 60
  });

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width > 1000) {
        setSlidesToShow({ slide: 3, move: 60 });
      } else if (width > 700) {
        setSlidesToShow({ slide: 2, move: 40 });
      } else {
        setSlidesToShow({ slide: 1, move: 20 });
      }
    };

    updateSlidesToShow(); // Ejecutar la primera vez
    window.addEventListener("resize", updateSlidesToShow); // Añadir el listener para cambios de tamaño

    return () => {
      window.removeEventListener("resize", updateSlidesToShow); // Limpiar el listener
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - slidesToShow.slide
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? React.Children.count(children) - slidesToShow.slide
        : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * slidesToShow.move) / slidesToShow.slide}%)`,
          width: `${(100 * React.Children.count(children)) / slidesToShow.slide}%`,
        }}
      >
        {React.Children.map(children, (child) => (
          <div
            className="flex justify-center items-center"
            style={{ width: `${100 / slidesToShow.slide}%` }}
          >
            <div className="w-full h-full flex justify-center items-center">
              {child}
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-2"
        onClick={prevSlide}
      >
        <ChevronRight
          size={24}
          style={{ transform: "rotate(180deg)" }} // Rotar la flecha hacia la izquierda
        />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-2"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const CarouselItem = ({ children }) => (
  <div className="w-full p-3">{children}</div>
);

export default function LandingPage () {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b border-gray-200">
        <a href="/" className="flex items-center justify-center">
          <Ship className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">El Navegante</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="/">
            Inicio
          </a>
          <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="/menu">
            Menú
          </a>
          <a className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="/pedido">
            Hacer Pedido
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/principal.jpg')] bg-cover bg-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white drop-shadow-lg">
                  Bienvenido a El Navegante
                </h1>
                <p className="mx-auto max-w-[700px] text-white text-xl md:text-2xl drop-shadow-lg">
                  Descubre una experiencia culinaria única con los mejores sabores del mar y la tierra.
                </p>
              </div>
              <div className="space-x-4">
                <a href="/menu">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all duration-200 px-6 py-3">
                    Ver Menú
                  </Button>
                </a>
                <a href="/pedido">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg transition-all duration-200 px-6 py-3">
                    Hacer Pedido
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900">Nuestra Experiencia</h2>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-gray-50 hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Star className="w-12 h-12 text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-900">Gastronomía Excepcional</h3>
                  <p className="text-center text-gray-700">Nuestros chefs expertos crean platos innovadores utilizando los ingredientes más frescos y de la más alta calidad.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <MapPin className="w-12 h-12 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-900">Ubicación Privilegiada</h3>
                  <p className="text-center text-gray-700">Disfruta de vistas panorámicas al océano mientras saboreas nuestros exquisitos platos en un ambiente acogedor y elegante.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Clock className="w-12 h-12 text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-900">Servicio Impecable</h3>
                  <p className="text-center text-gray-700">Nuestro equipo dedicado se asegura de que cada visita sea memorable, brindándote una atención personalizada y eficiente.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Plato del Día</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <img
                src="/paella.jpg"
                alt="Paella Marinera"

                className="rounded-lg md:max-w-[420px] max-w-96 shadow-xl"
              />
              <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-4">Caribe Oriental</h3>
                <p className="mb-6 text-lg">Nuestro Caribe Oriental te transporta a las islas con cada bocado. La arepa, esponjosa y cálida, se convierte en el lienzo perfecto para un fresco ceviche de pescado. Toques de cebolla morada, tomate y aguacate, junto a limones frescos, evocan los sabores del mar Caribe.</p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-200 px-6 py-3 text-lg font-semibold">
                  Ordenar Ahora
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900">Nuestra Galería</h2>
            <Carousel>
              {[...Array(5)].map((_, index) => (
                <CarouselItem key={index}>
                  <img
                    src={`/platos/${index + 1}.jpg`}
                    alt={`El Navegante - Imagen ${index + 1}`}
                    className="rounded-lg shadow-lg mx-auto object-center w-full h-64 md:h-80 lg:h-96"
                  />
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900">Reserva una Mesa</h2>
            <div className="max-w-lg mx-auto shadow-lg">
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4 py-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input type="text" id="name" className="p-1 mt-1 block w-full rounded-md border-gray-300 text-xl border border-solid shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
                      <input type="date" id="date" className="p-1 mt-1 block w-full rounded-md border-gray-300 text-xl border border-solid shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">Hora</label>
                      <input type="time" id="time" className="p-1 mt-1 block w-full rounded-md border-gray-300 text-xl border border-solid shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Número de Personas</label>
                      <input type="number" id="guests" min="1" className="p-1 mt-1 block w-full rounded-md border-gray-300 text-xl border border-solid shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 py-2 text-lg font-semibold">
                      Reservar
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Lo que dicen nuestros clientes</h2>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-gray-800">
                <CardContent className="p-6">
                  <p className="text-gray-300 mb-4 italic">"Una experiencia culinaria inolvidable. Los sabores son exquisitos y el servicio es impecable. Sin duda, el mejor restaurante de mariscos que he visitado."</p>
                  <p className="font-semibold text-blue-400">- María González</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardContent className="p-6">
                  <p className="text-gray-300 mb-4 italic">"El ambiente es acogedor y elegante, perfecto para una cena romántica. La paella marinera es simplemente espectacular. Volveré pronto."</p>
                  <p className="font-semibold text-blue-400">- Juan Pérez</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardContent className="p-6">
                  <p className="text-gray-300 mb-4 italic">"Cada plato es una obra de arte.  La frescura de los ingredientes y la creatividad del chef hacen que cada visita sea una nueva aventura para el paladar."</p>
                  <p className="font-semibold text-blue-400">- Ana López</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}