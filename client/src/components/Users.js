import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Is Admin',
    dataIndex: 'isAdmin',
    key: 'isAdmin',
    render: (isAdmin) => <Tag>{isAdmin ? 'Yes' : 'No'}</Tag>,
  },
];

const Bookings = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/all');
        setUsers(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <Table columns={columns} dataSource={users} loading={loading} />
    </div>
  );
};

export default Bookings;
