import React from "react";
import { Planet } from "react-planet";
import { Fab } from "@mui/material";
import "./App.css";
import sol from './assets/Sol.png'

function App(props) {
  return (
    <div className="app-container">
      <div className="menu-container">
        <Planet className="planet"
          centerContent={
            <Fab key="1" size="large" color="neutral"
            style={{
              backgroundImage: `url(${sol})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            </Fab>
          }
          hideOrbit
          orbitRadius={150}
          bounceOnClose
          rotation={105}
          bounceDirection="BOTTOM"
          open
          autoClose
        >
          <Fab
            key='2'
            variant="extended"
            size="small"
            color="neutral"
            style={{
              position: 'absolute',
              top: '-100px',
              left: '-100px'
            }}
          >
            {'child1'}
          </Fab>
          <Fab
            key='3'
            variant="extended"
            size="small"
            color="neutral"
            style={{
              position: 'absolute',
              top: '-100px',
              left: '100px'
            }}
          >
            {'child2'}
          </Fab>
          <Fab
            key='4'
            variant="extended"
            size="small"
            color="neutral"
            style={{
              position: 'absolute',
              top: '100px',
              left: '100px'
            }}
          >
            {'child3'}
          </Fab>
        </Planet>
      </div>
    </div>
  );
}

export default App;