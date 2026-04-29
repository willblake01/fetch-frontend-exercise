import Swal from 'sweetalert2'

interface AlertProps {
  title: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  toast?: boolean
}

export const Alert = async ({ title, text, icon = 'success', toast = false }: AlertProps): Promise<void> => {
  if (toast) {
    await Swal.fire({
      icon,
      title,
      text,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  } else {
    await Swal.fire({
      icon,
      confirmButtonColor: '#7C1E6F',
      title,
      text
    })
  }
}

export default Alert
