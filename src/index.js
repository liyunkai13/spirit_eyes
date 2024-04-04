import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import store from "./store/store";
import Root,{loaderGetter as wardsLoaderGetter } from "./router/root";
import WardDetail,{loaderGetter as devicesLoaderGetter} from "./router/wardDetail";
import ErrorPage from "./router/error-page";
import {Provider, useDispatch} from "react-redux";


const Index = () =>{
    const dispatch = useDispatch();
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement:<ErrorPage />,
            loader: wardsLoaderGetter(dispatch),
            children: [
                {
                    path: "/wards/:wardId",
                    element: <WardDetail/>,
                    errorElement:<ErrorPage />,
                    loader: devicesLoaderGetter(dispatch),
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <Index />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
