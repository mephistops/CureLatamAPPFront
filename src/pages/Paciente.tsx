import Cities from "../components/Cities"
import Departaments from "../components/Departaments"
import { create_Patient } from "../http-common"
import { Alert } from "../components/Alert"
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from "dayjs";

import { useForm, SubmitHandler } from "react-hook-form"
import { PERSONAL_INFORMATION, PERSONAL_INFORMATION_SCHEMA, VALIDATE } from "../Types"
import { SetStateAction } from "react"
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

export default function Paciente({ identificacion, tipo_identificacion, setValidatePatient }: { identificacion: string, tipo_identificacion: string, setValidatePatient: React.Dispatch<SetStateAction<VALIDATE>> }) {
  const { register, setValue, handleSubmit, watch, formState: { errors }, unregister } = useForm<PERSONAL_INFORMATION>({
    resolver: yupResolver(PERSONAL_INFORMATION_SCHEMA),
    defaultValues: {
      identificacion: identificacion,
      tipo_identificacion: tipo_identificacion,
      fecha_nacimiento: dayjs(new Date()).format('YYYY-MM-DD'),
    }
  })
  const minDate = watch('fecha_nacimiento')

  const onSubmit: SubmitHandler<PERSONAL_INFORMATION> = data => {
    data.fecha_nacimiento = dayjs(data.fecha_nacimiento).format("DD/MM/YYYY")
    try {
      create_Patient(data).then((res) => {
        res = Object(res)
        if (!res['Status']) {
          Alert({ title: "Error", icon: "error", text: "Error al crear el usuario: "+res['Exception'] })
        } else {
          unregister()
          Alert({ title: "Exito", icon: "success", text: "Usuario creado con exito" })
          setValidatePatient(true)
        }
      })
    } catch (err) {
      Alert({ title: "Error", icon: "error", text: "Error al crear el usuario" })
    }
  }

  const departamento = watch('departamento')

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`br-section-wrapper mt-3`}>
          <h6 className="br-section-label">Información Personal</h6>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Primer Nombre:  <span className="text-danger">*</span></label>
              <input className="form-control" placeholder="Primer Nombre" type="text" {...register("primer_nombre")} />
              {errors.primer_nombre && <span className="text-danger fw-bold">{errors.primer_nombre?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Segundo Nombre: </label>
              <input className="form-control" placeholder="Segundo Nombre" type="text" {...register("segundo_nombre")} />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Primer Apellido:  <span className="text-danger">*</span></label>
              <input className="form-control" placeholder="Primer Apellido" type="text" {...register("primer_apellido")} />
              {errors.primer_apellido && <span className="text-danger fw-bold">{errors.primer_apellido?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Segundo Apellido: </label>
              <input className="form-control" placeholder="Segundo Apellido" type="text" {...register("segundo_apellido")} />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Género:  <span className="text-danger">*</span></label>
              <select className="form-control" {...register("genero")}>
                <option value="">Selecciona una opción</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
              {errors.genero && <span className="text-danger fw-bold">{errors.genero?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Fecha de Nacimiento:  <span className="text-danger">*</span></label>
              <input className="form-control" placeholder="Fecha de Nacimiento" type="date" {...register("fecha_nacimiento")} max={minDate} />
              {errors.fecha_nacimiento && <span className="text-danger fw-bold">{errors.fecha_nacimiento?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <Departaments register={register} />
              {errors.departamento && <span className="text-danger fw-bold">{errors.departamento?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <Cities departament={departamento} register={register} />
              {errors.ciudad && <span className="text-danger fw-bold">{errors.ciudad?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Régimen:  <span className="text-danger">*</span></label>
              <select className="form-control" {...register("regimen")}>
                <option value="">Selecciona una opción</option>
                <option value="SUBSIDIADO">Subsidiado</option>
                <option value="CONTRIBUTIVO">Contributivo</option>
              </select>
              {errors.regimen && <span className="text-danger fw-bold">{errors.regimen?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Zona:  <span className="text-danger">*</span></label>
              <select className="form-control" {...register("zona")}>
                <option value="">Selecciona una opción</option>
                <option value="URBANO">Urbano</option>
                <option value="RURAL">Rural</option>
              </select>
              {errors.zona && <span className="text-danger fw-bold">{errors.zona?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Celular:  <span className="text-danger">*</span></label>
              <input className="form-control" placeholder="Celular" type="tel" {...register("celular")} />
              {errors.celular && <span className="text-danger fw-bold">{errors.celular?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Teléfono:</label>
              <input className="form-control" placeholder="Teléfono" type="text" {...register("telefono")} />
              {errors.telefono && <span className="text-danger fw-bold">{errors.telefono?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Correo Electrónico:  <span className="text-danger">*</span></label>
              <input className="form-control" placeholder="Correo Electrónico" type="text" {...register("correo_electronico")} />
              {errors.correo_electronico && <span className="text-danger fw-bold">{errors.correo_electronico?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <label className="form-control-label">Dirección:  <span className="text-danger">*</span></label>
              <input className="form-control" placeholder="Dirección" type="text" {...register("direccion")} />
              {errors.direccion && <span className="text-danger fw-bold">{errors.direccion?.message}</span>}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mg-t-10 mg-lg-t-0">
              <button type="submit" className="btn-primary btn-with-icon btn-block mt-3">
                <div className="ht-40 justify-content-between">
                  <span className="pd-x-15">Crear</span>
                  <span className="icon wd-40"><i className="bi bi-check"></i></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}