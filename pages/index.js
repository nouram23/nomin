import { Form, Checkbox } from "antd";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Layout/Navbar";
import { CSVLink } from "react-csv";
import { Button, Modal, Input, Table } from "antd";
import { useState } from "react";
import * as xlsx from "xlsx";
import { RiFileExcel2Line } from "react-icons/ri";

export default function Home({ branch }) {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState(branch);
  const [branchName, setBranchName] = useState("");
  const [seniorAccountant, setSeniorAccountant] = useState("");
  const [seniorAccountantPhone, setSeniorAccountantPhone] = useState("");
  const [billingAccountant, setBillingAccountant] = useState("");
  const [billingAccountantPhone, setBillingAccountantPhone] = useState("");
  const groupBy = (arr, key) => {
    const initialValue = {};
    return arr.reduce((acc, cval) => {
      const myAttribute = cval[key];
      acc[myAttribute] = [...(acc[myAttribute] || []), cval];
      return acc;
    }, initialValue);
  };
  const bdata = groupBy(branch, "group");
  // console.log(branch);
  console.log("bus --> ", JSON.stringify(bdata.bus));
  console.log("club --> ", JSON.stringify(bdata.club));
  console.log("length--> ", bdata.bus.length);

  let keys = Object.keys(bdata);

  console.log(keys.length);
  for (let value = 0; value < keys.length; value++) {
    const element = bdata[keys[value]];
    console.log(keys[value]);
    element.map((e) => {
      console.log(e);
    });
  }

  const handleOnClick = () => {
    var wb = xlsx.utils.book_new(),
      ws = xlsx.utils.json_to_sheet(dataSource);

    xlsx.utils.book_append_sheet(wb, ws, "sheet");
    xlsx.writeFile(wb, "MyExcel.xlsx");
  };

  const FilterByBranchNameInput = (
    <div>
      <label className="flex justify-center"> Салбарын нэр</label>
      <Input
        value={branchName}
        onChange={(e) => {
          const currValue = e.target.value.toLowerCase();
          setBranchName(currValue);
          const filteredData = branch.filter((entry) =>
            entry.branchName.toLowerCase().includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />
    </div>
  );
  const FilterBySeniorAccountantInput = (
    <div>
      <label className="flex justify-center"> Ахлах нябо нэр</label>
      <Input
        value={seniorAccountant}
        onChange={(e) => {
          const currValue = e.target.value.toLowerCase();
          setSeniorAccountant(currValue);
          const filteredData = branch.filter((entry) =>
            entry.seniorAccountant.toLowerCase().includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />
    </div>
  );
  const FilterBySeniorAccountantPhoneInput = (
    <div>
      <label className="flex justify-center"> Ахлах нябо-ийн дугаар</label>
      <Input
        value={seniorAccountantPhone}
        onChange={(e) => {
          const currValue = e.target.value.toLowerCase();
          setSeniorAccountantPhone(currValue);
          const filteredData = branch.filter((entry) =>
            entry.seniorAccountantPhone.toLowerCase().includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />
    </div>
  );
  const FilterByBillingAccountantInput = (
    <div>
      <label className="flex justify-center"> Тооцооны нябо нэр</label>
      <Input
        value={billingAccountant}
        onChange={(e) => {
          const currValue = e.target.value.toLowerCase();
          setBillingAccountant(currValue);
          const filteredData = branch.filter((entry) =>
            entry.billingAccountant.toLowerCase().includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />
    </div>
  );
  const FilterByBillingAccountantPhoneInput = (
    <div>
      <label className="flex justify-center"> Тооцооны нябо дугаар</label>
      <Input
        value={billingAccountantPhone}
        onChange={(e) => {
          const currValue = e.target.value.toLowerCase();
          setBillingAccountantPhone(currValue);
          const filteredData = branch.filter((entry) =>
            entry.billingAccountantPhone.toLowerCase().includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />
    </div>
  );
  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },
    {
      title: FilterByBranchNameInput,
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: FilterBySeniorAccountantInput,
      dataIndex: "seniorAccountant",
      key: "seniorAccountant",
    },
    {
      title: FilterBySeniorAccountantPhoneInput,
      dataIndex: "seniorAccountantPhone",
      key: "seniorAccountantPhone",
    },
    {
      title: FilterByBillingAccountantInput,
      dataIndex: "billingAccountant",
      key: "billingAccountant",
    },
    {
      title: FilterByBillingAccountantPhoneInput,
      dataIndex: "billingAccountantPhone",
      key: "billingAccountantPhone",
    },
  ];

  return (
    <Navbar>
      <Button className="" onClick={() => setVisible(true)}>
        Салбаруудын утасны дугаар
      </Button>
      <Modal
        title="Салбаруудын утасны дугаар"
        style={{
          top: "20%",
        }}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={1300}
      >
        <button> </button>
        {/* <CSVLink data={dataSource}>Download me</CSVLink>; */}
        <Button onClick={handleOnClick}>
          <RiFileExcel2Line color="green" size={20} />
        </Button>
        <Table
          scroll={{
            y: 350,
          }}
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </Modal>

      <>{Object.keys(bdata)}</>
    </Navbar>
  );
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/branch");
  const branch = await res.json();

  return {
    props: {
      branch,
    }, // will be passed to the page component as props
  };
}
