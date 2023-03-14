import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Add as AddPatient, Card as CardPatient, Details as DetailsPatient } from "../components/Patient";
import { verify_Patient } from "../http-common";
import { PATIENT } from "../Types";
import Cita from "../components/Appointment/Add";
import NoResult from "../components/NoResult";

export default function Pad(props: {
  id: string,
  setIdentification: Dispatch<SetStateAction<string>>,
  setSearch: Dispatch<SetStateAction<boolean>>,
  search: boolean,
  setViewPatientDetails: Dispatch<SetStateAction<boolean>>,
  setViewPatientCard: Dispatch<SetStateAction<boolean>>,
  setViewAppointment: Dispatch<SetStateAction<boolean>>,
  setViewAddPatient: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBtnAdd: Dispatch<SetStateAction<boolean>>,
  viewAddPatient: boolean,
  viewAppointment: boolean,
  viewPatientCard: boolean,
  viewPatientDetails: boolean,
  btnAdd: boolean,
  loading: boolean,
}) {
  const [patients, setPatients] = useState<PATIENT>()

  useEffect(() => {
    if (props.search) {
      sendData()
      props.setSearch(false)
    }
  }, [props.search])

  const sendData = async () => {
    props.setViewAddPatient(false)
    props.setViewPatientCard(false)

    if (props.id !== '') {
      try {
        props.setLoading(true)
        await verify_Patient(Number(props.id)).then((data) => {
          if (!data.Status) {
            props.setViewPatientCard(true)
            props.setViewAddPatient(false)
            props.setViewPatientDetails(false)
            props.setBtnAdd(false)
          } else {
            setPatients(data.Data)
            props.setViewPatientCard(true)
            props.setViewAddPatient(false)
            props.setViewPatientDetails(false)
            props.setBtnAdd(false)
          }
        })
      }
      finally {
        props.setLoading(false)
      }
    }
  }

  return (
    <main className="flex-shrink-0" style={{ backgroundColor: "#E9ECE", height: "100h" }}>

      {props.btnAdd ? (
        <div
          className="text-center p-1 position-fixed rounded-circle bg-cure text-white"
          style={{ "width": "50px", "height": "50px", "bottom": "120px", "right": "30px", "zIndex": "99" }}
          onClick={() => { props.setViewAddPatient(false), props.setViewPatientCard(false), props.setViewAppointment(true), props.setViewPatientDetails(false), props.setBtnAdd(false) }}
        >
          <i className="bi bi-calendar2-date fs-1"></i>
        </div>
      ) : (
        <div
          className="text-center p-1 position-fixed rounded-circle bg-cure text-white"
          style={{ "width": "50px", "height": "50px", "bottom": "120px", "right": "30px", "zIndex": "99" }}
          onClick={() => { props.setViewAddPatient(true), props.setViewPatientCard(false), props.setViewAppointment(false), props.setViewPatientDetails(false), props.setBtnAdd(false), props.setIdentification("") }}
        >
          <i className="bi bi-person-add fs-1"></i>
        </div>
      )}


      <div className="container">
        <div className="mt-5">
          <div className="row">
            <div className={`col-12 mt-4 fs-2 text-cure text-center ${props.loading ? 'd-block' : 'd-none'}`}>
              <div className="spinner-border" style={{ "width": "6rem", "height": "6rem" }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>

        {props.viewAddPatient && <AddPatient identificacion={props.id} setViewPatientDetails={props.setViewPatientDetails} setViewPatientCard={props.setViewPatientCard} setViewAddPatient={props.setViewAddPatient} setViewAppointment={props.setViewAppointment} />}
        {props.viewPatientCard && <CardPatient patient={patients} setViewPatientDetails={props.setViewPatientDetails} setViewPatientCard={props.setViewPatientCard} setViewAddPatient={props.setViewAddPatient} setViewAppointment={props.setViewAppointment} setBtnAdd={props.setBtnAdd} />}
        {props.viewPatientDetails && <DetailsPatient patient={patients} setViewPatientDetails={props.setViewPatientDetails} setViewPatientCard={props.setViewPatientCard} setViewAddPatient={props.setViewAddPatient} setViewAppointment={props.setViewAppointment} setBtnAdd={props.setBtnAdd}/>}
        {props.viewAppointment && <Cita identificacion={props.id} setViewPatientDetails={props.setViewPatientDetails} setViewPatientCard={props.setViewPatientCard} setViewAddPatient={props.setViewAddPatient} setViewAppointment={props.setViewAppointment} setBtnAdd={props.setBtnAdd} />}
      </div>
    </main>
  )
}