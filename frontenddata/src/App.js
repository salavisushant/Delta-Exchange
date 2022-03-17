import './App.css'
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { AddMember } from './components/AddMembers';
import { ShowMember } from './components/ShowMember';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/members" element={<AddMember />} />
        <Route path="/list" element={<ShowMember />} />
        <Route path="" element={<Register />} />
         <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
