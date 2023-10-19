import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInformtionSystemCinema,
  getSystemCinema,
  postShowing,
} from "../../../../../apis/cinemaAPI";
import {
  Box,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { DatePicker } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed } from "yup";
import { useForm, Controller } from "react-hook-form";

const { RangePicker } = DatePicker;
const addCinemaSchema = object({
  ngayChieuGioChieu: mixed()
    .test("isValidDate", "Ngày giờ không hợp lệ", (value) => {
      // Thực hiện kiểm tra xem giá trị có phải là ngày hợp lệ không
      return value ? !isNaN(Date.parse(value)) : false;
    })
    .required("Ngày giờ không được để trống"),
  giaVe: string().required("Giá không được để trống"),
  maHeThongRap: string().required("Hệ thống rạp không được để trống"),
  maCumRap: string().required("Cụm rạp không được để trống"),
});

export default function AddLichChieu() {
  const [selectedCine, setSelectedCine] = useState("");
  const [seclectSysCine, setSelectSysCine] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
      maHeThongRap: "",
      maCumRap: "",
    },
    resolver: yupResolver(addCinemaSchema),
  });

  const { data: systemCine = [] } = useQuery({
    queryKey: ["systemCinema"],
    queryFn: getSystemCinema,
  });

  const { data: inforSysCine = [] } = useQuery({
    queryKey: ["informationSysCine", selectedCine],
    queryFn: () => getInformtionSystemCinema(selectedCine),
    enabled: !!selectedCine,
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => postShowing(values),
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    if (selectedCine) {
      // Gọi truy vấn để lấy danh sách rạp từ hệ thống rạp được chọn
      queryClient.invalidateQueries(["informationSysCine", selectedCine]);
    }
  }, [selectedCine]);

  // Sử dụng useEffect để theo dõi sự thay đổi của inforSysCine và cập nhật state selectSystemCine
  useEffect(() => {
    if (inforSysCine) {
      setSelectSysCine(inforSysCine);
    }
  }, [inforSysCine]);

  const handleChangeSystemCinema = (newValue) => {
    setSelectedCine(newValue);
  };

  const onChange = (value) => {
    console.log("Selected Time: ", value);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  return (
    <div>
      <h1>Add Showtime</h1>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ maxWidth: 360 }}>
            <FormControl fullWidth>
              <InputLabel id="heThongRapLabel">Hệ thống rạp</InputLabel>
              <Controller
                name="maHeThongRap"
                control={control}
                defaultValue=""
                rules={{ required: "Hệ thống rạp không được để trống" }}
                render={({ field }) => (
                  <Select
                    labelId="heThongRapLabel"
                    id="maHeThongRap"
                    value={selectedCine}
                    onChange={(e) => handleChangeSystemCinema(e.target.value)}
                    label="Hệ thống rạp"
                    {...field}
                  >
                    {systemCine.map((rap) => (
                      <MenuItem key={rap.maHeThongRap} value={rap.maHeThongRap}>
                        {rap.tenHeThongRap}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <span>{errors?.maHeThongRap?.message}</span>
            </FormControl>
          </Box>
          <Box sx={{ maxWidth: 360 }}>
            <FormControl fullWidth>
              <InputLabel id="cumRapLabel">Cụm rạp</InputLabel>
              <Controller
                name="maCumRap"
                control={control}
                defaultValue=""
                rules={{ required: "Cụm rạp không được để trống" }}
                render={({ field }) => (
                  <Select
                    labelId="cumRapLabel"
                    id="maCumRap"
                    value={seclectSysCine}
                    onChange={(event) => setSelectSysCine(event.target.value)}
                    label="Cụm rạp"
                    {...field}
                  >
                    {inforSysCine.map((rap) => (
                      <MenuItem key={rap.maCumRap} value={rap.maCumRap}>
                        {rap.tenCumRap}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <span>{errors?.maCumRap?.message}</span>
            </FormControl>
          </Box>
          <DatePicker showTime onChange={onChange} onOk={onOk} />
          <span>{errors?.ngayChieuGioChieu?.message}</span>
          <div>
            <TextField
              label="Giá vé"
              type="number"
              min="75000"
              max="95000"
              {...register("giaVe")}
            />
            <span>{errors?.giaVe?.message}</span>
          </div>
          <Button type="submit" variant="contained" color="success">
            Tạo lịch chiếu
          </Button>
        </form>
      </Container>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   getInformtionSystemCinema,
//   getSystemCinema,
//   postShowing,
// } from "../../../../../apis/cinemaAPI";
// import {
//   Box,
//   Container,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import { DatePicker } from "antd";
// import { useForm } from "react-hook-form";
// // import "antd/dist/antd.css";

// const { RangePicker } = DatePicker;
// export default function AddLichChieu() {
//   //day-time
//   const onChange = (
//     value: DatePickerProps["value"] | RangePickerProps["value"],
//     dateString: [string, string] | string
//   ) => {
//     console.log("Selected Time: ", value);
//     console.log("Formatted Selected Time: ", dateString);
//   };

//   const onOk = (
//     value: DatePickerProps["value"] | RangePickerProps["value"]
//   ) => {
//     console.log("onOk: ", value);
//   };
//   const [selectedCine, setSelectedCine] = useState("");
//   const [selectSystemCine, setSelectedSystemCine] = useState("");
//   const { data: systemCine = [] } = useQuery({
//     queryKey: ["systemCinema"],
//     queryFn: getSystemCinema,
//   });
//   const { data: inforSysCine = [] } = useQuery({
//     queryKey: ["informationSysCine", selectedCine],
//     queryFn: () => getInformtionSystemCinema(selectedCine),
//     enabled: !!selectedCine,
//   });

//   //API up showing
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       maPhim: "",
//       ngayChieuGioChieu: "",
//       maRap: "",
//       giaVe: "",
//     },
//   });
//   const { mutate: onSubmit } = useMutation({
//     mutationFn: (values) => {
//       return postShowing(values);
//     },
//   });
//   const handleChangeSystemCinema = (newValue) => {
//     setSelectedCine(newValue);
//   };
//   const queryClient = useQueryClient();
//   useEffect(() => {
//     if (selectedCine) {
//       // Gọi truy vấn để lấy danh sách rạp từ hệ thống rạp được chọn
//       queryClient.invalidateQueries(["informationSysCine", selectedCine]);
//     }
//   }, [selectedCine]);

//   // Sử dụng useEffect để theo dõi sự thay đổi của inforSysCine và cập nhật state selectSystemCine
//   useEffect(() => {
//     if (inforSysCine) {
//       setSelectedSystemCine(inforSysCine);
//     }
//   }, [inforSysCine]);
//   return (
//     <div>
//       <h1>Add Showtime</h1>
//       <Container>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box sx={{ maxWidth: 360 }}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">
//                 Hệ thống rạp
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={selectedCine}
//                 onChange={(e) => handleChangeSystemCinema(e.target.value)}
//                 label="Hệ thống rạp"
//               >
//                 {systemCine.map((rap) => (
//                   <MenuItem key={rap.maHeThongRap} value={rap.maHeThongRap}>
//                     {rap.tenHeThongRap}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//           <Box sx={{ maxWidth: 360 }}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Cụm rạp</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={selectSystemCine}
//                 onChange={(event) => setSelectedSystemCine(event.target.value)}
//                 label="Cụm rạp"
//               >
//                 {inforSysCine.map((rap) => (
//                   <MenuItem key={rap.maCumRap} value={rap.maCumRap}>
//                     {rap.tenCumRap}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//           <DatePicker showTime onChange={onChange} onOk={onOk} />
//           <div>
//             <TextField label="Giá vé" type="number" min="75000" max="95000" />
//           </div>
//           <Button variant="contained" color="success">
//             Tạo lịch chiếu
//           </Button>
//         </form>
//       </Container>
//     </div>
//   );
// }
