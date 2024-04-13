import React, {useEffect, useState} from 'react';
import {Button, Input, Modal} from 'antd';
import {json} from "react-router-dom";
import store from "../store/store";
import {addDevice} from "../store/devicesSlice";

const AddDeviceModal = ({wardId,isOpen,parentCallback}) => {
    //parentCallback 接收父组件传递的方法，在子组件中调用改变父组件的state

    const [loading, setLoading] = useState(false);

    const [device, setDevice] = useState({
        userId: 0,
        wardId: wardId,
        deviceId: 'null',
        deviceName: "null",
        deviceType: "Monitor",
        deviceStatus: "Active",
        deviceUrl: "null"
    },);
    useEffect(() => {
        return () => {
            setDevice({
                ...device,
                userId: 1,
                deviceId: store.getState().devices.value.length + 1,
            })
        };
    },[isOpen]);


    const handleConfirm = async() => {
        setLoading(true);
        try {
            await store.dispatch(addDevice(device));
        } catch (e){
            throw json({ message: "Error occurred while adding ward" }, { status: e.status });
        }
        setDevice({
            userId: 0,
            wardId: wardId,
            deviceId: 'null',
            deviceName: "null",
            deviceType: "Monitor",
            deviceStatus: "Active",
            deviceUrl: "null"
        })
        parentCallback(false);
        setLoading(false);
    }


    const handleCancel = () => {
        parentCallback(false);
    };

    const handleNameChange = (e) => {
        console.log(e.target.value);
        setDevice({
            ...device,
            deviceName: e.target.value,
        })
    };
    const handleUrlChange = (e)=>{
        console.log(e.target.value);
        setDevice({
            ...device,
            deviceUrl: e.target.value,
        })
    }

    return (
        <>
            <Modal
                open={isOpen}
                title="Add a new device"
                maskClosable={true}
                onOk={handleConfirm}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleConfirm}>
                        Confirm
                    </Button>,
                ]}
                width={'40rem'}
            >
                <div style={{
                    margin:'2rem 1rem 2.5rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    <div style={{
                        marginBottom: '0.8rem',
                        display: 'flex',
                        alignItems: 'flex-end',
                    }}>
                        <span style={{
                            fontSize: '1.5rem',
                            fontFamily: 'bold',

                            marginRight: '1.8rem',
                        }}>  DeviceName   : </span>
                        <Input  placeholder=" input device's name"
                               style={{
                                   width:'20rem',
                                   fontSize: '1.5rem',
                               }}
                        onChange={handleNameChange}/>
                    </div>

                    <div style={{
                        marginBottom: '0.8rem',
                        display: 'flex',
                        alignItems: 'flex-end',
                    }}>
                        <span style={{
                            fontSize: '1.5rem',
                            fontFamily: 'bold',

                            marginRight: '3.5rem',
                        }}>  DeviceUrl   : </span>
                        <Input  placeholder=" input device's url"
                                style={{
                                    width:'20rem',
                                    fontSize: '1.5rem',
                                }}
                        onChange={handleUrlChange}/>
                    </div>

                </div>







            </Modal>
        </>
    );
};
export default AddDeviceModal;

