import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';
import Crane from './Pages/Crane';
import Test from './Pages/Test';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/crane" element={<Crane />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;