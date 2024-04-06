import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import {Avatar} from "antd";

const Device = ({device})=>{
    return(
        <div style={{
            width: '20rem',
            height: '15rem',
            margin:'0 0.5rem 1rem 0.5rem',
            padding: '0.3rem',
            border: '1px solid #ccc',

            borderRadius: "3px",

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div id="deviceHeader" style={{
                width: '100%',
                height: '2.5rem',
                display: 'flex',
                alignItems: "flex-end",

                // backgroundColor: '#c97474',
            }}>
                <Avatar src={<img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="avatar" />} />
                <span style={{
                    marginLeft: "0.5rem",
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                }}>{device.deviceName}</span>

                <div id="action" style={{
                    flex: 1,
                    marginRight: '0.5rem',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <span style={{
                        fontSize: '0.8rem',
                        color: '#ccc',
                        paddingInline: '0.5rem',
                        marginInline: '0.5rem',
                        borderRight: '1px solid #D7D7D7',


                    }}>设备日志</span>
                    <SettingOutlined/>
                </div>


            </div>

            {/*分割线*/}
            <hr style={{
                width:'100%',
                border: '1px dotted #ccc',
            }}/>


            {/*视频*/}
            <video style={{
                width: '98%',
            }}>
                <source src={device.deviceUrl} type="video/mp4" />
            </video>


        </div>
    )
}
export default Device;

