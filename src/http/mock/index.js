export default [
  {
    url: '/api/getNodeData',
    method: 'get', // 请求方式
    timeout: 1 * 1000, // 超时时间
    statusCode: 200, // 返回的http状态码
    response: { // 返回的结果集
      uid: 'f37a40dc-7976-4651-b97a-7d10b0e5e9bf',
      timestamp: '2022-02-28T10:29:07.238+00:00',
      code: 200,
      msg: '操作成功',
      data: [{
        id: '0',
        NE_NAME: 'OMC',
        NE_TYPE: 'OMC',
        NE_IP: '192.168.1.221',
        NE_VERSION: 'V22R1C00',
        conn_status: 0,
        alarm_status: 3,
        x: 0,
        y: 0,
      }, {
        id: '1',
        NE_NAME: '5GC-CP1',
        NE_TYPE: '5GCCP',
        NE_IP: '192.168.1.222',
        NE_VERSION: 'V1R1C00',
        conn_status: 0,
        alarm_status: 0,
        x: -100,
        y: -100,
      }, {
        id: '2',
        NE_NAME: 'UPF1',
        NE_TYPE: '5GCUP',
        NE_IP: '192.168.1.223',
        NE_VERSION: 'V1R2C00',
        conn_status: 0,
        alarm_status: 4,
        x: 100,
        y: -100,
      }, {
        id: '3',
        NE_NAME: 'BBU1',
        NE_TYPE: 'BBU',
        NE_IP: '192.168.1.224',
        NE_VERSION: 'V1R3C00',
        conn_status: 1,
        alarm_status: 0,
        x: 0,
        y: -200,
      }, {
        id: '4',
        NE_NAME: 'RRU1',
        NE_TYPE: 'RRU',
        NE_IP: '192.168.1.225',
        NE_VERSION: 'V1R3C01',
        conn_status: 0,
        alarm_status: 2,
        x: -200,
        y: -300,
      }, {
        id: '5',
        NE_NAME: 'RRU2',
        NE_TYPE: 'RRU',
        NE_IP: '192.168.1.226',
        NE_VERSION: 'V1R3C02',
        conn_status: 1,
        alarm_status: 0,
        x: -100,
        y: -300,
      }, {
        id: '6',
        NE_NAME: 'RRU3',
        NE_TYPE: 'RRU',
        NE_IP: '192.168.1.227',
        NE_VERSION: 'V1R3C03',
        conn_status: 0,
        alarm_status: 1,
        x: 0,
        y: -300,
      }, {
        id: '7',
        NE_NAME: 'RRU4',
        NE_TYPE: 'RRU',
        NE_IP: '192.168.1.228',
        NE_VERSION: 'V1R3C04',
        conn_status: 1,
        alarm_status: 2,
        x: 100,
        y: -300,
      }],
    },
  },
  {
    url: '/api/getLinkData',
    method: 'get',
    timeout: 1 * 1000,
    statusCode: 200,
    response: {
      // "uid":"19f7d5ac-c1c5-4a23-9680-c3f79bd0f2dd",
      // "timestamp":"2022-02-21T11:34:51.265+00:00",
      // "code":200,
      // "msg":"操作成功",
      // "data":[
      //   {
      //   // "LINK_ID":1,
      //   "source": '0',
      //   "target": '1',
      //   "type": 1
      //   },
      //   {
      //   // "LINK_ID":3,
      //   "source": '0',
      //   "target": '2',
      //   "type":1
      //   },
      //   {
      //   // "LINK_ID":4,
      //   "source": '0',
      //   "target": '3',
      //   "type":1
      //   },
      //   {
      //   // "LINK_ID":5,
      //   "source": '0',
      //   "target": '4',
      //   "type":1
      //   },
      //   {
      //   // "LINK_ID":6,
      //   "source": '0',
      //   "target": '5',
      //   "type":1
      //   },
      //   {
      //   // "LINK_ID":7,
      //   "source": '0',
      //   "target": '7',
      //   "type":1
      //   },
      //   {
      //   // "LINK_ID":8,
      //   "source": '2',
      //   "target": '3',
      //   "type":1
      //   },
      //   {
      //   // "LINK_ID":8,
      //   "source": '4',
      //   "target": '5',
      //   "type":1
      //   },
      //   {
      //   // "LINK_ID":8,
      //   "source": '4',
      //   "target": '6',
      //   "type":1
      //   },
      //   {
      //   // "LINK_ID":8,
      //   "source": '5',
      //   "target": '6',
      //   "type":1
      //   },
      // ]
      uid: '036cc978-f552-4421-8f7f-eb36e70c62fc',
      timestamp: '2022-02-28T10:28:25.561+00:00',
      code: 200,
      msg: '操作成功',
      data: [{
        id: '1',
        source: '0',
        target: '1',
        type: 1,
      }, {
        id: '2',
        source: '0',
        target: '2',
        type: 1,
      }, {
        id: '3',
        source: '1',
        target: '3',
        type: 1,
      }, {
        id: '4',
        source: '2',
        target: '3',
        type: 1,
      }, {
        id: '5',
        source: '3',
        target: '4',
        type: 1,
      }, {
        id: '6',
        source: '3',
        target: '5',
        type: 1,
      }, {
        id: '7',
        source: '3',
        target: '6',
        type: 1,
      }, {
        id: '8',
        source: '3',
        target: '7',
        type: 1,
      }],
    },
  },
]
