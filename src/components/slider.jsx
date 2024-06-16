import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { ThemeContext } from '../context/createContext';

// import "./slider.css"
const MAX = 50;
const MIN = 0;

const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

export default function CustomMarks() {
  const {value,setValue}=useContext(ThemeContext)
  const [val, setVal] = React.useState(MIN);
  const handleChange = (_, newValue) => {
    setVal(newValue);
    setValue(newValue)
  };
  {console.log(val)}

  return (
  
    <div style={{position:'relative',left:'20px',top:'0px',zIndex:'10'}}>
    <Box sx={{ width: 250,height:10 }}>
      <Slider
        marks={marks}
        step={10}
        value={val }
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
        className="custom-slider"
        sx={{
            // color: '#d9ff00', // Change this to your desired color
            // height:10,
            '& .MuiSlider-thumb': {
                height: 34, // Change this to your desired thumb height
                width: 34,  // Change this to your desired thumb width
                backgroundColor:'yellow', 
              },
              '& .MuiSlider-track': {
                height: 6, // Change this to match the track height
                color:'yellow'
              },
              '& .MuiSlider-rail': {
                height: 7, // Change this to match the rail height
                color:'black'
              },
    
      
           
          }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => setVal(MIN)}
          sx={{ cursor: 'pointer' }}
        >
          {MIN} min
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setVal(MAX)}
          sx={{ cursor: 'pointer' }}
        >
          {MAX} max
        </Typography>
      </Box>
    </Box>
    </div>

  );
}