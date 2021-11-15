import {Link} from '@shopify/hydrogen/client';

export default function FeaturedProduct({product}) {
  return (
    <section>
      <div className="max-w-[600px] lg:max-w-screen-xl lg:px-8 mx-auto py-10 px-4">
        <span className="bg-gray-400 p-2 rounded font-mono uppercase text-xs text-center tracking-widest leading-none text-white">
          Featured Product
        </span>
        <div className="lg:grid lg:grid-cols-2 lg:gap-24">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-xl mt-8 lg:order-last">
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
          <div className="mt-6 lg:flex lg:flex-col lg:justify-between">
            <div>
              <h1 className="text-4xl lg:text-7xl font-bold tracking-wide uppercase">
                {product.title}
              </h1>
              <p className="mt-4 lg:mt-6 lg:leading-7 text-gray-500">
                {product.descriptionHtml}
              </p>
            </div>
            <Link
              to={`/products/${product.handle}`}
              className="inline-block mt-6 bg-gray-800 text-white font-mono text-center tracking-widest rounded-md py-4 px-8 hover:shadow-xl hover:bg-gray-600 transition-all w-full"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
