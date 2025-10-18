import { MenuItem,Grid,Divider} from "@mui/material";
import { useState, useEffect } from "react";
import { serverURL, getData, postData } from "../../../services/FetchNodeServices"
 import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined';
export default function FooterComponent(props){
const [category,setCategory]=useState([])

const fetchAllCategory = async () => {
    var result = await getData('category/display_all_category')
    if (result.status) {
        setCategory(result.data)

    }
}
useEffect(function () { fetchAllCategory() }, [])
const fillAllCategory = () => {
    return category.map((item) => {

        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
alert('hhh')

    })

}
return(<div>
<Grid container spacing={3} style={{width:'110%',background:'#2c3e50',height:'auto',display:'flex',marginTop:'20px'}}>
<Grid item xs={6} >
  <Grid item xs={12} style={{margin:'0px 5px 5px 90px',display:'flex'}}>
  <span style={{fontSize:20,margin:'0px 5px 5px 0px',fontWeight:'bolder',color:'#747d8c'}}>Follow us</span>
</Grid>    


<Grid item xs={12} style={{margin:'15px 5px 5px 90px',display:'flex'}}>

{<img src={`${serverURL}/images/fb.png`} style={{width:"8%",marginRight:'2%',display:'flex',borderRadius:50}}/>}

{<img src={`${serverURL}/images/insta.png`} style={{width:"8%",marginRight:'2%',display:'flex',borderRadius:50}} />}

{<img src={`${serverURL}/images/twitter.png`} style={{width:"8%",marginRight:'2%',display:'flex',borderRadius:50}}/>}

{<img src={`${serverURL}/images/link.png`} style={{width:"8%",marginRight:'2%',display:'flex',borderRadius:50}}/>}
</Grid>
<Grid item xs={12} style={{display:'flex',flexDirection:'row',marginTop:30,margin:'15px 5px 5px 90px'}}>
<Grid item xs={4}>
<span style={{fontSize:25,fontFamily:'kanit',color:'#747d8c'}}>Categories</span>
{fillAllCategory()}
</Grid>
<Grid item xs={4}>
<span style={{fontSize:25,fontFamily:'kanit',color:'#747d8c'}}>Medicine</span>
</Grid>
<Grid item xs={4}>
<span style={{fontSize:25,fontFamily:'kanit',color:'#747d8c'}}>Other</span>
</Grid>
</Grid>
</Grid>
   <Grid item xs={5}>
   <Grid item xs={12} style={{margin:'0px 5px 5px 0px',display:'flex'}} >
  <span style={{fontSize:20,margin:'0px 5px 10px 0px',fontWeight:'bolder',color:'#747d8c'}}  > Download the mobile app</span>
  </Grid>
  <Grid item xs={12} style={{height:'10%',display:'flex',alignItems:'center'}}>
 {<img src={`${serverURL}/images/play.webp`} style={{width:150,color:'#2c3e50',borderRadius:5,marginRight:'auto',display:'flex'}}/>}
{<img src={`${serverURL}/images/apple.png`} style={{width:145,color:'#2c3e50',borderRadius:5,marginRight:'45%',display:'flex'}}/>}
</Grid>
   <Grid item xs={12} style={{margin:'0px 5px 5px 5px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
   <Grid item xs={1}>
  <MailOutlinedIcon style={{fontSize:33,color:'#747d8c'}}/>
 </Grid>
  <Grid item xs={11}>
  <p style={{fontSize:20,fontFamily:'Bold',color:'#747d8c'}}>  Email us  
  <span style={{fontSize:20,fontFamily:'Bold',color:'#747d8c',display:'flex'}}>Info@MedBazzar.in</span>
  </p>

</Grid>
</Grid>
   <Grid item xs={12} 
   style={{margin:'0px 5px 5px 5px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
   <Grid item xs={1}>
  <WifiCalling3OutlinedIcon style={{fontSize:33,color:'#747d8c'}}/>
   </Grid>
 <Grid item xs={11}> 
<p style={{fontSize:20,fontFamily:'Bold',color:'#747d8c'}}>  Give us a missed call 
<span style={{fontSize:20,fontFamily:'Bold',color:'#747d8c',display:'flex'}}>18002662247</span>
</p>

</Grid>
</Grid>

            <Divider sx={{ bgcolor: "#ced6e0" }}/>


            <Grid item xs={12}>
<p style={{fontSize:18,color:'#747d8c',fontWeight:'bold',fontFamily:'Bold'}}>15 Years Of Trust</p></Grid>
<Grid item xs={12} style={{marginBottom:25}} >
<span style={{color:'#ced6e0'}}>Over the last 15 years, we have touched the lives of lakhs of Indian families by serving them with only 
the best quality and genuine healthcare products. With over 300+ stores,
 a comprehensive website and an easy-to-use app, it is only true to say that
  Wellness Forever is the one-stop destination for your wellness needs be it online or offline.
   Copyright Wellness Forever 2023</span></Grid>

</Grid>
</Grid>

</div>)


}