import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import {
  getInformtionSystemCinema,
  getLichChieu,
  getSystemCinema,
} from "../../../apis/cinemaAPI";
import style from "./cinemaStyle.module.css";

// --------------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, indicatorColor, ...other } = props;
  const theme = useTheme();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ position: "relative" }}>
          {/* Indicator */}
          <Box
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: 3, // Độ rộng của indicator
              backgroundColor: indicatorColor || theme.palette.primary.main,
            }}
          />

          {/* Nội dung của TabPanel */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  indicatorColor: PropTypes.string, // Màu của indicator
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
// ------------------------------------------------------------
export default function Cinema() {
  const { data: systemCine = [] } = useQuery({
    queryKey: ["systemCinema"],
    queryFn: getSystemCinema,
  });
  const [selectedCine, setSelectedCine] = useState("");
  const { data: inforSysCine = [] } = useQuery({
    queryKey: ["informationSysCine", selectedCine],
    queryFn: () => getInformtionSystemCinema(selectedCine),
    enabled: !!selectedCine,
  });
  const handleChangeSystemCinema = (event, newValue) => {
    const selectedSystem = systemCine[newValue];
    console.log("selectedSystem", selectedSystem);
    if (selectedSystem) {
      setSelectedCine(selectedSystem.maHeThongRap || "");
    }
  };
  const [selectedRap, setSelectedRap] = useState("");
  const { data: lichChieu = [] } = useQuery({
    queryKey: ["lichChieu", selectedRap],
    queryFn: () => getLichChieu(selectedRap),
    enabled: !!selectedRap,
  });

  const handleChangeRap = (event, newValue) => {
    const selectedInfo = inforSysCine[newValue];
    if (selectedInfo) {
      setSelectedRap(selectedInfo.lstCumRap || "");
    }
  };
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("systemCine", systemCine);
  console.log("inforSysCine", inforSysCine);
  return (
    <div>
      <Container maxWidth="md" className={style.container}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 720,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={style.tabs}
            sx={{
              borderRight: 1,
              borderColor: "divider",
              "& .MuiTabs-indicator": {
                backgroundColor: "#00ac4d", // Thay đổi màu sắc tại đây
              },
            }}
          >
            {systemCine.map((system, index) => (
              <Tab
                className={style.cinemaLogoTab}
                style={{
                  padding: "30px",
                  minWidth: "unset",
                  position: "relative",
                }}
                icon={
                  <Avatar
                    alt={system.biDanh}
                    src={system.logo}
                    className={style.cinemaLogoAvatar}
                  />
                }
                {...a11yProps(index)}
                key={system.maHeThongRap}
                onClick={(event) => handleChangeSystemCinema(event, index)}
              />
            ))}
          </Tabs>
          {inforSysCine.map((info, index) => {
            console.log("value:", value);
            console.log("index:", index);
            console.log("Tên:", info.tenCumRap);
            return (
              <TabPanel
                key={info.maCumRap}
                value={value}
                index={index}
                className={style.cinemaByIdList}
                style={{ padding: "0px" }}
                indicatorColor="#00ac4d"
              >
                <div>
                  <Button
                    style={{
                      position: "relative",
                      textAlign: "left",
                      padding: "18px",
                    }}
                    onClick={(event) => handleChangeRap(event, index)}
                  >
                    <div className={style.cinemaLogoTab}>
                      <h5 className={style.cinemaTenCumRap}>
                        {info.tenCumRap}
                      </h5>
                      <h6 className={style.cinemaDiaChi}>{info.diaChi}</h6>
                    </div>
                  </Button>
                </div>
              </TabPanel>
            );
          })}
          {lichChieu.map((lich, index) => {
            // console.log(lich);
            return (
              <Box>
                <div key={lich.maLichChieu} value={value} index={index}>
                  <img src={lich.hinhAnh} alt={lich.tenPhim} />
                </div>
              </Box>
            );
          })}
          <TabPanel></TabPanel>
        </Box>
      </Container>
    </div>
  );
}
