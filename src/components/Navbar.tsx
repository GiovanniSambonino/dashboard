import React from "react";
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-scroll";

// Define tu tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#aeeca8",
    },
  },
});

const Navbar: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar className="appBar" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" className="title" sx={{ flexGrow: 1, textAlign: "left", color: "#0081fa" }}>
            Dashboard Clima
          </Typography>
          <div>
            <Button color="inherit" className="button">
              <Link to="indicadores" smooth={true} duration={500} style={{ color: "#0081fa" }}>
                Inicio
              </Link>
            </Button>
            <Button color="inherit" className="button">
              <Link to="pronosticos" smooth={true} duration={500} style={{ color: "#0081fa" }}>
                Pronosticos
              </Link>
            </Button>
            <Button color="inherit" className="button">
              <Link to="tendencias" smooth={true} duration={500} style={{ color: "#0081fa" }}>
                Tendencias
              </Link>
            </Button>
            <Button color="inherit" className="button">
              <Link to="prodet" smooth={true} duration={500} style={{ color: "#0081fa" }}>
                Pronosticos Detallados
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
