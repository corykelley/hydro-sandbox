import {Link} from '@shopify/hydrogen/client';

export default function FeaturedProduct({product}) {
  console.log(product);
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto py-10 px-4">
        <span className="bg-gray-400 p-2 rounded font-mono uppercase text-xs text-center tracking-widest leading-none text-white">
          Featured Product
        </span>
        <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-xl mt-8">
          <img
            src={product.images.edges[0].node.url}
            alt={
              product.images.edges[0].node.alt
                ? product.images.edges[0].node.alt
                : 'product image'
            }
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="mt-6">
          <h1 className="text-4xl font-bold tracking-wide uppercase">
            {product.title}
          </h1>
          <p className="mt-4 text-gray-500">{product.descriptionHtml}</p>
          <Link
            to={`/products/${product.handle}`}
            className="inline-block mt-6 bg-gray-800 text-white font-mono text-center tracking-widest rounded-md py-4 px-8 hover:shadow-xl hover:bg-gray-600 transition-all w-full"
          >
            View Product
          </Link>
        </div>
      </div>
    </section>
  );
}
