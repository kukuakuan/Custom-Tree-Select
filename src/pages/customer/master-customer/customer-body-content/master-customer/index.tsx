import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd';
import './style.scss'
import {
  DownloadOutlined,
  PlusCircleOutlined,
  DownOutlined,
  SearchOutlined,
  MoreOutlined,
  UploadOutlined
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useCallback, useEffect, useMemo, useState } from 'react';
import FilterIcon from '../../../../../constants/icon/setting-4.svg'
import DocumentPDF from '../../../../../constants/icon/document--epdf.svg'
import FillCircle from '../../../../../constants/icon/circle-fill.svg'
import FillCircleBlack from '../../../../../constants/icon/Vector.svg'
import {map, get} from "lodash"
import CustomPagination from '../../../../../components/custom-pagination';
import { customerData } from '../../../../../constants/constant/customer-data'
import {useNavigate} from 'react-router-dom'	
import CustomModal from '../../../../../components/custom-modal';
import { useCustomModal } from '../../../../../components/custom-modal/use-modal';
interface MasterCustomerProps {
  // toggle?: any,
  setTitle?: any,
}

const MasterCustomer: React.FunctionComponent<MasterCustomerProps> = () => {
  

  const itemDropdown = [
    {
      title: "Loại khách hàng",
      key: "1",
    },
    {
      title: "Phiên bản",
      key: "2",
    },
    {
      title: "Trạng thái",
      key: "3",
    },
  ];

  const columnsTable = [
    {
      title: "Mã khách hàng",
      dataIndex: "customerId",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
    },
    {
      title: "Nhóm khách hàng",
      dataIndex: "customerGroup",
    },
    {
      title: "Mã số thuế",
      dataIndex: "customerTax",
    },
    {
      title: "Ngành nghề",
      dataIndex: "customerWork",
    },
    {
      title: "Loại SP kinh doanh",
      dataIndex: "customerBussinessProductType",
    },
    {
      title: "Nhãn hiệu",
      dataIndex: "customerBrand",
    },
    {
      title: "Trạng thái",
      dataIndex: "customerStatus",
      render: (text: any, record: any, index: any) => (
        <div>
          {record.customerStatus ?
            <Row>
              <img src={FillCircle} alt="fill-circle" style={{ marginRight: "10px" }} />
              <span className='status-active'>Hoạt động</span>
            </Row>
            :
            <Row>
              <img src={FillCircleBlack} alt="fill-circle" style={{ marginRight: "10px" }} />
              <span className='status-deactive'>Dừng hoạt động</span>
            </Row>}
        </div>
      )
    }
  ]

  const navigate = useNavigate();
  const deleteData = (id: any) => {
    for(let i in customerData){
      if(customerData[i].customerId === id){
        customerData.splice(Number(i),1)
        console.log(customerData)
      }
    }
  }

  const actionEdit = {
    title: "Trạng thái",
    dataIndex: "action",
    width: "5%",
    key: "12",
    render: (text: any, record: any, index: any) => (
      <Dropdown
        overlay={
          <Menu
            items={[
              {
                label: <span onClick={() => { navigate(`/customer/customerId=${record.customerId}`,{replace:true}) }}>Xem</span>,
                key: "1",
              },
              {
                label: <span onClick={() => { navigate(`/customer/customerId=${record.customerId}`,{replace:true}) }}>Sửa</span>,
                key: "2",
              },
              {
                label: <span onClick={() => { deleteData(record.customerId) }}>Xóa</span>,
                key: "3",
                danger: true,
              },
            ]}
          >
          </Menu>
        }
      >
        <div onClick={(e) => e.preventDefault()}>
          <MoreOutlined style={{ color: "black" }} />
        </div>
      </Dropdown>
    ),
  };
  const {isShowing, toggle} = useCustomModal();

  const [data, setData] = useState(Array<any>);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [visibleInputSearch, setVisibleInputSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const [itemDropdown, setItemDropdown] = useState(Array<any>);
  const [dropdownTitle, setDropdownTitle] = useState(itemDropdown[0]?.title);
  // const { isShowing, toggle } = useCustomModal();
  const onHandleChangeSort = ({ ...params }) => {
    setDropdownTitle(itemDropdown[params.key].title);
  };
  const menuFilter = () => {
    // setItemDropdown(dropdown);
    return (
      // tslint:disable-next-line: jsx-wrap-multiline
      <Menu onClick={onHandleChangeSort}
      >
        {[
          ...Array.from(
            {
              length: itemDropdown?.length,
            },
            (_, i) => i
          ),
        ].map((i) => (
          <Menu.Item key={i}>{itemDropdown[i]?.title}</Menu.Item>
        ))}
      </Menu>
    )
  };
  const onExportXlsx = () => {
    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "TestSheet1");
    XLSX.writeFile(wb, "TestExcel.xlsx");
  };

  const onSearch = (e: { target: { value: any; }; }) => {
    const reg = new RegExp(e.target.value, "gi");
    const dataFilter = map(data,record => {
      const nameMatch = get(record, "customerName")?.match(reg);
      if(!nameMatch) return null;
      return record;
    }).filter(record => !!record);
    // setVisibleInputSearch(false)
    setSearchText(e.target.value);
    setData(e.target.value? dataFilter : data);
    console.log(currentTableData)
  };

  const onAdvancedSearch = (filterData: any) => {
    // const dataFilter = 
    // setData(dataFilter);
  };

  const onFinish = async (values: any) => {
    let dataValue: any = {}
    dataValue = {...values}
    onAdvancedSearch(dataValue)
  }

  const testFooter = () => {
    let dataLength = 0;
    if (data) {
      dataLength = data.length
    }
    else dataLength = 0

    return (
      <CustomPagination
        className="pagination-bar"
        currentPage={page}
        totalCount={dataLength}
        pageSize={pageSize}
        onPageSizeChange={(pageSize: number) => setPageSize(pageSize)}
        onPageChange={(page: number) => setPage(page)}
      />
    )
  };

  const currentTableData = useMemo(() => {
    if (data) {
      const firstPageIndex = (page - 1) * pageSize;
      const lastPageIndex = Number(firstPageIndex) + Number(pageSize);
      return data.slice(firstPageIndex, lastPageIndex);
    }
    else return []
  }, [data, page, pageSize]);

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
 
  useEffect(() => {
    setData(customerData);
  }, [])

  return (
    <div className="master-customer">
      <Col>
        <Row className="master-customer-header">
          <Col span={12} style={{ height: "100%" }}>
            <Row gutter={[18, 0]} style={{ alignItems: "center", height: "100%", marginLeft: "17px" }}>
              <Col style={{ height: "100%" }}>
                <Dropdown overlay={menuFilter}>
                  <div onClick={(e) => e.preventDefault()}>
                    <Space>
                      {dropdownTitle}
                      <DownOutlined className='test-dropdown' />
                    </Space>
                  </div>
                </Dropdown>
              </Col>
              <Col>
                <Dropdown overlay={menuFilter}>
                  <div onClick={(e) => e.preventDefault()}>
                    <Space>
                      {dropdownTitle}
                      <DownOutlined className='test-dropdown' />
                    </Space>
                  </div>
                </Dropdown>
              </Col>
              <Col>
                <Dropdown overlay={menuFilter}>
                  <div onClick={(e) => e.preventDefault()}>
                    <Space>
                      {dropdownTitle}
                      <DownOutlined className='test-dropdown' />
                    </Space>
                  </div>
                </Dropdown>
              </Col>
              <Col>
                <Dropdown overlay={menuFilter}>
                  <div onClick={(e) => e.preventDefault()}>
                    <Space>
                      {dropdownTitle}
                      <DownOutlined className='test-dropdown' />
                    </Space>
                  </div>
                </Dropdown>
              </Col>
              <Col>
                <Button 
                  onClick={toggle}
                  style={{ border: "none" }}
                >
                  <Space>
                    More
                    <img src={FilterIcon} alt="filter-icon" />
                  </Space>
                </Button>
              </Col>
              <Col>
                <Dropdown overlay={
                  <Input.Search 
                    className="search-input"
                    value={searchText}
                    onChange={onSearch}
                    placeholder="Search ..."
                  // loading={true}
                  // allowClear={true}
                  />
                }
                  visible={visibleInputSearch}
                >
                  <div onClick={() => setVisibleInputSearch(!visibleInputSearch)}>
                    <SearchOutlined />
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row gutter={[20, 0]} style={{ height: "100%" }}>
              <Col className="item-right" style={{ paddingRight: "0" }}>
                <Row gutter={[8, 0]} style={{ height: "100%" }}>
                  <Col className="button-xlsx">
                    <Button
                      key="test"
                      icon={<DownloadOutlined />}
                      onClick={onExportXlsx}
                    />
                  </Col>
                  <Col className="button-xlsx">
                    <Button
                      key="test"
                      icon={<UploadOutlined />}
                    />
                  </Col>
                  <Col className="button-xlsx">
                    <Button
                      key="test"
                      icon={<img src={DocumentPDF} alt="document-pdf" />}
                    />
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={()=>navigate('/customer/new-customer',{replace:true})}
                    >
                      Thêm mới
                      <PlusCircleOutlined />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Table
          dataSource={currentTableData}
          size="small"
          footer={testFooter}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={false}
        >
          {[
            ...Array.from(
              {
                length: columnsTable.length,
              },
              (_, i) => i
            ),
          ].map((i) => (
            <Table.Column
              key={`${i + 2}`}
              title={columnsTable[i].title}
              dataIndex={columnsTable[i].dataIndex}
              render={columnsTable[i]?.render}
            />
          ))}
          <Table.Column
            key={actionEdit.key}
            // title={actionEdit.title}
            dataIndex={actionEdit.dataIndex}
            width={actionEdit.width}
            render={actionEdit.render}
          />

        </Table>
      </Col>
      <CustomModal
          onFinish = {onFinish}
          isShowing={isShowing}
          hide={toggle}
      />
    </div>
  );
}

export default MasterCustomer;