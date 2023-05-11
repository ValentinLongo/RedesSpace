import React, {useState} from "react";
import { Planet } from "react-planet";
import { Fab } from "@mui/material";
import "./App.css";
import sol from './assets/Sol.png'
import { Button, Drawer, Space } from 'antd';

const planetas = [
  {key:'2',name:'Marte',top: '-200px',left: '-200px',img: 'https://w7.pngwing.com/pngs/75/937/png-transparent-planet-earth-planet-mars-mercury-jupiter-mars-atmosphere-sphere-venus-thumbnail.png'},
  {key:'3',name:'Jupiter',top: '200px',left: '-200px', img: 'https://w7.pngwing.com/pngs/322/728/png-transparent-jupiter-web-browser-computer-icons-jupiter-sphere-bitcoin-saturn.png'},
  {key:'4',name:'Saturno',top: '-200px',left: '200px', img: 'https://w7.pngwing.com/pngs/390/722/png-transparent-saturn-saturn-s-rings-planet-universe-rings-astronomy-solar-system-sky-science-space.png'},
  {key:'5',name:'Pluton',top: '200px',left: '200px', img: 'https://e7.pngegg.com/pngimages/743/958/png-clipart-new-horizons-pluto-s-heart-moons-of-pluto-pluto-planet-new-horizons-pluto-s-heart.png'}
]

function App(props) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="app-container">
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open} 
       extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} type="primary">
            Submit
          </Button>
        </Space>
      }>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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
         {planetas.map(planeta => (
          <Fab
            key={planeta.key}
            variant="extended"
            size="large"
            onClick={showDrawer}
            color="neutral"
            style={{
              position: 'absolute',
              top: planeta.top,
              left: planeta.left,
              backgroundImage: `url(${planeta.img})`,
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