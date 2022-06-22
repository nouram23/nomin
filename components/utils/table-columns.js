export const excelDataColumns = [

  {
    render : (_ , item , index) =>(
      <a>{index + 1}</a>
    )
  },
  {
    title: 'Барааны код ',
    dataIndex: 'itemId',
    key: 'itemId',
  },
  {
    title: 'Барааны нэр',
    dataIndex: 'itemName',
    key: 'itemName',
  },
  {
    title: 'Бар код',
    dataIndex: 'itemBarCodeId',
    key: 'itemBarCodeId',
  },
  {
    title: 'Дэлгүүрийн код',
    dataIndex: 'locationId',
    key: 'locationId',
  },
  {
    title: 'Дэлгүүрийн нэр',
    dataIndex: 'locationName',
    key: 'locationName',
  },
  {
    title: 'Хүлээн авах огноо',
    dataIndex: 'orderDate',
    key: 'orderDate',
  },
  {
    title: 'Захиалах тоо',
    dataIndex: 'quotationQty',
    key: 'quotationQty',
  }

]