import { Divider,Paper,FormGroup,FormControlLabel,Checkbox } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from "react";
import { getData,postData,serverURL } from "../../../services/FetchNodeServices";
import { MenuItem,Box,AppBar,Toolbar, Button ,Menu} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




export default function FilterList(props){


  const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [brandList,setBrandList]=useState([])

    const handleClose=()=>{
        setAnchorEl(null)
    }

    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/display_all_category')
        console.log('DAAATTAAA',result.data)
        if(result.status)
        { setCategoryList(result.data)}
        
        }
        useEffect(function(){
       fetchAllCategory()
    
        },[])


        
        const fetchAllSubCategory=async(cid)=>{

            var result=await postData('userinterface/fetch_all_subcategory_by_categoryid',{categoryid:cid})
            setSubCategoryList(result.data)
        }
        useEffect(function(){
            fetchAllSubCategory()
         
             },[])


        const handleSubCategory=(categoryid,event)=>{
            fetchAllSubCategory(categoryid)
            setAnchorEl(event.currentTarget)

        }

         
        const fetchAllBrand=async()=>{
          var result=await getData('userinterface/display_all_brand')
          console.log('DAAATTAAA',result.data)
          if(result.status)
          { setBrandList(result.data)}
          
          }
          useEffect(function(){
         fetchAllBrand()
      
          },[])

        const showAllCategory=()=>{
        return categoryList?.map((item)=>{
            return( <Accordion style={{background:"#F5F5F5",width:'100%',boxShadow:'0 0 0 #F5F5F5'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{marginLeft:'auto'}} />}
                onClick={(event)=>handleSubCategory(item.categoryid,event)} 
              
                > 
            <div   style={{color:'#000',fontWeight:'lighter',fontSize:12}}>{item.categoryname}</div>
            </AccordionSummary>
        <AccordionDetails style={{background:"#F5F5F5"}}>
      {showAllSubCategory()}
          
        </AccordionDetails>
      </Accordion>
      )
        })
        } 


        // <Menu
        // id="basic-menu"
        // anchorEl={anchorEl}
        // open={open}
        // onClose={handleClose}>
        //    {showAllSubCategory()}
        // </Menu>

        const showAllSubCategory=()=>{
            return subCategoryList?.map((item)=>{
                return( 
                  <MenuItem style={{background:"#F5F5F5",fontSize:10}} >{item.subcategoryname} </MenuItem>
                )
            })
            }

            const showAllbrand=()=>{
              return brandList?.map((item)=>{
                  return( <div style={{background:"#F5F5F5",width:'100%',boxShadow:'0 0 0 #F5F5F5'}}>
                    
                      <FormGroup>
            <FormControlLabel control={<Checkbox />}  style={{color:'#000',fontWeight:'lighter',fontSize:8}} label={item.brandname} >
                  
                  </FormControlLabel>
                  </FormGroup>
            
            </div>
            )
              })
              } 





    const searchBarComponent=()=>{
        return(
        <Paper
      component="form"
      sx={{ p: '2px 4px',margin:1, display: 'flex',border:'1px solid #A5AFBF', fontWeight:'bold',borderRadius:50,height:25,alignItems: 'center', width:240,background:'#ffff',opacity:0.5 }}
    >
    
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Categories.."
        inputProps={{ 'aria-label': 'search google maps' }}
        style={{color:'#0D0F11'}}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon style={{color:'black'}}/>
      </IconButton>
      
    </Paper>)
    }


    return(<div style={{display:'flex',justifyContent:'flex-start',height:'auto',borderRadius:20,flexDirection:'column',width:"60%",border:'5px solid #fff',marginTop:'5%',marginLeft:'10%',background:"#F5F5F5"}}>
       <span style={{color:'#0D0F11',fontSize:18,marginTop:'3%' ,marginLeft:'5%'}}>Filter By</span>
       <Divider style={{marginTop:'5%',marginBottom:'7%'}}/>
       <span style={{fontWeight:'bolder',fontSize:15,marginLeft:'5%'}}>Category</span>
       <span>{searchBarComponent()}</span>
       <div style={{display:"flex",flexDirection:'column',alignItems:"flex-start",marginLeft:'',width:'100%',fontWeight:'lighter'}}>
            {showAllCategory()}


           </div>


           <Divider style={{marginTop:'5%',marginBottom:'7%'}}/>
       <span style={{fontWeight:'bolder',fontSize:15,marginLeft:'5%'}}>Brands</span>
       <span>{searchBarComponent()}</span>
       <div style={{display:"flex",flexDirection:'column',alignItems:"flex-start",marginLeft:'',width:'100%',fontWeight:'lighter'}}>
            {showAllbrand()}           
           </div>


    </div>)
}