import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home';
import TestPage from './pages/test-page';
import CustomerPage from './pages/customer/master-customer';
import NewCustomer from './pages/customer/new-customer';
import InfoCustomer from './pages/customer/info-customer';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
				<div className="content">
					<Routes>
						<Route path="/" element={<HomePage/>} />
            <Route path="/test-page" element = {<TestPage/>} />
            <Route path="/customer" element = {<CustomerPage/>} />
            <Route path="/customer/new-customer" element = {<NewCustomer/>} />
            <Route path="/customer/customerId=:customerId" element = {<InfoCustomer/>} />
					</Routes>

				</div>
			</div>
    </BrowserRouter>
  );
}

export default App;
