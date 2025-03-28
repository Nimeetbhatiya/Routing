import { BrowserRouter, Route , Routes} from "react-router-dom"
import ShowData from "./components/ShowData"
import Home from "./components/Home"
import Header from "./components/Header"
import Update from "./components/Update"

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}   />
          <Route path="/view" element={<ShowData />}  />
          <Route path="/updateData/:index" element={<Update />}/>
        </Routes>
      </BrowserRouter>  
      
    </>
  )
}

export default App
