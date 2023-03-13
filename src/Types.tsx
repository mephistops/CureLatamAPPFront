import * as yup from "yup";
import { es } from 'yup-locales';
import { setLocale } from 'yup';
setLocale(es);

export const APPOINTMENT_SCHEMA = yup.object({
  identificacion_paciente: yup.number().required(),
  especialidad: yup.string().required(),
  procedimiento: yup.string().required(),
  fecha: yup.string().required(),
  hora: yup.string().required(),
  id_fecha: yup.number().required(),
  codigo_doctor: yup.string(),
  id_tipo_cita: yup.number(),
  id_hora: yup.number(),
  sede: yup.string().required()
})

export type APPOINTMENT = yup.InferType<typeof APPOINTMENT_SCHEMA>;

export type CITIES = {
  Identificacion: string,
  Ciudad: string,
  Departamento: string,
}

export type VALIDATE = true | false | undefined

export const PATIENT_ID_SCHEMA = yup.object({
  tipo_identificacion: yup.string().required(),
  identificacion: yup.string().required().min(1)
})

export type PATIENT_ID = yup.InferType<typeof PATIENT_ID_SCHEMA>

export const PERSONAL_INFORMATION_SCHEMA = yup.object({
  tipo_identificacion: yup.string().required(),
  identificacion: yup.string().required(),
  primer_nombre: yup.string().required(),
  segundo_nombre: yup.string(),
  primer_apellido: yup.string().required(),
  segundo_apellido: yup.string(),
  genero: yup.string().required(),
  fecha_nacimiento: yup.string().required(),
  departamento: yup.string().required(),
  ciudad: yup.string().required(),
  regimen: yup.string().required(),
  zona: yup.string().required(),
  celular: yup.number().required().min(10),
  telefono: yup.number(),
  correo_electronico: yup.string().required().email(),
  direccion: yup.string().required(),
})

export type PERSONAL_INFORMATION = yup.InferType<typeof PERSONAL_INFORMATION_SCHEMA>;

export type HEADQUARTERS = {
  Sede: string,
  Sede_id: string
}

export type ENABLED_APPOINTMENTS = {
  Sede_departamento: string,
  Fecha: string,
  Id_fecha: string,
  Sede_direccion: string,
  Jornada: string,
  Sede: string
}

export type APPOINTMENTS = {
  Hora_cita: string,
  Nombre_procedimiento: string,
  Sede: string,
  Nombre_paciente: string,
  Fecha_cita: string,
  Cita_id: number,
  Nombre_doctor: string
}

export type APPOINTMENTS_t = {
  Doctor: string,
  Sede_telefono: string,
  Fecha_hora: string,
  Sede_direccion_normal: string,
  Sede_direccion: string,
  Codigo: string,
  Sede: string,
  Paciente: string,
  Mensaje_confirmacion: string,
}

export type ENABLED_HOURS = {
  Id_hora: string,
  Id_doctor: string,
  Hora: string
}

export type CONFIRMED_APPOINTMENT = {
  Sede_direccion: string,
  Sede_direccion_normal: string,
  Doctor: string,
  Codigo: string,
  Sede: string,
  Paciente: string,
  Mensaje_confirmacion: string,
  Sede_telefono: string,
  Fecha_hora: string,
}

type ICON = 'warning' | 'error' | 'success' | 'info' | 'question'

export type ALERT = {
  title: string,
  icon: ICON,
  text: string,
}