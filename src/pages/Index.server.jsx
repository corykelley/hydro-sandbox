import {
  useShopQuery,
  ProductProviderFragment,
  flattenConnection,
} from '@shopify/hydrogen';

import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import FeaturedProduct from '../components/FeaturedProduct.server';
import ProductList from '../components/ProductList.server';
import gql from 'graphql-tag';

export default function Index() {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      numProductMetafields: 0,
      numProductVariants: 250,
      numProductMedia: 10,
      numProductVariantMetafields: 10,
      numProductVariantSellingPlanAllocations: 10,
      numProductSellingPlanGroups: 10,
      numProductSellingPlans: 10,
    },
  });
  const products = flattenConnection(data.products);
  const featuredProductArray = flattenConnection(data.collection.products);

  return (
    <Layout>
      <Hero />
      {featuredProductArray.map((product) => (
        <FeaturedProduct key={product.id} product={product} />
      ))}

      <ProductList products={products} />
    </Layout>
  );
}

const QUERY = gql`
  query HomeQuery(
    $numProductMetafields: Int!
    $numProductVariants: Int!
    $numProductMedia: Int!
    $numProductVariantMetafields: Int!
    $numProductVariantSellingPlanAllocations: Int!
    $numProductSellingPlanGroups: Int!
    $numProductSellingPlans: Int!
  ) {
    products(first: 10) {
      edges {
        node {
          ...ProductProviderFragment
        }
      }
    }
    collection(handle: "featured-product") {
      products(first: 1) {
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
                  ...ImageFragment
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
  ${ProductProviderFragment}
`;
