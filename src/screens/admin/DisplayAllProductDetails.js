import MaterialTable from "@material-table/core";
import { useStyles } from "./ProductDetailsCss";
import { useState,useEffect } from "react";
import { getData,postData,serverURL } from "../../services/FetchNodeServices";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";
import TitleComponent from "../../components/admin/TitleComponent";
import { Grid,TextField,Avatar } from "@mui/material";
import Swal from "sweetalert2";
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"

export default function DisplayAllProductdetails(){
    var classes=useStyles()
    var navigate=useNavigate()

    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productId,setProductId]=useState('')
    const [productList,setProductList]=useState([])
    const [productsubname,setProductSubname]=useState('')
    const [description,setDescription]=useState('')
    const [weight,setWeight]=useState('')
    const [weighttype,setWeightType]=useState('')
    const [type,setType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [qty,setQty]=useState('')
    const [price,setPrice]=useState('')
    const [offerprice,setOfferPrice]=useState('')
    const [offertype,setOfferType]=useState('')
    const [picture,setPicture]=useState({file:'icon.png',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [error,setError]=useState({})
    const [showbtn,setShowBtn]=useState(false)
    const [open,setOpen]=useState(false)
   
    const [productdetailId,setProductdetailId]=useState('')
    const [productdetailData,setProductdetailData]=useState([])
    const [concernId,setConcernId]=useState('')
    const [concernList,setConcernList]=useState([])



     
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))

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

    

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
        fetchAllProducts(event.target.value)
    }

    const handleEditData=async()=>{
        var submit=true

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
        if(qty.length==0)
        {
            handleError('qty','Pls Input Quantity')
            submit=false
        }
        if(price.length==0)
        {
            handleError('price','Pls Input Price')
            submit=false
        }
        if(offerprice.length==0)
        {
            handleError('offerprice','Pls Input Offerprice')
            submit=false
        }
        if(concernId.length==0)
        {
            handleError('concernid','Pls Choose Concern')
        }

        if(submit)
        {
            var body ={productdetailid:productdetailId,categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productid:productId,productsubname:productsubname,description:description,weight:weight,weighttype:weighttype,type:type,packaging:packaging,qty:qty,price:price,offerprice:offerprice,offertype:offertype,concernid:concernId}
            var result=await postData('productdetails/edit_productdetail_data', body)

            if(result.status)
            {
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500,
                    toast:true
                  });
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer:1500,
                    toast:true
                  });
            }

        fetchAllProductdetails()  

        }
    }
 
  
    const handleEditPicture=async()=>{
        var  formData=new FormData()
        
        formData.append('productdetailid',productdetailId)
        formData.append('picture',picture.bytes)
        var result=await postData('productdetails/edit_productdetail_picture',formData)
               
        if(result.status)
              {
                  Swal.fire({
                      icon: "Success",
                      title: result.message,
                      timer:1500,
                      toast:true
                    });
              }
              else
              {
                  Swal.fire({
                      icon: "error",
                      title: result.message,
                      timer:1500,
                      toast:true
                    });
              }
        
        fetchAllProductdetails() 
   
       }


       const handleDelete=async(rowData)=>{
                  
        Swal.fire({
          title: "Do you want to delete Productdetails",
          toast:true,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "delete",
          denyButtonText: `Don't delete`
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
          
            var body ={productdetailid:rowData.productdetailid}
            var result=await postData('productdetails/delete_productdetail_data',body)

            if(result.status)
            {Swal.fire({toast:true,title:"deleted", icon:"success"});
            fetchAllProductdetails()}

            else
            Swal.fire({toast:true,title:"Fail to delete Record", icon:"error"});
          } else if (result.isDenied) {
            Swal.fire({toast:true,title:"Your Record is safe", icon:"info"});
          }
        
        });
        

      }





           
       const fetchAllProductdetails=async()=>{
        var result=await getData('productdetails/display_all_productdetail')
        
        
        if(result.status)
        { setProductdetailData(result.data)}
        
        }
        useEffect(function(){fetchAllProductdetails()},[])

    
        
        const handleClose=()=>{
            setOpen(false)
      
      
        }

        const handlePicture=(event)=>{
      
            setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
            
            setShowBtn(true)
        }

        const handleCancel=()=>{
            setPicture({file:tempPicture,bytes:''})
      
            setShowBtn(false)
       
        }

        const handleWeightChange=(event)=>{
            setWeightType(event.target.value)
        }

        const handleTypeChange=(event)=>{
            setType(event.target.value)
        }

        const handlePackagingChange=(event)=>{
            setPackaging(event.target.value)
        }

        const handleOffertypeChange=(event)=>{
            setOfferType(event.target.value)
        }
    
    
        const handleOpen=(rowData)=>{
            setOpen(true)
            fetchAllSubCategory(rowData.categoryid)
            fetchAllProducts(rowData.brandid)
            setProductdetailId(rowData.productdetailid)
            setCategoryId(rowData.categoryid)
            setSubCategoryId(rowData.subcategoryid)
            setBrandId(rowData.brandid)
            setConcernId(rowData.concernid)
            setProductId(rowData.productid)
            setProductSubname(rowData.productsubname)
            setDescription(rowData.description)
            setWeight(rowData.weight)
            setWeightType(rowData.weighttype)
            setType(rowData.type)
            setPackaging(rowData.packaging)
            setQty(rowData.qty)
            setPrice(rowData.price)
            setOfferPrice(rowData.offerprice)
            setOfferType(rowData.offertype)
            setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
            setTempPicture(`${serverURL}/images/${rowData.picture}`)
    
    
            
        }
    
    



    
    const showProductdetailForm=()=>{
        return(
         <Dialog
         open={open}
         onClose={handleClose} 
         maxWidth={"lg"}
         >
          
           <DialogContent>
           <div className={classes.displaybox}>
           <Grid container spacing={2}>

<Grid item  xs={12}>
    <TitleComponent title="Add New Productdetail" logo="logo.png" listicon="list.png" />
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

<Grid item xs={12}>
    <TextField value={productsubname} onFocus={()=>handleError('productsubname',null)}  error={error.productsubname}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.productsubname}</span>} onChange={(event)=>setProductSubname(event.target.value)}  label="Product Subname" fullWidth/>
