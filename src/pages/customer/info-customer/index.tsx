import './style.scss'
import { Col, Row, Tabs, Form, Button, Space, Table, Input, message, Dropdown, Menu, Popconfirm } from "antd";
import React, { useMemo } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerContactInterface, customerData, CustomerInterface } from "../../../constants/constant/customer-data";
import CustomerBodyHeader from "../layout/customer-body-header";
import MasterHeaderCustomer from "../layout/header-customer";
import {
    DownOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import FilterIcon from '../../../constants/icon/setting-4.svg'
import FillCircle from '../../../constants/icon/circle-fill.svg'
import FillCircleBlack from '../../../constants/icon/Vector.svg'
import CustomPagination from "../../../components/custom-pagination";
import CustomSearchInput from "../../../components/input-search";
interface InfoCustomerProps {
    setTitle?: any,
}

const InfoCustomer: React.FunctionComponent<InfoCustomerProps> = (props) => {
    const { customerId } = useParams();
    const rules = {
        customerId: [{ required: true, message: 'Hãy nhập mã khách hàng!' }],
        customerName: [{ required: true, whitespace: true, message: 'Hãy nhập tên khách hàng!' }],
        customerType: [{ required: true, whitespace: true, message: 'Hãy nhập loại khách hàng!' }],
        customerLevel: [{ whitespace: true }],
        customerTax: [{ required: true, whitespace: true, message: 'Hãy nhập mã số thuế!' }],
        customerWork: [{ whitespace: true }],
        customerBrand: [{ whitespace: true }],
        customerBussinessProductType: [{ whitespace: true }],
        customerStatus: [{ whitespace: true }],
        customerAddress: [{ whitespace: true }],
        customerProvince: [{ whitespace: true }],
        customerDistrict: [{ whitespace: true }],
        customerWards: [{ whitespace: true }],
    }
    const defaultTableContact = [
        {
            title:"STT",
            dataIndex:"stt",
            key:"1",
            width:"5%",
            render:(value:any, item:any, index:number) => index + 1,
        },
        {
            title: 'Tên liên hệ',
            dataIndex: 'contactName',
            editable: true,
        },
        {
            title: 'Phương thức liên hệ',
            dataIndex: 'contactType',
            editable: true,
        },
        {
            title: 'Thông tin liên hệ',
            dataIndex: 'contactInfo',
            editable: true,
        },
        {
            title: "Xóa",
            dataIndex: "operation",
            render: (_: any, record: any) =>
              dataSource.length >= 1 ? (
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <span style={{color:"blue"}}>Delete</span>
                </Popconfirm>
              ) : null
          }
    ]
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

    const [dataSource, setDataSource] = useState(Array<CustomerContactInterface>);
    const [count, setCount] = useState(0);
    const [dropdownTitle, setDropdownTitle] = useState(itemDropdown[0]?.title);
    const [data, setData] = useState(Array<any>);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visibleInputSearch, setVisibleInputSearch] = useState(false);

    const navigate = useNavigate();

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

    const onSearch = (searchText: string) => {
        const filterEvents = data.filter(({ customerName }) => {
            customerName = customerName.toLowerCase();
            return customerName.includes(searchText);
        });
        setVisibleInputSearch(false)
        setData(filterEvents);
    };
    const EditableContext = React.createContext(null);
    const EditableRow = ({ index, ...props }: { index: any }) => {
        const [form]: Array<any> = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };
    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }: {
        title: any,
        editable: any,
        children: any,
        dataIndex: any,
        record: any,
        handleSave: any,
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef<any>(null);
        const form: any = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                if (inputRef.current != null) {
                    inputRef.current.focus();
                }
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form?.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const getCustomerData = (customerId: any) => {
        for (let contact of customerData) {
            if (contact.customerId === customerId) {
                setDataSource(contact.customerContact)
                return contact;
            }
        }
    }

    const customerContact = useMemo(() => getCustomerData(customerId), [customerId])

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const handleSave = (row: any) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };
    const handleDelete = (key: any) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
      };
    const handleAdd = () => {
        const newData = {
            key: count,
            contactName: "Tên khách hàng liên hệ",
            contactType: 'Phương thức liên hệ',
            contactInfo: 'Thông tin liên hệ',
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const columnsTableContact = defaultTableContact.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: any) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const onFinishFill = async (values: CustomerInterface) => {

        let dataKey = Number(customerId);
        let dataValue: CustomerInterface = {}
        dataValue.key = dataKey;

        // let formData = new FormData();
        // formData.append('key', nextKey);
        dataValue = { ...dataValue, ...values };
        dataValue.customerContact = dataSource;


        try {
            for (let contact of customerData) {
                if (contact.customerId === customerId) {
                    contact = Object.assign(contact, dataValue);
                }
            }

            console.log(customerData)
            message.success({
                content: 'Thành công',
            })
        }
        catch (err) {
            console.log(err)
            message.error("Failed")
        }
        finally {
            // window.scrollTo(0, 0);
            navigate('/customer', { replace: true })
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const dataTable = [
        {
            key: '1',
            groupId: "1",
            groupName: "text",
            groupStatus: true
        },
        {
            key: '2',
            groupId: "2",
            groupName: "text",
            groupStatus: true
        },
        {
            key: '3',
            groupId: "3",
            groupName: "text",
            groupStatus: true
        }
    ]

    const columnsTable = [
        {
            title: "Mã nhóm",
            dataIndex: "groupId",
        },
        {
            title: "Tên nhóm",
            dataIndex: "groupName",
        },
        {
            title: "Trạng thái",
            dataIndex: "groupStatus",
            render: (text: any, record: any, index: any) => (
                <div>
                    {record.groupStatus ?
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

    return (
        <Col>
            <Row style={{ width: "100%" }}>
                <MasterHeaderCustomer />
            </Row>
            <Row>
                <CustomerBodyHeader title={"Thông tin khách hàng"} />
            </Row>
            <Row>
                <Form onFinish={onFinishFill}
                    onFinishFailed={onFinishFailed}
                    initialValues={customerContact}
                >
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Thông tin chung" key="1">

                            <Col style={{ margin: "0px 34px 0px 32px" }}>
                                <Col>
                                    <Row className="label-title">
                                        <Col span={24}>
                                            <span>Thông tin chung</span>
                                        </Col>
                                    </Row>
                                    <Row className="input-item"
                                        gutter={[32, 0]}
                                    >
                                        <Col span={6}>
                                            <Form.Item
                                                className='ant-form-item-input'
                                                name='customerId'
                                                rules={rules.customerId}
                                                label="Mã khách hàng*"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Nhập mã khách hàng" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerName'
                                                className='ant-form-item-input'
                                                rules={rules.customerName}
                                                label="Tên khách hàng*"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Nhập khách hàng" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerType'
                                                className='ant-form-item-input'
                                                rules={rules.customerType}
                                                label="Loại khách hàng*"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Chọn loại khách hàng" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerLevel'
                                                className='ant-form-item-input'
                                                rules={rules.customerLevel}
                                                label="Cấp khách hàng"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Chọn cấp khách hàng" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerTax'
                                                className='ant-form-item-input'
                                                rules={rules.customerTax}
                                                label="Mã số thuế*"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Nhập mã số thuế" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerWork'
                                                className='ant-form-item-input'
                                                rules={rules.customerWork}
                                                label="Ngành nghề kinh doanh"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Chọn ngành nghề kinh doanh" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerBrand'
                                                className='ant-form-item-input'
                                                rules={rules.customerBrand}
                                                label="Nhãn hiệu"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Nhập thông tin nhãn hiệu" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerBussinessProductType'
                                                className='ant-form-item-input'
                                                rules={rules.customerBussinessProductType}
                                                label="Loại SP kinh doanh"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Nhập loại SP kinh doanh" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerStatus'
                                                className='ant-form-item-input'
                                                rules={rules.customerStatus}
                                                label="Trạng thái"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Hoạt động" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row className="label-title">
                                        <Col span={24}>
                                            <span>Địa chỉ</span>
                                        </Col>
                                    </Row>
                                    <Row className="input-item"
                                        gutter={[32, 0]}
                                    >
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerAddress'
                                                className='ant-form-item-input'
                                                rules={rules.customerAddress}
                                                label="Địa chỉ"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Nhập địa chỉ" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerProvince'
                                                className='ant-form-item-input'
                                                rules={rules.customerProvince}
                                                label="Tỉnh/thành"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Chọn tỉnh thành" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerDistrict'
                                                className='ant-form-item-input'
                                                rules={rules.customerDistrict}
                                                label="Quận/huyện"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Chọn quận huyện" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name='customerWards'
                                                className='ant-form-item-input'
                                                rules={rules.customerWards}
                                                label="Xã/phường"
                                                style={{ display: "block" }}
                                            >
                                                <Input placeholder="Chọn xã phường" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col>
                                    <Row className="label-title">
                                        <Col span={24}>
                                            <span>Phương thức liên hệ</span>
                                        </Col>

                                    </Row>
                                    <Row className="input-item">
                                        <Col span={24}>
                                            <Form.Item name='customerContact'>
                                                <Table
                                                    components={components}
                                                    rowClassName={() => 'editable-row'}
                                                    bordered
                                                    dataSource={dataSource}
                                                    pagination={false}
                                                    columns={columnsTableContact}
                                                >
                                                </Table>
                                            </Form.Item>
                                            <Button
                                                type="text"
                                                style={{ border: "none", backgroundColor: "none", color: "#0F62FE" }}
                                                onClick={handleAdd}
                                            >
                                                +Thêm liên hệ
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Col>

                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Nhóm khách hàng" key="2" className="tab-customer-group">
                            <Col>
                                <Row className="master-customer-header">
                                    <Col span={12} style={{ height: "100%" }}>
                                        <Row gutter={[18, 0]} style={{ alignItems: "center", height: "100%", marginLeft: "17px" }}>
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
                                                    // onClick={toggle}
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
                                                    <CustomSearchInput
                                                        onSearch={onSearch}
                                                        placeholder="Search ..."
                                                    // loading={true}
                                                    // allowClear={true}
                                                    />
                                                }
                                                    visible={visibleInputSearch}
                                                >
                                                    <div onClick={() => setVisibleInputSearch(true)}>
                                                        <SearchOutlined />
                                                    </div>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Table
                                    dataSource={dataTable}
                                    size="small"
                                    footer={testFooter}
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

                                </Table>
                            </Col>
                        </Tabs.TabPane>
                    </Tabs>
                    <Col className="button-bottom">
                        <Row style={{ height: "100%" }}>
                            <Col span={22} style={{ height: "100%" }}>
                                {/* <Form.Item> */}
                                <Button className="close-btn"
                                    onClick={() => navigate('/customer', { replace: true })}
                                >
                                    <Row>
                                        <Space>
                                            <span>Đóng</span>
                                            <span aria-hidden>&times;</span>
                                        </Space>
                                    </Row>
                                </Button>
                                {/* </Form.Item> */}
                            </Col>
                            <Col span={2}>
                                <Form.Item>
                                    <Button className="save-button"
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        <span>Lưu</span>
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Form>
            </Row>
        </Col>
    );
}

export default InfoCustomer;