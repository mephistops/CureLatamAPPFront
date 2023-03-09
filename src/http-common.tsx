import axios from "axios";
import { APPOINTMENT, CITIES, ENABLED_APPOINTMENTS, ENABLED_HOURS, HEADQUARTERS, PERSONAL_INFORMATION } from "./Types";

const http = axios.create({
  baseURL: "http://localhost:8000/api/v2.0/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
})

export async function verify_Patient(identificacion: number): Promise<boolean> {
  var res: boolean | undefined = false
  await http.get(`/patient?id=${identificacion}`)
    .then((response) => {
      res = response.data
    })
    .catch((e) => {
      res = undefined
    })

  return res
}

export async function create_Patient(data: PERSONAL_INFORMATION): Promise<boolean> {
  var res: boolean | undefined = false
  await http.put(`/patient`, data)
    .then((response) => {
      res = Boolean(response.data.Status)
    })
    .catch((e) => {
      res = undefined
    })

  return res
}

export async function get_enabled_cities(): Promise<Array<CITIES>> {
  var res: Array<CITIES> = []
  await http.get(`/enabled_cities`)
    .then((response) => {
      res = response.data
    })

  return res
}

export async function get_headquarters(city: string): Promise<Array<HEADQUARTERS>> {
  var res: Array<HEADQUARTERS> = []
  await http.get(`/headquarters?city=` + city)
    .then((response) => {
      res = response.data
    })

  return res
}

export async function obtener_fechas(data: { especialidad: string, fecha_inicio: string, procedimiento: string, sede: string }): Promise<false | Array<ENABLED_APPOINTMENTS>> {
  var res: false | Array<ENABLED_APPOINTMENTS> = []

  await http.get(`/obtener_fechas?especialidad=${data.especialidad}&fecha_inicio=${data.fecha_inicio}&procedimiento=${data.procedimiento}&sede=${data.sede}`)
    .then((response) => {
      if(response.data.Status) {
        res = response.data.Data
      } else {
        res = false
      }
    })

  return res
}

export async function obtener_fechas_old(data: { especialidad: string, fecha_inicio: string, procedimiento: string, sede: string }): Promise<Array<ENABLED_APPOINTMENTS>> {
  var res: Array<ENABLED_APPOINTMENTS> = []

  await http.get(`/appointments?
  especialidad=${data.especialidad}
  &fecha=${data.fecha_inicio}
  &procedimiento=${data.procedimiento}
  &sede=${data.sede}`)
    .then((response) => {
      res = response.data
    })

  return res
}

export async function get_appointments(data: { especialidad: string, procedimiento: string, identificacion: string }): Promise<ENABLED_APPOINTMENTS | false> {
  var res: ENABLED_APPOINTMENTS | false = {} as ENABLED_APPOINTMENTS

  await http.get(`/verificar_cita_previa?especialidad=${data.especialidad}&identificacion=${data.identificacion}&procedimiento=${data.procedimiento}`)
    .then((response) => {
      if(response.data.Status) {
        res = response.data.Data
      } else {
        res = false
      }
    })

  return res
}

export async function get_hours(Id_hora: string): Promise<Array<ENABLED_HOURS> | false> {
  var res: Array<ENABLED_HOURS> | false = []

  await http.get(`/hours?Id_fecha=${Id_hora}`)
    .then((response) => {
      if(response.data.Status) {
        res = response.data.Data
      } else {
        res = false
      }
    })

  return res
}

export async function put_appointment(data: APPOINTMENT): Promise<undefined | boolean> {
  var res: boolean | undefined = false
  await http.put(`/appointment`, data)
    .then((response) => {
      res = Boolean(response.data.Status)
    })
    .catch((e) => {
      res = undefined
    })

  return res
}