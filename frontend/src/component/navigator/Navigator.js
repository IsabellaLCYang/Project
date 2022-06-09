import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "Home", icon: <HomeIcon />, path: "/" },
  { id: "Profile", icon: <PeopleIcon />, path: "/userX/profile" },
  { id: "Orders", icon: <LightbulbIcon />, path: "/userX/order_tracking/" },
  { id: "Cart", icon: <ShoppingCartIcon />, path: "/userX/cart/" },
  { id: "Log out", icon: <LogoutIcon />, path: "/login" },
];

const item = {
  py: "4px",
  px: 2,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 3,
  px: 3,
};

export default function Navigator(props) {
  let navigate = useNavigate();

  const { ...other } = props;
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemText>Simp.Com</ListItemText>
        </ListItem>

        <Box>
          {categories.map(({ id, icon, path, active }) => (
            <ListItem disablePadding key={id}>
              <ListItemButton
                selected={active}
                sx={item}
                onClick={() => navigate(path)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{id}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </List>
    </Drawer>
  );
}
