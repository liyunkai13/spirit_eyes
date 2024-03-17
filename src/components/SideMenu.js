import {
    // AppstoreOutlined,
    ContainerOutlined,
    // DesktopOutlined,
    // MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";


export const SideMenu= () => {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    //从redux中获取数据
    const wards = useSelector((state) => state.wards.value);
    //从redux中获取dispatch方法
    const dispatch = useDispatch();

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = wards.map((ward) => {
        return getItem(ward.name, ward.id, <ContainerOutlined />, null, "ward");
    });

    const addWard = () => {
        //点击唤起表单，填写信息
        //点击确定后，将信息保存到redux中
        dispatch({
            type: 'wards/addWard',
            payload: {id: wards.length + 1, name: `${wards.length + 1}号病房`, type: "病房", status: "空闲", }
        });

    }
  return (
      <div
          style={{
              display: "flex",
              flexDirection: "column",
              height: '100vh',
              background: '#49b63d',
          }}
      >
          <Button
              type="primary"
              onClick={toggleCollapsed}
          >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={items}
          />
          <Button type="primary" onClick={addWard} style={{
              bottom: "0vh",
          }}
          >
              添加分组
          </Button>
      </div>
  );
}
