import { Button,IconButton} from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from "react"

export default function PlusMinusComponent(props)
{   
  const [value,setValue]=useState(props.qty);
    useEffect(function(){
           setValue(props.qty)
    },[props.qty,value])
    
    const handlePlus=()=>{
        setValue((prev)=>(prev+1))
        var v = value
        v=v+1
        props.onChange(v)
    }
    
    const handleMinus=()=>{
       if(value>=1){
        setValue((prev)=>(prev-1))
         var v = value
        v=v-1
        props.onChange(v) } 
    }
  return(<div style={{display:'flex',width:'100%'}}>
    { value==0?
      
     <IconButton style={{width:props.width}} fullWidth onClick={handlePlus} color="primary" aria-label="add to shopping cart">
            <Button variant="outlined"  endIcon={<AddShoppingCartIcon/> }
              size='small'>
                      ADD
                   </Button>
                </IconButton>:
      <div style={{alignItems:'center',display:'flex', justifyContent:'space-evenly', background:'#00391c',width:70,height:30,  borderRadius:4}}>
      <span onClick={handleMinus}  style={{cursor:'pointer',fontSize:16,color:'white',fontWeight:"bold"}}>-</span>
       <span style={{fontSize:16,color:'white',fontWeight:"bold"}}>{value}</span>
       <span onClick={handlePlus} style={{cursor:'pointer',fontSize:16,color:'white',fontWeight:"bold"}}>+</span>

      </div>
    }
        </div>
  )
    }