import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { get_enabled_cities, get_headquarters, get_hours, obtener_fechas, put_appointment } from "../../http-common";
import { APPOINTMENT, APPOINTMENT_SCHEMA, CITIES, ENABLED_APPOINTMENTS, ENABLED_HOURS, HEADQUARTERS, VALIDATE } from "../../Types";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { Alert } from "../Alert";
import Swal from "sweetalert2";

export default function Cita(props: {
  identificacion: string,
  setViewAddPatient: Dispatch<SetStateAction<boolean>>,
  setViewPatientCard: Dispatch<SetStateAction<boolean>>,
  setViewPatientDetails: Dispatch<SetStateAction<boolean>>,
  setViewAppointment: Dispatch<SetStateAction<boolean>>,
  setBtnAdd: Dispatch<SetStateAction<boolean>>,
}) {
  const { register, setValue, handleSubmit, watch, formState: { errors }, unregister } = useForm<APPOINTMENT>({
    resolver: yupResolver(APPOINTMENT_SCHEMA),
    defaultValues: {
      identificacion_paciente: Number(props.identificacion),
      especialidad: "7",
      procedimiento: "13",
      fecha: dayjs(new Date()).format('YYYY-MM-DD'),
    }
  })

  const [cities, setCities] = useState<Array<CITIES>>([])
  const [headquarters, setHeadquarters] = useState<Array<HEADQUARTERS>>([])
  const [appointments, setAppointments] = useState<false | Array<ENABLED_APPOINTMENTS>>([])
  const [hours, setHours] = useState<false | Array<ENABLED_HOURS>>([])

  const minDate = watch('fecha')
  const especialidad = watch('especialidad')
  const procedimiento = watch('procedimiento')
  const sede = watch('sede')

  const get_cities = async () => {
    const data = await get_enabled_cities()
    setCities(data)
  }

  useEffect(() => {
    get_appointments_availaible()
  }, [minDate])

  const get_headquarter = async (city: string) => {
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
    const data = await get_headquarters(city)
    setHeadquarters(data)
  }

  const get_appointments_availaible = async () => {
    const data = await obtener_fechas({ especialidad: especialidad, procedimiento: procedimiento, fecha_inicio: dayjs(minDate).format("DD/MM/YYYY"), sede: sede })
    if (!data) {
      setAppointments(false)
    } else {
      setAppointments(data)
    }
  }

  const get_hours_available = async (id_hour: string) => {
    const data = await get_hours(id_hour)
    if (!data) {
      setHours(false)
    } else {
      setHours(data)
    }
  }

  const set_appointment = async (data: APPOINTMENT) => {
    const res = await put_appointment(data)

    if (!res.Status) {
      Alert({ title: "Información", icon: "error", text: "La cita no se ha podido registrar, intentelo de nuevo" })
    } else {
      Swal.fire({
        title: 'La cita se agendó con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        props.setViewAddPatient(false)
        props.setViewPatientCard(false)
        props.setViewPatientDetails(false)
        props.setViewAppointment(false)
        props.setBtnAdd(false)
      })
    }
  }

  useEffect(() => {
    get_cities()
  }, [])

  useEffect(() => {
    if (sede !== '') {
      get_appointments_availaible()
    }
  }, [sede])

  const onSubmit: SubmitHandler<APPOINTMENT> = data => {
    set_appointment(data)
  }

  return (
    <>
      <form id='cita' onSubmit={handleSubmit(onSubmit)} style={{ "marginBottom": "90px" }}>
        <div className={`br-section-wrapper mt-3`}>
          <h6 className="br-section-label">Datos de la cita</h6>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Ciudad: </label>
              <select className="form-control" onChange={(e) => { setHeadquarters([]); get_headquarter(e.target.value) }}>
                <option value="">Seleccione una ciudad</option>
                {cities && cities.map((e, i) => (
                  <option key={i} value={e.Ciudad}>{e.Ciudad}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Sede: </label>

              <select className="form-control" {...register("sede", { required: true })}>
                <option value="">Seleccione una sede</option>
                {headquarters && headquarters.map((e, i) => (
                  <option key={i} value={e.Sede}>{e.Sede}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Fecha: </label>
              <input type="date" className="form-control" {...register("fecha", { required: true })}></input>
            </div>
          </div>
        </div>

        <div className={`br-section-wrapper mt-3`}>
          <h6 className="br-section-label">Citas disponibles</h6>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Jornada: </label>
              <select className="form-control" {...register("id_fecha", { required: true })} onChange={(e) => { get_hours_available(e.target.value) }}>
                <option value="">Seleccione una fecha</option>
                {appointments && appointments.map((e, i) => (
                  <option key={i} value={e.Id_fecha}>Jornada {e.Jornada} | Sede {e.Sede}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Horas: </label>
              <select className="form-control" {...register("id_hora", { required: true })} onChange={(e) => {
                setValue("hora", e.target.options[e.target.selectedIndex].text)
              }} >
                <option value="">Seleccione una hora</option>
                {hours && hours.map((e, i) => (
                  <option key={i} value={e.Id_hora}>{e.Hora}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <button type="submit" className="btn btn-cure w-100 mt-3">Agendar Cita</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}