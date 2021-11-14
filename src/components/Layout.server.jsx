import {useShopQuery, Link} from '@shopify/hydrogen';
import gql from 'graphql-tag';

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
      <header className="pt-6 pb-8 bg-gray-800 text-white">
        <div className="flex justify-between items-center w-[90%] max-w-screen-xl mx-auto">
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
            </ul>
          </nav>
        </div>
      </header>
      <main id="mainContent">{children}</main>
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
