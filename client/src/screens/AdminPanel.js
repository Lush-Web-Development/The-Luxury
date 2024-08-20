import React, {useState} from 'react'
import { Tabs } from 'antd';
import AllRooms from '../components/AllRooms';
import AddRoom from '../components/AddRoom';
import Bookings from '../components/Bookings';
import Users from '../components/Users';
const {TabPane} = Tabs;

const AdminPanel = () => {

  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignContent:'center', height: '100vh' }}>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <AllRooms />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <AddRoom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    </div>
  )
}

export default AdminPanel;