import { Form, Checkbox } from "antd";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Layout/Navbar";

import Test from "../components/test/index";
import BranchPhoneNumbers from "../components/branchPhoneNumbers";
export default function Home({ branch, test }) {
  console.log(branch);
  return (
    <Navbar>
      <Test test={test} />
      <BranchPhoneNumbers branch={branch} />
    </Navbar>
  );
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/branch");
  const branch = await res.json();
  const result = await fetch("http://localhost:3000/api/test");
  const test = await result.json();

  return {
    props: {
      branch,
      test,
    }, // will be passed to the page component as props
  };
}
