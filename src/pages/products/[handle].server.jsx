import {useShopQuery, ProductProviderFragment} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import gql from 'graphql-tag';

import ProductDetails from '../../components/ProductDetails.client';
import Layout from '../../components/Layout.server';

export default function Product() {
  const {handle} = useParams();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      numProductMetafields: 10,
      numProductVariants: 250,
      numProductMedia: 6,
      numProductVariantMetafields: 10,
      numProductVariantSellingPlanAllocations: 10,
      numProductSellingPlanGroups: 10,
      numProductSellingPlans: 10,
    },
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 60 * 24,
    },
  });

  if (!data.product) {
    return <h1>Sorry, not found...</h1>;
  }
  return (
    <Layout>
      <ProductDetails product={data.product} />
    </Layout>
  );
}

const QUERY = gql`
  query product(
    $handle: String!
    $numProductMetafields: Int!
    $numProductVariants: Int!
    $numProductMedia: Int!
    $numProductVariantMetafields: Int!
    $numProductVariantSellingPlanAllocations: Int!
    $numProductSellingPlanGroups: Int!
    $numProductSellingPlans: Int!
  ) {
    product: product(handle: $handle) {
      id
      vendor
      seo {
        title
        description
      }
      metafields(first: $numProductMetafields) {
        edges {
          node {
            type
          }
        }
      }
      images(first: 1) {
        edges {
          node {
            ...ImageFragment
          }
        }
      }
      ...ProductProviderFragment
    }
  }
  ${ProductProviderFragment}
`;
