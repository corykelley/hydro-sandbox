import ProductCard from './ProductCard.server';

export default function ProductList({products}) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
