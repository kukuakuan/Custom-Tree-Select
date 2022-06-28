import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home';
import TestPage from './pages/test-page';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
				<div className="content">
					<Routes>
						<Route path="/" element={<HomePage/>} />
            <Route path="/test-page" element = {<TestPage/>} />
					</Routes>

				</div>
			</div>
    </BrowserRouter>
  );
}

export default App;
