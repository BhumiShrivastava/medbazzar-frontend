import { Grid } from "@mui/material";
import FilterList from "../../components/admin/userinterface/FilterList";
import Header from "../../components/admin/userinterface/Header";
import MenuBar from "../../components/admin/userinterface/MenuBar";
import ProductList from "../../components/admin/userinterface/ProductList";
import FooterComponent from "../../components/admin/userinterface/FooterComponent";
import { postData } from "../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation,useParams } from "react-router-dom";
import { useEffect,useState } from "react";

export default function FilterPage (props){
  var location=useLocation()
  var param = useParams()
  const [products,setProducts]=useState([])
  const [pageRefresh,setPageRefresh] = useState(false);
  var categoryid=''
  var brandid=''
  try{
    if(location?.state?.categoryid==undefined)
  
 categoryid=null
  else
  categoryid=location?.state?.categoryid
  }
  catch(e){
   
  }
  //for brand
   try{
    if(location?.state?.brandid==undefined)
  
        brandid=null
  else
    brandid=location?.state?.brandid
  }
  catch(e){
   
  }
   


  const fetchProducts = async () => {
    let result;

    if (categoryid) {
      result = await postData(
        "userinterface/display_all_productdetail_by_category",
        { categoryid, pattern: param.pattern }
      );
    } 
    else if (brandid) {
      result = await postData(
        "userinterface/display_all_productdetail_by_brand",
        { brandid, pattern: param.pattern }
      );
    } 
    else {
      setProducts([]);
      return;
    }

    setProducts(result.data);
  };

  // Single useEffect for fetching
  useEffect(() => {
    fetchProducts();
  }, [param.pattern, categoryid, brandid]);


  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));





  return(
      <Grid container spacing={3} style={{height:'100%',width:'auto',fontFamily:'kanit',display:'flex',flexDirection:'row'}}>
      <Grid item xs={12} style={{display:'block',width:'100%'}}>
          <Header/>
          {matches?<MenuBar/> :<div></div>}
      </Grid>
      {matches?  <Grid item xs={4} style={{background:'#fff'}}>
          <FilterList/>
      </Grid>:<div></div>}
      <Grid item xs={matches?8:12} style={{background:'#fff' }}>
        <div style={{width:'80%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
          
          <ProductList data={products}  
          pageRefresh={pageRefresh}
          setPageRefresh={setPageRefresh}
          />
        </div>  
      </Grid>
      {matches?  <Grid item xs={12} style={{marginTop:'3%'}}>
         {// <FooterComponent/>
         }
      </Grid> :<div></div>}
  </Grid>)
}