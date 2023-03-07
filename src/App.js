import Main from './Main';
// import "./styles.css";
import Register from './Pages/Register';
// import Login from './Pages/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import AuthTabs from './Pages/AuthTabs';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<AuthTabs />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/home' element={<Main />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
