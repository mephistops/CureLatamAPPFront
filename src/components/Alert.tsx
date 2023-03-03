import Swal from 'sweetalert2'
import { ALERT } from '../Types'

export function Alert({ title, icon, text }: ALERT) {
  return (
    Swal.fire({
      title: title,
      icon: icon,
      text: text
    })
  )
}