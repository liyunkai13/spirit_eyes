// TODO ： 子组件：实时情况，今日情况，WardProfile入口,modelManage入口
import {useLoaderData, useNavigate} from "react-router-dom";
import {Button, Empty} from "antd";
import Device from "../../components/device";
import {PlusSquareOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {selectDevices} from "../../store/devicesSlice";
import AddDeviceModal from "../../components/addDeviceModal";
import {useState} from "react";
import ActionRecord from "../../components/actionRecord";
import EntranceReport from "../../components/entranceReport";

export const loaderGetter = () => async ({params}) => {
    return params.wardId;
};

const WardPage = ()=>{
    const wardId = useLoaderData();
    const devices = useSelector(selectDevices).filter(device => device.wardId == wardId);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = (isOpen) => {
        setOpen(isOpen);
    };
    const navigateToReport = ()=>{
        navigate(`./report`);
    }

    return(
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "2.5rem",
        }}>
            <AddDeviceModal wardId={wardId} isOpen={open} parentCallback={handleCancel}/>
            {/*左栏*/}
            <div>
                {/*实施情况栏，显示各个设备*/}
                <div  className="deviceStatus" style={{
                    width:"65rem",
                    height:"38rem",
                    borderRadius: "10px",
                    padding: "0.5rem 1rem",
                    background: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
            }}>
                <h2 style={{
                    marginLeft: "0.3rem",
                    marginBottom:"0.3rem",
                }}>实时情况</h2>

                    {/*分割线*/}

                <hr style={{
                    width: "100%",
                }}/>
                {/*设备栏*/}
                {
                    devices.length!=0?
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
                                }} onClick={showModal}/>
                            </div>

                        </div>:
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 60,
                            }}
                            description={
                                <span>There is no device</span>
                            }
                        >
                            <Button type="primary" onClick={showModal}>Create Now</Button>
                        </Empty>
                }

                </div>
            </div>


            <ActionRecord wardId = {wardId}/>
            <div>智能化异常行为报警</div>
            <EntranceReport handleClick={navigateToReport}/>




        </div>
    )
}
export default WardPage;
