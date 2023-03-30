import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Typography } from "@mui/material";

export default function ForgetPassword() {
  const [open, setOpen] = React.useState(false);
  const [email, setemail] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = async () => {
    try {
      const data = axios.post(
        `${process.env.NEXT_PUBLIC_Server}/genrate/forgetpassword`,
        {
          email,
        }
      );
      handleClose();
    } catch (error) {}
  };
  return (
    <div>
      <Typography
        style={{
          position: "sticky",
          right: "54%",
        }}
        color="green"
        onClick={handleClickOpen}
      >
        Forget password ?
      </Typography>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            backgroundColor: "rgb(49, 48, 48)",
            color: "white",
          },
        }}
        onClose={handleClose}
      >
        <DialogTitle>Forget password </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: "30px" }} color="white">
            Please enter Email ID
          </DialogContentText>
          <TextField
            fullWidth
            value={email}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            onChange={(e: any) => {
              setemail(e.target.value);
            }}
            label="email"
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white",
                },
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="inherit" onClick={submit}>
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
