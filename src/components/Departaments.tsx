import data from '../data/Departaments.json'
import { UseFormRegister } from 'react-hook-form'
import { personalInformation } from '../pages/Paciente'

type props = {
  register: UseFormRegister<personalInformation>
}

export default function Departaments({register}: props) {
  return (
    <>
      <label className="form-control-label">Departamento:  <span className="text-danger">*</span></label>
      <select className="form-control" defaultValue={0} {...register("departamento", {required: true})}>
        <option value="">Selecciona una opción</option>
        {data.map((e, i)=>{
          return (<option key={i} value={e.code}>{e.name}</option>)
        })}
      </select>
    </>
  )
}