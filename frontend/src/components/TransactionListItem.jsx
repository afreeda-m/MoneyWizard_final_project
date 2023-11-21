import React from "react";
import "../styles/TransactionListItem.scss";
import { Box, List, ListItem, ListItemText, ListItemIcon, ListItemButton, Divider } from '@mui/material';

const TransactionListItem = (props) => {

  const { id, categoryIcon, categoryName, accountName, amount, notes } = props;
  return (
    <div key={id} className="tranasction-list-item">
      <Box sx={{ width: '500px', bgcolor: '#efefef' }}>
        <List disablePadding>
          <ListItem>

            <ListItemIcon>{categoryIcon}</ListItemIcon>

            <ListItemText primary={categoryName} secondary={notes} sx={{ paddingLeft: "30px"}} />

            <ListItemText primary={amount} secondary="1111/11/11" sx={{ display:"flex", flexDirection:"column", alignItems:"flex-end" }} />

          </ListItem>

          <Divider />

        </List>

      </Box>
    </div>
  );
};

export default TransactionListItem;