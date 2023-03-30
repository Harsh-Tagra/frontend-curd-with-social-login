import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { SetFormDialogState } from "@/redux/FormDialogState";
import styles from "../../styles/FormDialog.module.scss";
import { useFormik } from "formik";
import { ChangePassword } from "@/schema/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { Avatar, Typography } from "@mui/material";
import Profileform from "./Profileform";
import { SetProfile } from "@/redux/Profile";

export default function FormDialog() {
  const open = useSelector((state: any) => state.FormDialogState.Open);
  const [Edit, setEdit] = React.useState(false);
  const type = useSelector((state: any) => state.FormDialogState.type);
  const Dispatch = useDispatch();
  const router = useRouter();
  let token: any;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const PasswordInitialValues = {
    new_password: "",
    comfirmPassword: "",
  };
  const delhandleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_Server}/del`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.clear();
      router.push("/");
    } catch (error) {
      router.push("/Redirect");
    }
  };
  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,

    handleSubmit,
  } = useFormik({
    initialValues: PasswordInitialValues,
    validationSchema: ChangePassword,
    onSubmit: async (value: any, action) => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_Server}/changepass`,
          {
            confirm_password: value.comfirmPassword,
            password: value.new_password,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        handleClose();
      } catch (error) {
        console.log(error);
        handleClose();
        router.push("/");
      }
    },
  });
  const handleClose = () => {
    // setOpen(false);

    Dispatch(SetFormDialogState({ Open: false, type }));
    setTimeout(() => {
      setEdit(false);
    }, 300);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "rgb(49, 48, 48)",
            color: "white",
          },
        }}
      >
        <DialogTitle>{type} </DialogTitle>

        {type == "Profile" ? (
          <>
            <Profileform></Profileform>
          </>
        ) : type == "Change password" ? (
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className={styles.password}>
                <div style={{ padding: "10px" }}>
                  <TextField
                    fullWidth
                    id="new_password"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    label="New Password"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.new_password}
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "white",
                        },
                      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "white",
                        },
                    }}
                  ></TextField>
                  {errors.new_password && touched.new_password ? (
                    <p
                      style={{
                        color: "white",
                      }}
                    >
                      {errors.new_password.toLocaleString()}
                    </p>
                  ) : null}
                </div>
                <div style={{ padding: "10px" }}>
                  <TextField
                    fullWidth
                    id="comfirmPassword"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    label="Confim New Password"
                    onBlur={handleBlur}
                    value={values.comfirmPassword}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "white",
                        },
                      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "white",
                        },
                    }}
                  ></TextField>
                  {errors.comfirmPassword && touched.comfirmPassword ? (
                    <p
                      style={{
                        color: "white",
                      }}
                    >
                      {errors.comfirmPassword.toLocaleString()}
                    </p>
                  ) : null}
                </div>
              </div>
              <DialogActions>
                <Button onClick={handleClose} color="inherit">
                  Cancel
                </Button>
                <Button type="submit" color="inherit">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        ) : (
          <>
            <DialogContent>
              <Typography color="white">
                do you want to delete your account they are never recovery able
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={delhandleSubmit} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
