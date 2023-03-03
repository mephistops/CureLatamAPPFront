import Login from "./pages/Login";
import { useState } from "react";
import Header from "./components/Header";
import 'react-calendar/dist/Calendar.css';
import Pad from "./pages/Pad";

export default function App() {
  const [isLogin, setIsLogin] = useState(true)

    if (isLogin) {
      return (
        <>
          <Header />
          <div className="br-mainpanel" style={{backgroundColor: "#E9ECE", height: "100hv"}}>
            <Pad />
          </div>
        </>
      )
    } else {
      return (
        <div className = "d-flex align-items-center justify-content-center bg-primary" >
          <Login />
        </div>
      )
    }
}