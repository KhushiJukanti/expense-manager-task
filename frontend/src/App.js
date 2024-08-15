import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import ExpenseList from './components/ExpenseList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/expenses' element={<ExpenseList/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
