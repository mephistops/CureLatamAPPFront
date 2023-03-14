import { Dispatch, SetStateAction } from "react";
import { PATIENT } from "../../Types";

export default function Card(props: {
  patient: PATIENT | undefined,
  setViewAddPatient: Dispatch<SetStateAction<boolean>>,
  setViewPatientCard: Dispatch<SetStateAction<boolean>>,
  setViewPatientDetails: Dispatch<SetStateAction<boolean>>,
  setViewAppointment: Dispatch<SetStateAction<boolean>>,
  setBtnAdd: Dispatch<SetStateAction<boolean>>,
}) {
  const data = props.patient

  return (
    <>
      {data !== undefined ? (
        <div className="card" onClick={() => { props.setViewPatientDetails(true), props.setViewPatientCard(false), props.setViewAddPatient(false), props.setViewAppointment(false), props.setBtnAdd(true) }}>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <div className="btn btn-cure rounded-circle btn-lg">
                    <i className="bi bi-person-fill fs-1"></i>
                  </div>
                </div>
                <div className="col-9">
                  <h5 className="card-title">{data.Primer_nombre + " " + data.Primer_apellido}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">CC {data.Identificacion}</h6>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-5">
                  <h6 className="card-subtitle mb-2 text-muted">EPS: </h6>
                </div>
                <div className="col-7">
                  <h6 className="card-subtitle mb-2 text-muted">{data.Eps}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <h6 className="card-subtitle mb-2 text-muted">RÉGIMEN: </h6>
                </div>
                <div className="col-7">
                  <h6 className="card-subtitle mb-2 text-muted">{data.Regimen}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <h6 className="card-subtitle mb-2 text-muted">CELULAR: </h6>
                </div>
                <div className="col-7">
                  <h6 className="card-subtitle mb-2 text-muted">{data.Celular}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <h6 className="card-subtitle mb-2 text-muted">TÉLEFONO: </h6>
                </div>
                <div className="col-7">
                  <h6 className="card-subtitle mb-2 text-muted">{data.Telefono}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <h6 className="card-subtitle mb-2 text-muted">DIRECCIÓN: </h6>
                </div>
                <div className="col-7">
                  <h6 className="card-subtitle mb-2 text-muted">{data.Direccion}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          No hay resultados para la búsqueda
        </>
      )}
    </>
  )
}