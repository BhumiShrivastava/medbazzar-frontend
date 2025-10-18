import { useEffect, useState } from "react";
import TitleComponent from "../../components/admin/TitleComponent";
import { productDetailStyles } from "./ProductDetailsCss";
import { useStyles } from "./ProductDetailsCss";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import { getData, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import { useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

export default function ProductDetails(){
    var classes=useStyles()
    const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', "strike"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['image', "link","video"],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
          ],
          
        },
      }), [])
    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [picture,setPicture]=useState({file:[],bytes:''})
    const [productId,setProductId]=useState('')
    const [productList,setProductList]=useState([])
    const [productsubname,setProductsubname]=useState('')
    const [concern,setConcern]=useState('')

    const [weight,setWeight]=useState('')
    const [weighttype,setWeightType]=useState('')
    const [type,setType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [qty,setQty]=useState('')
    const [price,setPrice]=useState('')
    const [offerprice,setOfferPrice]=useState('')
    const [offertype,setOfferType]=useState('')
    const [description,setDescription]=useState('')
    const [error,setError]=useState({})
    const [concernList,setConcernList]=useState([])

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

   const handlePicture=async(event)=>{
    
    if(Object.values(event.target.files).length<=3)
    {alert("Pls Upload 3 or more files")

    }
    else{
    setPicture({file:Object.values(event.target.files),bytes:event.target.files})
    }

}
    const fetchAllSubCategory=async(cid)=>{
        var  result=await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
        if(result.status)
        {
            setSubCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllSubCategory()},[])

    const fillAllSubCategory=()=>{
        return  subCategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
    }
    const fetchAllConcern=async()=>{
        var result=await getData('concern/display_all_concern')
        if(result.status)
        {setConcernList(result.data)}
    }
    useEffect(function(){fetchAllConcern()},[])

    const fillAllConcern=()=>{
        return concernList.map((item)=>{
            return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>

        })

    }




    const fetchAllBrands=async()=>{
        var result=await getData('brand/display_all_brand')
        if(result.status)
        {setBrandList(result.data)}
    }
    useEffect(function(){fetchAllBrands()},[])

    const fillAllBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }


    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        if(result.status)
        {setCategoryList(result.data)}
    }
    useEffect(function(){fetchAllCategory()},[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

        })

    }


    const fetchAllProducts=async(cid)=>{
        var  result=await postData('product/fetch_all_products_by_brandid',{brandid:cid})      
        if(result.status)
        { setProductList(result.data)}        
        }
        useEffect(function(){fetchAllProducts()},[])

        
    const fillAllProducts=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>

        })

    }

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
        fetchAllProducts(event.target.value)
    }

    

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
        if(productId.length==0)
        {
            handleError('productId','Pls Input Product ')
            submit=false
        }
        if(productsubname.length==0)
        {
            handleError('productsubname','Pls Input Product Subname')
            submit=false
        }
        if(description.length==0)
        {
            handleError('description','Pls Input description')
            submit=false
        }
        if(weight.length==0)
        {
            handleError('weight','Pls Input Weight')
            submit=false
        }
        if(weighttype.length==0)
        {
            handleError('weighttype','Pls Input Weight Type ')
            submit=false
        }
        if(type.length==0)
        {
            handleError('type','Pls Input Type ')
            submit=false
        }
        if(packaging.length==0)
        {
            handleError('packaging','Pls Input Packaging ')
            submit=false
        }
        if(qty.length==0)
        {
            handleError('qty','Pls Input Quantity ')
            submit=false
        }
        if(price.length==0)
        {
            handleError('price','Pls Input Price ')
            submit=false
        }
        if(offerprice.length==0)
        {
            handleError('offerprice','Pls Input Offerprice ')
            submit=false
        }
        if(offertype.length==0)
        {
            handleError('offertype','Pls Input Offertype ')
            submit=false
        }
        if(concern.length==0)
        {
            handleError('concern','Pls Input Concern ')
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
        formData.append('productid',productId)
        formData.append('productsubname',productsubname)
        formData.append('concern',concern)
        formData.append('description',description)
        formData.append('weight',weight)
        formData.append('weighttype',weighttype)
        formData.append('type',type)
        formData.append('packaging',packaging)
        formData.append('qty',qty)
        formData.append('price',price)
        formData.append('offerprice',offerprice)
        formData.append('offertype',offertype)
        
        picture.file.map((item,i)=>{
            formData.append('picture'+i,item)
        })

        var result=await postData('productdetails/submit_productdetails',formData)
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
        setProductId('')
        setProductsubname('')
        setConcern('')
        setDescription('')
        setWeight('')
        setWeightType('')
        setType('')
        setPackaging('')
        setQty('')
        setPrice('')
        setOfferPrice('')
        setOfferType('')
        setPicture({file:'icon.png'})
        

    }
    const showImages=()=>{
        return picture?.file?.map((item)=>{
           return (<div style={{margin:2}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="rounded" /></div>)
        })
     }
    
    return(<div className={classes.root}>
      <div className={classes.box}>
           <Grid container spacing={2}>

            <Grid item  xs={12}>
                <TitleComponent title="Add New Productdetail" logo="logo.png" listicon="list.png" page="/admindashboard/displayallproductdetails" />
            </Grid>

            <Grid item  xs={3}>
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

            <Grid item xs={3}>
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

            <Grid item xs={3}>
            <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select label="Brand"
                    value={brandId}
                    onChange={handleBrandChange}
                    error={error.brandId}
                    onFocus={()=>handleError('brandId',null)}>
                        {fillAllBrand()}

                    </Select>
                    {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select label="Product"
                    value={productId}
                    onChange={(event)=>setProductId(event.target.value)}
                    error={error.productId}
                    onFocus={()=>handleError('productId',null)}>
                        {fillAllProducts()}

                    </Select>
                    {error.productId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.productId}</span>:<></>}
                </FormControl>
            </Grid>

           
            <Grid item xs={6}>
                <TextField value={productsubname} onFocus={()=>handleError('productsubname',null)}  error={error.productsubname}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.productsubname}</span>} onChange={(event)=>setProductsubname(event.target.value)}  label="Product Subname" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Concern</InputLabel>
                    <Select label="Concern"
                    value={concern}
                    onChange={(event)=>setConcern(event.target.value)}
                    error={error.concernId}
                    onFocus={()=>handleError('concernId',null)}>
                        {fillAllConcern()}

                    </Select>
                    {error.concern?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.concern}</span>:<></>}
                </FormControl>
            </Grid>


            <Grid item xs={12}>
            <ReactQuill placeholder="Description" modules={modules} theme="snow" value={description} onChange={(e)=>setDescription(e)} />
            </Grid>

            <Grid item xs={3}>
                <TextField value={weight} onFocus={()=>handleError('weight',null)}  error={error.weight}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.weight}</span>} onChange={(event)=>setWeight(event.target.value)}  label="Input Weight" fullWidth/>
            </Grid>


            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Weight Type</InputLabel>
                    <Select label="WeightType"
                    value={weighttype}
                    onChange={(event)=>setWeightType(event.target.value)}
                    error={error.weighttype}
                    onFocus={()=>handleError('weighttype',null)}>
                         <MenuItem value={'mg'}>Mg</MenuItem>
                         <MenuItem value={'ml'}>Ml</MenuItem>
                         <MenuItem value={'liter'}>liter</MenuItem>
                         <MenuItem value={'gm'}>gm</MenuItem>
                         <MenuItem value={'kg'}>kg</MenuItem>
                         <MenuItem value={'mm'}>mm</MenuItem>



                    </Select>
                    {error.weighttype?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.weighttype}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select label="Type"
                    value={type}
                    onChange={(event)=>setType(event.target.value)}
                    error={error.type}
                    onFocus={()=>handleError('type',null)}>
                        <MenuItem value={"Tablet"}>Tablet</MenuItem>
                        <MenuItem value={"Capsules"}>Capsules</MenuItem>
                        <MenuItem value={"Drop"}>Drop</MenuItem>
                        <MenuItem value={"Injuctions"}>Injuctions</MenuItem>
                        <MenuItem value={"Syrup"}>Syrup</MenuItem>
                        <MenuItem value={"Spray"}>Spray</MenuItem>
                        <MenuItem value={"Gel"}>Gel</MenuItem>
                        <MenuItem value={"Powder"}>Powder</MenuItem>
                        <MenuItem value={"Bar"}>Bar</MenuItem>
                        <MenuItem value={"Lotion"}>Lotion</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                        <MenuItem value={"Juice"}>Juice</MenuItem>








                    </Select>
                    {error.type?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.type}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Packaging</InputLabel>
                    <Select label="Packaging"
                    value={packaging}
                    onChange={(event)=>setPackaging(event.target.value)}
                    error={error.packaging}
                    onFocus={()=>handleError('packaging',null)}>
                        <MenuItem value={"Bottles"}>Bottles</MenuItem>
                        <MenuItem value={"Packs"}>2 Packs</MenuItem>
                        <MenuItem value={"Packs"}>5 Packs</MenuItem>
                        <MenuItem value={"Packs"}>12 Packs</MenuItem>

                       

                    </Select>
                    {error.weighttype?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.weighttype}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <TextField value={qty} onFocus={()=>handleError('qty',null)}  error={error.qty}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.qty}</span>} onChange={(event)=>setQty(event.target.value)}  label="Input Quantity" fullWidth/>
            </Grid>

            <Grid item xs={3}>
                <TextField value={price} onFocus={()=>handleError('price',null)}  error={error.price}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.price}</span>} onChange={(event)=>setPrice(event.target.value)}  label="Input price" fullWidth/>
            </Grid>

            <Grid item xs={3}>
                <TextField value={offerprice} onFocus={()=>handleError('offerprice',null)}  error={error.offerprice}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.offerprice}</span>} onChange={(event)=>setOfferPrice(event.target.value)}  label="Input Offer Price" fullWidth/>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>OfferType</InputLabel>
                    <Select label="OfferType"
                    value={offertype}
                    onChange={(event)=>setOfferType(event.target.value)}
                    error={error.offertype}
                    onFocus={()=>handleError('offertype',null)}>
                        <MenuItem value={"Month end sale"}>Month end sale</MenuItem>
                       
                       

                    </Select>
                    {error.offertype?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.offertype}</span>:<></>}
                </FormControl>
            </Grid>




           

            <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth>
                  Upload
                  <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}

               </Grid>


           
            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                {showImages()}
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





