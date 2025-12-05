import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Paper from "@mui/material";
import Box from "@mui/material";
import { createRef } from "react";
import { Navigate,useNavigate } from "react-router-dom";
export default function BrandComponent(props) {
  var sld = createRef();
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
  };
   const navigate = useNavigate("");

   const handleGotoFilterPage=(item)=>{
     navigate("/filterpage/null",{state: {brandid: item.brandid}})

   } 

  var brands = props?.data;
  const showSlide = () => {
    return brands?.map((item) => {
      return (
        <div onClick={() => handleGotoFilterPage(item)}>
          <div
            style={{
              display: "flex",
              marginLeft: 12,
              marginRight: 12,
              boxShadow: "1px 1px 10px 0px #00000010",
            }}
          >
            <img
              src={`${serverURL}/images/${item.picture}`}
              style={{
                width: "80%",
                padding: 3,
                borderRadius: 10,
                height: "auto",
                display: "block",
                marginLeft: "auzto",
                marginRight: "auto",
              }}
            />
           
          </div>
          
        </div>
      );
    });
  };
  const handleBackward = () => {
    sld.current.slickNext();
  };
  const handleForward = () => {
    sld.current.slickPrev();
  };

  return (
    <div style={{ width: "95%", position: "relative" }}>
      <div
        style={{
          margin: "10px 0px 15px 15px",
          fontWeight: "bold",
          fontSize: "16",
        }}
      >
        {props?.title}
      </div>
      <div
        style={{
          zIndex: 2,
          top: "50%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 20,
          background: "#95a5a6",
          opacity: 0.6,
        }}
      >
        <ArrowBackIosIcon onClick={handleBackward} />
      </div>
      <Slider ref={sld} {...settings}>
        {showSlide()}
      </Slider>
      <div
        style={{
          zIndex: 2,
          top: "50%",
          right: "0.09%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 20,
          background: "#95a5a6",
          opacity: 0.6,
        }}
      >
        <ArrowForwardIosIcon onClick={handleForward} />
      </div>
    </div>
  );
}
