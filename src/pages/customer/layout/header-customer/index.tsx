import { Col, Row, Space } from 'antd';
import './style.scss'
import {
    DownOutlined, SearchOutlined, BellOutlined,
    UnorderedListOutlined, SettingOutlined, UserOutlined
} from '@ant-design/icons';
interface MasterHeaderCustomerProps {
    
}
 
const MasterHeaderCustomer: React.FunctionComponent<MasterHeaderCustomerProps> = () => {
    return (
        <div className='customer-header'>
                <Row gutter={[32, 16]}>
                    {/* <Col className='customer-logo'>
                        <img
                            src="../../img/logo_datxanh1.png"
                            // shape="square"
                            // src = './logo_datxanh1.png'
                        />
                    </Col> */}
                    <Col className='content-customer-page' span={20}>
                        <Row gutter={[18, 0]}>
                            <Col className='ctn-bgp'>
                                <Space align='center'>
                                    <span className='title-header'>Quản lý sản phẩm</span>
                                    <DownOutlined className='title-dropdown' />
                                </Space>
                            </Col>
                            <Col className='ctn-bgp'>
                                <Space align='center'>
                                    <span className='title-header'>Quản lý KH</span>
                                    <DownOutlined className='title-dropdown' />
                                </Space>
                            </Col>
                            <Col className='ctn-bgp'>
                                <Space align='center'>
                                    <span className='title-header'>Quản lý nhà cung cấp</span>
                                    <DownOutlined className='title-dropdown' />
                                </Space>
                            </Col>
                            <Col className='ctn-bgp'>
                                <Space align='center'>
                                    <span className='title-header'>Quản lý khách hàng</span>
                                    <DownOutlined className='title-dropdown' />
                                </Space>
                            </Col>
                            <Col className='ctn-bgp'>
                                <Space align='center'>
                                    <span className='title-header'>Quản lý địa điểm</span>
                                    <DownOutlined className='title-dropdown' />
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='customer-menu-item'
                        span={4}
                        style={{
                            position: 'absolute',
                            right: '1rem'
                        }}
                    >
                        <Row gutter={[24, 0]}>
                            <Col><SearchOutlined /></Col>
                            <Col><UnorderedListOutlined /></Col>
                            <Col><BellOutlined /></Col>
                            <Col><SettingOutlined /></Col>
                            <Col><UserOutlined /></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
    );
}
 
export default MasterHeaderCustomer;