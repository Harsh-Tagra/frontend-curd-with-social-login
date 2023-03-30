import FormDialog from "@/components/home/FormDialog";
import ResponsiveAppBar from "@/components/home/Navbar";
import {
  Avatar,
  Card,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import styles from "../styles/home.module.scss";
import AddIcon from "@mui/icons-material/Add";

import { useSelector } from "react-redux";

const Home = () => {
  const Profile = useSelector((state: any) => state.Profile.data);
  const [info, setinfo] = useState(true);
  console.log(info);
  return (
    <div className={styles.main}>
      <div style={{ height: "fit-content" }}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Typography color="white" fontSize={50}>
          welcome,{Profile.name}
        </Typography>
      </div>

      <FormDialog></FormDialog>
    </div>
  );
};

export default Home;
