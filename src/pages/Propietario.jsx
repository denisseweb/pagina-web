import { useState, useEffect } from 'react'
import {
  leerPropietario,
  actualizarPropietario,
  eliminarPropietario
} from '../lib/propietario'

const datosIniciales = {
  propietario_id: '',
  propietario_cedula: '',
  propietario_nombres: '',
  propietario_apellidos: '',
  propietario_fecha: '',
  propietario_direccion: '',
  propietario_telefono: ''
}

export function Propietario() {
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)

  const [form, setForm] = useState(datosIniciales)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (
        !form.propietario_id||
        !form.propietario_cedula||
        !form.propietario_nombres||
        !form.propietario_apellidos||
        !form.propietario_fecha||
        !form.propietario_direccion||
        !form.propietario_telefono
      ) {
      alert('Datos incompletos')
      return
    }else{
      const actualizacion = async () => {
        const res = await actualizarPropietario(form)
        alert(res.mensaje)
        setReload(!reload)
        setForm(datosIniciales)
      }
      actualizacion()
    }
  }

  useEffect(function(){
    leerPropietario().then(v => setData(v))
  }, [reload])

  return (
    <>
      <div>
        <h1 className='titulo'>CRUD de Propietarios</h1>
        <div>
          <h2 className='subtitulo'>Crea o actualiza un propietario</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">Id: </label> 
              <input type="number" name="propietario_id" id="id"
              onChange={handleChange} value={form.propietario_id} className='inputsi w-id m-r du'/>

              <label htmlFor="cantidad211">Cédula: </label>
              <input type="number" name="propietario_cedula" id="cantidad211"
              onChange={handleChange} value={form.propietario_cedula} className='inputsi m-r'/>

              <label htmlFor="id2">Nombres: </label> 
              <input type="text" name="propietario_nombres" id="id2"
              onChange={handleChange} value={form.propietario_nombres} className='inputsi m-r'/>

              <label htmlFor="id299">Apellidos: </label> 
              <input type="text" name="propietario_apellidos" id="id299"
              onChange={handleChange} value={form.propietario_apellidos} className='inputsi m-r'/>
<div className='mt'>
              <label htmlFor="id3">Fecha de nacimiento: </label> 
              <input type="date" name="propietario_fecha" id="id3"
              onChange={handleChange} value={form.propietario_fecha} className='inputsi m-r'/>

              <label htmlFor="id4">Dirección: </label> 
              <input type="text" name="propietario_direccion" id="id4"
              onChange={handleChange} value={form.propietario_direccion} className='inputsi m-r'/>
              
              <label htmlFor="cantidad2">Teléfono: </label>
              <input type="number" name="propietario_telefono" id="cantidad2"
              onChange={handleChange} value={form.propietario_telefono} className='inputsi m-r'/>

              <input type="submit" value="Enviar" className='enviar'/>
              </div>
            </div>
          </form>
        </div>

        <div>
          <h2 className='subtitulo'>Listar propietarios</h2>
          <table className='c-table' id='customers'>
          <thead>
          <tr>
            <th>Id</th>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha de nacimiento</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((c) => {
              return(
                <tr key={c.propietario_id}>
                  <td>{c.propietario_id}</td>
                  <td>{c.propietario_cedula}</td>
                  <td>{c.propietario_nombres}</td>
                  <td>{c.propietario_apellidos}</td>
                  <td>{c.propietario_fecha.slice(0,10)}</td>
                  <td>{c.propietario_direccion}</td>
                  <td>{c.propietario_telefono}</td>
                  <td>
                      <button className='buttona mr-5'
                        onClick={() => {
                          c.propietario_fecha = c.propietario_fecha.slice(0,10)
                          setForm(c)
                        }}
                      >Editar</button>

                      <button className='buttone'
                        onClick={ async () => {
                          const res = await eliminarPropietario(c.propietario_id)
                          alert(res.mensaje)
                          setReload(!reload)
                        }}
                      >Eliminar</button>
                    </td>
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