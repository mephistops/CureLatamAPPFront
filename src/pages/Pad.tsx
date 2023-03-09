import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "../components/Alert";
import { PageHeader } from "../components/PageHeader";
import { verify_Patient } from "../http-common";
import { PATIENT_ID, PATIENT_ID_SCHEMA, VALIDATE } from "../Types";
import Cita from "./Cita";
import Paciente from "./Paciente";

export default function Pad() {
  const [loading, setLoading] = useState<boolean>(false)
  const [validatePatient, setValidatePatient] = useState<VALIDATE>(undefined)
  const { register, handleSubmit, watch, formState: { errors }, unregister } = useForm<PATIENT_ID>({
    resolver: yupResolver(PATIENT_ID_SCHEMA)
  })
  const onSubmit: SubmitHandler<PATIENT_ID> = data => {
    handleClick()
  }

  const ID = watch('identificacion')
  const TID = watch('tipo_identificacion')

  const handleClick = async () => {
    setValidatePatient(undefined)
    if (ID === '') {
      Alert({ title: "Error", icon: "warning", text: "La identificación no puede estar vacía" })
    } else {
      try {
        setLoading(true)

        await verify_Patient(Number(ID)).then((data) => {
          setValidatePatient(data)
        })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <PageHeader parent="Paciente" icon="bi-search" menu="Validar Paciente" />
      <div className="br-pagebody">
        <div className="br-section-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h6 className="br-section-label">Datos básicos</h6>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
                <label className="form-control-label">Tipo de Identificación: <span className="text-danger">*</span></label>
                <Form.Select className="form-control" {...register("tipo_identificacion")}>
                  <option value="">Selecciona una opción</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="RC">Registro Civil</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="PP">Pasaporte</option>
                </Form.Select>
                {errors.tipo_identificacion && <span className="text-danger fw-bold">Este campo es obligatorio</span>}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
                <Form.Label>Identificación:  <span className="text-danger">*</span></Form.Label>
                <Form.Control type='number' className="form-control" placeholder="Identificación" {...register("identificacion")}>
                </Form.Control>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
                <button type="submit" className="btn-primary btn-with-icon btn-block mt-3">
                  <div className="ht-40 justify-content-between">
                    <span className="pd-x-15">Validar</span>
                    <span className="icon wd-40"><i className="bi bi-check"></i></span>
                  </div>
                </button>
              </div>

              <div className={`col-4 mg-t-10 mg-lg-t-0 text-center ${loading ? 'd-block' : 'd-none'}`}>
                <Spinner />
              </div>
            </div>
          </form>
        </div>

        {
          validatePatient !== undefined &&
          (validatePatient ? <Cita identificacion={ID} setValidatePatient={setValidatePatient} /> : <Paciente identificacion={ID} tipo_identificacion={TID} setValidatePatient={setValidatePatient}/>)
        }
      </div>
    </>
  )
}