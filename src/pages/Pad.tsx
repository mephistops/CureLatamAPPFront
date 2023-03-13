import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { verify_Patient } from "../http-common";
import { PATIENT_ID, PATIENT_ID_SCHEMA, VALIDATE } from "../Types";
import Cita from "./Cita";
import Paciente from "./Paciente";

export default function Pad({ id, search, setSearch }: { id: string, search: boolean, setSearch: Dispatch<SetStateAction<boolean>> }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [validatePatient, setValidatePatient] = useState<VALIDATE>(undefined)

  useEffect(() => {
    if (search) {
      sendData()
      setSearch(false)
    }
  }, [search])

  const sendData = async () => {
    setValidatePatient(undefined)
    if (id !== '') {
      try {
        setLoading(true)

        await verify_Patient(Number(id)).then((data) => {
          setValidatePatient(data)
        })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="mt-5">
          <form>
            <div className="row">
              <div className={`col-12 mt-4 fs-2 text-cure text-center ${loading ? 'd-block' : 'd-none'}`}>
                <div className="spinner-border" style={{ "width": "6rem", "height": "6rem" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {
          validatePatient !== undefined &&
          (validatePatient ? <Cita identificacion={id} setValidatePatient={setValidatePatient} /> : <Paciente identificacion={id} setValidatePatient={setValidatePatient} />)
        }
      </div>
    </>
  )
}