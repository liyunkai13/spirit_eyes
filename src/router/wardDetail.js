import {useLoaderData} from "react-router-dom";
import {Link} from "react-router-dom";
import {Button} from "antd";


// params 是一个对象，需要使用解构赋值来获取参数（花括号）
export const loaderGetter = (store) => async ({params}) => {

    //千万不能使用===，我们这里只需要比较值是否相等，不需要比较类型，别看黄色警告
    const devices = await store.getState().devices.value.filter(device => device.wardId == params.wardId);
    const ward = await store.getState().wards.value.find(ward => ward.wardId == params.wardId);
    return {devices, ward};
};
const WardDetail = ()=>{
    const {devices, ward} = useLoaderData();


    return(
        <div>
            <>{ward.wardName}</>
            <h1>Ward Detail</h1>
            <div>
                {/*虽然很多地方是显示未解析变量，但现在看来这些就是没有问题，device是一个对象数组而不是对象，不需要解构赋值*/}
                {devices.map((device) => (
                    <div key={device.deviceId}>
                        <h2>{device.deviceName}</h2>
                        <p>{device.deviceUrl}</p>
                    </div>
                ))}
            </div>
            <Button>
                <Link to={`/wards/${ward.wardId}/edit`}>Back to Wards</Link>

            </Button>

        </div>
    )
}
export default WardDetail;