</Grid>
<Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Concern</InputLabel>
                    <Select label="Concern"
                    value={concernId}
                    onChange={(event)=>setConcernId(event.target.value)}
                    error={error.concernId}
                    onFocus={()=>handleError('concernId',null)}>
                        {fillAllConcern()}

                    </Select>
                    {error.concernId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.concernId}</span>:<></>}
                </FormControl>
            </Grid>


<Grid item xs={12}>
    <TextField value={description} onFocus={()=>handleError('description',null)}  error={error.description}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.description}</span>} onChange={(event)=>setDescription(event.target.value)}  label="Input description" fullWidth/>
</Grid>

<Grid item xs={3}>
    <TextField value={weight} onFocus={()=>handleError('weight',null)}  error={error.weight}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.weight}</span>} onChange={(event)=>setWeight(event.target.value)}  label="Input Weight" fullWidth/>
</Grid>


<Grid item xs={3}>
    <FormControl fullWidth>
        <InputLabel>Weight Type</InputLabel>
        <Select label="Weighttype"
        value={weighttype}
        onChange={handleWeightChange}
        error={error.weighttype}
        onFocus={()=>handleError('weighttype',null)}>
            <MenuItem value={'mg'}>Mg</MenuItem>
            <MenuItem value={'ml'}>Ml</MenuItem>
            <MenuItem value={'liter'}>liter</MenuItem>
            

        </Select>
        {error.weighttype?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.weighttype}</span>:<></>}
    </FormControl>
</Grid>

