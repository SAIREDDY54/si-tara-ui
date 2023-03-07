import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TALE from "../img/talebg.png";
import LogoutButton from "./Logout";

const Appbar = () => {
    return (
        <AppBar position="fixed" style={{ zIndex: 1 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={TALE} style={{ height: "50px", width: "50px", marginRight: "10px" }} />
                    <h3>Si-TARA</h3>
                </Box>
                {localStorage.getItem("email") == null ? "" : <LogoutButton/>}

            </Toolbar>

        </AppBar>
    )
}

export default Appbar;