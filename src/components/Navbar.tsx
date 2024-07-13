import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-scroll";

const Navbar: React.FC = () => {
  return (
    <AppBar className="appBar">
      <Toolbar>
        <Typography variant="h6" className="title">
          Dashboard Clima
        </Typography>
        <Button color="inherit" className="button">
          <Link to="indicadores" smooth={true} duration={500}>
            Inicio
          </Link>
        </Button>
        <Button color="inherit" className="button">
          <Link to="pronosticos" smooth={true} duration={500}>
            Pronosticos
          </Link>
        </Button>
        <Button color="inherit" className="button">
          <Link to="tendencias" smooth={true} duration={500}>
            Tendencias
          </Link>
        </Button>
        <Button color="inherit" className="button">
          <Link to="prodet" smooth={true} duration={500}>
            Pronosticos Detallados
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;