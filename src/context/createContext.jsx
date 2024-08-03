import { createContext ,useState} from 'react';


export const ThemeContext = createContext('');

export const ThemeProvider = ({ children }) => {
    const [value, setValue] = useState(0);
    return (
      <ThemeContext.Provider value={{ value, setValue }}>
        {children}
      </ThemeContext.Provider>
    );
  };



export const SideBarContext=createContext('')

  export const SideBar=({children})=>{
    const [open, setOpen] = useState(true);

    return (
      <SideBarContext.Provider value={{open,setOpen}} >
      {children}
      </SideBarContext.Provider>
    )
  }




  export const responsiveContext=createContext('')


  export const Responsive=({children})=>{

    const [responsiveMd,setResponsiveMd]=useState(true)

    return (
      <responsiveContext.Provider  value={{responsiveMd,setResponsiveMd}}>
        {children}
      </responsiveContext.Provider>
    )
  }