import './App.css'
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { AddMember } from './components/AddMembers';
import { ShowMember } from './components/ShowMember';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/members" element={<AddMember />} />
        <Route path="/list" element={<ShowMember/>}/>
      </Routes>
    </div>
  );
}

export default App;
