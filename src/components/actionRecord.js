import React from 'react';
import { Pie } from '@ant-design/plots';
import {Empty} from "antd";
const allData = [
    [
        { type: '分类一', value: 120 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 37 },
        { type: '分类四', value: 66 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 },
    ],
    [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 16 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 30 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 10 },
    ],
    [
        { type: '分类一', value: 3 },
        { type: '分类二', value: 24 },
        { type: '分类三', value: 7 },
        { type: '分类四', value: 36 },
        { type: '分类五', value: 18 },
        { type: '其他', value: 5 },
    ]
]
const DemoPie = ({wardId}) => {

    const index = wardId-1;
    if(index<=2){
        const data = allData[index];
        // console.log(data);
        const config = {
            data,
            height:500,
            width: 500,
            angleField: 'value',
            colorField: 'type',
            radius: 0.8,
            label: {
                text: 'value',
            },
            legend: {
                color: {
                    title: false,
                    position: 'right',
                    rowPadding: 1,
                },
            },
        };
        return <Pie {...config} />;
    }
    else {
        console.error(`Invalid wardId: ${wardId}`);
        return  (
            <div style={{
                width: '100%',
                height: '100%',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>

                <Empty />
            </div>
        )
    }
};


const ActionRecord = ({wardId})=>{


    return(
        <div  style={{
            width: '28rem',
            height: '38rem',
            borderRadius: "10px",
            padding: "0.5rem 1rem",
            background: "#ffffff",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <h2 style={{
                alignSelf: "flex-start",
                marginLeft: "0.3rem",
                marginBottom:"0.3rem",
            }}>智能化行为分析</h2>
            <hr style={{
                width: "100%",
            }}/>
            <DemoPie wardId = {wardId}/>
        </div>
    )
}
export default ActionRecord;
