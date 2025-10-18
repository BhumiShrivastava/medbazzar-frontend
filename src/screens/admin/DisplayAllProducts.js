import { useEffect, useState } from "react"
import { productStyle } from "./ProductCss"
import MaterialTable from "@material-table/core"
import { getData, serverURL,postData } from "../../services/FetchNodeServices"
import TitleComponent from "../../components/admin/TitleComponent"
import { useNavigate } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button,Grid,Avatar,TextField } from "@mui/material"
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import Swal from "sweetalert2"

export default function  DisplayAllProducts(){
    var classes=productStyle()
    var navigate=useNavigate()
    const [productData,setProductData]=useState([])
    const [open,setOpen]=useState(false)
    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:'md.png',bytes:''})
    const [Description,setDescription]=useState('')
    const [productId,setProductId]=useState('')
    const [product,setProduct]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTempPicture]=useState('')

    
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))

    }

   const handlePicture=(event)=>{
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setShowBtn(true)
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

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }


    const fetchAllProducts=async()=>{
        var result=await getData('product/display_all_product')
        if(result.status)
        {
            setProductData(result.data)
        }
    }
    useEffect(function(){fetchAllProducts()},[])

    const handleCancel=()=>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
    }

    const handleEditData=async()=>{
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
        if(Description.length==0)
        {
            handleError('description','Pls Input Description')
            submit=false
        }
        if(submit)
        {
            var body={productid:productId,categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productname:product,description:Description}
            var result=await  postData('product/edit_product_data',body)
            if(result.status)
                {
                    Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500,
                    toast:'true'
                    });

                }
            else
                {
                    Swal.fire({
                    icon: "Error",
                    title: result.message,
                    timer:1500,
                    toast:'true'
                    });
                }
            fetchAllProducts()
        }

    }
    const handleEditPicture=async()=>{
            var formData=new FormData()
            formData.append('productid',productId)
            formData.append('picture',picture.bytes)
            var result=await postData('product/edit_product_picture',formData)
            if(result.status)
            {
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500,
                    toast:'true'
                  });
            }
            else
            {
                Swal.fire({
                    icon:"Error",
                    title:result.message,
                    timer:1500,
                    toast:'true'
                   });
            }
            fetchAllProducts()
        
    }
    const handleDelete=async(rowData)=>{
        Swal.fire({
            title: "Do you want to delete Subcategory?",
            toast:true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              var body={productid:rowData.productid}
              var result=await postData('product/delete_product_data',body)
              if (result.status)
              {
              Swal.fire({toast:true,title:"Deleted",icon:"success"})
              fetchAllProducts()
            }
              else
              {
              Swal.fire({toast:true,title:" Fail to Delete Record",icon:"success"});
              }
            } else if (result.isDenied) {
              Swal.fire({toast:true,title:"Your Record is safe",  icon:"info"});
            }
          });
    }

    const handleClose=()=>{
      setOpen(false)
    }

    const handleOpen=(rowData)=>{
      setOpen(true)
      fetchAllSubCategory(rowData.categoryid)
      setProductId(rowData.productid)
      setCategoryId(rowData.categoryid)
      setSubCategoryId(rowData.subcategoryid)
      setBrandId(rowData.brandid)
      setProduct(rowData.productname)
      setDescription(rowData.description)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

    const ShowProductForm=()=>{
      return(
        <Dialog
         open={open}
         close={handleClose}
         maxWidth={"md"}>
          <DialogContent>
          <div className={classes.box}>
           <Grid container spacing={3}>
            <Grid item  xs={12}>
                <TitleComponent title="Edit Product" />
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
                <TextField label="Product Descripton" onFocus={()=>handleError('description',null)} value={Description}  helperText={<span style={{fontFamily:'kanit',fontSize:13}}>{error.description}</span> } error={error.description} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
            </Grid>

            <Grid item xs={6}>
                {showBtn?<div style={{height:100,width:'100%',justifyContent:'space-evenly',display:'flex',alignItems:'center'}} ><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{height:100,width:'100%',justifyContent:'space-evenly',display:'flex',alignItems:'center'}} >
                <Button variant="contained" component="label" fullWidth  >
                    Set New Picture
                    <input type="file" accept="image/*" error={error.picture} onClick={()=>handleError('picture',null)}  onChange={handlePicture} hidden multiple/>
                </Button>
                </div>}
                {error.picture?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.picture}</span>:<></>}
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                 <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" style={{width:100,height:100}} />
            </Grid>

           
           </Grid>
        </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData} >Edit Data</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>

        </Dialog>
      )

    }

    function ShowAllProducts() {
        return (
          <MaterialTable
            title="All Products"
            columns={[
              { title: 'ProductId',field:'productid'},
              { title: 'Category', field: 'categoryname' },
              { title: 'SubCategory', field: 'subcategoryname' },
              { title: 'Brand', field: 'brandname' },
              { title: 'Product',field:'productname'},
              { title: 'Description',field:'description'},
              { title:'Icon',field:'picture',render:(rowData)=><><img  src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/> </>}
          
            ]}
            options={{
                paging:true,
                pageSize:3,       // make initial page size
                emptyRowsWhenPaging: false,   // To avoid of having empty rows
                pageSizeOptions:[3,5,7,10],    // rows selection options
              }}
            data={productData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Product',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Product',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/product')
              }
            ]}
          />
        )
      }

    
    return(<div className={classes.root}>
        <div className={classes.boxdisplay}>
        {ShowAllProducts()}
            
        </div>
        {ShowProductForm()}
    </div>)
}