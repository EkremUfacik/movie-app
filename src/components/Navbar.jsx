import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useAuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const drawerWidth = 240;

function Navbar(props) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loginLogout = () => {
    user ? logout() : navigate("login");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <i style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          EKREM/U
        </i>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemText
            sx={{ textAlign: "center" }}
            primary={user?.displayName}
          />
        </ListItem>
        <ListItem onClick={loginLogout} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={user ? "Logout" : "Login"} />
          </ListItemButton>
        </ListItem>

        {!user && (
          <ListItem onClick={() => navigate("/register")} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const logout = async () => {
    signOut(auth);
    toast.info("Logging out");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{ backgroundColor: "#172601", height: "64px" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <i style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              EKREM/U
            </i>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {user && (
              <span style={{ marginRight: "1rem" }}>{user?.displayName}</span>
            )}

            <Button
              onClick={loginLogout}
              variant="contained"
              color="success"
              sx={{ color: "#fff", mr: "1rem" }}
            >
              {user ? "Logout" : "Login"}
            </Button>
            {!user && (
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                color="success"
                sx={{ color: "#fff" }}
              >
                Register
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
