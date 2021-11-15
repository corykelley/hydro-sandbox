import {useShopQuery, Link} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import CartSection from '../components/CartSection.client';

export default function Layout({children}) {
  const {data} = useShopQuery({
    query: QUERY,
  });

  return (
    <div>
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      <Header data={data} />
      <main id="mainContent">{children}</main>
      <Footer />
    </div>
  );
}

const QUERY = gql`
  query ShopNameQuery {
    shop {
      name
    }
  }
`;

function Header({data}) {
  return (
    <header className="pt-6 pb-8 bg-gray-800 text-white">
      <div className="flex justify-between items-center w-[90%] max-w-screen-xl mx-auto lg:px-8">
        <h1 className="font-bold uppercase tracking-wider text-2x-l">
          <Link to="/">{data.shop.name}</Link>
        </h1>
        <nav className="w-64">
          <ul className="flex justify-between w-[95%]">
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <CartSection />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-6 py-12 px-4">
      <div className="flex flex-col justify-center items-center">
        <h5 className="font-semibold text-lg">Testing Grounds © 2021</h5>
        <p className="font-mono">Made in Hydrogen with Shopify</p>
      </div>
    </footer>
  );
}
