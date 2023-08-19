import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'views/home/home';
import NotFounded from 'views/not-founded/not-founded';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from 'views/search/search';

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      errorElement: <NotFounded />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/search',
          element: <Search />
        }
      ]
   }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);