import {useShopQuery, flattenConnection, Link} from '@shopify/hydrogen';

import gql from 'graphql-tag';

export default function CollectionSlider({handle}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle: handle,
    },
  });
  const products = flattenConnection(data.collection.products);

  return (
    <section>
      <div className="py-8 lg:max-w-7xl lg:mx-auto lg:py-24 lg:px-8">
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
          <h2 className="text-4xl font-bold text-gray-900 uppercase">
            Our Coffee
          </h2>
        </div>
        <div className="mt-8 relative">
          <div className="relative w-full overflow-x-auto">
            <ul className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8">
              {products.map((product) => {
                return (
                  <li
                    key={product.id}
                    className="w-64 inline-flex flex-col lg:w-auto"
                  >
                    <div className="group relative">
                      <Link to={`/products/${product.handle}`}>
                        <div className="w-full bg-gray-200 rounded-md overflow-hidden shadow-lg aspect-w-3 aspect-h-4">
                          <img
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                            src={product.images.edges[0].node.url}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="mt-6 text-center">
                        <Link to={`/products/${product.handle}`}>
                          <h3 className="mt-1 font-display tracking-wide text-2xl text-gray-900">
                            {product.title}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const QUERY = gql`
  query SliderQuery($handle: String!) {
    collection(handle: $handle) {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            availableForSale
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            seo {
              description
              title
            }
            compareAtPriceRange {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  }
`;
