import {useState} from "react"
import { Avatar, Button,Grid,TextField } from "@mui/material"
import TitleComponent from "../../components/admin/TitleComponent"
import { useStyles } from "./CategoriesCSS"
import { postData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"



export default function Categories(props)
{  var classes =useStyles('')
var navigate=useNavigate()

    const [category,setCategory]=useState('')
    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [error,setError]=useState({})
    const handlePicture=(event)=>{
   
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    
       }
      const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))
      
      }
      const handleReset=()=>{
        setCategory('')
        setPicture({file:'icon.jpg',bytes:''}) 
    }
      const handleSubmit=async()=>{
        var submit=true
        if(category.length==0)
        {
         handleError('category','Pls input category name...')
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
          formData.append('categoryname',category)
          formData.append('picture',picture.bytes)
        var result=await postData('category/submit_category',formData)
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
            <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/admindashboard/displayallcategory'/>
        </Grid>
        <Grid item xs={12}>
    <TextField value={category} onFocus={()=>handleError('category',null)} error={error.category} helperText={<span style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.category}</span>} onChange={(event)=>setCategory(event.target.value)} label="Category Name" fullWidth />
           
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