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