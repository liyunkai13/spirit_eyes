//TODO : 在这个逻辑中，save之后虽然可成功redux状态，但不会触发组件的重新渲染。现在的逻辑是用useState刷新组件,并没有在修改后重新从redux同步再刷新
import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Popconfirm, Table, Typography} from 'antd';
import {useLoaderData} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteDevice, updateDevice} from "../store/devicesSlice";

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const DeviceManage = () => {
    const {ward,devices} = useLoaderData();

    const dispatch = useDispatch();

    const [form] = Form.useForm();
    //当前正在编辑的行
    const [editingKey, setEditingKey] = useState('');

    const [devicesInForm, setDevicesInform] = useState(devices);
    // const testDevices = useSelector(selectDevices);
    // console.log(testDevices)




    //是否正在编辑当前行
    const isEditing = (record) => record.deviceId === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            deviceName: '',
            deviceUrl: '',
            ...record,
        });
        setEditingKey(record.deviceId);
    };

    //取消编辑
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            //需要更新的，表单的字段
            const row = await form.validateFields();

            const fullData = devicesInForm.find((item) => item.deviceId === key);
            // console.log('原本查询到的fullDate',fullData);
            // console.log('加入负载后的fullData',{...fullData,deviceName:row.deviceName,deviceUrl:row.deviceUrl});
            await dispatch(updateDevice({...fullData,deviceName:row.deviceName,deviceUrl:row.deviceUrl}));


            const newDevices = [...devicesInForm];
            const index = devices.findIndex(device => device.deviceId === key);
            const item = devices[index];
            newDevices.splice(index, 1, {
                ...item,
                ...row,
            });
            console.log(newDevices);
            await setDevicesInform(newDevices);

            setEditingKey('');

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const handleDelete = (key) => {
        const newData = devicesInForm.filter((device) => device.deviceId !== key);
        dispatch(deleteDevice(key));
        console.log('newData',newData);
        setDevicesInform(newData);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'deviceId',
            width: '5%',
            editable: false,  //是否可编辑
        },
        {
            title: 'Name',
            dataIndex: 'deviceName',
            width: '15%',
            editable: true,
        },
        {
            title: 'Status',
            dataIndex: 'deviceStatus',
            width: '10%',
            editable: false,
        },
        {
            title: 'Type',
            dataIndex: 'deviceType',
            width: '20%',
            editable: false,
        },
        {
            title: 'Url',
            dataIndex: 'deviceUrl',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return (
                    <div>
                        {
                            editable ? (
                                    //*如果正在编辑该条目，Save和Cancel两个按钮,cancel是确认弹窗
                        <span>
                            <Typography.Link
                                onClick={() => save(record.deviceId)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                Save
                            </Typography.Link>

                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                        ) : (
                            //如果没有在编辑该条目，就看是不是有条目正在被编辑
                            <Button disabled={editingKey !== ''}>
                                <Typography.Link  onClick={() => edit(record)}>
                                    Edit
                                </Typography.Link>
                            </Button>


                        )
                        }

                        {/*删除按钮，带确认弹窗 */}
                        {devicesInForm.length >= 1 ? (
                            <Button disabled={editingKey !== ''}>
                                <Popconfirm title="Sure to delete?"  onConfirm={() => handleDelete(record.deviceId)}>
                                    <a>Delete</a>
                                </Popconfirm>
                            </Button>
                        ) : null }
                    </div>
                )
            },
        },
    ];
    const mergedColumns = columns.map((col) => {

        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                // inputType: col.dataIndex === 'age' ? 'number' : 'text',
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (

        <div>
            <h1>{ward.wardName}</h1>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={devicesInForm}
                    columns={mergedColumns}
                    rowClassName="editable-row"


                    //如果点击分页，取消编辑状态
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
};

export default DeviceManage;
