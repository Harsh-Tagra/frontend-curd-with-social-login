import {
  DialogContent,
  Avatar,
  TextField,
  IconButton,
  Button,
  DialogActions,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import styles from "../../styles/FormDialog.module.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetFormDialogState } from "@/redux/FormDialogState";
import { profileYup } from "@/schema/yup";
import uploadfile from "@/Aws/s3";
import { SetProfile } from "@/redux/Profile";
import { useRouter } from "next/router";
import axios from "axios";
const Profileform = () => {
  const Profile = useSelector((state: any) => state.Profile.data);
  const type = useSelector((state: any) => state.FormDialogState.type);
  const [Edit, setEdit] = React.useState(false);
  const [link, setLink] = useState(Profile.profile_picture);
  const Dispatch = useDispatch();
  const [Msg, setMsg] = useState({ text: "", code: 0 });
  const router = useRouter();
  const handleClose = () => {
    // setOpen(false);

    Dispatch(SetFormDialogState({ Open: false, type }));
    setTimeout(() => {
      setEdit(false);
    }, 300);
  };
  const Post = async (token: any, paylod: object) => {
    try {
      const post = await axios.post(
        `${process.env.NEXT_PUBLIC_Server}/user/info`,
        paylod,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (post.status == 200) {
        console.log(post.data.token);

        localStorage.setItem("token", post.data.token);
      } else {
        setMsg({ text: post.data.msg, code: post.status });
      }
      handleClose();
      router.push("/Redirect");
    } catch (error: any) {
      setMsg({ text: error.response.data.msg, code: error.response.status });
      localStorage.clear();
      setTimeout(() => {
        router.push("/");
      }, 10000);
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
    initialValues: Profile,
    validationSchema: profileYup,
    onSubmit: async (value: any, action) => {
      try {
        const paylod = {
          email: value.email,
          name: value.name,
          profile_picture: link,
        };

        const token = localStorage.getItem("token");
        Post(token, paylod);
        Dispatch(
          SetProfile({
            email: value.email,
            name: value.name,
            profile_picture: link,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
  const filehandel = async (e: any) => {
    const url = await uploadfile(`${Date.now()}`, e.target.files[0]);
    setLink(url);
  };
  return (
    <>
      {!Edit ? (
        <>
          <DialogContent>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt={Profile.name}
                sx={{ width: 150, height: 150 }}
                src={Profile.profile_picture}
              ></Avatar>
            </div>
            <h4> name: {Profile.name}</h4>
            <h4> email: {Profile.email}</h4>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Closed
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                setEdit(true);
              }}
            >
              edit
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <Avatar
                    alt={Profile.name}
                    sx={{ width: 150, height: 150 }}
                    src={link}
                  ></Avatar>
                  <input
                    hidden
                    id="profile_picture"
                    onBlur={handleBlur}
                    // value={Url}
                    accept="image/*"
                    onChange={async (e) => {
                      filehandel(e);
                    }}
                    type="file"
                  />
                </IconButton>
              </div>
              <div className={styles.password}>
                <div style={{ padding: "10px" }}>
                  <TextField
                    fullWidth
                    id="name"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    label="Name"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.name}
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
                  {errors.name && touched.name ? (
                    <p
                      style={{
                        color: "white",
                      }}
                    >
                      {errors.name.toLocaleString()}
                    </p>
                  ) : null}
                </div>{" "}
                <div style={{ padding: "10px" }}>
                  <TextField
                    fullWidth
                    id="email"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    label="Email"
                    onBlur={handleBlur}
                    value={values.email}
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
                  {errors.email && touched.email ? (
                    <p
                      style={{
                        color: "white",
                      }}
                    >
                      {errors.email.toLocaleString()}
                    </p>
                  ) : null}
                </div>
              </div>
              {Msg.code == 200 || Msg.code == 201 ? (
                <Alert severity="success">{Msg.text}</Alert>
              ) : Msg.code == 401 ? (
                <Alert severity="error">{Msg.text}</Alert>
              ) : (
                <></>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Closed
              </Button>
              <Button type="submit" color="inherit">
                submit
              </Button>
            </DialogActions>
          </form>
        </>
      )}
    </>
  );
};

export default Profileform;
