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

  const handleChangeSystemCinema = (newValue) => {
    // const selectedSystem = systemCine[newValue];
    // console.log("selectedSystem", selectedSystem);
    // if (selectedSystem) {
    //   setSelectedCine(selectedSystem.maHeThongRap || "");
    //   setSelectedSystemId(selectedSystem?.maHeThongRap);
    // }
    setSelectedCine(newValue);
  };
  // console.log("selectedSystemId:", selectedSystemId);

  const [selectedRap, setSelectedRap] = useState([]);
  const { data: lichChieu } = useQuery({
    queryKey: ["lichChieu", selectedCine],
    queryFn: () => getLichChieu(selectedCine),
    enabled: !!selectedCine,
  });
  console.log("lichChieu:", lichChieu);
  const lichChieuTheoCum = lichChieu?.lstCumRap || [];

  console.log("lichChieuTheoCum:", lichChieuTheoCum);
  const handleChangeRap = (cumRapId) => {
    setSelectedRap(cumRapId);
    console.log("cumRapId:", cumRapId);
  };

  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, value) => {
    setValue2(value);
  };

  // console.log("systemCine", systemCine);
  // console.log("inforSysCine", inforSysCine);
  console.log("selectedRap:", selectedRap);
  return (
    <div id="cinema">
      <Container
        maxWidth="md"
        className={style.container}
        style={{ marginTop: "200px" }}
      >
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
                backgroundColor: "#00ac4d",
              },
            }}
          >
            {systemCine.map((system, index) => {
              return (
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
                  onClick={() => handleChangeSystemCinema(system.maHeThongRap)}
                />
              );
            })}
          </Tabs>

          {systemCine.map((item, index) => (
            <TabPanel
              className={style.cinemaByIdList}
              value={value}
              index={index}
              indicatorColor="#cccccc"
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                aria-label="Vertical tabs example"
                value={value2}
                onChange={handleChange2}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#00ac4d",
                  },
                }}
              >
                {inforSysCine.map((info, index) => (
                  <Tab
                    label={
                      <Button
                        style={{
                          position: "relative",
                          textAlign: "left",
                          height: "90px",
                        }}
                        onClick={() => handleChangeRap(info.maCumRap)}
                      >
                        <div className={style.cinemaLogoTab}>
                          <h5 className={style.cinemaTenCumRap}>
                            {info.tenCumRap}
                          </h5>
                          <h6 className={style.cinemaDiaChi}>{info.diaChi}</h6>
                        </div>
                      </Button>
                    }
                    {...a11yProps(index)}
                  ></Tab>
                ))}
              </Tabs>
            </TabPanel>
          ))}
          {lichChieuTheoCum.map((cumRap) => (
            <TabPanel
              value={value2}
              index={lichChieuTheoCum.indexOf(cumRap)}
              key={cumRap.maCumRap}
            >
              {cumRap.danhSachPhim.map((phim) => {
                console.log(phim.tenPhim);
                return (
                  <div key={phim.maPhim}>
                    <h3>{phim.tenPhim}</h3>
                    {/* Các thông tin phim khác */}
                  </div>
                );
              })}
            </TabPanel>
          ))}
        </Box>
      </Container>
    </div>
  );
}
