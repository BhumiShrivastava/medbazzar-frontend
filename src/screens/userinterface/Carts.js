import Header from "../../components/admin/userinterface/Header";
import ShowCart from "../../components/admin/userinterface/ShowCart";
import { Grid } from "@mui/material";
import PaymentDetails from "../../components/admin/userinterface/PaymentDetails";
import { useState } from "react";
import { useSelector } from "react-redux";
import { postData } from "../../services/FetchNodeServices";
import AddAddress from "../../components/admin/userinterface/AddAddress";
import { useEffect } from "react";
import DileveryAddress from "../../components/admin/userinterface/DileveryAddress";
export default function Carts(){
    const [pageRefresh,setPageRefresh]=useState(false)
    const [userStatus,setUserStatus]=useState(false)
    const [mobileno,setMobileno]=useState(false)
    const [status, setStatus] = useState(true)
    const [userAddress,setUserAddress]=useState([])

    var products=useSelector(state=>state.data)
    var userData=Object.values(useSelector(state=>state.user))[0]
    console.log("USER DATAAAA:",userData)
    const check_user_address=async()=>{
        
       if(userData?.mobileno==undefined)
       { setStatus(false)}
       else{
        var result=await postData('users/check_user_address',{mobileno:userData?.mobileno})
        if(result.status==false)
        {
            setStatus(true) 
        }
        else
        {
            setStatus(false)
            setUserAddress(result.data)
           
        }
    }
      }
   useEffect(function(){
    check_user_address()
   },[userData?.mobileno,pageRefresh])
    
    return(
        <div>
            <Header/>
            <div style={{padding:5,margin:10,width:'90%',display:'flex',justifyContent:'center'}} >
               <Grid   container spacing={2}>
                <Grid item xs={12} md={8}>
                <div style={{margin:10,display:'flex'}} >
                    <DileveryAddress status={status} setStatus={setStatus} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} userAddress={userAddress}/>
                    </div>
                
                <div style={{margin:10,display:'flex'}} >
                    <ShowCart pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} products={products} />
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                <div style={{margin:10}} ><PaymentDetails userData={userData} userAddress={userAddress} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} products={products}/></div>
                </Grid>
                </Grid>
        </div>
        <AddAddress pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} status={status} setStatus={setStatus} />
        </div>
    )
}