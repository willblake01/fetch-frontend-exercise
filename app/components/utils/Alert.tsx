import Swal from 'sweetalert2'

interface AlertProps {
  title: string
  text?: string
}

export const Alert = ({ title, text }: AlertProps): void => {
  Swal.fire({
    icon: 'success',
    confirmButtonColor: '#7C1E6F',
    title,
    text
  })
}

export default Alert
