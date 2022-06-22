import {
  Col,
  Input,
  Row,
  Select,
  Radio,
  Tabs,
  Table,
  Switch,
  Space,
  Button,
  DatePicker,
  Modal,
  Checkbox,
  Tag,
  message,
  InputNumber,
} from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Layout/Navbar";
import Draggable from "react-draggable";
import moment from "moment";
import * as XLSX from "xlsx";
import { SearchOutlined } from "@ant-design/icons";
import { excelDataColumns } from "../../components/utils/table-columns";

const { Option } = Select;
const dateFormat = "YYYY-MM-DD";

export default function OrderForm() {
  const router = useRouter();
  const { pkey } = router.query;

  const [value, setValue] = useState(1);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [isTableRender, setIsTableRender] = useState(false);

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [barCodeList, setBarCodeList] = useState([]);

  const draggleRef = useRef();
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const [paginationModal, setPaginationModal] = useState({
    current: 1,
    pageSize: 5,
    filter: "",
    total: 50,
  });
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState({
    pKey: "",
    id: "Барааны код",
    name: "Барааны нэр",
  });
  const [selectedBarCodeItem, setSelectedBarCodeItem] = useState({
    pKey: "",
    id: "Код",
    name: "Нэр ",
  });

  const [data, setData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [onClickItem, setOnClickItem] = useState({});
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [allDate, setAllDate] = useState("");
  const [allOrderQty, setAllOrderQty] = useState("");
  const [isAllOrder, setIsAllOrder] = useState(false);

  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  // submit
  const [excelData, setExcelData] = useState(null);
  //response
  const [excelResponseData, setExcelResponseData] = useState([]);
  const [renderDataTable, setRenderDataTable] = useState(0);

  const [localUserKey, setLocalUserKey] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userKey") === "") router.push("/notfound");
    if (localUserKey === "") setLocalUserKey(localStorage.getItem("userKey"));
  }, []);

  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
      width: "12%",
    },
    {
      title: "Хүлээн авах огноо",
      dataIndex: "orderDate",
      width: "30%",
      key: "orderDate",
      render: (_, record) => {
        return (
          <>
            {record.children ? null : record.orderDate === "" ? (
              <DatePicker
                value={moment(record.orderDate, dateFormat)}
                defaultValue={moment(record.orderDate, dateFormat)}
                onChange={onChangeDate}
                onClick={() => {
                  clickedItem(record);
                }}
              />
            ) : (
              <DatePicker
                value={moment(record.orderDate, dateFormat)}
                onChange={onChangeDate}
                defaultValue={moment(record.orderDate, dateFormat)}
                onClick={() => {
                  clickedItem(record);
                }}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Захиалах тоо",
      dataIndex: "orderQty",
      width: "30%",
      key: "orderQty",
      render: (_, record) => {
        return (
          <>
            {record.children ? null : (
              <InputNumber
                value={record.orderQty}
                min={1}
                max={100}
                className="w-full "
                placeholder="захиалах тоо"
                onChange={onChangeOrderQty}
                onClick={() => {
                  clickedItem(record);
                }}
              />
            )}
          </>
        );
      },
    },
  ];

  // table on modal columns -- filterd data
  const columnsFilter = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
      render: (_, record) => {
        return (
          <>
            <a
              onClick={() => {
                onChangeModalCheckbox(record);
              }}
            >
              {record.id}
            </a>
          </>
        );
      },
    },
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <>
            <a
              onClick={() => {
                onChangeModalCheckbox(record);
              }}
            >
              {record.name}
            </a>
          </>
        );
      },
    },
  ];

  // rendered table on modal -- barcode list
  const columnsBarCode = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
      render: (_, record) => {
        return (
          <>
            <a
              onClick={() => {
                onChangeModalBarCode(record);
              }}
            >
              {record.id}
            </a>
          </>
        );
      },
    },
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <>
            <a
              onClick={() => {
                onChangeModalBarCode(record);
              }}
            >
              {record.name}
            </a>
          </>
        );
      },
    },
  ];

  const onChangeModalCheckbox = (e) => {
    message.success(e.name);
    setIsTableRender(false);
    setSelectedItem(e);
  };

  const getBarCode = () => {
    axios
      .post("/api/get/rest/vendor/barCodes", { itemKey: selectedItem.pKey })
      .then((result) => {
        if (result.status == 200) {
          setBarCodeList(result.data);
        } else message.warning("Бар код олдсонгүй ");
      });
    // .then(error => {
    //   console.log('error: ' + JSON.stringify(error));
    // })
  };

  const onChangeModalBarCode = (e) => {
    message.success(JSON.stringify(e.name));
    setSelectedBarCodeItem(e);
  };

  //search button
  const search = () => {
    setLoading(true);
    axios
      .post("/api/post/rest/vendor/items", paginationModal)
      .then((result) => {
        setFilteredData(result.data);
        setLoading(false);
      })
      .then((error) => {
        console.log(error);
      });
  };

  //events
  const onChangeFilteredName = (event) => {
    setFilter(event.target.value);
    setPaginationModal({ ...paginationModal, filter: event.target.value });
  };

  //radio button event
  const onChangeRadio = (e) => {
    setValue(e.target.value);

    if (selectedItem.pKey === "") message.warning("Бараа сонгоно уу");
    else {
      let data = {
        itemKey: selectedItem.pKey,
        divisionType: e.target.value,
      };
      axios
        .post("/api/post/rest/vendor/locations", data)
        .then((result) => {
          setData(result.data);
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  //save
  const saveSelectedData = () => {
    if (renderDataTable == 0) {
      if (selectedItem.pKey === "") {
        message.warning("Бараа сонгон уу");
      }
      const obj = selectedRowData.map((item) => {
        const newObj = {
          ...item,
          id: undefined,
          name: undefined,
        };
        return newObj;
      });

      let json = {
        itemKey: selectedItem.pKey,
        itemBarCodeKey: selectedBarCodeItem.pKey,
        userKey: localUserKey,
        systemType: "Accounting",
        divisionType: 1,
        details: obj,
      };
      axios
        .post("/api/post/rest/vendor/saveFirstOrder", json)
        .then((result) => {
          message.success(result.data);
          router.push("/first-order");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log("typeof", typeof renderDataTable);
    if (renderDataTable == 1) {
      axios
        .post("/api/post/rest/vendor/saveListOrder", excelResponseData)
        .then((result) => {
          // console.log("result ---> " + JSON.stringify(result));
          message.success(result.data);
          router.push("/first-order");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowData(selectedRows);
      console.log(JSON.stringify(selectedRows));
    },
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log('changeRows --> ' + JSON.stringify(changeRows));
      // console.log(selected, selectedRows, changeRows);
      // setSelectedRowData(selectedRows)
    },
  };

  const clickedItem = (item) => {
    setOnClickItem(item);
  };
  //order Qty
  const onChangeOrderQty = (e) => {
    onChangeDateAndOrderQty("orderQty", e);
    afterChangedSelectedItem("orderQty", e);
  };
  //date changed
  const onChangeDate = (date, dateString) => {
    onChangeDateAndOrderQty("date", dateString);
    afterChangedSelectedItem("date", dateString);
  };

  // changed date and order qty
  const onChangeDateAndOrderQty = (key, value) => {
    const newData = data;
    newData.map((item) => {
      item.children.map((child) => {
        if (child.pKey === onClickItem.pKey) {
          if (key === "date") child.orderDate = value;
          else child.orderQty = value;
        }
      });
    });
    setData(newData);
  };

  //after selected data changed date or order qty
  const afterChangedSelectedItem = (key, value) => {
    let newSelectedRowData = selectedRowData.map((item) => {
      if (item.pKey === onClickItem.pKey) {
        if (key === "date") {
          const updatedItem = {
            ...item,
            orderDate: value,
          };
          return updatedItem;
        } else {
          const updatedItem = {
            ...item,
            orderQty: value,
          };
          return updatedItem;
        }
      }
      return item;
    });
    setSelectedRowData(newSelectedRowData);
  };

  // Modal events ---
  const showModal = () => {
    setSelectedBarCodeItem({
      pKey: "",
      id: "Барааны код",
      name: "Барааны нэр",
    });
    setVisible(true);
  };
  const handleOk = (e) => {
    setVisible(false);
    setIsTableRender(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const handleTableChange = (pager, filters, sorter) => {
    setPaginationModal({
      ...paginationModal,
      current: pager.current,
    });
    search();
  };

  //all order  Modal events
  const allOrderAdd = () => {
    let newSelectedRowData = selectedRowData.map((item) => {
      const updatedItem = {
        ...item,
        orderDate: allDate,
        orderQty: allOrderQty,
      };
      return updatedItem;
    });
    setSelectedRowData(newSelectedRowData);

    const newData = data;
    newData.map((item) => {
      item.children.map((child) => {
        selectedRowData.map((selectedItem) => {
          if (child.pKey === selectedItem.pKey) {
            child.orderDate = allDate;
            child.orderQty = allOrderQty;
          }
        });
      });
    });

    setData(newData);
    setIsAllOrder(false);
    message.success("Огноо болон захиалах тоо нэмэгдлээ ");
  };

  const onAllDate = (date, dateString) => {
    setAllDate(dateString);
  };
  const onAllOrderQty = (e) => {
    setAllOrderQty(e);
  };

  //filter on tree table
  const onChangeSearch = (text) => {
    let updatedData = [];
    let lastList = [];
    const newData = data;
    let filteredTable;
    newData.map((item) => {
      filteredTable = item.children.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(text.toLowerCase())
        )
      );
      lastList = {
        pKey: item.pKey,
        id: item.id,
        name: item.name,
        children: filteredTable,
      };
      updatedData.push(lastList);
    });
    setFilterTable(updatedData);
  };

  // handle File
  const fileType = ["application/vnd.ms-excel"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Зөвхөн xls төрөлтэй файл оруулна уу ");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      data.map((element) => {
        renameKey(element, "Баркод*", "barCode");
        renameKey(element, "Дотоод код*", "itemId");
        renameKey(element, "Дэлгүүрийн код", "shopCode");
        renameKey(element, "Дэлгүүрийн төрлийн код", "shopTypeCode");
        renameKey(element, "Зөвхөн нийслэл эсэх", "onlyCity");
        renameKey(element, "Ширхэг", "qty");
      });

      setExcelData(data);
      // console.log('data --------------------> ' + JSON.stringify(data));

      axios.post("/api/post/rest/vendor/fileUpload", data).then(
        (result) => {
          // console.log("JSON RES: " + JSON.stringify(result.data));
          let newResult = result.data.list.map((item) => {
            const newItem = {
              userKey: localUserKey,
              itemKey: item.itemKey,
              itemId: item.itemId,
              itemName: item.itemName,
              itemBarCodeId: item.itemBarCodeId,
              locationId: item.locationId,
              locationName: item.locationName,
              orderDate: moment(item.orderDate).format("YYYY-MM-DD"),
              quotationQty: item.quotationQty,
              vendorKey: item.vendorKey,
              divisionKey: item.divisionKey,
              locationKey: item.locationKey,
            };
            return newItem;
          });

          setExcelResponseData(newResult);
          setRenderDataTable(1);
        },
        (error) => {
          console.log("error ----> ", JSON.stringify(error));
        }
      );
    } else {
      setExcelData(null);
    }
  };
  //json key rename
  const renameKey = (obj, oldKey, newKey) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  };

  return (
    <Navbar>
      {renderDataTable == 0 ? (
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Row>
                <Col className="mr-2 pt-1">Бараа:</Col>
                <Col>
                  {/* <Input disabled value={selectedItem.id}/> */}
                  <Tag className="h-8 pt-1" color="cyan">
                    {selectedItem.id}
                  </Tag>
                </Col>
                <Col>
                  {/* <Input disabled value={selectedItem.name} /> */}
                  <Tag className="h-8 pt-1" color="green">
                    {selectedItem.name}
                  </Tag>
                </Col>
                <Button
                  type="default"
                  size="middle"
                  className="bg-sky-500 text-white float-right"
                  onClick={showModal}
                >
                  Сонгох
                </Button>
              </Row>
            </Col>

            <Col span={12}>
              <Row style={{ marginLeft: "auto", float: "right" }}>
                <Col className="pt-1 pr-2">Бар код:</Col>
                <Col>
                  <Tag className="h-8 pt-1" color="cyan">
                    {selectedBarCodeItem.id}
                  </Tag>
                </Col>
                <Col>
                  <Tag className="h-8 pt-1" color="green">
                    {selectedBarCodeItem.name}
                  </Tag>
                </Col>
                <Button
                  type="default"
                  size="middle"
                  className="bg-sky-500 text-white float-right"
                  onClick={() => {
                    setIsTableRender(true);
                    getBarCode();
                  }}
                >
                  Сонгох
                </Button>
              </Row>
            </Col>
          </Row>
          <Row className="topPadding-16">
            <Radio.Group onChange={onChangeRadio} value={value}>
              <Radio value={1}>БҮС</Radio>
              <Radio value={2}>Н/К-ын дэлгүүрүүд</Radio>
            </Radio.Group>
          </Row>
          <Input
            prefix={<SearchOutlined />}
            className="mt-2"
            placeholder="Нэр код хайх..."
            // onSearch={searchTree}
            onChange={(e) => {
              onChangeSearch(e.target.value);
            }}
          />
          <Table
            bordered={true}
            size="small"
            scroll={{ y: 440 }}
            rowKey={"pKey"}
            className="pt-4 pb-4"
            columns={columns}
            rowSelection={{ ...rowSelection, checkStrictly }}
            pagination={false}
            dataSource={filterTable == null ? data : filterTable}
            // dataSource={data}
          />
        </>
      ) : null}

      {renderDataTable == 1 ? (
        <Table
          className="pt-4"
          bordered={true}
          size="small"
          dataSource={excelResponseData}
          columns={excelDataColumns}
          pagination={1}
          rowKey="itemKey"
          key="itemKey"
        />
      ) : null}

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          span={12}
          className="pt-1"
          style={{ marginLeft: "auto", float: "right" }}
        >
          <Button
            type="default"
            className="bg-sky-500 text-white"
            onClick={() => {
              saveSelectedData();
            }}
          >
            Хадгалах
          </Button>
          <Button
            type="default"
            className="bg-green-500 ml-2 text-white"
            onClick={() => router.back()}
          >
            Буцах
          </Button>
          {/* <Button type='default' className='bg-sky-500 ml-2 text-white'>Экселээс татах</Button> */}
          <Button
            type="default"
            className="bg-sky-500 ml-2 text-white"
            onClick={() => {
              setIsAllOrder(true);
            }}
          >
            Огноо болон захиалах тоо оруулах
          </Button>
        </Col>

        <Col span={12}>
          <form
            autoComplete="off"
            style={{ marginLeft: "auto", float: "right" }}
            onSubmit={handleSubmit}
          >
            <input
              className="custom-file-input"
              type="file"
              title="aaaaaaa"
              onChange={handleFile}
              required
            ></input>
            {excelFileError && (
              <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                {excelFileError}
              </div>
            )}
            <button
              type="submit"
              className="Uploadbutton"
              style={{ marginTop: 5 + "px" }}
            >
              Хуулах
            </button>
            <Button className="bg-orange-300 text-white pr-1 ml-2">
              <a href={`/api/file/getFile/?file=${"FirstOrderTemplate.xlsx"}`}>
                Загвар эксел татах
              </a>
            </Button>
          </form>
        </Col>
      </Row>

      <Modal
        width={1000}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Бараа сонгох
          </div>
        }
        visible={visible}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
        // onCancel={()=>{setIsTableRender(false)}}
        closable={false}
        footer={[
          <Button
            key={1}
            onClick={handleCancel}
            className="bg-sky-500 text-white"
          >
            Цуцлах
          </Button>,
          <Button
            key={2}
            onClick={handleOk}
            className="bg-green-400 text-white"
          >
            Батлах
          </Button>,
        ]}
      >
        <Row className="mb-2">
          <Col span={20}>
            {" "}
            <Input
              placeholder="Код болон нэрээр хайх"
              onChange={onChangeFilteredName}
            />
          </Col>
          <Col span={4}>
            {" "}
            <Button className=" float-right w-full" onClick={search}>
              Хайх
            </Button>
          </Col>
        </Row>

        <Table
          columns={columnsFilter}
          rowKey="pKey"
          dataSource={filteredData}
          pagination={paginationModal}
          loading={loading}
          onChange={handleTableChange}
        />
      </Modal>

      <Modal
        width={1000}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Бар код сонгох
          </div>
        }
        visible={isTableRender}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
        // onCancel={()=>{setIsTableRender(false)}}
        closable={false}
        footer={[
          <Button
            key={1}
            onClick={() => {
              setIsTableRender(false);
            }}
            className="bg-sky-500 text-white"
          >
            Цуцлах
          </Button>,
          <Button
            key={2}
            onClick={handleOk}
            className="bg-green-400 text-white"
          >
            Батлах
          </Button>,
        ]}
      >
        <Row>
          <Col span={24} className="mb-4">
            <span> Таны сонгосон бараа: </span>
            <Tag className="h-8 pt-1" color="cyan">
              {selectedItem.id}
            </Tag>
            <Tag className="h-8 pt-1" color="green">
              {selectedItem.name}
            </Tag>
            {/* <Button className='bg-red-400 text-white' onClick={() => { setIsTableRender(false) }}>цуцлах</Button> */}
          </Col>
          <Col span={24}>
            <Table
              dataSource={barCodeList}
              columns={columnsBarCode}
              rowKey="itemKey"
            />
          </Col>
        </Row>
      </Modal>

      {/* insert selected list to order date and order qty  */}
      <Modal
        title="Огноо болон захиалах тоо оруулах "
        visible={isAllOrder}
        onCancel={() => {
          setIsAllOrder(false);
        }}
        footer={[
          <Button
            key={1}
            onClick={() => {
              setIsAllOrder(false);
            }}
            className="bg-sky-500 text-white"
          >
            Цуцлах
          </Button>,
          <Button
            key={2}
            onClick={allOrderAdd}
            className="bg-green-400 text-white"
          >
            Оруулах
          </Button>,
        ]}
      >
        <Row>
          <Col span={24} className={"pb-4"}>
            <span className="pr-10">Захиалах тоо: </span>
            <InputNumber
              min={1}
              max={100}
              className="w-64"
              placeholder="захиалах тоо"
              onChange={onAllOrderQty}
            />
          </Col>
          <Col span={24}>
            <span className="pr-2">Хүлээн авах огноо: </span>
            <DatePicker className="w-64" onChange={onAllDate} />
          </Col>
        </Row>
      </Modal>
    </Navbar>
  );
}
