import { makeStyles } from '@mui/styles'
import React from 'react'


const useStyles = makeStyles((theme)=>({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center"
    }
}))

const Carousel = () => {

    const classes = useStyles();

  return (
    <div className={classes.carousel}>
        saurabh
    </div>
  )
}

export default Carousel