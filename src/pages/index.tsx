import Head from "next/head";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TextField from "@mui/material/TextField";
import { Button, Card, Divider, Fab, Typography } from "@mui/material";
import styles from "../styles/login.module.scss";
import InputBase from "@mui/material/InputBase";
import { useFormik } from "formik";
import { logischema } from "@/schema/yup";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import ForgetPassword from "@/components/ForgetPassword";

export default function Home() {
  const router = useRouter();

  const [res, setres] = useState({
    status: 0,
    msg: "",
  });
  const Submit = async (value: any) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_Server}/login`, {
        username: value.email,
        password: value.password,
      });

      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        router.push("/Redirect");
      }
      setres({ status: res.status, msg: res.data.msg });
    } catch (error: any) {
      console.log("error", error);
      setres({ status: error.response.status, msg: error.response.data.msg });
    }
    console.log(res);
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,

    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: logischema,
    onSubmit: (value, action) => {
      Submit(value);
    },
  });

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Card className={styles.card}>
          <h1 style={{ color: "white", textAlign: "center" }}>LOGIN</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Typography style={{ color: "red", margin: "0px" }}>
              {res.msg}
            </Typography>
            <InputBase
              className={styles.input}
              placeholder="Email"
              id="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              sx={{ input: { color: "white" } }}
            ></InputBase>
            {errors.email && touched.email ? (
              <Typography color="green">{errors.email}</Typography>
            ) : null}
            <InputBase
              className={styles.input}
              placeholder="Password"
              id="password"
              type="password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              sx={{ input: { color: "white" } }}
            ></InputBase>
            {errors.password && touched.password ? (
              <Typography color="green">{errors.password}</Typography>
            ) : null}
            <ForgetPassword />

            <Button color="success" type="submit" className={styles.Button}>
              LOGIN
            </Button>
            <span style={{ color: "green" }}>
              You dont have account {}
              <span
                style={{ color: "blue" }}
                onClick={() => {
                  router.push("/reg");
                }}
              >
                click here
              </span>
            </span>
          </form>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Divider
              style={{ backgroundColor: "grey", width: "90%" }}
            ></Divider>
          </div>
          <div
            style={{
              height: "18%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Fab
              color="error"
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_Server}/auth/google`,
                  "_self"
                );
              }}
            >
              <GoogleIcon />
            </Fab>
            <Fab
              color="primary"
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_Server}/auth/facebook`,
                  "_self"
                );
              }}
            >
              <FacebookIcon />
            </Fab>
            <Fab
              color="inherit"
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_Server}/auth/github`,
                  "_self"
                );
              }}
            >
              <GitHubIcon />
            </Fab>
          </div>
        </Card>
      </div>
    </>
  );
}
