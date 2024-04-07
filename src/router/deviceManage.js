//TODO : 在这个逻辑中，save之后虽然可成功redux状态，但不会触发组件的重新渲染。现在的逻辑是用useState刷新组件,并没有在修改后重新从redux同步再刷新
import React, {useState} from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import {useLoaderData} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateDevice} from "../store/devicesSlice";

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
                return editable ? (
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
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
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
