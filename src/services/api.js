

export async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:4000/products");
    if (!response.ok) throw new Error("Error al cargar productos");
    const data = await response.json();

    // Mapear los datos del JSON al formato que espera el componente
    return data.map((p) => ({
      id: p.id,
      titulo: p.name,
      descripcion: p.descripcion,
      precio: p.price,
      rating: p.nota,
      reviews: p.nNotas,
      stock: p.stock,
      imagen: p.image
    }));
  } catch (error) {
    console.error("fetchProducts error:", error);
    return [];
  }
}