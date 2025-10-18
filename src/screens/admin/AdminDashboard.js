import { useStyles } from "./AdminDashboardCss";
import { Avatar,AppBar,Box,Toolbar,Typography,Grid,Paper } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Routes,Route,Navigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices";
import Categories from "./Categories"
import DisplayAllCategory from "./DisplayAllCategory";
import Brand from "./Brand";
import DisplayAllBrand from "./DisplayAllBrand";
import SubCategory from "./SubCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Product from "./Product";
import DisplayAllProducts from "./DisplayAllProducts";
import DisplayAllProductdetails from "./DisplayAllProductDetails";
import ProductDetails from "./ProductDetails";
import Banners from "./Banners";
import Concern from "./Concern"
import { useNavigate } from "react-router-dom";

export default function AdminDashboard (){
    const classes = useStyles();
    const navigate=useNavigate();
    var adminData=JSON.parse(localStorage.getItem('ADMIN'))

    return(
    <Box sx={{ flexGrow: 1 }} >
        <AppBar position="sticky"> 
          <Toolbar variant="dense"> 
            <Typography variant="h6" color="inherit" component="div">
              MedBazzar
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spaces ={3} style={{paddingInlineStart:5}}>
        <Grid item xs={2.2} >
            <Paper >
            <div className={classes.leftBarStyle}>
            <img src={`${serverURL}/images/${adminData.picture}`}  style={{width:70,height:70,borderRadius:35}} />
                <div className={classes.nameStyle}>{adminData.adminname}</div>
                <div className={classes.emailStyle}>{adminData.emailid}</div>
                <div className={classes.phoneStyle}>{adminData.mobileno}</div>
                </div>
              <div className={classes.menuStyle}>
              <List>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
                    </ListItemButton>
                  </ListItem>


                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')} >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
                    </ListItemButton>
                  </ListItem>

                 
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Sub Categories</span>} />
                    </ListItemButton>
                  </ListItem>

                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrands')}  >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>} />
                    </ListItemButton>
                  </ListItem>

                 
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproducts')}  >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>} />
                    </ListItemButton>
                  </ListItem>

                  
                  <ListItem disablePadding onClick={()=>navigate('/admindashboard/displayallproductdetails')}>
                    <ListItemButton >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={()=>navigate('/admindashboard/concern')}>
                    <ListItemButton >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Concern</span>} />
                    </ListItemButton>
                  </ListItem>


                  <ListItem disablePadding onClick={()=>navigate('/admindashboard/banners')}>
                    <ListItemButton >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
                    </ListItemButton>
                  </ListItem>


                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div> 
            </Paper>

          </Grid> 
          
          <Grid item xs={9.8} style={{padding:20}}>
           
          {  <Routes>
              <Route element={<Categories/>} path='/category'/>
              <Route element={<DisplayAllCategory/>} path='/displayallcategory'/>
              <Route element={<SubCategory/>} path='/subcategory'/>
              <Route element={<DisplayAllSubCategory/>} path='/displayallsubcategory'/>
              <Route element={<Brand/>} path='/brand'/>
              <Route element={<DisplayAllBrand/>} path='/displayallbrands'/>
              <Route element={<Product/>} path='/product'/>
              <Route element={<DisplayAllProducts/>} path='/displayallproducts'/>
              <Route element={<ProductDetails/>} path='/productdetails'/>
              <Route element={<DisplayAllProductdetails/>} path='/displayallproductdetails'/>
              <Route element={<Banners/>} path='/banners'/>
              <Route element={<Concern/>} path='/concern'/>


            </Routes> 
  }  
          </Grid>
        </Grid>
        
                 </Box>
  )
}