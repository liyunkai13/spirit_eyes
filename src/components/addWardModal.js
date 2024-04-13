import React, {useEffect, useState} from 'react';
import {Button, Input, InputNumber, Modal, Select} from 'antd';
import {addWard} from "../store/wardsSlice";
import {json} from "react-router-dom";
import store from "../store/store";
import {UserOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const AddWardModal = ({isOpen,parentCallback}) => {
    //parentCallback 接收父组件传递的方法，在子组件中调用改变父组件的state

    const [loading, setLoading] = useState(false);

    const [ward, setWard] = useState({
        userId: 0,
        wardId: 'null' ,
        wardName: 'null',
        wardGender: "male",
        wardAge: 18,
        emContact: 'null',
        notes: 'null',
    });
    useEffect(() => {
        return () => {
            //初始化ward
            setWard({
                ...ward,
                userId: 1,
                wardId: store.getState().wards.value.length + 1,
            })
        };
    },[isOpen]);


    const handleConfirm = async() => {
        setLoading(true);
        try {
            await store.dispatch(addWard(ward));
        } catch (e){
            throw json({ message: "Error occurred while adding ward" }, { status: e.status });
        }
        parentCallback(false);
        setWard({
            userId: 0,
            wardId: 'null' ,
            wardName: 'null',
            wardGender: "male",
            wardAge: 18,
            emContact: 'null',
            notes: 'null',
        })
        setLoading(false);
    }


    const handleCancel = () => {
        parentCallback(false);
    };

    const  handleNameChange = (e) => {
        console.log(e.target.value);
        setWard({
            ...ward,
            wardName: e.target.value
        })
    };

    const handleGenderChange = (value) => {
        console.log(value);
        setWard({
            ...ward,
            wardGender: value
        })
    };
    const handleAgeChange = (value) => {
        console.log(value);
        setWard({
            ...ward,
            wardAge: value
        })
    };
    const handleEmContactChange = (e) => {
        console.log(e.target.value);
        setWard({
            ...ward,
            emContact: e.target.value
        })
    };
    const handleNotesChange = (e) => {
        console.log(e.target.value);
        setWard({
            ...ward,
            notes: e.target.value
        })
    };
    return (
        <Modal
            open={isOpen}
            title="Add a new ward"
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
            width={'50rem'}
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
                    }}>  Name   : </span>

                    <Input style={{
                        width:'20rem',
                        fontSize: '1.5rem',
                    }} size="large" placeholder="please input the ward's name" prefix={<UserOutlined />}
                    onChange={handleNameChange}/>
                </div>

                <div style={{
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                }}>
                    <span style={{
                        fontSize: '1.5rem',
                        marginRight: '1rem',
                    }}>Gender: </span>
                    <Select
                        defaultValue={{
                            value: 'male',
                        }}
                        style={{
                            width: 120,
                        }}
                        size={'large'}

                        onChange={handleGenderChange}
                        options={[
                            {
                                value: 'male',
                            },
                            {
                                value: 'female',
                            },
                        ]}
                    />
                    <span style={{
                        fontSize: '1.5rem',
                        marginLeft: '2rem',
                        marginRight: '1rem',
                    }}>  Age: </span>
                    <InputNumber size="large" min={1} max={120} defaultValue={18} onChange={handleAgeChange} />
                </div>


                <span style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.8rem',
                }}>Emergency Contact :</span>
                <Input  placeholder="please input the ward's emContact" prefix={<UserOutlined />}
                        onChange={handleEmContactChange}
                        style={{
                            width:'35rem',
                            fontSize: '1.5rem',
                            marginBottom: '1rem',
                        }} />


                <span style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.8rem',
                }}>Notes :</span>
                <TextArea
                    showCount
                    maxLength={100}
                    onChange={handleNotesChange}
                    placeholder="what need be noted."
                    style={{
                        height: 140,
                        marginBottom: '2rem',
                        resize: 'none',
                        fontSize: '1.5rem',
                    }}
                />
            </div>

        </Modal>
    );
};
export default AddWardModal;

