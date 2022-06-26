import React from "react";
import { Table } from "antd";
import { FaSun, FaMoon } from "react-icons/fa";
const columns = [
  {
    title: "Бүс",
    dataIndex: "zone",
    key: "zone",
  },
  {
    title: "Да",
    dataIndex: "monday",
    key: "monday",
  },

  {
    title: "Мя",
    dataIndex: "tuesday",
    key: "tuesday",
  },

  {
    title: "Лх",
    dataIndex: "wednesday",
    key: "wednesday",
  },

  {
    title: "Пү",
    dataIndex: "thursday",
    key: "thursday",
  },

  {
    title: "Ба",
    dataIndex: "friday",
    key: "friday",
  },

  {
    title: "Бя",
    dataIndex: "saturday",
    key: "saturday",
  },

  {
    title: "Ня",
    dataIndex: "sunday",
    key: "sunday",
  },
];

export default function test({ test }) {
  // const [test, setTest] = React.useState([]);

  // React.useEffect(async () => {
  //   const result = await fetch("http://localhost:3000/api/test");
  //   const data = await result.json();

  //   setTest(data);
  // }, []);

  console.log(test);
  const data = test.map((e, i) => ({
    key: i,
    zone: e.zone,
    monday:
      e.monday === "morning" ? (
        <FaSun color="yellow" />
      ) : e.monday === "evening" ? (
        <FaMoon />
      ) : null,
    tuesday:
      e.tuesday === "morning" ? (
        <FaSun color="yellow" />
      ) : e.tuesday === "evening" ? (
        <FaMoon />
      ) : null,
    wednesday:
      e.wednesday === "morning" ? (
        <FaSun color="yellow" />
      ) : e.wednesday === "evening" ? (
        <FaMoon />
      ) : null,
    thursday:
      e.thursday === "morning" ? (
        <FaSun color="yellow" />
      ) : e.thursday === "evening" ? (
        <FaMoon />
      ) : null,
    friday:
      e.friday === "morning" ? (
        <FaSun color="yellow" />
      ) : e.friday === "evening" ? (
        <FaMoon />
      ) : null,
    saturday:
      e.saturday === "morning" ? (
        <FaSun color="yellow" />
      ) : e.saturday === "evening" ? (
        <FaMoon />
      ) : null,
    sunday:
      e.sunday === "morning" ? (
        <FaSun color="yellow" />
      ) : e.sunday === "evening" ? (
        <FaMoon />
      ) : null,
  }));

  return (
    <>
      <div className=" flex justify-center text-2xl my-5 space-x-3">
        <div className="flex ">
          <FaMoon color="" className="mt-1 mr-1" />
          Үдэш
        </div>
        <div className="flex items-baseline">
          <FaSun color="yellow" className="mt-1 mr-1" />
          Өглөө
        </div>
      </div>
      <div className="w-1/2 mx-auto ">
        {" "}
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
        <div className="mt-4 text-sm">
          {" "}
          Өглөө: 07:00-10:00, {"    "}Үдэш: 21:00-01:00
        </div>
      </div>
    </>
  );
}
