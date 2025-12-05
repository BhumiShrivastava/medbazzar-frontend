import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { Button, Divider, Grid, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import logo from "../../../assets/logo.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createRef } from "react";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
export default function ProductComponent(props) {
  var navigate = useNavigate();
  var dispatch = useDispatch();
  var productFromRedux = useSelector((state) => state.data);
  var productRedux = Object.values(productFromRedux);
  const theme = useTheme();
  var sld = createRef();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matchesMd ? 3 : 7,
    slidesToScroll: 1,
    autoplay: false,
  };
  var product = props?.data;
  const showSlide = (item) => {
    return (
      <div
        onClick={() => handleProductDetail(item)}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={`${serverURL}/images/${item.picture}`}
          style={{
            width: "70%",
            borderRadius: 0,
            height: "auto",
            aspectRatio: 3 / 3,
          }}
        />
      </div>
    );
  };
  const handleChange = (v, item) => {
      let newItem = { ...item, qty: v };
    if (v > 0) {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Added to Cart...",
        color: "white",
        background: "black",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });

      dispatch({ type: "ADD_PRODUCT", payload: [item.productdetailid, newItem] });
    } else {
      dispatch({ type: "DELETE_PRODUCT", payload: [item.productdetailid] });
    }
    props.setPageRefresh(!props.pageRefresh);
  };
  const handleProductDetail = (item) => {
    navigate("/productdetails", { state: { data: item } });
  };
  const handleBuyNow = (item) => {
    // Dispatch the product to the cart if needed

      let newItem = { ...item, qty: 1 };
       Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Added to Cart...",
        color: "white",
        background: "black",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailid,newItem] });

    // Navigate to the cart page
    navigate('/carts', { state: { product: item } });
  };
  const ProductDetail = () => {
    return product?.map((item, index) => {
      return (
        <div>
          <div
            style={{
              width: "80%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <BookmarkAddIcon
                  style={{
                    display: "flex",
                    marginLeft: "auto",
                    marginTop: 10,
                    fontSize: 30,
                    color: "#000",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                {showSlide(item)}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 0.9,
                }}
              >
                <img src={logo} style={{ width: 85 }} />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    fontSize: matchesMd ? "0.7em" : "1.0em",
                    display: "flex",
                    fontWeight: "bold",
                    margin: 5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description.length <= 20 ? (
                    <div>
                      {item.description}
                      <div>&nbsp;</div>
                    </div>
                  ) : (
                    item.description
                  )}
                </div>

                <div>
                  {item.weight} {item.weighttype}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  fontSize: "1.0em",
                  display: "flex",
                  margin: 5,
                  fontWeight: "bold",
                }}
              >
                {item.offerprice == 0 ? (
                  <span>&#x20B9;{item.price}</span>
                ) : (
                  <div>
                    <span
                      style={{
                        fontWeight: 600,
                        color: "grey",
                        textDecoration: "line-through",
                        marginRight: 5,
                      }}
                    >
                      {" "}
                      &#x20B9;{item.price}
                    </span>
                    <span>&#x20B9;{item.offerprice}</span>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ borderWidth: 1.5 }}></Divider>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={6} style={{ display: "flex", margin: 1 }}>
                  <PlusMinusComponent
                    qty={
                      productFromRedux[item?.productdetailid]?.qty === undefined
                        ? 0
                        : productFromRedux[item?.productdetailid]?.qty
                    }
                    onChange={(v) => handleChange(v, item)}
                  />
                </Grid>
                <Button
                  variant="text"
                  style={{ color: "white", background: "black" }}
                  size="small"
                  onClick={() => handleBuyNow(item)}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    });
  };

  const handleForward = () => {
    sld.current.slickPrev();
  };
  const handleBackward = () => {
    sld.current.slickNext();
  };

  return (
    <div style={{ fontFamily: "Kanit", width: "95%", position: "relative" }}>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 17,
          margin: "5px 0px 15px 15px",
        }}
      >
        {props?.title}
      </div>
      {matchesMd ? (
        <div></div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              width: 35,
              height: 35,
              borderRadius: 19,
              background: "#bdc3c7",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.6,
              position: "absolute",
              zIndex: 2,
              top: "50%",
              left: "0.09%",
            }}
          >
            {matchesMd ? (
              <div></div>
            ) : (
              <ArrowBackIosIcon onClick={handleBackward} />
            )}
          </div>
          <div
            style={{
              display: "flex",
              width: 35,
              height: 35,
              borderRadius: 19,
              background: "#bdc3c7",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              opacity: 0.6,
              position: "absolute",
              zIndex: 2,
              top: "50%",
              right: "0.09%",
              cursor: "pointer",
            }}
          >
            <ArrowForwardIosIcon onClick={handleForward} />
          </div>
        </div>
      )}

      <Slider {...settings} ref={sld}>
        {ProductDetail()}
      </Slider>
    </div>
  );
}
