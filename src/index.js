import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import store from "./store/store";
import Root,{loaderGetter as wardsLoaderGetter,actionGetter as newWardActionGetter } from "./router/root";
import WardDetail,{loaderGetter as devicesLoaderGetter} from "./router/wardDetail";
import ErrorPage from "./router/error-page";
import {Provider, useDispatch} from "react-redux";
import EditWard,{loaderGetter as wardLoaderGetter} from "./router/edit";


const Index = () =>{
    const dispatch = useDispatch();
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement:<ErrorPage />,
            loader: wardsLoaderGetter(dispatch),
            action: newWardActionGetter(dispatch),
            children: [
                {
                    path: "/wards/:wardId",
                    element: <WardDetail/>,
                    errorElement:<ErrorPage />,
                    loader: devicesLoaderGetter(dispatch),
                },
                {
                    path: "/wards/:wardId/edit",
                    element: <EditWard/>,
                    errorElement:<ErrorPage />,
                    loader: wardLoaderGetter(store),
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
