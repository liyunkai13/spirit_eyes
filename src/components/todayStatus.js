import {
    ClockCircleOutlined,
    HistoryOutlined,
    LineChartOutlined,
    MoonOutlined,
    PieChartOutlined,
    SunOutlined
} from "@ant-design/icons";

const TodayStatus = ()=>{
    return(
        <div className='todayStatus' style={{
            width: '28rem',
            height: '30rem',
            borderRadius: "10px",
            padding: "0.5rem 1rem",
            background: "#ffffff",

            display: "flex",
            flexDirection: "column",
        }}>
            <h2 style={{
                marginLeft: "0.3rem",
                marginBottom:"0.3rem",
            }}>今日情况</h2>
            <hr style={{
                width: "100%",
            }}/>

            {/*方框内*/}
            <div style={{
                border: '1px solid #797979',
                borderRadius: '10px',
                marginInline: '0.5rem',
                padding: '0.5rem',

                display: 'flex',
                direction: 'row',
                justifyContent: 'space-between',
            }}>
                {/*左栏*/}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingInline: '0.6rem',

                }}>
                    <div>
                        <LineChartOutlined />
                        <span style={{
                            margin: "0.7rem",
                        }}>总计次数</span>
                    </div>
                    <div style={{fontFamily:'bold',alignSelf:'center'}}>
                        <span style ={{fontSize:'2rem'}}>8</span>
                        <span>次</span>
                    </div>

                    <div>
                        <ClockCircleOutlined />
                        <span style={{
                            margin: "0.7rem",
                        }}>单次时长</span>
                    </div>
                    <div style={{fontFamily:'bold',alignSelf:'center'}}>
                        <span style ={{fontSize:'2rem'}}>8.5</span>
                        <span>min</span>
                    </div>

                    <div>
                        <MoonOutlined />
                        <span style={{
                            margin: "0.7rem",
                        }}>19:00~7:00</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: "0.7rem",
                    }}>
                        <div>
                            <div>
                                <span style={{
                                    margin: "0.7rem",
                                }}>总计</span>
                            </div>
                            <div style={{fontFamily:'bold',alignSelf:'center'}}>
                                <span style ={{fontSize:'2rem'}}>8</span>
                                <span>次</span>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <div>
                                <span style={{
                                    margin: "0.7rem",
                                }}>平均</span>
                            </div>
                            <div style={{fontFamily:'bold',alignSelf:'center'}}>
                                <span style ={{fontSize:'2rem'}}>8.5</span>
                                <span>min</span>
                            </div>
                        </div>
                    </div>

                </div>

                <hr/>

                {/*右栏*/}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingInline: '0.6rem',
                }}>

                    <div>
                        <HistoryOutlined />
                        <span style={{
                            margin: "0.7rem",
                        }}>总计时长</span>
                    </div>
                    <div style={{fontFamily:'bold',alignSelf:'center'}}>
                        <span style ={{fontSize:'2rem'}}>8</span>
                        <span>次</span>
                    </div>

                    <div>
                        <PieChartOutlined />
                        <span style={{
                            margin: "0.7rem",
                        }}>最长时间</span>
                    </div>
                    <div style={{fontFamily:'bold',alignSelf:'center'}}>
                        <span style ={{fontSize:'2rem'}}>8</span>
                        <span>次</span>
                    </div>


                    <div>
                        <SunOutlined />
                        <span style={{
                            margin: "0.7rem",
                        }}>7:00~19:00</span>

                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: "0.7rem",
                    }}>
                        <div>
                            <div>
                                <span style={{
                                    margin: "0.7rem",
                                }}>总计</span>
                            </div>
                            <div style={{fontFamily:'bold',alignSelf:'center'}}>
                                <span style ={{fontSize:'2rem'}}>6</span>
                                <span>次</span>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <div>
                                <span style={{
                                    margin: "0.7rem",
                                }}>平均</span>
                            </div>
                            <div style={{fontFamily:'bold',alignSelf:'center'}}>
                                <span style ={{fontSize:'2rem'}}>8</span>
                                <span>min</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default TodayStatus;
