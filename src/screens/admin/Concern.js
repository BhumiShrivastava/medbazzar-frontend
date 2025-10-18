import {useState} from "react"
import { Avatar, Button,Grid,TextField } from "@mui/material"
import TitleComponent from "../../components/admin/TitleComponent"
import { useStyles } from "./CategoriesCSS"
import { postData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"



export default function Concern(props)
{  var classes =useStyles('')
var navigate=useNavigate()

    const [concernname,setConcernName]=useState('')
    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [error,setError]=useState({})
    const handlePicture=(event)=>{
   
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    
       }
      const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))
      
      }
      const handleReset=()=>{
        setConcernName('')
        setPicture({file:'icon.jpg',bytes:''}) 
    }
      const handleSubmit=async()=>{
        var submit=true
        if(concernname.length==0)
        {
         handleError('concernname','Pls input concern name...')
         submit=false
        }
        if(picture.bytes.length==0)
        {
         handleError('picture','Pls choose icon...')
         submit=false
        }
        if(submit)
        { 
        var formData= new FormData()
          formData.append('concernname',concernname)
          formData.append('picture',picture.bytes)
        var result=await postData('concern/submit_concern',formData)
        console.log(result)
        if(result.status){
            Swal.fire({
                icon: "Success",
                title: result.message,
              });
        }
        else{
            Swal.fire({
                icon: "error",
                title: result.message,
              });
        }
        }
       }
     return(
   <div className={classes.root}>
    <div className={classes.box}>
        <Grid container spacing = {3}>
            <Grid item xs={12}>
            <TitleComponent title="Add Concern" logo="logo.png" listicon="list.png" />
        </Grid>
        <Grid item xs={12}>
    <TextField value={concernname} onFocus={()=>handleError('concernname',null)} error={error.concernname} helperText={<span style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.concernname}</span>} onChange={(event)=>setConcernName(event.target.value)} label="Concern Name" fullWidth />
           
        </Grid>
        <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth>
                Upload
                <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
            </Button>  
            {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}  
            </Grid>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
        <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
        </Grid>
        <Grid item xs={6}>
            <Button onClick={handleSubmit} variant="contained" fullWidth>
                Submit
            </Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick={handleReset} variant="contained" fullWidth>
             Reset
            </Button>
            </Grid>               
            </Grid>
 </div>
</div>)

}