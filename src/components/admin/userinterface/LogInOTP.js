import { Grid,Paper,Input, Button } from "@mui/material";
import { useState } from "react";
import LogInDetails from "./LogInDetails";
import GetOTP from "./GetOTP";
import OtpInput from 'react-otp-input';
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {postData} from "../../../services/FetchNodeServices";
export default function LogInOTP(){
    var dispatch =  useDispatch()
  const [status,setStatus]=useState(true)
const [otp,setOtp]=useState(0)
const [userStatus,setUserStatus]=useState(false)
const [userData,setUserData]=useState([])


const [mobileno,setMobileno]=useState('')
  const generateOTP=()=>{
  var myotp=parseInt(Math.random()*8999)+1000
   Swal.fire({
    title: 'Your OTP',
    text: `🔐 ${myotp}`,
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Okay',
  });

  setOtp(myotp);
};

const handleOTP = async () => {
  const mobilePattern = /^[6-9]\d{9}$/;

  if (!mobileno) {
    Swal.fire({
      icon: 'warning',
      title: 'Mobile Number Required!',
      text: 'Please enter your mobile number to continue.',
      confirmButtonColor: '#f39c12',
    });
    return;
  }

  if (!mobilePattern.test(mobileno)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Number!',
      text: 'Please enter a valid 10-digit Indian mobile number.',
      confirmButtonColor: '#d33',
      timer:2000,
    });
    return;
  }

    var result=await postData('users/check_userdata',{mobileno:mobileno})
  if(result.status==false)
  {  generateOTP()
    setStatus(!status)
    setUserStatus(false)
    dispatch({type:'ADD_USER',payload:[mobileno,result.data]})
  }
  else
  {
    generateOTP()
    setStatus(!status)
   setUserStatus(true)
   setUserData(result.data)
  }

     
  }
 return(
 
  <div style={{ width:'100%',display:'flex',justifyContent:'center',alignItems:'center' }} >
  {status?
    <Paper elevation={5} style={{ width: "90%", borderRadius: "60px 10px" }}>
     
        <Grid container spacing={2} style={{height:500,justifyContent:'center',display:'flex',alignItems:'center',fontFamily:'kanit'}}>

            <Grid item xs={6}>
              <Grid item xs={12} fullWidth style={{fontSize:'2rem',fontWeight:900,marginBottom: 5 }}>
              <div style={{justifyContent:'center',display:'flex',alignItems:'center'}}>Sign In To Medbazzar</div> 
              <div style={{ justifyContent:'center',display:'flex',alignItems:'center',fontWeight: "", fontSize: 13 }}>
              to acccess your Addresses, Orders & Whislist
            </div>
              </Grid>
             
            </Grid>
            <Grid item xs={12} style={{justifyContent:'center',display:'flex',alignItems:'center'}}>
            <div style={{ marginRight: 5, fontWeight: "bold",fontSize:16 }}>+91</div>

            <Input
              style={{ fontSize: 13, fontWeight: "bold",width:'25%' }}
              id="standard-basic"
              variant="standard"
              placeholder="Enter Your Mobile Number"
              onChange={(e)=>setMobileno(e.target.value)}
              />

            </Grid>
            <Grid item xs={12} style={{marginTop:70,justifyContent:'center',display:'flex',alignItem:'center'}}  >
                 
      
     
     </Grid>
            <Grid item xs={6} style={{ marginTop: 20,width:'90%' }}>
            <Button
              onClick={handleOTP}
              variant="contained"
              fullWidth
           
             
            >
              Get OTP
            </Button>
          </Grid>

          <Grid item xs={12}>
            <p style={{ fontSize: 14, marginTop: 30,justifyContent:'center',alignItems:'center',display:'flex' }}>
              By Continuing, you agree to our{" "}
              <span style={{ color: "blue" }}>Terms Of Service</span> and{" "}
              <span style={{ color: "blue" }}>Privacy & Legal Policy</span>{" "}
            </p>
          </Grid>
        </Grid>
    
        </Paper>:userStatus?<GetOTP mobileno={mobileno} otp={otp}/>:<LogInDetails mobileno={mobileno} otp={otp} userData={userData}/>}
        </div>
       
 );
}