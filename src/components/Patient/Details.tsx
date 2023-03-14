import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { get_appointments } from "../../http-common";
import { APPOINTMENTS, PATIENT } from "../../Types";

export default function Details(props: {
  patient: PATIENT | undefined,
  setViewAddPatient: Dispatch<SetStateAction<boolean>>,
  setViewPatientCard: Dispatch<SetStateAction<boolean>>,
  setViewPatientDetails: Dispatch<SetStateAction<boolean>>,
  setViewAppointment: Dispatch<SetStateAction<boolean>>,
  setBtnAdd: Dispatch<SetStateAction<boolean>>,
}) {
  const data = props.patient
  const id = props.patient !== undefined ? props.patient.Identificacion : ""
  const [appointments, setappointments] = useState<APPOINTMENTS | any>(false)

  const especialidad = "7"
  const procedimiento = "13"

  const verify_appointment = async () => {
    const res = await get_appointments({ especialidad: especialidad, procedimiento: procedimiento, identificacion: id })

    if (res) {
      setappointments(res)
    }
  }

  useEffect(() => {
    verify_appointment()
  }, [])

  useEffect(()=>{
    if(appointments.Status) {
      props.setBtnAdd(false)
    }
  }, [appointments])


  return (
    <>
      {data !== undefined ? (
        <div style={{ "marginBottom": "90px" }}>
          <div className="card" >
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-3">
                    <div className="btn btn-cure rounded-circle btn-lg">
                      <i className="bi bi-person-fill fs-1"></i>
                    </div>
                  </div>
                  <div className="col-9">
                    <h5 className="card-title">{data.Primer_nombre + " " + data.Primer_apellido + " "}
                      <i className="bi bi-pencil"></i>
                    </h5>
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

          <h5 className="mt-3 text-center fw-bold text-cure">AGENDA</h5>
          {appointments.Status ? (
            <div className="card" >
              <div className="card-body">
                <div className="container">
                  <div className="row mt-2">
                    <div className="col-5">
                      <h6 className="card-subtitle mb-2 text-muted">FECHA: </h6>
                    </div>
                    <div className="col-7">
                      <h6 className="card-subtitle mb-2 text-muted">{appointments.Data.Fecha_cita}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <h6 className="card-subtitle mb-2 text-muted">HORA: </h6>
                    </div>
                    <div className="col-7">
                      <h6 className="card-subtitle mb-2 text-muted">{appointments.Data.Hora_cita}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <h6 className="card-subtitle mb-2 text-muted">LUGAR: </h6>
                    </div>
                    <div className="col-7">
                      <h6 className="card-subtitle mb-2 text-muted">{appointments.Data.Sede}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <h6 className="card-subtitle mb-2 text-muted">DIRECCIÓN: </h6>
                    </div>
                    <div className="col-7">
                      <h6 className="card-subtitle mb-2 text-muted">{appointments.Data.Sede}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <h6 className="card-subtitle mb-2 text-muted">ESTADO: </h6>
                    </div>
                    <div className="col-7">
                      <h6 className="card-subtitle mb-2 text-muted">Asignada</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-muted">
                <div className="container">
                  <div className="row text-center">
                    <div className="col-6">
                      <button className="btn btn-cure w-100">
                        <i className="bi bi-pencil"></i>
                        {" "}
                        Editar
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-danger w-100">
                        <i className="bi bi-trash"></i>
                        {" "}
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center fw-bold">No hay citas asignadas</div>
          )}
        </div>
      ) : (
        <>
          Usuario no encontrado
        </>
      )}
    </>
  )
}