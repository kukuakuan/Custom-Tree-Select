import './style.scss';
import {
    Row, Col,
} from 'antd'
import CustomerBodyHeader from '../layout/customer-body-header';
import CustomerBodyContent from './customer-body-content';
import MasterHeaderCustomer from '../layout/header-customer';
interface CustomerPageProps {

}

const CustomerPage: React.FunctionComponent<CustomerPageProps> = () => {
    return (
        <div className='customer-content'>
            <MasterHeaderCustomer />
            <div className='customer-body'>
                <Col>
                    <Row className='customer-body-header'>
                        <CustomerBodyHeader title={"Khách hàng"} />
                    </Row>

                    <Row className='customer-body-content'>
                        <CustomerBodyContent />
                    </Row>
                </Col>
            </div>
        </div>
    );
}

export default CustomerPage;