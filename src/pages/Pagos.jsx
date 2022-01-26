import { useState, useEffect } from 'react'
import {
  leerPago,
  leerTransacciones,
  actualizarPago
} from '../lib/pagos'

const datos = {
  fallecido_id: '',
  pago_valor: '',
  pago_fecha: ''
}

export function Pagos(){
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

    if (!form.fallecido_id || !form.pago_fecha || !form.pago_valor) {
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
    <h1 className='titulo'>Transacción de Pago</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="id">Pago Id: </label> 
              <input type="number" name="fallecido_id" id="id"
              onChange={handleChange} value={form.fallecido_id} className='inputsi w-id m-r du'/>

              <label htmlFor="id2">Pago valor: </label> 
              <input type="number" name="pago_valor" id="id2"
              onChange={handleChange} value={form.pago_valor} className='inputsi m-r'/>

              <label htmlFor="id3">Pago fecha: </label> 
              <input type="date" name="pago_fecha" id="id3"
              onChange={handleChange} value={form.pago_fecha} className='inputsi m-r'/>

              <input type="submit" value="Enviar" className='enviar'/>
          </div>
        </form>

      </div>

      <div>
          <h2 className='subtitulo'>Estado pagos</h2>
          <table className='c-table' id='customers'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Valor</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
            {
              dataEstado.map((e) => {
                return(
                  <tr key={e.pago_id}>
                    <td>{e.pago_id}</td>
                    <td>{e.pago_valor}</td>
                    <td>{e.pago_estado}</td>
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
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Tipo de pago</th>
                <th>Fecha</th>
                <th>Valor pagado</th>
              </tr>
            </thead>
            <tbody>
            {
              dataTransacciones.map((t) => {
                return(
                  <tr key={t.fallecido_id}>
                    <td>{t.fallecido_id}</td>
                    <td>{t.fallecido_nombres}</td>
                    <td>{t.fallecido_apellidos}</td>
                    <td>{t.pago_tipo}</td>
                    <td>{t.pago_fecha.slice(0, 10)}</td>
                    <td>{t.pago_valor}</td>
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