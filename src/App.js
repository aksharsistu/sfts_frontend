import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import ProcessCreate from "./Pages/Superuser/ProcessCreate";
import ProductCreate from "./Pages/Superuser/ProductCreate";
import RegisterUser from "./Pages/Superuser/RegisterUser";
import StageAssign from "./Pages/Superuser/StageAssign";
import NoPage from "./Pages/NoPage";
import {AuthProvider} from "./Components/AuthProvider";
import PrivateRoutes, {SuperuserRoutes} from "./Components/PrivateRoutes";


function App() {

  return <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={ <PrivateRoutes><Home/></PrivateRoutes> } />
          <Route path="/logout" element={ <PrivateRoutes><Logout/></PrivateRoutes> } />
          <Route path="/process" element={ <SuperuserRoutes><ProcessCreate/></SuperuserRoutes> } />
          <Route path="/product" element={ <SuperuserRoutes><ProductCreate/></SuperuserRoutes> } />
          <Route path="/user" element={ <SuperuserRoutes><RegisterUser/></SuperuserRoutes> } />
          <Route path="/stage" element={ <SuperuserRoutes><StageAssign/></SuperuserRoutes> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="*" element={ <NoPage/> } />
        </Route>
      </Routes>
  </AuthProvider>
  </BrowserRouter>
}

export default App;
