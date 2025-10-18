import  {useState} from "react"
import { Avatar, Button,Grid,TextField, listClasses } from "@mui/material"
import TitleComponent from "../../components/admin/TitleComponent"
import { useStyles } from "./BrandCss"
import { postData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
export default function Brand(props){
    var classes = useStyles()
    const [brand,setBrand]=useState('')
    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [error,setError]=useState({})
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})

    }
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
        
        }
        const handleSubmit=async()=>{
            var submit=true
            if(brand.length==0){
                handleError('brand','Pls Input Brand Name...')
                submit=false
            }
            if(picture.bytes.length==0){
                handleError('picture','Pls Set Icon...')
                submit=false
            }
            if(submit)
            {   
                var formData= new FormData()
                formData.append('brandname',brand)
                formData.append('picture',picture.bytes)             
                var result=await postData('brand/submit_brand',formData)
                console.log(result)
                var result=await postData('brand/submit_brand',formData)
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
        const handleReset=()=>{
            setBrand('')
            setPicture({file:'icon.jpg',bytes:''}) 

        }
    return(
        <div className={classes.root}>
       <div className={classes.box}>
       <Grid container spacing = {3}>
            <Grid item xs={12}>
            <TitleComponent title="Add New Brand" logo="logo.png" listicon="list.png" page='/admindashboard/displayallbrand'/>
        </Grid>
        <Grid item xs={12}>
            <TextField value={brand} onFocus={()=>handleError('brand',null)} error={error.brand} helperText={error.brand} onChange={(event)=>setBrand(event.target.value)} label="Brand Name" fullWidth/>
        </Grid>
        <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth>
                Upload
                <input onClick={()=>handleError('picture',null)} onChange ={handlePicture} type="file" hidden accept="images/*" multiple />
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
        </div>
    )
}