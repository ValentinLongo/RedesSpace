import React, {useState, useEffect} from "react";
import { Planet } from "react-planet";
import { Fab } from "@mui/material";
import "./App.css";
import sol from './assets/Sol.png'
import { Button, Drawer, Space,Form, Row, Col, Input } from 'antd';


function App() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [allPlanetas, setAllPlanetas] = useState([])
  const [agregarPlaneta, setAgregarPlaneta] = useState(''); 

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
        if(json.message === 'usuario created succefully'){ // Si el valor de message es "Usuario Correcto"
          onClose();
          getPlanetas();
          alert("Usuario creado correctamente")
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
         {allPlanetas.map(allPlanetas => (
          <Fab
            key={allPlanetas.id}
            variant="extended"
            size="large"
            onClick={showDrawer2}
            color="neutral"
            style={{
              position: 'absolute',
              top: allPlanetas.p_top,
              left: allPlanetas.p_left,
              width: allPlanetas.width,
              height: allPlanetas.height,
              borderRadius:'70%',
              backgroundImage: `url(${allPlanetas.image})`,
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