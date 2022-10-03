/**
 * mockData
 */

 const pointInfo = [
  {
    id: "392f7fbb-ae25-4eef-ac43-58fd91148d1f",
    latitude: 29.62615,
    longitude: 106.51348,
    psName: "有限公司1",
    pointTypeId: "1"
  },
  {
    id: "0278a88c-b4f4-4d64-9ccb-65831b3fb19d",
    latitude: 29.53613,
    longitude: 106.61348,
    psName: "有限公司2",
    pointTypeId: "2"
  },
  {
    id: "248f6853-2ced-4aa6-b679-ea6422a5f3ac",
    latitude: 29.71617,
    longitude: 106.31348,
    psName: "有限公司3",
    pointTypeId: "3"
  },
  {
    id: "F8DADA95-A438-49E1-B263-63AE3BD7DAC4",
    latitude: 29.82619,
    longitude: 106.81348,
    psName: "有限公司4",
    pointTypeId: "1"
  },
  {
    id: "9402a911-78c5-466a-9162-d5b04d0e48f0",
    latitude: 29.43611,
    longitude: 106.62348,
    psName: "有限公司5",
    pointTypeId: "2"
  },
  {
    id: "EB392DD3-6998-437F-8DCB-F805AD4DB340",
    latitude: 29.83616,
    longitude: 106.71348,
    psName: "有限公司6",
    pointTypeId: "3"
  },
]

const jsonMock = {
  "success": true,
  "code": 200,
  "msg": "操作成功",
  "count": 8,
  "data": {
    "lowValue": "0",
    "unit": "mg/l",
    "upperValue": "1",
    "factorCode": "w21003",
    "tstamp": "2020-06-30 09:00:00",
    "factorName": "氨氮",
    "data": [
      {
        "tstamp": "2020-10-20 15:00:00",
        "factorValue": "0.32"
      },
      {
        "tstamp": "2020-10-20 16:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-20 17:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-20 18:00:00",
        "factorValue": "0.2"
      },
      {
        "tstamp": "2020-10-20 19:00:00",
        "factorValue": "0.3"
      },
      {
        "tstamp": "2020-10-20 20:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-20 21:00:00",
        "factorValue": "0.4"
      },
      {
        "tstamp": "2020-10-20 22:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-20 23:00:00",
        "factorValue": "0.4"
      },
      {
        "tstamp": "2020-10-21 00:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-21 01:00:00",
        "factorValue": "0.8"
      },
      {
        "tstamp": "2020-10-21 02:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-21 03:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-21 04:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-21 05:00:00",
        "factorValue": "0.3"
      },
      {
        "tstamp": "2020-10-21 06:00:00",
        "factorValue": "0.2"
      },
      {
        "tstamp": "2020-10-21 07:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-21 08:00:00",
        "factorValue": "0.7"
      },
      {
        "tstamp": "2020-10-21 09:00:00",
        "factorValue": "0.1"
      },
      {
        "tstamp": "2020-10-21 10:00:00",
        "factorValue": "0.3"
      },
      {
        "tstamp": "2020-10-21 11:00:00",
        "factorValue": "0.14"
      },
      {
        "tstamp": "2020-10-21 12:00:00",
        "factorValue": "0.12"
      },
      {
        "tstamp": "2020-10-21 13:00:00",
        "factorValue": "0.05"
      },
      {
        "tstamp": "2020-10-21 14:00:00",
        "factorValue": "0.2"
      }
    ]
  }
}

export {
  pointInfo,
  jsonMock
}