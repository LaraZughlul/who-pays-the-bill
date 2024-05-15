import { MyContext } from './context';
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/app.css'
//Toastify! :3
import 'react-toastify/dist/ReactToastify.css';

import Stage1 from './components/stage_one';
import Stage2 from './components/stage_two';

const App = () => {
  const context = useContext(MyContext);

  
  return (
    <div className='wrapper'>
      <div className='center-wrapper'>
        <h1>Who pays the bill?</h1>
        {
          context.stage === 1 ? <Stage1/> : <Stage2/>
        }
      </div>
    </div>
  )

}

export default App;