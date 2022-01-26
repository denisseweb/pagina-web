import {API} from '.'

export async function actualizarPropietario(body){
  const url = `${API}/propietario/actualizar`

  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const response = await request.json()
  return response
}

export async function eliminarPropietario(id){
  const url = `${API}/propietario/${id}`

  const request = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}

export async function leerPropietario(){
  const url = `${API}/propietario`

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const response = await request.json()
  return response
}