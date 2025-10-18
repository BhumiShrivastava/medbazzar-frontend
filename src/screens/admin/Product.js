import { useEffect, useState } from "react";
import TitleComponent from "../../components/admin/TitleComponent";
import { productStyle } from "./ProductCss";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import { getData, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
export default function Product(){
    var classes=productStyle()
    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [picture,setPicture]=useState({file:'md.png',bytes:''})
    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [error,setError]=useState({})

    const handleSubmit=async()=>{
        var submit=true;
        if(categoryId.length==0)
        {
            handleError('categoryId','Pls Choose Category')
            submit =false
        }
        if(subCategoryId.length==0)
        {
            handleError('subCategoryId','Pls Choose SubCategory')
            submit =false
        }
        if(brandId.length==0)
        {
            handleError('brandId','Pls Choose Brand')
            submit =false
        }
        if(product.length==0)
        {
            handleError('product','Pls Input Product Name')
            submit=false
        }
        if(description.length==0)
        {
            handleError('description','Pls Input Description')
            submit=false
        }
        if(picture.bytes==0)
        {
            handleError('picture','Pls Choose Icon')
            submit =false
        }
        if(submit)
        {
        
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('brandid',brandId)
        formData.append('productname',product)
        formData.append('description',description)
        formData.append('picture',picture.bytes)
        var result=await postData('product/submit_product',formData)
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
        setCategoryId('')
        setBrandId('')
        setSubCategoryId('')
        setProduct('')
        setDescription('')
        setPicture({file:'md.png'})
        

    }
    


    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        
        if(result.status)
        { setCategoryList(result.data)}
        
        }
        useEffect(function(){fetchAllCategory()},[])

        const fillAllSubCategory=()=>{
            return  subCategoryList.map((item)=>{
                return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
            })
        }
        const fetchAllBrand=async()=>{
            var result=await getData('brand/display_all_brand')
            if(result.status)
            {setBrandList(result.data)}
        }
        useEffect(function(){fetchAllBrand()},[])
    
        const fillAllBrand=()=>{
            return brandList.map((item)=>{
                return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
            })
        }
    

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))

    }

   const handlePicture=(event)=>{
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
   }
   const fillAllCategory=()=>{
    return categoryList.map((item)=>{

        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
    

}

   const fetchAllSubCategory=async(cid)=>{
    var  result=await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
    if(result.status)
    {
        setSubCategoryList(result.data)
    }
}
   const handleCategoryChange=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubCategory(event.target.value)

   }





    return(<div className={classes.root} >
        <div className={classes.box}>
        <Grid container spacing={3}>

<Grid item  xs={12}>
    <TitleComponent title="Add New Product" logo={'logo.png'} listicon="list.png" page="/displayallproducts" />
</Grid>
    <Grid item  xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category"
                     value={categoryId}
                     onChange={handleCategoryChange}
                     error={error.categoryId}
                     onFocus={()=>handleError('categoryId',null)}>
                        
                        {fillAllCategory()}
                    </Select>
                    {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>SubCategory</InputLabel>
                    <Select label="Subcategory"
                    value={subCategoryId}
                    onChange={(event)=>setSubCategoryId(event.target.value)}
                    error={error.subCategoryId}
                    onFocus={()=>handleError('subCategoryId',null)}>
                        {fillAllSubCategory()}

                    </Select>
                    {error.subCategoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.subCategoryId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select label="Brand"
                    value={brandId}
                    onChange={(event)=>setBrandId(event.target.value)}
                    error={error.brandId}
                    onFocus={()=>handleError('brandId',null)}>
                        {fillAllBrand()}

                    </Select>
                    {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField value={product} onFocus={()=>handleError('product',null)}  error={error.product}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.product}</span>} onChange={(event)=>setProduct(event.target.value)}  label="Product Name" fullWidth/>
            </Grid>

            <Grid item xs={12}>
                <TextField label="Product Descripton" onFocus={()=>handleError('description',null)} value={description}  helperText={<span style={{fontFamily:'kanit',fontSize:13}}>{error.description}</span> } error={error.description} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
            </Grid>

            <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth  >
                    Upload
                    <input type="file" accept="image/*" error={error.picture} onClick={()=>handleError('picture',null)}  onChange={handlePicture} hidden multiple/>
                </Button>
                {error.picture?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.picture}</span>:<></>}
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                 <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
            </Grid>

            <Grid item xs={6}>
                <Button  onClick={handleSubmit} variant="contained" fullWidth>
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