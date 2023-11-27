import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { NumericFormat } from "react-number-format";

const AccountListItem = (props) => {
  const { id, account_name, amount } = props;

  return (
    <div key={id} className="account-list-item">
      <Card sx={{ maxWidth: 600, margin: 5 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {account_name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "right" }}
            >
              <NumericFormat
                value={amount.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <MoreVertIcon className="alignItems: flex-end" />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default AccountListItem;
