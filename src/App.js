
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import './App.css';
import Master from './layout/master';
import Admindashboard from './pages/admindash';
import Login from './pages/login';  
import Addproduct from './pages/product/addproduct';
import Allproduct from './pages/product/allproduct';
import AddStaff from './pages/staff/addstaff';
import AllStaff from './pages/staff/allstaff';
import Addcategory from './pages/category/addcategory';
import Allcategory from './pages/category/allcategory';
import Addsupplier from './pages/supplier/addsupplier';
import Allsupplier from './pages/supplier/allsupplier';
import Updatesupplier from './pages/supplier/updateSupplier';
import Updatecategory from './pages/category/updatecategory';
import Updatestaff from './pages/staff/updatestaff';
import Labelgenerate from './pages/label/labelall';
import Dispatch from './pages/dispatch/dispatch';
import AddDispatch from './pages/dispatch/addDispatch';
import UpdateDispatch from './pages/dispatch/updateDipatch';
import Labelgenerated from './pages/label/labelGenerated';
import UpdateLabel from './pages/label/labelUpdate';
import ProductUpdate from './pages/product/productUpdate';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/admin"  element={<Master/>} >
          <Route path='/admin/dashboard' element={<Admindashboard/>}/>
          <Route path='/admin/product/add' element={<Addproduct/>} />
          <Route path='/admin/product/all' element={<Allproduct/>}/>
          <Route path='/admin/product/update/:id' element={<ProductUpdate/>} />
          <Route path='/admin/staff/add' element={<AddStaff/>} />
          <Route path='/admin/staff/all' element={<AllStaff/>}/>
          <Route path='/admin/staff/update/:id' element={<Updatestaff/>}/>
          <Route path='/admin/category/add' element={<Addcategory/>}/>
          <Route path='/admin/category/all' element={<Allcategory/> }/>
          <Route path='/admin/category/update/:id' element={<Updatecategory/>}/>
          <Route path='/admin/supplier/add' element={<Addsupplier/>}/>
          <Route path='/admin/supplier/all' element={<Allsupplier/>}/>
          <Route path='/admin/supplier/update/:id' element={<Updatesupplier/>}/>
          <Route path='/admin/label' element={<Labelgenerate/>}/>
          <Route path='/admin/label/generated' element={<Labelgenerated/>} />
          <Route path='/admin/label/update/:id' element={<UpdateLabel/>}/>
          <Route path='/admin/dispatch' element={<Dispatch/>}/>
          <Route path='/admin/dispatch/add' element={<AddDispatch/>}/>
          <Route path='/admin/dispatch/update/:id' element={<UpdateDispatch/>} />
          </Route>
          <Route path='/' element={<Login/>} />  
      </Routes>
    </BrowserRouter> 
  )
}

export default App;
