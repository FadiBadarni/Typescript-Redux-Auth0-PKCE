import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store/store';
import { setupInterceptors } from 'services/axiosService';
import App from 'App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
setupInterceptors(store);

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';

root.render(
  <Auth0Provider
    domain={auth0Domain}
    clientId={auth0ClientId}
    authorizationParams={{
      redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    }}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Auth0Provider>
);
