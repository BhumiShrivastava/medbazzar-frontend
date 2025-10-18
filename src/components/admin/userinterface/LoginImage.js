import { Grid } from "@mui/material"
import React from "react"



export default function LoginImage(){
    return(
        <Grid container spacing={2} style={{}}  >

            <Grid item xs={12}>
                <div>
                    <img src="medbazar.jpeg" width='auto' height='auto' style={{borderRadius:1,border:2}} />
                </div>
            </Grid>

        </Grid>
    )
}