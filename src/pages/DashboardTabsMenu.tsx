import {Tabs} from 'antd';
import type {TabsProps} from 'antd';
import Boxdashboard from "./Boxdashboard.tsx";
import Header from "../components/Header.tsx";
import {DashBoardContainer} from "./DashBoardStyle.ts";
import {DropboxOutlined} from "@ant-design/icons";


const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tab 1',
        children: <Boxdashboard/>,
        icon: <DropboxOutlined/>
    },
    {
        key: '2',
        label: 'Tab 2',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
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