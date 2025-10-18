import BrandComponent from "../../components/admin/userinterface/BrandComponent"
import CategoryComponent from "../../components/admin/userinterface/CategoryComponent"
import Header from "../../components/admin/userinterface/Header"
import MenuBar from "../../components/admin/userinterface/MenuBar"
import SliderComponent from "../../components/admin/userinterface/SliderComponent"
import ProductComponent from "../../components/admin/userinterface/ProductComponent"
import { useState,useEffect} from "react"
import { getData, postData } from "../../services/FetchNodeServices"
import FooterComponent from "../../components/admin/userinterface/FooterComponent"
import { Divider } from "@mui/material"
import ConcernComponent from "../../components/admin/userinterface/ConcernComponent"
export default function Home(){
   const [bannerList,setBannerList]=useState([])
   const [brandList,setBrandList]=useState([])
   const [categoryList,setCategoryList]=useState([])
   const [concernList,setConcernList]=useState([])
   const[pageRefresh,setPageRefresh]=useState(false)

   const [productListOffer,setProductListOffer]=useState([])


   const fetchAllBanner=async()=>{
       var result = await postData('userinterface/show_all_banners',{bannertype:'General'})
       setBannerList(result.data)
   }
   const fetchAllBrand=async()=>{
    var result = await getData('userinterface/show_all_brand')
    setBrandList(result.data)
}
 const fetchAllCategory=async()=>{
  var result = await getData('userinterface/display_all_category')
  setCategoryList(result.data)
}
const fetchAllConcern=async()=>{
  var result = await getData('userinterface/display_all_concern')
  setConcernList(result.data)
}
  const fetchAllProductDetails=async(offertype)=>{
  var result = await postData('userinterface/display_all_productdetail_by_offer',{offertype})
  setProductListOffer(result.data)
}
   useEffect(function(){
    fetchAllBanner()
    fetchAllBrand()
    fetchAllCategory()
    fetchAllProductDetails('Month end sale')
    fetchAllConcern()

   },[])
    return(<div style={{fontFamily:'Kanit'}}>
        <Header/>
        <div style={{marginTop:20,display:'flex',justifyContent:'center',marginTop:20}}>
            <SliderComponent data={bannerList}/>
            </div>
            <div style={{marginTop:20,display:'flex',justifyContent:'center',marginTop:20}}>
            <BrandComponent data={brandList} title="Brands"/>
            </div>
            <div style={{marginTop:20,display:'flex',justifyContent:'center',marginTop:20}}>
              <CategoryComponent data={categoryList} title="Browse by category"/>
            </div>
            <div style={{marginTop:20,display:'flex',justifyContent:'center',marginTop:20}}>
              <ProductComponent pageRefresh={pageRefresh} setPageRefresh = {setPageRefresh} data={productListOffer} title="Month End Sales"/>
            </div>
            <div style={{marginTop:20,display:'flex',justifyContent:'center',marginTop:20}}>
                
              <Divider/>
              </div>
              <div style={{marginTop:20,display:'flex',justifyContent:'center',marginTop:20}}>
              <ConcernComponent data={concernList} title="Concern"/>
                </div>

            <div style={{marginTop:20,display:'flex',justifyContent:'center',marginTop:20}}>
              <FooterComponent title="Footer Products"/>
            </div>
    </div>)
}