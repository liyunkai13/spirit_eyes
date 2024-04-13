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
import Root from "./router/root";
import WardPage,{loaderGetter as devicesLoaderGetter} from "./router/wardPage/wardPage";
import ErrorPage from "./router/error-page";
import {Provider, useDispatch} from "react-redux";
import WardProfile,{loaderGetter as wardLoaderGetter,actionGetter as editActionGetter} from "./router/wardPage/wardProfile/wardProfile";
import Default from "./router/default";
import DeviceSetting,{loaderGetter as deviceLoaderGetter} from "./router/wardPage/wardProfile/deviceSetting";
import ModelManage from "./router/wardPage/wardProfile/modelManage";
import DetailReport from "./router/wardPage/wardProfile/detailReport";


const Index = () =>{
    const dispatch = useDispatch();
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement:<ErrorPage />,
            children: [
                { index: true, element: <Default/> },
                {
                    path: "/wards/:wardId",
                    element: <WardPage/>,
                    errorElement:<ErrorPage />,
                    loader: devicesLoaderGetter(),
                },
                {
                    //详细报告页
                    path: "/wards/:wardId/report",
                    element:<DetailReport/>,
                    errorElement:<ErrorPage />,
                },
                {
                    //个人详情页
                    path: "/wards/:wardId/ward_profile",
                    element: <WardProfile/>,
                    errorElement:<ErrorPage />,
                    loader: wardLoaderGetter(store),
                    action: editActionGetter(dispatch),
                },
                {
                    path: "/wards/:wardId/model_manage",
                    element: <ModelManage/>,
                    errorElement:<ErrorPage />,
                    loader: devicesLoaderGetter(),
                },
                {
                    //设备设置和详情页
                    path: "/wards/:wardId/devices/:deviceId",
                    element: <DeviceSetting/>,
                    errorElement:<ErrorPage />,
                    loader: deviceLoaderGetter(store),
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
