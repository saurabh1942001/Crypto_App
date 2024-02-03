import { AppBar, Container, Select, MenuItem, Toolbar, Typography, createTheme, ThemeProvider } from '@mui/material'
import './Header.css';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Crypto } from '../CryptoContext';

const Header = () => {

  const {currency, setCurrency, symbol, setSymbol} = useContext(Crypto)

  const navigate = useNavigate()

  const darkTheme = createTheme({
    palette: {
      primary:{
        light: "white",
        main: "#fff"
      },
      mode: "dark"
    }
  })

  console.log(currency, symbol)

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar className='navBar1'>
              <Typography onClick={()=>navigate("/")} className='navBar' variant='h6'>
                Crypto Hunter
              </Typography>

              <Select 
                variant='outlined'
                style={{
                  // color: "white",
                  width: 100,
                  height: 40,
                  marginLeft: 15
                }}

                value={currency}
                onChange={(e)=> setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"} > USD </MenuItem>
                <MenuItem value={"INR"} > INR </MenuItem>
              </Select>
            </Toolbar>
          </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header