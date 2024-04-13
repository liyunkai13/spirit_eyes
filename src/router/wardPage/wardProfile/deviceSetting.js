import {useLoaderData} from "react-router-dom";

export const loaderGetter = (store) => async ({params}) => {
    //千万不能使用===，我们这里只需要比较值是否相等，不需要比较类型，别看黄色警告
    console.log(params);
    const device = await store.getState().devices.value.find(device => device.deviceId == params.deviceId);
    const ward = await store.getState().wards.value.find(ward => ward.wardId == params.wardId);
    console.log(ward.wardName);
    return {device,ward};
};
// TODO : 设备详情界面待实现
const DeviceSetting =()=>{
    const {device, ward} = useLoaderData();
    // console.log(device);
    return(
        <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#494848",
        }}>
            <h1>Device Setting</h1>
            <h2>Device ID: {device.deviceId}</h2>
            <h2>Device Name: {device.deviceName}</h2>
        </div>
    )
}
export default DeviceSetting;
