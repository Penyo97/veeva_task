import {Tabs} from 'antd';
import type {TabsProps} from 'antd';
import Boxdashboard from "./Boxdashboard.tsx";
import Header from "../components/Header.tsx";
import {DashBoardContainer} from "./DashBoardStyle.ts";
import {DropboxOutlined, ShopOutlined, UserOutlined} from "@ant-design/icons";
import Sellerdashboard from "./Sellerdashboard.tsx";
import Storedashboard from "./Storedashboard.tsx";


const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Box Dashboard',
        children: <Boxdashboard/>,
        icon: <DropboxOutlined/>
    },
    {
        key: '2',
        label: 'Seller Dashboard',
        children: <Sellerdashboard/>,
        icon: <UserOutlined/>
    },
    {
        key: '3',
        label: 'Store Dashboard',
        children: <Storedashboard/>,
        icon: <ShopOutlined/>
    },
];


const DashboardTabsMenu = () => {
    return (
        <DashBoardContainer>
            <Header/>
            <Tabs defaultActiveKey="1" items={items} centered={true}/>
        </DashBoardContainer>
    )
}

export default DashboardTabsMenu;