import {json, useLoaderData} from "react-router-dom";
import {fetchDevices, selectDevices} from "../store/devicesSlice";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button} from "antd";


// params 是一个对象，需要使用解构赋值来获取参数（花括号）
export const loaderGetter = (dispatch) => async ({params}) => {
    try {
        dispatch(fetchDevices(params.wardId));
        return params.wardId;
    } catch (e) {
        throw json({ message: "Error occurred while fetching data" }, { status: e.status });
    }
};
const WardDetail = ()=>{
    const wardId = useLoaderData();
    const devices = useSelector(selectDevices);
    const {wardName} = useSelector((state) => state.wards.value.find((ward) => ward.wardId == wardId));

    return(
        <div>
            <>{wardName}</>
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
                <Link to={`/wards/${wardId}/edit`}>Back to Wards</Link>

            </Button>

        </div>
    )
}
export default WardDetail;
