import Swal from "sweetalert2"

export const successAlert = (title?: string, text?: string) => {
  Swal.fire(
    title || undefined,
    text || undefined,
    'success'
  )
}

export const errorAlert = (title?: string, text?: string) => {
  Swal.fire(
    title || undefined,
    text || undefined,
    'error'
  )
}