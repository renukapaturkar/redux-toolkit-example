import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import { Login } from './features/login/Login';
import { Posts } from './features/posts/Posts';

function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/posts" element={<Posts/>}/>

        </Routes>
    </div>
  );
}

export default App;
