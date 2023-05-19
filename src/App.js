import React, {useState, useEffect} from "react";
import { Planet } from "react-planet";
import { Fab } from "@mui/material";
import "./App.css";
import sol from './assets/Sol.png'
import { Button, Drawer, Space,Form, Row, Col, Input, message } from 'antd';


function App() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [allPlanetas, setAllPlanetas] = useState([])
  const [agregarPlaneta, setAgregarPlaneta] = useState(''); 
  const [modiPlaneta, setModiPlaneta] = useState({});
  const [idPlaneta, setIdPlaneta] = useState(0);

  useEffect(() => {
    getPlanetas();
  }, []);

  const getPlanetas = () =>{    
    fetch('https://api-planetas.vercel.app/api/planetas')
    .then(response => response.json())
    .then(data => setAllPlanetas(data.data))
    .catch(error => console.error(error)) 
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer2 = () => {
    setOpen2(true);
  };

  const onClose2 = () => {
    setOpen2(false);
  };

  const onEdit = (record) => {
    console.log(record)
    setModiPlaneta(record);
    setIdPlaneta(record.Id);
    showDrawer2();
  };
  const armarObjetoPlaneta = (values) =>{
    return {
      nombre: values.nombre || '',
      p_left: values.p_left || '',
      p_top: values.p_top || '',
      height: values.height || '',
      width: values.width || '',
      image: values.image || ''
    };
  }

  const nuevoPlaneta = () =>{
    const url = "https://api-planetas.vercel.app/api/planetas"; 
    // Realizar la solicitud POST y obtener la respuesta
    console.log(JSON.stringify(armarObjetoPlaneta(agregarPlaneta)));
    fetch(url, {
      method: "POST",
      body: JSON.stringify(armarObjetoPlaneta(agregarPlaneta)),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(json => {
        // Leer la respuesta de la API
        if(json.message === 'Planeta creado correctamente'){ // Si el valor de message es "Usuario Correcto"
          onClose();
          getPlanetas();
          message.success("Planeta creado correctamente");
        }
        else{ //En caso de que sea incorrecto
          console.log(json.message)
        }
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.error(error);
      });
  }

  const eliminarPlaneta = () =>{
    const url = "https://api-planetas.vercel.app/api/planetas/" + idPlaneta; 
    console.log(url)
    // Realizar la solicitud POST y obtener la respuesta
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(json => {
        // Leer la respuesta de la API
        if(json.message === 'Planeta eliminado correctamente'){ 
          onClose2();
          getPlanetas();
          message.success("Planeta eliminado correctamente");
        }
        else{ //En caso de que sea incorrecto
          console.log(json.message)
        }
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.error(error);
      });
  }

  const modificarPlanetaEspecifico = () => {
    const url = "https://api-planetas.vercel.app/api/planetas/" + idPlaneta; 
    console.log(url)
    // Realizar la solicitud POST y obtener la respuesta
    console.log(JSON.stringify(armarObjetoPlaneta(modiPlaneta)));
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(armarObjetoPlaneta(modiPlaneta)),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(json => {
        // Leer la respuesta de la API
        if(json.message === 'Planeta actualizado correctamente'){ 
          onClose2();
          getPlanetas();
          message.success("Planeta modificado correctamente");
        }
        else{ //En caso de que sea incorrecto
          console.log(json.message)
        }
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.error(error);
      });
};

  return (
    <div className="app-container">
      <Drawer title="Agregar Planeta" width={500} placement="right" onClose={() => {onClose()}} open={open}
        destroyOnClose = "true"
        extra={ 
        <Space>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={() => {nuevoPlaneta()}} type="primary">
            Aceptar
        </Button>
        </Space>}>
        <Form layout="vertical" onValuesChange={(_, values) => setAgregarPlaneta(values)}>
            <Row gutter={14}>
            <Col span={24}>
                <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Porfavor, ingrese nombre' }]}>
                <Input placeholder='Ingrese nombre del planeta'/>
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={14}>
            <Col span={12}>
                <Form.Item name="p_left" label="Distancia lateral" rules={[{ required: true, message: 'Porfavor, ingrese distancia'}]}>
                <Input placeholder='Distancia lateral en px'/>
                </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="p_top" label="Distancia vertical" rules={[{ required: true, message: 'Porfavor, ingrese distancia'}]}>
                <Input placeholder='Distancia vertical en px'/>
            </Form.Item>
            </Col>
            </Row>
            <Row gutter={14}>
            <Col span={12}>
                <Form.Item name="width" label="Ancho del planeta" rules={[{ required: true, message: 'Porfavor, ingrese ancho'}]}>
                <Input placeholder='Ingrese ancho del planeta'/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="height" label="Altura del planeta" rules={[{ required: true, message: 'Porfavor, ingrese altura'}]}>
                <Input placeholder='Ingrese altura del planeta'/>
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={24}>
                <Form.Item name="image" label="Imagen" rules={[{ required: true, message: 'Porfavor, ingrese imagen'}]}>
                <Input placeholder='Ingrese imagen del planeta'/>
                </Form.Item>
            </Col>
            </Row>
        </Form>
        </Drawer>   
        <Drawer title="Modificar Planeta" width={500} placement="right" onClose={() => {onClose2()}} open={open2}
        destroyOnClose = "true"
        extra={ 
        <Space>
        <Button onClick={onClose2}>Cancelar</Button>
        <Button onClick={() => {modificarPlanetaEspecifico()}} type="primary">
            Aceptar
        </Button>
        </Space>}>
        <Form layout="vertical" initialValues={modiPlaneta} onValuesChange={(_, values) => setModiPlaneta(values)}>
            <Row gutter={14}>
            <Col span={24}>
                <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Porfavor, ingrese nombre' }]}>
                <Input defaultValue={modiPlaneta.nombre} placeholder='Ingrese nombre del planeta'/>
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={14}>
            <Col span={12}>
                <Form.Item name="p_left" label="Distancia lateral" rules={[{ required: true, message: 'Porfavor, ingrese distancia'}]}>
                <Input defaultValue={modiPlaneta.p_left} placeholder='Distancia lateral en px'/>
                </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="p_top" label="Distancia vertical" rules={[{ required: true, message: 'Porfavor, ingrese distancia'}]}>
                <Input defaultValue={modiPlaneta.p_top} placeholder='Distancia vertical en px'/>
            </Form.Item>
            </Col>
            </Row>
            <Row gutter={14}>
            <Col span={12}>
                <Form.Item name="width" label="Ancho del planeta" rules={[{ required: true, message: 'Porfavor, ingrese ancho'}]}>
                <Input defaultValue={modiPlaneta.width} placeholder='Ingrese ancho del planeta'/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="height" label="Altura del planeta" rules={[{ required: true, message: 'Porfavor, ingrese altura'}]}>
                <Input defaultValue={modiPlaneta.height} placeholder='Ingrese altura del planeta'/>
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={24}>
                <Form.Item name="image" label="Imagen" rules={[{ required: true, message: 'Porfavor, ingrese imagen'}]}>
                <Input defaultValue={modiPlaneta.image} placeholder='Ingrese imagen del planeta'/>
                </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={24}>
                <Form.Item>
                <Button onClick={() => {eliminarPlaneta()}} style={{ width: '100%' }} type="primary" danger>
                  Eliminar planeta
                </Button>
                </Form.Item>
            </Col>
            </Row>
        </Form>
        </Drawer>     
      <div className="menu-container">
        <Planet className="planet"
          centerContent={
            <Fab key="1" size="large" color="neutral"
            onClick={showDrawer}
            style={{
              backgroundImage: `url(${sol})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '80px',
              height: '80px',
            }}>
            </Fab>
          }
          hideOrbit
          orbitRadius={150}
          bounceOnClose
          rotation={105}
          bounceDirection="BOTTOM"
          open
        >
{allPlanetas.map((record) => (
  <Fab
    key={record.id}
    variant="extended"
    size="large"
    onClick={() => onEdit(record)}
    color="neutral"
    style={{
      position: 'absolute',
      top: record.p_top,
      left: record.p_left,
      width: record.width,
      height: record.height,
      borderRadius: '70%',
      backgroundImage: `url(${record.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
  </Fab>
        ))}
        </Planet>
      </div>
    </div>
  );
}

export default App;