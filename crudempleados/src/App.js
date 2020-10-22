import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl="https://localhost:5001/api/Empleados";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalModificar, setModalModificar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [gestorSeleccionado, SetGestorSeleccionado]=useState({
    id_empleados: '',
    codigo: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    fecha_nacimiento: '',
    id_puesto: '',
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    SetGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalModificar=()=>{
    setModalModificar(!modalModificar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })

  }

  const peticionPost=async()=>{
    delete gestorSeleccionado.id_empleados;
    gestorSeleccionado.id_puesto=parseInt(gestorSeleccionado.id_puesto);
    await axios.post(baseUrl, gestorSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
      peticionGet();
    }).catch(error=>{
      console.log(error);
    })

  }

  const peticionPut=async()=>{
    gestorSeleccionado.id_empleados=parseInt(gestorSeleccionado.id_empleados);
    gestorSeleccionado.id_puesto=parseInt(gestorSeleccionado.id_puesto);
    await axios.put(baseUrl, gestorSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalModificar();
      peticionGet();
    }).catch(error=>{
      console.log(error);
    })

  }

  const peticionDelete=async()=>{
    gestorSeleccionado.id_empleados=parseInt(gestorSeleccionado.id_empleados);
    gestorSeleccionado.id_puesto=parseInt(gestorSeleccionado.id_puesto);
    await axios.delete(baseUrl+"/"+gestorSeleccionado.id_empleados)
    .then(response=>{
      setData(data.filter(gestor=>gestor.id_empleados==response.data));
      abrirCerrarModalEliminar();
      peticionGet();
    }).catch(error=>{
      console.log(error);
    })

  }

  const seleccionarGestor=(gestor, caso)=>{
    SetGestorSeleccionado(gestor);
    (caso==="Modificar")?
    abrirCerrarModalModificar(): abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="App">
      <h1>CRUD de Empleados</h1>
      <h2>Ericka del Rosario Gonzalez Acuta</h2>
      <h3>1290-19-3192</h3>
      <br></br>
      <button className="btn btn-primary" onClick={()=>abrirCerrarModalInsertar()}> Agregar Empleado </button>
      <br></br>
      <br></br>
      <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Codigo</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Direccion</th>
          <th>Telefono</th>
          <th>Fecha de Nacimiento</th>
          <th>ID Puesto</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>

      {data.map(gestor=>(
        <tr key={gestor.id_empleados}>
            <td>{gestor.codigo}</td>
            <td>{gestor.nombres}</td>
            <td>{gestor.apellidos}</td>
            <td>{gestor.direccion}</td>
            <td>{gestor.telefono}</td>
            <td>{gestor.fecha_nacimiento}</td>
            <td>{gestor.id_puesto}</td>
           
            <td>
                <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor, "Modificar")}>Modificar</button> {" "}
                <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
            </td>
        </tr>
      ))}

      </tbody>
      </table>

      <Modal isOpen={modalInsertar}> 
        <ModalHeader>Formulario de Empleados</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Codigo: </label>
            <br />
            <input type="text" className="form-control" name="codigo"  onChange={handleChange}/>
            <label>Nombres: </label>
            <br />
            <input type="text" className="form-control"name="nombres" onChange={handleChange}/>
            <label>Apellidos: </label>
            <br />
            <input type="text" className="form-control"name="apellidos" onChange={handleChange}/>
            <label>Direccion: </label>
            <br />
            <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
            <label>Telefono: </label>
            <br />
            <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
            <label>Fecha de Nacimiento: </label>
            <br />
            <input type="date" className="form-control" name="fecha_nacimiento" onChange={handleChange}/>
            <label>ID Puesto: </label>
            <br />
            <input type="number" className="form-control" name="id_puesto" onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{" "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalModificar}>
      <ModalHeader>Modificar Empleado</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label>ID Empleados: </label>
            <br />
            <input type="text" className="form-control" name="id_empleados" readOnly value={gestorSeleccionado && gestorSeleccionado.id_empleados}/>
            <label>Codigo: </label>
            <br />
            <input type="text" className="form-control" name="codigo"  onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.codigo}/>
            <label>Nombres: </label>
            <br />
            <input type="text" className="form-control"name="nombres" onChange={handleChange}value={gestorSeleccionado && gestorSeleccionado.nombres}/>
            <label>Apellidos: </label>
            <br />
            <input type="text" className="form-control"name="apellidos" onChange={handleChange}value={gestorSeleccionado && gestorSeleccionado.apellidos}/>
            <label>Direccion: </label>
            <br />
            <input type="text" className="form-control" name="direccion" onChange={handleChange}value={gestorSeleccionado && gestorSeleccionado.direccion}/>
            <label>Telefono: </label>
            <br />
            <input type="text" className="form-control" name="telefono" onChange={handleChange}value={gestorSeleccionado && gestorSeleccionado.telefono}/>
            <label>Fecha de Nacimiento: </label>
            <br />
            <input type="date" className="form-control" name="fecha_nacimiento" onChange={handleChange}value={gestorSeleccionado && gestorSeleccionado.fecha_nacimiento}/>
            <label>ID Puesto: </label>
            <br />
            <input type="number" className="form-control" name="id_puesto" onChange={handleChange}value={gestorSeleccionado && gestorSeleccionado.id_puesto}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>{" "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalModificar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Desea Eliminar este Empleado? {gestorSeleccionado && gestorSeleccionado.nombres}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Si
          </button>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
