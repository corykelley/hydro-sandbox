import {ShopifyServerProvider, DefaultRoutes} from '@shopify/hydrogen';
import {Switch} from 'react-router-dom';
import {Suspense} from 'react';

import shopifyConfig from '../shopify.config';

export default function App({...serverState}) {
  const pages = import.meta.globEager('./pages/**/*.server.[jt]sx');

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ShopifyServerProvider shopifyConfig={shopifyConfig} {...serverState}>
        <Switch>
          <DefaultRoutes pages={pages} serverState={serverState} fallback="/" />
        </Switch>
      </ShopifyServerProvider>
    </Suspense>
  );
}
