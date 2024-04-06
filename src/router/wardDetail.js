import {useLoaderData} from "react-router-dom";
import {Link} from "react-router-dom";
import {Button} from "antd";
import Device from "../components/device";
import {PlusSquareOutlined} from "@ant-design/icons";


// params 是一个对象，需要使用解构赋值来获取参数（花括号）
export const loaderGetter = (store) => async ({params}) => {

    //千万不能使用===，我们这里只需要比较值是否相等，不需要比较类型，别看黄色警告
    const devices = await store.getState().devices.value.filter(device => device.wardId == params.wardId);
    const ward = await store.getState().wards.value.find(ward => ward.wardId == params.wardId);
    console.log("经过了wardDetail");
    return {devices, ward};
};
const WardDetail = ()=>{
    const {devices, ward} = useLoaderData();


    return(
        <div>
            {/*实施情况栏，显示各个设备*/}
            <div  className="deviceStatus" style={{
                width:"65rem",
                height:"38rem",
                borderRadius: "10px",
                padding: "0.8rem",
                background: "white",
                display: "flex",
                flexDirection: "column",

            }}>
                <h2 style={{
                    marginLeft: "1rem",
                    marginBottom:"0.3rem",
                }}>实时情况</h2>

                {/*分割线*/}

                <hr style={{
                    width: "100%",
                }}/>

                <div id="devices" style={{
                    alignSelf: 'center',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 2fr)',
                    gridGap: '0.3rem',
                }}>

                    {devices.map((device) => (
                        <Device key={device.deviceId} device={device}/>
                    ))}
                    <div style={{
                        width: '20rem',
                        height: '15rem',
                        margin:'0 0.5rem 1rem 0.5rem',
                        // padding: '0.3rem',
                        border: '1px dashed #ccc',
                        borderRadius: "3px",

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <PlusSquareOutlined style={{
                            fontSize:'5rem',
                            color: '#D7D7D7',
                        }} />
                    </div>

                </div>
            </div>

            {/*今日情况栏*/}
            <div id="todayState">
                <h1>今日情况</h1>
                <p>今日情况</p>
                <h1>近一周进入卫生间次数</h1>

            </div>
            <Button>
                <Link to={`/wards/${ward.wardId}/edit`}>Back to Wards</Link>

            </Button>

        </div>
    )
}
export default WardDetail;
