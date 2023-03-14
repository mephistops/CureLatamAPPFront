import { Dispatch, SetStateAction } from "react";

export default function Footer(props: {
  setViewAddPatient: Dispatch<SetStateAction<boolean>>,
  setViewPatientCard: Dispatch<SetStateAction<boolean>>,
  setViewPatientDetails: Dispatch<SetStateAction<boolean>>,
  setViewAppointment: Dispatch<SetStateAction<boolean>>,
  setBtnAdd: Dispatch<SetStateAction<boolean>>,
  setIdentification: Dispatch<SetStateAction<string>>,
},) {

  return (
    <footer className="bg-white fixed-bottom">
      <div className="container">
        <div className="row border-top border-cure text-center">
          <div className="col-6 border-end border-cure">
            <div className="btn fw-bold text-cure" onClick={() => { props.setViewPatientDetails(false), props.setViewPatientCard(false), props.setViewAddPatient(false), props.setViewAppointment(false), props.setBtnAdd(false), props.setIdentification("") }}>
              <i className="bi bi-person-fill fs-4"></i>
              <br />
              Pacientes
            </div>
          </div>
          <div className="col-6">
            <button className="btn fw-bold text-cure">
              <i className="bi bi-calendar2-date fs-4"></i>
              <br />
              Agenda
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}