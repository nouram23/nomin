import Navbar from "../../components/Layout/Navbar";
import Link from 'next/link';
import { Row, Col, Table, Button, DatePicker, Checkbox, message, Tag } from 'antd';
import { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import { useRouter } from 'next/router'


import {
  EditOutlined
} from '@ant-design/icons';

const { RangePicker } = DatePicker;

export default function FirstOrder() {
  const router = useRouter()
  const { userKey} = router.query;

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0
  })

  const [beginDate, setBeginDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [confirmedCount, setConfirmedCount] = useState(0)
  const [newRequest, setNewRequest] = useState(0)
  const [statusData, setStatusData] = useState(0)
  const [dateDisable, setDateDisable] = useState(true)

  const [localUserKey, setLocalUserKey] = useState('');

  useEffect(() => {
    fetchData(statusData)
    firstOrderCount()
    if(userKey)
      localStorage.setItem('userKey', userKey);
    if(userKey === undefined && localStorage.getItem('userKey') === '')
      router.push('/notfound')
    if(localUserKey==='')
      setLocalUserKey(localStorage.getItem('userKey'))    

  }, [pagination.current, statusData ])

  const columnsFilter = [

    {
      title: '№',
      render: (text, record, index) => <p>{1 + index}</p>,
    },
    {
      title: 'Огноо',
      dataIndex: 'invDate',
      key: 'invDate',
      render: (text, record) => (
        <p>{moment(text).format("YYYY-MM-DD")}</p>
      )
    },
    {
      title: 'Төрөл',
      dataIndex: 'divisionTypeStr',
      key: 'divisionTypeStr'
    },
    {
      title: 'Төлөв',
      dataIndex: 'statusStr',
      key: 'statusStr',
      render: (text, record, index) => {
        if (text === 'Шинэ хүсэлт') return <Tag color="green">{text}</Tag>
        if (text === 'НМ баталсан') return <Tag color="orange">{text}</Tag>
        // if(text === '') return <Tag color="green">{text}</Tag>
      }

    },
    {
      title: 'Тайлбар',
      dataIndex: 'cancelNote',
      key: 'cancelNote'
    },
    {
      title: 'Үүсгэсэн огноо',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text, record) => (
        <p>{moment(text).format("YYYY-MM-DD")}</p>
      )
    },
    {
      title: 'Үүсгэсэн хэрэглэгч',
      dataIndex: 'createdUser',
      key: 'createdUser'
    },
    {
      title: 'Баталсан огноо',
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
      render: (text, record) => (
        <p>{moment(text).format("YYYY-MM-DD")}</p>
      )
    },

    {
      title: 'Баталсан хэрэглэгч',
      dataIndex: 'modifiedUser',
      key: 'modifiedUser',
    },
    {
      render: (text, record, index) => (
        <Button icon={<EditOutlined className="text-red-400" />} onClick={() => { editItem(record) }}></Button>
      )
    },
  ];


  const handleTableChange = (pager, filters, sorter) => {
    setPagination({
      ...pagination,
      current: pager.current,
      total: pager.total,
    })
  };

  const fetchData = (number) => {
    setLoading(true)
    let data = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
      beginDate,
      endDate,
      userKey: localUserKey,
      status: statusData
    }

    axios.post('/api/post/rest/vendor/listFirstOrder', data).then(result => {
      setData(result.data.list)
      setPagination({ ...pagination, total: result.data.count })
      setLoading(false)
    }).then(error => {
      console.log(error);
    })

  };

  const editItem = (item) => {
    message.success(item.pKey)
    router.push({
      pathname: '/first-order/form',
      query: { pkey: item.pKey},
    })
  }

  const onChangeDate = (dates, dateStrings) => {
    setBeginDate(dateStrings[0])
    setEndDate(dateStrings[1])
    // console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }

  const firstOrderCount = () => {
    axios.post('/api/post/rest/vendor/orderListCount', { userKey: localUserKey }).then(result => {
      setNewRequest(result.data.newRequest)
      setConfirmedCount(result.data.confirmed)
    }, error => { console.log(error); })
  }

  const onChangeCheck = () => {
    setDateDisable(!dateDisable)
    if (!dateDisable) {
      setBeginDate("")
      setEndDate("")
    }

  }


  return (<>
    <Navbar>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <Button className="bg-green-300 text-white  h-12 w-36" onClick={() => { fetchData(0) , setStatusData(0)}}>Бүх хүсэлт { }</Button>
          <Button className="bg-red-300 text-white ml-6 h-12 w-36" onClick={() => { fetchData(2), setStatusData(2) }}>Шинэ хүсэлт {newRequest}</Button>
          <Button className="bg-orange-300 text-white ml-6 h-12 w-36" onClick={() => { fetchData(4) , setStatusData(4)}}>Баталсан {confirmedCount}</Button>

        </Col>
        <Col span={12} >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginLeft: 'auto', float: 'right' }}>
            <Col span={24} >
              <Button className="blueButton">
                <Link href="/first-order/form">
                  <a>Захиалга нэмэх</a>
                </Link>
              </Button>
              {/* <Button className="bg-orange-300 text-white pr-1">
                Загвар эксел татах
              </Button> */}

              {/* <Button className="greenButton">Эксел загвар татах</Button> */}

              <Checkbox className="marginLeft-8" onChange={() => { onChangeCheck() }}></Checkbox>
              <RangePicker
                disabled={dateDisable}
                className="marginLeft-8"
                dateRender={current => {
                  const style = {};
                  if (current.date() === 1) {
                    style.border = '1px solid #1890ff';
                    style.borderRadius = '50%';
                  }
                  return (
                    <div className="ant-picker-cell-inner" style={style}>
                      {current.date()}
                    </div>
                  );
                }}
                onChange={onChangeDate}
              />
              <Button className="blueButton" onClick={() => { fetchData(0) }}>Шүүх</Button>
            </Col>
          </Row>
        </Col>



      </Row>
      <Row>
        <Col span={24} className='topPadding-16'>
          <Table
            columns={columnsFilter}
            rowKey='pKey'
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            bordered
            size="small"
          />
        </Col>
      </Row>

    </Navbar>
  </>)
}