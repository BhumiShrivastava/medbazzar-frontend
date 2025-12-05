import { Button, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";

export default function PlusMinusComponent(props) {
  const [value, setValue] = useState(Number(props.qty));

  useEffect(() => {
    setValue(Number(props.qty));
  }, [props.qty]);

  const handlePlus = () => {
    let newValue = Number(value) + 1;
    setValue(newValue);
    props.onChange(newValue);
  };

  const handleMinus = () => {
    if (value > 0) {
      let newValue = Number(value) - 1;
      setValue(newValue);
      props.onChange(newValue);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {value === 0 ? (
        <IconButton onClick={handlePlus} color="primary">
          <Button variant="outlined" endIcon={<AddShoppingCartIcon />} size="small">
            ADD
          </Button>
        </IconButton>
      ) : (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-evenly",
            background: "#00391c",
            width: 70,
            height: 30,
            borderRadius: 4,
          }}
        >
          <span onClick={handleMinus} style={{ cursor: "pointer", fontSize: 16, color: "white", fontWeight: "bold" }}>
            -
          </span>
          <span style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>{value}</span>
          <span onClick={handlePlus} style={{ cursor: "pointer", fontSize: 16, color: "white", fontWeight: "bold" }}>
            +
          </span>
        </div>
      )}
    </div>
  );
}
