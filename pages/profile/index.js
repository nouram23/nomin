import { Card } from "antd";
import { Col, Divider, Row } from "antd";

export default function Profile() {
  return (
    <div className="">
      <Row className="max-w-6xl  mt-20 mx-auto bg-black/95 text-white p-8">
        <Col flex={1}>
          {" "}
          <Card className="flex flex-col ">
            <div className=" flex flex-col items-center mt-4">
              <img
                className="rounded-full h-32"
                src="https://joeschmoe.io/api/v1/random"
              />
              <h1 className="text-xl font-medium">vendor1</h1>
              <p className="text-lg">Zohion baiguulagch</p>
            </div>
            <div className="h-1 mt-1 border-t-2 w-full"></div>
            <div className="flex flex-col space-y-3 text-base">
              <div>
                <h1 className="font-medium">Хүлээн авагчийн нэр</h1>
                <p>Таван богд интернэйшнл ХХК</p>
              </div>
              <div>
                <h1 className="font-medium">Голомт банк</h1>
                <p>1102034224 (MNT)</p>
              </div>
              <div>
                <h1 className="font-medium">Худалдаа хөгжлийн банк</h1>
                <p>499004451 (MNT)</p>
              </div>
              <div>
                <h1 className="font-medium">Хаан банк</h1>
                <p>5022421869 (MNT)</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col flex={5} className=" flex flex-col text-white text-lg  mx-8">
          <Divider orientation="left" className=" text-white">
            Хувийн мэдээлэл
          </Divider>
          <Row>
            <div className=" h-1 border-t-[1px] w-full "></div>
            <Col flex="120px">ОВОГ:</Col>

            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">НЭР:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">РД:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">УТАС:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">ИМЭЙЛ:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <div className=" h-1 border-t-[1px] w-full mt-1"></div>
          <Divider orientation="left" className="text-white">
            Харилцагчийн мэдээлэл
          </Divider>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">КОД:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">НЭР:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">ТТД:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">РД:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">ТӨРӨЛ:</Col>
            <Col flex="auto">3 / 5</Col>
          </Row>
          <Row>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
            <Col flex="120px">ХАЯГ:</Col>
            <Col flex="auto">Таван богд хшэт </Col>
            <div className=" h-1 border-t-[1px] w-full mt-1"></div>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
// export async function getStaticProps(context) {
//     const res = await fetch("");
//     const profile = await res.json();
//   return {
//     props: {},
//   };
// }
