import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerValue(props) {
  const updateValue = (v) => {
    let date = dayjs(v)
    props.handleDate(date);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        <DatePicker
        //   label="Controlled picker"
          value={dayjs(props.date)}
          onChange={updateValue}
          slotProps={{
            actionBar: {
              actions: ['today', 'clear', 'accept'],
            },
          }}
          
          
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}