import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import * as React from 'react';


function FloatingActionButton(props) {

  return (

    <Box sx={{ '& > :not(style)': { m: 1 } }}>

      {/* THE ZOOM COMPONENT
        *
        * The Zoom API controls how the button appears when the page is loaded.
        * For example, you can have the FAB transition in, drawing attention to
        * it.
        */}
      <Zoom
        // If set to `true`, the component will transition into the page.
        in={true}
        // The time period for the transition effects.
        timeout={{ enter: 500, exit: 500 }}
      >

        {/* THE FLOATING ACTION BUTTON COMPONENT */}
        <Fab color="success"
          aria-label="add"
          style={{ position: "fixed", bottom: "7rem", right: "1rem" }}
          onClick={props.click}
        >

          {/* The plus sign in the button. */}
          <AddIcon />

        </Fab>

      </Zoom>

    </Box>

  );

}


export default FloatingActionButton;