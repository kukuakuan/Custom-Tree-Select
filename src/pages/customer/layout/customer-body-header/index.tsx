import { Breadcrumb, Col } from "antd";
// import { useState } from "react";
import './style.scss';
interface CustomerBodyHeaderProps {
    title?:string,
}
 
const CustomerBodyHeader: React.FunctionComponent<CustomerBodyHeaderProps> = (props) => {
    const {title} = props;
    return (
        <div className="customer-body-content-header">
                <Col>
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                            fontSize:'14px'
                        }}>
                        <Breadcrumb.Item>
                            <span className="bread-crum-item">Quản lý khách hàng</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-crum-item bread-crum-last">Khách hàng</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <span style={{fontSize: '32px'}}>{title}</span>
                </Col>
            </div>
    );
}
 
export default CustomerBodyHeader;