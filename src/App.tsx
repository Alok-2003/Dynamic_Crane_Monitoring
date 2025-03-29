import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';
import Crane from './Pages/Crane';
import Test from './Pages/Test';
import Home from './Pages/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/crane" element={<Crane />} />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;