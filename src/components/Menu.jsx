import React, { useState, useEffect } from 'react';

// Componente de tarjeta para secciones
const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
    <div className="bg-sky-700 text-white py-4 px-6">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// Componente de producto
const ProductItem = ({ name, price, description }) => (
  <div className="border-b border-sky-100 last:border-b-0 py-4">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sky-800 text-lg font-bold">{name}</h3>
      <span className="font-bold text-sky-700">${price.toFixed(2)}</span>
    </div>
    {description && <p className="text-gray-600 text-sm">{description}</p>}
  </div>
);

// Página del menú
export default function MenuPage () {
  const [sections, setSections] = useState([]);

  // Fetch secciones y productos desde el backend
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sections');
        if (!response.ok) {
          throw new Error('Error fetching sections');
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSections();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-sky-50/30">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-sky-700 text-white">
        <a href="/" className="flex items-center justify-center">
          <span className="ml-2 text-2xl font-bold">El Navegante</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:text-sky-200 transition-colors" href="/">
            Inicio
          </a>
          <a className="text-sm font-medium hover:text-sky-200 transition-colors" href="/menu">
            Menú
          </a>
          <a className="text-sm font-medium hover:text-sky-200 transition-colors" href="/pedido">
            Hacer Pedido
          </a>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-12 text-sky-800 text-center">
            Nuestro Menú
          </h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <SectionCard key={section.id} title={section.title}>
                {section.products.map((product) => (
                  <ProductItem
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                  />
                ))}
              </SectionCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}