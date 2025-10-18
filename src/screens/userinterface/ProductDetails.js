import Header from "../../components/admin/userinterface/Header"
import ProductInformation from "../../components/admin/userinterface/ProductInformation";
import ProductPictures from "../../components/admin/userinterface/ProductPictures";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Grid } from "@mui/material";
export default function ProductDetails(){
 var location =useLocation()
 var item =location?.state?.data
 const [pageRefresh,setPageRefresh]=useState(false)

 return(<div>
    <Header/>
    <Grid container  spacing={1} >
            <Grid item xs={6} style={{width:'50%'}}>
             
                <ProductPictures item={item}/>
             
            </Grid>
            <Grid item xs={6} style={{width:'50%'}}>
          
                <ProductInformation item={item} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
           
            </Grid>
        </Grid>
        </div>
)
}