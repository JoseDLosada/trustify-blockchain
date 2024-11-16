import {Routes,Route} from 'react-router-dom'
import  Login  from './TrustifyLogin';
import  Layout  from './TrustifyLayout';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/layout' element={<Layout/>}/>
      </Routes>
    </div>
  );
}
export default App;

