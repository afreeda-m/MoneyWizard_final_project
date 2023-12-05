import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SideBarData } from "../data/SideBarData";


// The sidebar's width in pixels.
const drawerWidth = 250;


// This component is a "Permanent Drawer" imported from the Material UI library.
export default function PermanentDrawerLeft() {

  // Use the `useLocation` function from `React-Router-Dom` to figure out the
  // current page's path. We're going to compare this value to the `item.path`
  // value provided from `SideBarData.js`. We will check if they match to
  // highlight the current page button in the Sidebar.
  const location = useLocation();


  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />


      {/* THE MATERIAL-UI SIDEBAR & ITS ELEMENTS */}
      <Drawer

        // (APPEARS TO BE) MATERIAL UI SIDEBAR SETTINGS
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >


        {/* MONEY WIZARD LOGO */}
        <img id="logo" src="MWlogo.png" alt="Money Wizard logo"></img>
        <Divider />


        {/* THE ELEMENTS OF THE SIDEBAR */}
        <List>
          {SideBarData.map((item) => (

            // Each `ListItem` requires a `component={Link}` and `to={}`
            // properties defined so that you can turn it into a functioning
            // link. `Link` is imported from `react-router-dom`, so don't
            // forget to do that.
            <ListItem
              key={item.title}
              component={Link}
              to={item.path}
              disablePadding

            >

              {/* Wrap in `ListItemButton` tags so that when you mouse over
                * the links in the sidebar, their backgrounds get highlighted.
                *
                * `selected`: The `location.pathname` from `react-router-dom`
                * is compared to the `item.path` value from `SideBarData.js`.
                * If the two are the same, the current `ListItemButton` will be
                * highlighted. (See the declaration of `useLocation()` above.)
                */}
              <ListItemButton
                selected={location.pathname === item.path ? true : false}
                sx={{ paddingY: "2rem" }}
              >

                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />

              </ListItemButton>

            </ListItem>

          ))}
        </List>
        <Divider />

      </Drawer>

    </Box>
  );

}