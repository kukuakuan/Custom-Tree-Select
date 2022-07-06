import { Button, Col, Form, Input, message, Popconfirm, Row, Space, Table } from 'antd';
import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import CustomerBodyHeader from '../layout/customer-body-header';
import MasterHeaderCustomer from '../layout/header-customer';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { customerData } from '../../../constants/constant/customer-data';
import { CustomerContactInterface, CustomerInterface } from '../../../constants/constant/customer-data';

interface NewCustomerProps {
    setTitle?: any,
}
export interface TestContextInterface {
    nameContact: string,
    methodContact: string,
    infoContact: string,
}

export interface UseInUseContextInterface {
    infoCustomer: Array<TestContextInterface>
}

const NewCustomer: React.FunctionComponent<NewCustomerProps> = (props) => {
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
            title: "operation",
            dataIndex: "operation",
            render: (_: any, record: any) =>
              dataSource.length >= 1 ? (
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <a>Delete</a>
                </Popconfirm>
              ) : null
          }
    ]
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


    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState(Array<CustomerContactInterface>);
    const [count, setCount] = useState(0);

    const EditableContext = React.createContext(null);
    const EditableRow = ({ index, ...props }: { index: any }) => {
        const [form]: Array<any> = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr className="hellotest" {...props} />
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
                // if (inputRef.current != null) {
                    inputRef.current?.focus();
                // }
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
        let nextKey = customerData.length;
        let dataValue: CustomerInterface = {}
        dataValue.key = nextKey;

        // let formData = new FormData();
        // formData.append('key', nextKey);
        dataValue = { ...dataValue, ...values };
        dataValue.customerContact = dataSource;

        console.log(customerData)
        try {
            await customerData.push(dataValue as any)
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
    return (
        <Col>
            <Row style={{ width: "100%" }}>
                <MasterHeaderCustomer />
            </Row>
            <Row>
                <CustomerBodyHeader title={"Tạo mới khách hàng"} />
            </Row>
            <Row>
                <Form onFinish={onFinishFill}
                    onFinishFailed={onFinishFailed}
                >
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
                                            {/* <Table.Column
                                                title="STT"
                                                dataIndex="stt"
                                                key="1"
                                                width="5%"
                                                render={(value, item, index) => index + 1}
                                            />
                                            {[
                                                ...Array.from(
                                                    {
                                                        length: columnsTableContact.length,
                                                    },
                                                    (_, i) => i
                                                ),
                                            ].map((i) => (
                                                <Table.Column
                                                    key={`${count}`}
                                                    title={columnsTableContact[i].title}
                                                    dataIndex={columnsTableContact[i].dataIndex}
                                                />
                                            ))} */}

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

export default NewCustomer;