<Grid item xs={3}>
    <FormControl fullWidth>
        <InputLabel>type</InputLabel>
        <Select label="Type"
        value={type}
        onChange={handleTypeChange}
        error={error.type}
        onFocus={()=>handleError('type',null)}>
            <MenuItem value={"Tablet"}>Tablet</MenuItem>
            <MenuItem value={"Capsules"}>Capsules</MenuItem>
            <MenuItem value={"Drop"}>Drop</MenuItem>
            <MenuItem value={"Injuctions"}>Injuctions</MenuItem>
           

        </Select>
        {error.type?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.type}</span>:<></>}
    </FormControl>
</Grid>

<Grid item xs={3}>
    <FormControl fullWidth>
        <InputLabel>packaging</InputLabel>
        <Select label="packaging"
        value={packaging}
        onChange={handlePackagingChange}
        error={error.packaging}
        onFocus={()=>handleError('packaging',null)}>
            <MenuItem value={"Bottles"}>Bottles</MenuItem>
            <MenuItem value={"Packs"}>Packs</MenuItem>
            

        </Select>
        {error.packaging?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.packaging}</span>:<></>}
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
        <InputLabel>offertype</InputLabel>
        <Select label="offertype"
        value={offertype}
        onChange={handleOffertypeChange}
        error={error.offertype}
        onFocus={()=>handleError('offertype',null)}>
            
            <MenuItem value={"Month end sale"}>Month end sale</MenuItem>

        </Select>
        {error.offertype?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.offertype}</span>:<></>}
    </FormControl>
</Grid>





    <Grid item xs={6}>
       {showbtn?<div style={{display:'flex',width:'100%',height:100,justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{display:'flex',width:'100%',height:100,justifyContent:'space-evenly',alignItems:'center',flexDirection:'column'}}>
        <Button variant="contained"  component="label" fullWidth>
                Set New Picture
                <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
        </Button>
            {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}
                    
             </div>}
    </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file} variant="rounded"  style={{width:100,height:100}} />
            </Grid>


</Grid>
</div>
             
</DialogContent>
<DialogActions>
<Button onClick={handleEditData}>Edit Data</Button>
<Button onClick={handleClose}>Close</Button>
</DialogActions>
</Dialog>
)
    
}
        
        function showAllProductdetail() {
            return (
              <MaterialTable
                 
                title="Main Productdetail"
                columns={[
                  { title: 'ProductdetailId', field: 'productdetailid' },
                  { title: 'Category',  render:(rowData)=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>  },
                
                  { title: 'Product', render:(rowData)=><div><div>{rowData.brandname}</div><div>{rowData.productname} {rowData.productsubname} {rowData.weight} {rowData.weighttype}</div></div>  },
                  { title: 'Type', render:(rowData)=><div><div>{rowData.qty} {rowData.type}</div><div>{rowData.packaging} </div></div> },
       
                  
                  { title: 'Price', render:(rowData)=><div><div><s>&#8377;{rowData.price}</s></div><div>&#8377;{rowData.offerprice} </div></div>  },
                   
                  { title: 'Offertype', field: 'offertype' },
                  { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture.split(",")[0]}`} style={{width:60,height:60,borderRadius:30}}/></> },
                   
                ]}
                options={{
                    paging:true,
                    pageSize:3,       // make initial page size
                    emptyRowsWhenPaging: false,   // To avoid of having empty rows
                    pageSizeOptions:[2,3,5,7,10],    // rows selection options
                  }}
                data={productdetailData}        
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Edit productdetails',
                    onClick: (event, rowData) => handleOpen(rowData)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'delete productdetails',
                    onClick: (event, rowData) => handleDelete(rowData)
                  },
                  {
                   icon: 'add',
                   tooltip: 'Add New Product Detail',
                   isFreeAction: true,
                   onClick: (event) => navigate('/admindashboard/productdetails')
                  }
                ]}
              />
            )
          }
    
return(<div className={classes.root}>
<div className={classes.boxdisplay}>
    {showAllProductdetail()}
</div>
    {showProductdetailForm()}
</div>
)
     
     
    
    
    
    
    
    
}