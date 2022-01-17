import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "./Navbar.scss";

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navWrap" position="static">
        <Toolbar className="Navbar" variant="regular">
          <img
            src="https://fontmeme.com/permalink/220117/348221a9c9a51d3e022061d83dca0f46.png"
            alt="nasa-font"
            border="0"
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
