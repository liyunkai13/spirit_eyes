// ToDo : 在现阶段，react-router-dom 的loader里边用来同步redux state和后端，尽量只同步传递路由参数，再具体的页面内使用路由参数查找redux的状态（发现在同一个页面内操作，有的redux状态的改变，loader不会重新加载）。如果真的加了服务器，再分出来哪些数据是不必邀同步到redux的。
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
import EditWard,{loaderGetter as wardLoaderGetter,actionGetter as editActionGetter} from "./router/edit";
import Default from "./router/default";
import DeviceManage from "./router/deviceManage";


const Index = () =>{
    const dispatch = useDispatch();
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement:<ErrorPage />,
            loader: wardsLoaderGetter(store),
            action: newWardActionGetter(store),
            children: [
                { index: true, element: <Default/> },
                {
                    path: "/wards/:wardId",
                    element: <WardDetail/>,
                    errorElement:<ErrorPage />,
                    loader: devicesLoaderGetter(store),
                },
                {
                    path: "/wards/:wardId/devices",
                    element: <DeviceManage/>,
                    errorElement:<ErrorPage />,
                    loader: devicesLoaderGetter(store),
                },
                {
                    path: "/wards/:wardId/edit",
                    element: <EditWard/>,
                    errorElement:<ErrorPage />,
                    loader: wardLoaderGetter(store),
                    action: editActionGetter(dispatch),
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
