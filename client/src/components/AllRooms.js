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
    title: 'Max Count',
    dataIndex: 'maxCount',
    key: 'maxCount',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Rent Per Day',
    dataIndex: 'rentPerDay',
    key: 'rentPerDay',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type) => <Tag>{type}</Tag>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/rooms/all');
        setRooms(response.data.rooms);
        console.log(response.data.rooms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>All Rooms</h2>
      <Table columns={columns} dataSource={rooms} loading={loading} />
    </div>
  );
};

export default AllRooms;
