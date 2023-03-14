import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Pad from "./pages/Pad";
import Footer from "./components/Footer";

export default function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [id, setId] = useState("")
  const [activeSearch, setActiveSearch] = useState(false)
  const [viewAddPatient, setViewAddPatient] = useState(false)
  const [viewAppointment, setViewAppointment] = useState(false)
  const [viewPatientCard, setViewPatientCard] = useState(false)
  const [viewPatientDetails, setViewPatientDetails] = useState(false)
  const [btnAdd, setBtnAdd] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isLogin) {
    return (
      <>
        <Header
          setIdentification={setId}
          identification={id}
          setSearch={setActiveSearch}
        />

        <Pad
          id={id}
          setIdentification={setId}
          search={activeSearch}
          setSearch={setActiveSearch}
          setViewPatientCard={setViewPatientCard}
          setViewPatientDetails={setViewPatientDetails}
          setViewAppointment={setViewAppointment}
          setViewAddPatient={setViewAddPatient}
          setLoading={setLoading}
          viewAddPatient={viewAddPatient}
          viewAppointment={viewAppointment}
          viewPatientCard={viewPatientCard}
          viewPatientDetails={viewPatientDetails}
          setBtnAdd={setBtnAdd}
          btnAdd={btnAdd}
          loading={loading}
        />

        <Footer
          setIdentification={setId}
          setViewPatientCard={setViewPatientCard}
          setViewPatientDetails={setViewPatientDetails}
          setViewAddPatient={setViewAddPatient}
          setViewAppointment={setViewAppointment}
          setBtnAdd={setBtnAdd}
        />
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