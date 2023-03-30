import { SetProfile } from "@/redux/Profile";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/home.module.scss";

const Redirect = () => {
  const router = useRouter();

  const Dispatch = useDispatch();
  const getProfile = async (token: any) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_Server}/user/info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data == null) {
        localStorage.clear();
        router.push("/");
      } else {
        Dispatch(SetProfile(data));
        setTimeout(() => {
          router.push("/Home");
        }, 5000);
      }
    } catch (error) {
      localStorage.clear();
      router.push("/");
    }
  };
  const [progress, setProgress] = React.useState(0);

  const featch = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_Server}/`, {
        method: "GET",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      localStorage.setItem("token", data.token);

      getProfile(data.token);
    } catch (error) {
      router.push("/");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (token == null) {
      featch();
    } else {
      getProfile(token);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Image
        src="/favicon.ico"
        width={150}
        height={150}
        alt="error"
        style={{ margin: "20px" }}
      ></Image>
      <Box sx={{ width: "250px" }}>
        <LinearProgress color="success" />
      </Box>
    </div>
  );
};

export default Redirect;
