import { Tiny } from '@ant-design/plots';
import React from 'react';
import {Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const DemoLine = () => {
    const data = [
        564, 417, 438, 387, 309, 397, 550, 275, 563, 430, 525, 592, 492, 467, 513, 546, 983,
    ].map((value, index) => ({ value, index }));
    const config = {
        data,
        width: 400,
        height: 80,
        padding: 4,
        xField: 'index',
        yField: 'value',
    };
    return <Tiny.Column {...config} />;
};
const EntranceReport = ({handleClick})=>{
    return(
        <div style={{
            width: '28rem',
            borderRadius: "10px",
            padding: "0.5rem 1rem",
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent:'flex-start',
                alignItems: "center",
            }}>
                <svg t="1712978569071" className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4801" width="100" height="100">
                    <path
                        d="M731.428571 585.142857h174.285715q-2.857143 3.428571-5.714286 6t-5.142857 4.285714l-1.714286 2.285715-356 342.857143q-10.285714 10.285714-25.142857 10.285714t-25.142857-10.285714l-356.571429-344q-2.857143-1.142857-12-11.428572h210.857143q12.571429 0 22.571429-7.714286T364.571429 557.714286l40-160.571429 108.571428 381.142857q3.428571 11.428571 13.142857 18.857143t22.285715 7.428572q12 0 21.714285-7.428572t13.142857-18.857143l83.428572-277.142857 32 64q10.285714 20 32.571428 20z m292.571429-244.571428q0 82.857143-58.857143 171.428571h-210.857143l-63.428571-126.285714q-4.571429-9.714286-14.571429-15.428572t-20.857143-4.571428q-25.714286 2.857143-32 26.285714l-73.714285 245.714286-112-392q-3.428571-11.428571-13.428572-18.857143T401.714286 219.428571t-22.285715 7.714286-12.571428 19.714286L300.571429 512H58.857143Q0 423.428571 0 340.571429q0-125.714286 72.571429-196.571429t200.571428-70.857143q35.428571 0 72.285714 12.285714t68.571429 33.142858T468.571429 157.714286t43.428571 38.857143q20.571429-20.571429 43.428571-38.857143t54.571429-39.142857 68.571429-33.142858T750.857143 73.142857q128 0 200.571428 70.857143t72.571429 196.571429z"
                        p-id="4802" fill="#d81e06"></path>
                </svg>

                <h2 style={{
                    marginLeft: "2rem",
                    marginRight: "5rem",
                    marginBottom:"2.2rem",
                }}>详细报告</h2>
                <svg onClick={handleClick}
                    t="1712978807644" className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5953" width="100" height="100">
                    <path
                        d="M704 514.368a52.864 52.864 0 0 1-15.808 37.888L415.872 819.2a55.296 55.296 0 0 1-73.984-2.752 52.608 52.608 0 0 1-2.816-72.512l233.6-228.928-233.6-228.992a52.736 52.736 0 0 1-17.536-53.056 53.952 53.952 0 0 1 40.192-39.424c19.904-4.672 40.832 1.92 54.144 17.216l272.32 266.88c9.92 9.792 15.616 23.04 15.808 36.8z"
                        fill="#7F7F7F" fillOpacity=".88" p-id="5954"></path>
                </svg>
            </div>

            <DemoLine/>
            {/*分割线*/}
            <hr style={{
                width: "100%",
            }}/>

            <Tooltip title="导航到详细报告界面，现在未实现">
                <span style={{opacity:0.5,marginRight:'3rem'}} >查看健康和行为历史趋势</span>
                <InfoCircleOutlined />
            </Tooltip>
        </div>
    )
}
export default EntranceReport;
