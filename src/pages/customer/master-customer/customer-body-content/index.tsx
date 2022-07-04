import './style.scss'
import MasterCustomer from './master-customer'
interface CustomerBodyContentProps {
    toggle?: any,
    setTitle?: any,
    filterData?: any,
}

const CustomerBodyContent: React.FunctionComponent<CustomerBodyContentProps> = () => {
    
    return (
        <div style={{ width: "100%", backgroundColor: "#E5E5E5" }}>
            <MasterCustomer />
        </div>
    );
}

export default CustomerBodyContent;