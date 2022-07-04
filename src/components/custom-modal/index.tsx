import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import {CloseOutlined} from "@ant-design/icons";
interface CustomModalProps {
    isShowing?: boolean,
    hide?: any,
    header?: any,
    children?: any,
    className?: any,
    onFinish?: any,
}

const CustomModal: React.FunctionComponent<CustomModalProps> = ({
    isShowing, hide, className, onFinish
}) => {
    let overrideClassNames = ['modal-wrapper']
    const initArgs = () => {
        overrideClassNames = overrideClassNames.concat(className)
    }
    initArgs();

    
    return (
        <>
            {isShowing ? ReactDOM.createPortal(
                <React.Fragment>
                    <div className="modal-overlay" />
                    <div className={overrideClassNames.join(' ') + `${className}`} 
                        aria-modal 
                        aria-hidden 
                        tabIndex={-1} 
                        role="dialog">
                        <Col className="modal">
                            <Row className="modal-header">
                                <span>Tìm kiếm nâng cao</span>
                                <Button data-dismiss="modal" onClick={hide}>
                                    <CloseOutlined />
                                </Button>
                            </Row>
                            <Row className="modal-content">
                                <Form onFinish={onFinish}>
                                    <Col>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Mã Khách hàng"
                                                    name="customerId"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="Nhập mã khách hàng"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Mã số thuế"
                                                    name="customerTax"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="MST"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Tên khách hàng"
                                                    name="customerName"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="Nhập tên khách hàng"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col span={24}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Loại khách hàng"
                                                    name="customerType"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="Chọn loại khách hàng"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col span={24}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Nhóm khách hàng"
                                                    name="customerGroup"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="Chọn nhóm khách hàng"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col span={24}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Ngành nghề"
                                                    name="customerWork"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="Chọn ngành nghề"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col span={24}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Nhãn hiệu"
                                                    name="customerBrand"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="Nhập nhãn hiệu"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col span={24}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Loại sản phẩm kinh doanh"
                                                    name="customerBussinessProductType"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="Nhập tên loại sản phẩm kinh doanh"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    className="ant-form-item-input"
                                                    label="Trạng thái"
                                                    name="customerStatus"
                                                    style={{ display: "block" }}
                                                >
                                                    <Input
                                                        placeholder="Chọn trạng thái"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row className='modal-footer'>
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Button className="modal-close-button" 
                                                        data-dismiss="modal" 
                                                        onClick={hide}
                                                        >
                                                        <span>Hủy</span>
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item>
                                                    <Button className="modal-acp-button" 
                                                        data-dismiss="modal" 
                                                        type = "primary" 
                                                        htmlType='submit'
                                                    >
                                                        <span>Tìm kiếm</span>
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Form>
                            </Row>
                            
                        </Col>
                    </div>
                </React.Fragment>, document.body
            ) : null}
        </>
    )
}

export default CustomModal;