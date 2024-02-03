import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
// import { makeStyles } from 'tss-react/mui';



function App() {  

  console.log("Saurabh")

  // const useStyles = makeStyles(()=>({
  //   App: {
  //     backgroundColor: "#14161a",
  //     color : "White",
  //     minHeight : "100vh"
  //   }
  // }))

  // const classes = useStyles();
  return (
    <BrowserRouter>
      <div className="class1">
        <Header/>

        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/coins/:id" element={<CoinPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
