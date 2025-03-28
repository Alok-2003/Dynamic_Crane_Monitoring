import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';
import Crane from './Pages/Crane';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/crane" element={<Crane />} />
      </Routes>
    </Router>
  );
}

export default App;