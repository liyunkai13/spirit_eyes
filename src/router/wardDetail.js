import {json} from "react-router-dom";
import {fetchDevices, selectDevices} from "../store/devicesSlice";
import {useSelector} from "react-redux";

export const loaderGetter = (dispatch) => async ({params}) => {
    try {
        dispatch(fetchDevices(params.wardId));
        return json({ message: "Data fetched successfully" });
    } catch (e) {
        throw json({ message: "Error occurred while fetching data" }, { status: e.status });
    }
};
const WardDetail = ()=>{

    const devices = useSelector(selectDevices);

    return(
        <div>
            <h1>Ward Detail</h1>
            <div>
                {devices.map((device) => (
                    <div key={device.deviceId}>
                        <h2>{device.deviceName}</h2>
                        <p>{device.deviceUrl}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default WardDetail;
