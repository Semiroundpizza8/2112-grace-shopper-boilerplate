import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Link
} from "@material-ui/core";
import {
    Security,
    Info
} from "@material-ui/icons";

const Footer = () => <>
        
        <AppBar position="fixed" elevation={0} component="footer" color="secondary" style={{margin: "100%"}}>
            <Toolbar style={{ justifyContent: "center" }}>
                <Typography variant="caption">©2022</Typography>
            </Toolbar>
        </AppBar>
    </>

export default Footer;