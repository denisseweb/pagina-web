import { useState, useEffect } from 'react'
import {
  leerPersonal,
  actualizarPersonal,
  eliminarPersonal
} from '../lib/personal'

const datosIniciales = {
  pe_id: '',
  pe_cedula: '',
  pe_nombre: '',
  pe_apellido: '',
  pe_cargo: ''
}

export function Personal() {
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
        !form.pe_id ||
        !form.pe_cedula||
        !form.pe_nombre||
        !form.pe_apellido||
        !form.pe_cargo
      ) {
      alert('Datos incompletos')
      return
    }else{
      const actualizacion = async () => {
        const res = await actualizarPersonal(form)
        alert(res.mensaje)
        setReload(!reload)
        setForm(datosIniciales)
      }
      actualizacion()
    }
  }

  useEffect(function(){
    leerPersonal().then(v => setData(v))
  }, [reload])

  return (
    <>
      <div>
        <h1 className='titulo'>CRUD de Personal</h1>
        <div>
          <h2 className='subtitulo'>Crea o actualiza un personal</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">Id: </label> 
              <input type="number" name="pe_id" id="id"
              onChange={handleChange} value={form.pe_id} className='inputsi w-id m-r du'/>

              <label htmlFor="cantidad211">Cédula: </label>
              <input type="number" name="pe_cedula" id="cantidad211"
              onChange={handleChange} value={form.pe_cedula} className='inputsi m-r'/>

              <label htmlFor="id2">Nombres: </label> 
              <input type="text" name="pe_nombre" id="id2"
              onChange={handleChange} value={form.pe_nombre} className='inputsi m-r'/>

              <label htmlFor="id299">Apellidos: </label> 
              <input type="text" name="pe_apellido" id="id299"
              onChange={handleChange} value={form.pe_apellido} className='inputsi m-r'/>

              <label htmlFor="id4">Cargo: </label> 
              <input type="text" name="pe_cargo" id="id4"
              onChange={handleChange} value={form.pe_cargo} className='inputsi m-r'/>

              <input type="submit" value="Enviar" className='enviar'/>

            </div>
          </form>
        </div>

        <div>
          <h2 className='subtitulo'>Listar personal</h2>
          <table className='c-table' id='customers'>
          <thead>
          <tr>
            <th>Id</th>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cargo</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((c) => {
              return(
                <tr key={c.pe_id}>
                  <td>{c.pe_id}</td>
                  <td>{c.pe_cedula}</td>
                  <td>{c.pe_nombre}</td>
                  <td>{c.pe_apellido}</td>
                  <td>{c.pe_cargo}</td>
                  <td>
                      <button className='buttona mr-5'
                        onClick={() => {
                          setForm(c)
                        }}
                      >Editar</button>

                      <button className='buttone'
                        onClick={ async () => {
                          const res = await eliminarPersonal(c.pe_id)
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