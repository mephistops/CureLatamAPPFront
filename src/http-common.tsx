import axios from "axios";
import { APPOINTMENT, APPOINTMENTS, APPOINTMENTS_t, CITIES, ENABLED_APPOINTMENTS, ENABLED_HOURS, HEADQUARTERS, PERSONAL_INFORMATION, VALIDATE } from "./Types";

const http = axios.create({
  baseURL: "https://healthgroup-test-6798383.dev.odoo.com/api/private/Aurora/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "API-KEY": "7K5NMf9i589aU3Ya75z88KapY6TfmrqX7icLN6MT"
  }
})

export async function verify_Patient(identificacion: number): Promise<any> {
  var res: { data: { Status: boolean, Data: any } } | any
  await http.get(`/verificar_paciente_creado?Identificacion=${identificacion}`)
    .then((response: { data: { Status: boolean, Data: any } }) => {
      res = response.data
    })
    .catch((error: any) => {
      res = error.message
    })

  return res
}

export async function create_Patient(data: PERSONAL_INFORMATION): Promise<any | boolean> {
  var res: any = false
  await http.post(`/crear_paciente`, data)
    .then((response: { data: { Status: boolean, Data: any } }) => {
      res = response.data
    })
    .catch((e: any) => {
      res = undefined
    })

  return res
}

export async function get_enabled_cities(): Promise<Array<CITIES>> {
  var res: Array<CITIES> = []
  await http.get(`/obtener_ciudades_disponibles`)
    .then((response) => {
      res = response.data.Data
    })

  return res
}

export async function get_headquarters(city: string): Promise<Array<HEADQUARTERS>> {
  var res: Array<HEADQUARTERS> = []
  await http.get(`/obtener_sedes?ciudad=` + city)
    .then((response) => {
      res = response.data.Data
    })

  return res
}

export async function obtener_fechas(data: { especialidad: string, fecha_inicio: string, procedimiento: string, sede: string }): Promise<false | Array<ENABLED_APPOINTMENTS>> {
  var res: false | Array<ENABLED_APPOINTMENTS> = []

  await http.get(`/obtener_fechas?especialidad=${data.especialidad}&fecha_inicio=${data.fecha_inicio}&procedimiento=${data.procedimiento}&sede=${data.sede}`)
    .then((response: { data: { Status: false; Data: ENABLED_APPOINTMENTS[]; }; }) => {
      if (response.data.Status) {
        res = response.data.Data
      } else {
        res = false
      }
    })

  return res
}

export async function get_appointments(data: { especialidad: string, procedimiento: string, identificacion: string }): Promise<any> {
  var res: any

  await http.get(`/verificar_cita_previa?especialidad=${data.especialidad}&identificacion=${data.identificacion}&procedimiento=${data.procedimiento}`)
    .then((response: { data: { Status: boolean; Data: boolean | APPOINTMENTS; }; }) => {
      res = response.data
    })

  return res
}

export async function get_hours(Id_hora: string): Promise<Array<ENABLED_HOURS> | false> {
  var res: Array<ENABLED_HOURS> | false = []

  await http.get(`/obtener_horas?Id_fecha=${Id_hora}`)
    .then((response: { data: { Status: false; Data: ENABLED_HOURS[]; }; }) => {
      if (response.data.Status) {
        res = response.data.Data
      } else {
        res = false
      }
    })

  return res
}

export async function put_appointment(data: APPOINTMENT): Promise<any> {
  var res: any = ''
  await http.post(`/agendar_cita`, data)
    .then((response) => {
      res = response.data
    })

  return res
}

export function save_LS(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data))
}

export function get_LS(name: string) {
  var data = localStorage.getItem(name)
  if (data !== null) {
    return JSON.parse(data)
  }
  return false
}