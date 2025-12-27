import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeServices";
import { Button, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Swal from "sweetalert2";


import { Divider } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
export default function ProductList(props) {
  var navigate = useNavigate();
  console.log("props11111",props)
  var dispatch = useDispatch()
  var productFromRedux = useSelector(state => state.data)
  var productRedux = Object.values(productFromRedux)

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  var product = props?.data
  const handleBuyNow = (item) => {
   const currentQty =
       productFromRedux[item?.productdetailid]?.qty === undefined
         ? 1
         : productFromRedux[item?.productdetailid]?.qty;
   
     let newItem = { ...item, qty: currentQty };
   
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
   
     dispatch({
       type: "ADD_PRODUCT",
       payload: [item.productdetailid, newItem],
     });
   
     navigate("/carts", { state: { product: newItem } });
  };

  const handleChange = (v, item) => {
    if (v > 0) {
      item['qty'] = v

      dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailid, item] })
    }
    else {
      dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailid] })
    }
   if (typeof props.setPageRefresh === "function") {
    props.setPageRefresh(!props.pageRefresh);
  } else {
    console.warn("setPageRefresh is not provided");
  }

  }


  const showSlide = (item) => {


    return (<div onClick={() => handleProductDetail(item)} style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={`${serverURL}/images/${item.picture}`}
        style={{ width: "70%", borderRadius: 0, height: "auto", aspectRatio: 3 / 3 }}
      />
    </div>)

  };

  const handleProductDetail = (item) => {
    navigate('/productdetails', { state: { data: item } })

  }

  const productDetail = () => {
    return product?.map((item, index) => {
      return (
        <div >
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
                <FavoriteBorderIcon
                  style={{
                    display: "flex",
                    marginLeft: "auto",
                    marginTop: 10,
                    fontSize: 30,
                    color: "#e84393",
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
                <img src={logo} style={{ width: 85, }} />
              </Grid>
              <Grid
                item
                xs={12}

              >
                <div style={{
                  fontSize: matchesMd ? "0.7em" : "1.0em",
                  display: "flex",
                  fontWeight: "bold",
                  margin: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}>
                  {item.description.length <= 20 ? <div>{item.description}<div>&nbsp;</div></div> : item.description}
                </div>

                <div>{item.weight} {item.weighttype}</div>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  fontSize: matchesMd ? "0.7em" : "1.0em",
                  display: "flex",
                  margin: 2,
                  fontWeight: "bold",
                }}
              >
                {item.offerprice == 0 ? <span>&#x20B9;{item.price}</span> :
                  <div>
                    <span style={{ fontWeight: 600, color: 'grey', textDecoration: "line-through", marginRight: 5 }}>&#x20B9;{item.price}</span>
                    <span> &#x20B9;{item.offerprice}</span>
                  </div>}

              </Grid>
              <Grid item xs={12}>
                <Divider style={{ borderWidth: 1.5 }}></Divider>
              </Grid>
              <Grid item xs={12} style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={6} style={{ display: "flex", margin: 2 }}>
                  <PlusMinusComponent qty={productFromRedux[item?.productdetailid]?.qty === undefined ? 0 : productFromRedux[item?.productdetailid]?.qty} onChange={(v) => handleChange(v, item)} />
                </Grid>
                <Grid
                  item
                  xs={6}

                >
                  <Button
                    variant="text"
                    style={{ color: '#fff', background: '#000' }}
                    size='small'
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '2%', justifyContent: 'flex-start', width: "auto", marginTop: '3%', background: "#fff" }}>


      {productDetail()}


    </div>


  )
}