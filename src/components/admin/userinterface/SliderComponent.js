import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
export default function SliderComponent(props) {
  var sld=createRef()
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };
  var banners = props?.data

  var images = Object.values(banners)[0]?.pictures.split(",");
  const showSlide = () => {
    return images?.map((item) => {
      return (
        <div>
          <img
            src={`${serverURL}/images/${item}`}
            style={{
              width: "95%",
              
              borderRadius: 10,
              height: 'auto',
             
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>
      );
    });
  };
  const handleForward=()=>{
    sld.current.slickPrev()

  }
  const handleBackward=()=>{
    sld.current.slickNext()
  }
  return (
    <div style={{ width: "95%",position:'relative' }}>
      <div style={{zIndex:2,top:'40%', position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:20,background:'#95a5a6',opacity:0.6}}>
      <ArrowBackIosIcon onClick={handleBackward}/>
      </div>
      <Slider ref={sld} {...settings}>{showSlide()}</Slider>
      <div style={{zIndex:2,top:'40%',right:'0.07%', position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:20,background:'#95a5a6',opacity:0.6}}>
      <ArrowForwardIosIcon onClick={handleForward}/>
      </div>
    </div>
  );
}
