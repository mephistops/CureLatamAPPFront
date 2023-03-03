import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { get_appointments, get_enabled_cities, get_headquarters, get_hours, obtener_fechas, put_appointment } from "../http-common";
import { APPOINTMENT, APPOINTMENT_SCHEMA, CITIES, ENABLED_APPOINTMENTS, ENABLED_HOURS, HEADQUARTERS, VALIDATE } from "../Types";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { Alert } from "../components/Alert";

export default function Cita({ identificacion }: { identificacion: string }) {
  const { register, setValue, handleSubmit, watch, formState: { errors }, unregister } = useForm<APPOINTMENT>({
    resolver: yupResolver(APPOINTMENT_SCHEMA),
    defaultValues: {
      identificacion_paciente: Number(identificacion),
      especialidad: "7",
      procedimiento: "13",
      fecha: dayjs(new Date()).format('YYYY-MM-DD'),
    }
  })
  const [prevAppointment, setPrevAppointment] = useState<VALIDATE>(undefined)
  const [cities, setCities] = useState<Array<CITIES>>([])
  const [headquarters, setHeadquarters] = useState<Array<HEADQUARTERS>>([])
  const [appointments, setAppointments] = useState<false | Array<ENABLED_APPOINTMENTS>>([])
  const [hours, setHours] = useState<false | Array<ENABLED_HOURS>>([])

  const minDate = watch('fecha')
  const especialidad = watch('especialidad')
  const procedimiento = watch('procedimiento')
  const sede = watch('sede')
  console.log(watch());
  

  const get_cities = async () => {
    const data = await get_enabled_cities()
    setCities(data)
  }

  const get_headquarter = async (city: string) => {
    const data = await get_headquarters(city)
    setHeadquarters(data)
  }

  const verify_appointment = async () => {
    const data = await get_appointments({ especialidad: especialidad, procedimiento: procedimiento, identificacion: identificacion })
    if (!data) {
      setPrevAppointment(false)
    } else {
      setPrevAppointment(true)
      Alert({title: "Información", icon: "warning", text: "Este usuario ya tiene una cita asignada"})
    }
  }

  const get_appointments_availaible = async () => {
    const data = await obtener_fechas({ especialidad: especialidad, procedimiento: procedimiento, fecha_inicio: dayjs(minDate).format("DD/MM/YYYY"), sede: sede })
    if (!data) {
      setAppointments(false)
    } else {
      const newArray: any = data.filter((e) => dayjs(dayjs(minDate).format("DD/MM/YYYY")).isSame(e.Fecha))
      setAppointments(newArray)
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
    if (!res) {
      Alert({ title: "Información", icon: "info", text: "La cita no se ha podido registrar, intentelo de nuevo" })
    } else {
      Alert({ title: "Información", icon: "info", text: "La cita se agendó con éxito" })
    }
  }

  useEffect(() => {
    get_cities()
    verify_appointment()
  }, [])

  useEffect(() => {
    if (sede !== '') {
      get_appointments_availaible()
    }
  }, [sede])

  const onSubmit: SubmitHandler<APPOINTMENT> = data => {
    alert("hola")
    set_appointment(data)
  }

  return (
    <>
      {prevAppointment !== undefined && (
        !prevAppointment && (
          <>
            <form id='cita' onSubmit={handleSubmit(onSubmit)}>
              <div className={`br-section-wrapper mt-3`}>
                <h6 className="br-section-label">Datos de la cita</h6>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
                    <label className="form-control-label">Ciudad: </label>
                    <select className="form-control" onChange={(e) => { setHeadquarters([]); get_headquarter(e.target.value) }}>
                      <option value="">Seleccione una ciudad</option>
                      {cities && cities.map((e, i) => (
                        <option key={i} value={e.id}>{e.name}</option>
                      ))}
                    </select>
                  </div>
                    {errors.fecha && <span className="text-danger fw-bold">{errors.fecha?.message}</span>}
                    {errors.id_fecha && <span className="text-danger fw-bold">{errors.id_fecha?.message}</span>}
                    {errors.hora && <span className="text-danger fw-bold">{errors.hora?.message}</span>}
                    {errors.id_hora && <span className="text-danger fw-bold">{errors.id_hora?.message}</span>}
                    {errors.especialidad && <span className="text-danger fw-bold">{errors.especialidad?.message}</span>}
                    {errors.procedimiento && <span className="text-danger fw-bold">{errors.procedimiento?.message}</span>}
                    {errors.identificacion_paciente && <span className="text-danger fw-bold">{errors.identificacion_paciente?.message}</span>}

                  <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
                    <label className="form-control-label">Sede: </label>

                    <select className="form-control" {...register("sede", { required: true })}>
                      <option value="">Seleccione una sede</option>
                      {headquarters && headquarters.map((e, i) => (
                        <option key={i} value={e.name}>{e.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
                    <label className="form-control-label">Fecha: </label>
                    <input type="date" {...register("fecha", { required: true })} min={minDate}></input>
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
                    <select className="form-control" {...register("id_hora", { required: true })} onChange={(e)=>{
                      setValue("hora", e.target.options[e.target.selectedIndex].text)
                    }} >
                      <option value="">Seleccione una hora</option>
                      {hours && hours.map((e, i) => (
                        <option key={i} value={e.Id_hora}>{e.Hora}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
                    <button type="submit" className="btn-success btn-with-icon btn-block mt-3">
                      <div className="ht-40 justify-content-between">
                        <span className="pd-x-15">Agendar Cita</span>
                        <span className="icon wd-40"><i className="bi bi-check"></i></span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )
      )}
    </>
  )
}