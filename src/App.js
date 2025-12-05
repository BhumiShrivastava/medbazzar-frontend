import Categories from "./screens/admin/Categories"
import DisplayAllCategory from "./screens/admin/DisplayAllCategory";
import Brand from "./screens/admin/Brand";
import DisplayAllBrand from "./screens/admin/DisplayAllBrand";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import SubCategory from "./screens/admin/SubCategory";
import DisplayAllSubCategory from "./screens/admin/DisplayAllSubCategory";
import Product from "./screens/admin/Product";
import DisplayAllProducts from "./screens/admin/DisplayAllProducts";
import DisplayAllProductdetails from "./screens/admin/DisplayAllProductDetails";
import ProductDetails from "./screens/userinterface/ProductDetails";
import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
import Home from "./screens/userinterface/Home";
import PlusMinusComponent from "./components/admin/userinterface/PlusMinusComponent";
import FooterComponent from "./components/admin/userinterface/FooterComponent";
import Carts from "./screens/userinterface/Carts";
import ShowCart from "./components/admin/userinterface/ShowCart";
import LogInOTP from "./components/admin/userinterface/LogInOTP";
import LoginDetails from "./components/admin/userinterface/LogInDetails";
import GetOTP from "./components/admin/userinterface/GetOTP";
import LogInScreen from "./screens/userinterface/LogInScreen";
import AddAddress from "./components/admin/userinterface/AddAddress";
import FilterList from "./components/admin/userinterface/FilterList";
import FilterPage from "./screens/userinterface/FilterPage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
         
          <Route element={<AdminLogin/>} path={'/adminlogin'}/>
          <Route element={<AdminDashboard/>} path={'/admindashboard/*'}/>
          <Route element={<Home/>} path={'/home'}/>
          <Route element ={<PlusMinusComponent/>} path={'/plusminuscomponent'}/>
          <Route element ={<FooterComponent/>} path={'/footercomponent'}/>
          <Route element ={<ProductDetails/>} path={'/productdetails'}/>
          <Route element ={<Carts/>} path={'/carts'}/>
          <Route element ={<ShowCart/>} path={'/showcart'}/>
          <Route element ={<LoginDetails/>} path={'/logindetails'}/>
          <Route element ={<LogInOTP/>} path={'/loginotp'}/>
          <Route element ={<LogInScreen/>} path={'/loginscreen'}/>
          <Route element ={<GetOTP/>} path={'/getotp'}/>
          <Route element ={<AddAddress/>} path={'/addaddress'}/>
          <Route element ={<FilterList/>} path={'/filterlist'}/>
                    <Route element ={<DisplayAllProductdetails/>} path={'/display_all_productdetail'}/>

          <Route element ={<FilterPage/>} path={'/filterpage/:pattern'}/>



        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
