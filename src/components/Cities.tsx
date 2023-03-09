import data from '../data/Cities.json'
import { UseFormRegister } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { PERSONAL_INFORMATION } from '../Types'

type props = {
  departament: string,
  register: UseFormRegister<PERSONAL_INFORMATION>
}

export default function Cities({ departament, register }: props) {
  const [cities, setData] = useState(data)
  useEffect(() => {
    setData(data.filter(e => e.dep.includes(departament)).sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    }))
  }, [departament])


  return (
    <>
      <label className="form-control-label">Ciudad:  <span className="text-danger">*</span></label>
      <select className="form-control" defaultValue={0} {...register("ciudad", {required: true})}>
        <option value="">Selecciona una opción</option>
        {departament !== '' && cities.map((e, i) => {
          return (<option key={i} value={e.code}>{e.name}</option>)
        })}
      </select>
    </>
  )
}