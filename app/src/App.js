 
import TopSection from './Components/TopSection';
import { createGlobalStyle } from 'styled-components';
 
const Globalstyled = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body{
    background-color: #323334;
    color: white;
    min-height: 100vh;
  }
`;

function App(){ 
    return (
               <div>
                 <Globalstyled/>
                 <TopSection/> 
               </div>
    );  
} ;


export default App;