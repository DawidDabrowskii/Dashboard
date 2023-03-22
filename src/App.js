import Home from './pages/Home';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <AnimatePresence mode='wait'>
      <div className='App h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
