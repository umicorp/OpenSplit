import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Types
type HandleDate = (date: Dayjs) => void;

export default function DatePickerValue({handleDate, date}: {handleDate: HandleDate, date: Dayjs}): JSX.Element {
  const updateValue = (v:any) => {
    console.log(v);
    // const date = dayjs(v);
    handleDate(v); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        <DatePicker
        //   label="Controlled picker"
          value={dayjs(date)}
          onChange={updateValue}
          slotProps={{
            actionBar: {
              actions: ["today", "clear", "accept"],
            },
          }}
          
          
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}