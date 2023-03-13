import Login from "./pages/Login";
import { useState } from "react";
import Header from "./components/Header";
import Pad from "./pages/Pad";
import Footer from "./components/Footer";

export default function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [id, setId] = useState("")  
  const [activeSearch, setActiveSearch] = useState(false)  

  if (isLogin) {
    return (
      <>
        <div className="text-center p-1 position-fixed rounded-circle bg-cure text-white" style={{"width": "50px", "height": "50px", "bottom": "120px", "right": "30px", "zIndex": "99"}}>
          <i className="bi bi-person-add fs-1"></i>
        </div>

        <Header setIdentification={setId} identification={id} setSearch={setActiveSearch} />

        <main className="flex-shrink-0" style={{ backgroundColor: "#E9ECE", height: "100h" }}>
          <Pad id={id} search={activeSearch} setSearch={setActiveSearch}/>
        </main>

        <Footer />
      </>
    )
  } else {
    return (
      <div className="d-flex align-items-center justify-content-center bg-primary" >
        <Login />
      </div>
    )
  }
}