import axios from "axios"
import qs from "qs"
// http://localhost:51008
const BASE_URL= "http://localhost:4000"
class apiservice{
    addproduct(data){
        return axios.post(BASE_URL+"/admin/product/add",qs.stringify(data))
    }
    allproduct(){
        return axios.get(BASE_URL+"/admin/product/all")
    }
    singleproduct(data){
        return axios.post(BASE_URL+"/admin/product/single",data)
    }
    deleteproduct(data){
        return axios.post(BASE_URL+"/admin/product/delete",data)
    }
    updateproduct(data){
        return axios.put(BASE_URL+"/admin/product/update",data)
    }

    searchProduct(data){
        return axios.post(BASE_URL+"/admin/product/search",data)
    }

    //category
    addcategory(data){
        return axios.post(BASE_URL+"/admin/category/add",qs.stringify(data))
    }
    allcategory(){
        return axios.get(BASE_URL+"/admin/category/all")
    }
    singlecategory(data){
        return axios.post(BASE_URL+"/admin/category/single",data)
    }
    deletecategory(data){
        return axios.post(BASE_URL+"/admin/category/delete",data)
    }
    updatecategory(data){
        return axios.put(BASE_URL+"/admin/category/update",data)
    }
    searchCategory(data){
        return axios.post(BASE_URL+"/admin/category/search",data)
    }

    //supplier
    addsupplier(data){
        return axios.post(BASE_URL+"/admin/supplier/add",qs.stringify(data))
    }
    allsupplier(){
        return axios.get(BASE_URL+"/admin/supplier/all")
    }
    singlesupplier(data){
        return axios.post(BASE_URL+"/admin/supplier/single",data)
    }
    deletesupplier(data){
        return axios.post(BASE_URL+"/admin/supplier/delete",data)
    }
    updatedsupplier(data){
        return axios.put(BASE_URL+"/admin/supplier/update",data)
    }
    searchSupplier(data){
        return axios.post(BASE_URL+"/admin/supplier/search",data)
    }

    //staff
    addstaff(data){
        return axios.post(BASE_URL+"/api/staff/add",qs.stringify(data))
    }
    allstaff(){
        return axios.get(BASE_URL+"/api/staff/all")
    }
    singlestaff(data){
        return axios.post(BASE_URL+"/api/staff/single",data)
    }
    deletestaff(data){
        return axios.post(BASE_URL+"/api/staff/delete",data)
    }
    updatestaff(data){
        return axios.put(BASE_URL+"/api/staff/update",data)
    }
    searchStaff(data){
        return axios.post(BASE_URL+"/api/staff/search",data)
    }

    //login
    login(data){
        return axios.post(BASE_URL+"/api/login",data)
    }

    //dispatch

    dispatchAdd(data){
        return axios.post(BASE_URL+"/admin/dispatch/add",data)
    }
    dispatchAll(){
        return axios.get(BASE_URL+"/admin/dispatch/all")
    }
    dispatchSingle(data){
        return axios.post(BASE_URL+"/admin/dispatch/single",data)
    }
    dispatchDelete(data){
        return axios.post(BASE_URL+"/admin/dispatch/delete",data)
    }
    dispatchUpdate(data){
        return axios.put(BASE_URL+"/admin/dispatch/update",data)
    }

    vendorSearch(data){
        return axios.post(BASE_URL+"/admin/dispatch/search",data)
    }
    //label
    labelAll(){
        return axios.get(BASE_URL+"/admin/label/all")
    }
    labelAdd(data){
        return axios.post(BASE_URL+"/admin/label/add",data)
    }
    labelSingle(data){
        return axios.post(BASE_URL+"/admin/label/single",data)
    }

    labelDelete(data){
        return axios.post(BASE_URL+"/admin/label/delete",data)
    }
    labelUpdate(data){
        return axios.put(BASE_URL+"/admin/label/update",data)
    }
    labelSearch(data){
        return axios.post(BASE_URL+"/admin/label/search",data)
    }
}
export default new apiservice