import type { APIRoute } from "astro";
import db from '../../../../gestor-web/src/main/db';

type Product = {
  id: number
  nombre: string
  precio: number
  seccion_id: number
}

type Section = {
  id: number
  nombre: string
  products: Product[]
}

export const GET: APIRoute = async () => {
  try {
    const sections = db.prepare('SELECT * FROM secciones_navegante').all() as Section[]
    const products = db.prepare('SELECT * FROM productos_navegante').all() as Product[]

    // Organiza los productos por secciones
    const sectionsWithProducts = sections.map(section => ({
      id: section.id,
      title: section.nombre,
      products: products.filter(product => product.seccion_id === section.id)
        .map((product) => ({
          id: product.id,
          name: product.nombre,
          price: product.precio
        }))
    }));


    const body = JSON.stringify(sectionsWithProducts)
    return new Response(body, { status: 200 })
  } catch (error) {
    console.error('Error fetching sections:', error);
    return new Response('Error al hacer fetch', { status: 500 })
  }
}
