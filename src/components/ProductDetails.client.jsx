import {
  Product,
  flattenConnection,
  useProduct,
  Metafield,
} from '@shopify/hydrogen/client';

import Seo from './Seo.client';

function ProductPriceMarkup() {
  return (
    <div className="flex md:flex-col items-end font-semibold text-lg md:items-start md:mb-4">
      <Product.SelectedVariant.Price
        priceType="compareAt"
        className="text-gray-500 line-through text-lg mr-2.5"
      >
        {({amount, currencyNarrowSymbol}) => `${currencyNarrowSymbol}${amount}`}
      </Product.SelectedVariant.Price>
      <Product.SelectedVariant.Price className="text-gray-900">
        {({currencyCode, amount, currencyNarrowSymbol}) =>
          `${currencyCode} ${currencyNarrowSymbol}${amount}`
        }
      </Product.SelectedVariant.Price>
      <Product.SelectedVariant.UnitPrice className="text-gray-500">
        {({currencyCode, amount, currencyNarrowSymbol, referenceUnit}) =>
          `${currencyCode} ${currencyNarrowSymbol}${amount}/${referenceUnit}`
        }
      </Product.SelectedVariant.UnitPrice>
    </div>
  );
}

function AddToCartMarkup() {
  const {selectedVariant} = useProduct();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="space-y-2 mb-8">
      <button className="bg-red-500 p" disabled={isOutOfStock}>
        {isOutOfStock ? 'Out of stock' : 'Add to bag'}
      </button>
    </div>
  );
}

export default function ProductDetails({product}) {
  const initialVariant = flattenConnection(product.variants)[0];
  const imageSrc = product.images.edges[0].node.url;

  return (
    <>
      <Seo product={product} />
      <div className="w-[500px] h-[500px] object-cover mb-4">
        <img src={imageSrc} className="h-[100%] w-[100%]" />
      </div>
      <Product product={product} initialVariantId={initialVariant.id}>
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-x-8 my-16">
          <div className="md:hidden mt-5 mb-8">
            <Product.Title
              as="h1"
              className="text-4xl font-bold text-black mb-4"
            />
            {product.vendor && (
              <div className="text-sm font-medium mb-2 text-gray-900">
                {product.vendor}
              </div>
            )}
            <span />
            <div className="flex justify-between md:block">
              <ProductPriceMarkup />
            </div>
          </div>

          {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
          <div>
            <div className="hidden md:block">
              <Product.Title
                as="h1"
                className="text-5xl font-bold text-black mb-4"
              />
              {product.vendor && (
                <div className="text-sm font-medium mb-2 text-gray-900">
                  {product.vendor}
                </div>
              )}
              <ProductPriceMarkup />
              {product.metafields.edges.map(({node}) =>
                node.key == 'is_poison' && node.value == 'true' ? (
                  <Metafield key={node.id} metafield={node}>
                    {(node) => <p>This item is so dangerous</p>}
                  </Metafield>
                ) : (
                  <h1 key={node.id}>no worries!</h1>
                ),
              )}
            </div>
            {/* Product Options */}
            <div className="mt-8">
              <AddToCartMarkup />
            </div>
            {/* Product Description */}
            <Product.Description className="prose border-t border-gray-200 pt-6 text-black text-md" />
          </div>
        </div>
      </Product>
    </>
  );
}
