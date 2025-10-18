import  {useState,useEffect} from "react"
import { Avatar, Button,Grid,TextField, listClasses } from "@mui/material"
import TitleComponent from "../../components/admin/TitleComponent"
import {useStyles} from "./SubcategoryCss"
import { postData,getData } from "../../services/FetchNodeServices"
import {FormControl,Select,MenuItem,InputLabel} from '@mui/material'
import Swal from "sweetalert2"
export default function Subcategory(props){
    var classes = useStyles()
    const [subCategory,setSubCategory]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [categoryId,setCategoryId]=useState('')
    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [error,setError]=useState({})
    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        
        if(result.status)
        { setCategoryList(result.data)}
        
        }
        useEffect(function(){fetchAllCategory()},[])
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))

    }
    const fillAllCategory=()=>{
        return categoryList.map((item)=>{

            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
        

    }
    
        
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})

    }
     
        const handleSubmit=async()=>{
            var submit=true
            if(subCategory.length==0){
                handleError('subCategory','Pls Input Subcategory Name...')
                submit=false
            }
            if(picture.bytes.length==0){
                handleError('picture','Pls Set Icon...')
                submit=false
            }
            if(submit)
            {
                var formData = new FormData
                formData.append('categoryid',categoryId)
                formData.append('subcategoryname',subCategory)
                formData.append('picture',picture.bytes)
                var result=await postData('subcategory/submit_subcategory',formData)
                if(result.status)
            {
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500
                  });
    
            }
            else
            {
                Swal.fire({
                    icon: "Error",
                    title: result.message,
                    timer:1500
                  });
            }
    
            }
        }
        const handleReset=()=>{
            setPicture({file:'md.png'})
            setCategoryId('')
            setSubCategory('')
        }
        
    return(
     <div className={classes.root}>
       <div className={classes.box}>
       <Grid container spacing = {3}>
       <Grid item xs={12}>
            <TitleComponent title="Add New Subcategory" logo="logo.png" listicon="list.png" page='/admindashboard/displayallsubcategory'/>
         </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
            label="Category" value={categoryId}
            onChange={(event)=>setCategoryId(event.target.value)}>
                {fillAllCategory()}
            
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <TextField  value={subCategory} onFocus={()=>handleError('subCategory',null)}  label="SubCategory Name"  error={error.subCategory} 
        helperText={<span style={{fontSize:13,fontFamily:'kanit'}} >{error.subCategory}</span>} onChange={(event)=>setSubCategory(event.target.value)}  fullWidth/>

        </Grid>
        <Grid item xs={6}>
            <Button  variant="contained" component="label" fullWidth>
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
            <Button variant="contained" fullWidth>
             Reset
            </Button>
            </Grid>
        </Grid>
        </div>
        </div>
    )
}