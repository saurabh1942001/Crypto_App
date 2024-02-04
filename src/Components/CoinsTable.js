import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api'
import { Crypto } from '../CryptoContext';
import { Container, TextField, Typography, createTheme, ThemeProvider, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { numberWithCommas } from './Banner/Carousel';


const CoinsTable = () => {

    const {currency, setCurrency, symbol, setSymbol} = useContext(Crypto)

    
    const [coins, setCoins] = useState([])          // All coins data stored here
    const [loading, setLoading] = useState(false)   // Linear Loading if data takes time to load
    const [search, setSearch] = useState("")        // Search field text
    const [page, setPage] = useState(1)             // Pagination

    const navigate = useNavigate();
  
    const fetchCoins = async() => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }

    useEffect(()=>{
        fetchCoins()
    },[currency])

    const darkTheme = createTheme({
        palette: {
          primary:{
            light: "white",
            main: "#000"
          },
          mode: "dark"
        }
    })
    
    const handleSearch = () => {
        return coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        ))
    }

    const useStyles = makeStyles({
        row: {
          backgroundColor: "#16171a",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#131111",
          },
          pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold"
            }
          }
        },
        pagination: {
          "& .MuiPaginationItem-root": {
            color: "gold",
          },
        },
      });

    console.log("All coins :::=> ",coins)

    const classes = useStyles();

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Container style={{ textAlign: "center" }}>
                    <Typography 
                        variant='h4'
                        style={{ margin: 18 }}
                    >
                        Cryptocurrency Prices by Market Cap
                    </Typography>

                    <TextField
                        label="Search For a Crypto Currency.." 
                        variant="outlined" 
                        style={{marginBottom: 20, width: "100%"}}
                        onChange={(e)=> setSearch(e.target.value)}    
                    />

                    <TableContainer>
                        {
                            loading ? (
                                <LinearProgress style={{ backgroundColor: "gold"}} />
                            ) : (
                                <Table>
                                    <TableHead style={{ backgroundColor: "#EEBC1D"}}>
                                        <TableRow>
                                            {
                                                ["Coin", "Price", "24th Change", "Market Cap"].map((head)=>(
                                                    <TableCell 
                                                        style={{
                                                            color: "black",
                                                            fontWeight: "700",
                                                        }}

                                                        key={head}
                                                        align={head == "Coin" ? "" : "right"}
                                                    >
                                                        {head}                                                  
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        { handleSearch()
                                            .slice((page-1) * 10, (page-1) * 10 + 10)
                                            .map((row)=>{
                                            const profit = row.price_change_percentage_24 > 0

                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}
                                                >

                                                    <TableCell component="th" scope='row'
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                    >

                                                        <img 
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />

                                                        <div style={{display: "flex", flexDirection: "column"}} >
                                                            <span style={{ textTransform: "uppercase", fontSize: 22 }} >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey"}}> {row.name} </span>
                                                        </div>

                                                    </TableCell>

                                                    <TableCell align='right'>
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>

                                                    <TableCell align='right' style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }} >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>

                                                    <TableCell align='right'>
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                            M
                                                    </TableCell>
                                                    
                                                </TableRow>
                                            )
                                        }) }
                                    </TableBody>
                                </Table>
                            )
                        }
                    </TableContainer>

                    <Pagination
                        style={{
                            padding: 20,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        classes={{ ul: classes.pagination }}
                        count={(handleSearch()?.length/10).toFixed(0)} 
                        onChange={(e)=> {
                            setPage(Number(e.target.innerText))}}
                    />
                </Container>
            </ThemeProvider>    
        </>
  )
}

export default CoinsTable