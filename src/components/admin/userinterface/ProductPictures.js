import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeServices";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Grid } from "@mui/material";

export default function ProductPictures(props)
{
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: 'linear',
        arrows:false      
      };
    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: 'linear',
        arrows:true,
         vertical: true,
         verticalSwiping: true,
        // swipeToSlide: true      
      };


    var productDetails = props?.item
    console.log('xxxxxxxxxxxxxxxxxxx',productDetails)
    var pdImages = productDetails.multi_picture.split(',')
    const detailsSlide=()=>{
        return pdImages.map((item)=>{
            return<div><img src={`${serverURL}/images/${item}`} style={{width:400,marginLeft:'auto',marginRight:'auto',borderRadius:10,height:'auto',display:'block'}} /></div>
        })
    } 
    const detailsSlide2=()=>{
        return pdImages.map((item)=>{
            return<div><img src={`${serverURL}/images/${item}`} style={{width:80,borderRadius:10,height:'auto',display:'block',aspectRatio:1/1}} /></div>
        })
    } 



    return(
        // <div style={{width:'100%',display:'flex',justifyContent:'center',background:'#d3d3d324'}} >
            
            <div style={{width:'100%',padding:10}} >
                    <div style={{marginLeft:'auto',display:'flex',justifyContent:'flex-end'}} >
                        <FavoriteBorderOutlinedIcon style={{marginRight:20}} />
                        <ShareOutlinedIcon style={{marginRight:20}} />
                    </div>
                    <div style={{width:'100%',padding:10}} >
                       <Grid container spacing ={1}>
                       <Grid item xs={3}>

<div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
  <div style={{width:'40%'}}>
<Slider {...settings2}>
    {detailsSlide2()}
</Slider>
</div>
</div>
</Grid>
                        <Grid item xs={9}>
                    <Slider {...settings}>
                        {detailsSlide()}
                    </Slider>
                    </Grid>
                    
                    </Grid>
                    </div>
                                
            </div>
            
        // </div>

    )






}