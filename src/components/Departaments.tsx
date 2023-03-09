import data from '../data/Departaments.json'
import { UseFormRegister } from 'react-hook-form'
import { PERSONAL_INFORMATION } from '../Types'

type props = {
  register: UseFormRegister<PERSONAL_INFORMATION>
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