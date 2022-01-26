import { useState, useEffect } from 'react'
import {
  leerPago,
  leerTransacciones,
  actualizarPago
} from '../lib/incidente'

const datos = {
  si_id: '',
  ri_fecha: '',
  ri_solucion: ''
}

export function Incidente(){
  const [dataEstado, setDataEstado] = useState([])
  const [dataTransacciones, setDataTransacciones] = useState([])
  const [reload, setReload] = useState(false)
  const [form, setForm] = useState(datos)

  const enviarFormulario = async () =>{
    const respuesta = await actualizarPago(form)
    alert(respuesta.mensaje)
    setReload(!reload)
    setForm(datos)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.ri_fecha || !form.ri_solucion || !form.si_id) {
      alert('Datos incompletos')
      return
    }else{
      enviarFormulario()
    }
  }

  useEffect(function(){
    leerPago().then(r => setDataEstado(r))
    leerTransacciones().then(t => setDataTransacciones(t))
  }, [reload])

  return(
    <>
    <h1 className='titulo'>Transacción de Incidente</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="id">Incidente Id: </label> 
              <input type="number" name="si_id" id="id"
              onChange={handleChange} value={form.si_id} className='inputsi w-id m-r du'/>

              <label htmlFor="id2">Solución: </label> 
              <input type="text" name="ri_solucion" id="id2"
              onChange={handleChange} value={form.ri_solucion} className='inputsi m-r'/>

              <label htmlFor="id3">Incidente fecha: </label> 
              <input type="date" name="ri_fecha" id="id3"
              onChange={handleChange} value={form.ri_fecha} className='inputsi m-r'/>

              <input type="submit" value="Enviar" className='enviar'/>
          </div>
        </form>

      </div>

      <div>
          <h2 className='subtitulo'>Estado incidente</h2>
          <table className='c-table' id='customers'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
            {
              dataEstado.map((e) => {
                return(
                  <tr key={e.incidente_id}>
                    <td>{e.incidente_id}</td>
                    <td>{e.incidente_tipo}</td>
                    <td>{e.incidente_fecha.slice(0, 10)}</td>
                    <td>{e.si_estado}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>

      <div className='flex-entregas'>
        <div>
          <h2 className='subtitulo'>Datos transaccionales</h2>
          <table className='c-table' id='customers'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>Fecha incidente</th>
                <th>Estado</th>
                <th>Solucion</th>
                <th>Fecha solución</th>
              </tr>
            </thead>
            <tbody>
            {
              dataTransacciones.map((t) => {
                return(
                  <tr key={t.incidente_id}>
                    <td>{t.incidente_id}</td>
                    <td>{t.incidente_tipo}</td>
                    <td>{t.incidente_fecha.slice(0, 10)}</td>
                    <td>{t.si_estado}</td>
                    <td>{t.ri_solucion}</td>
                    <td>{t.ri_fecha.slice(0, 10)}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        
      </div>
    </>
  )
}