import { Routes as Switch, Route } from "react-router-dom";
import Navbar from './components/Header';
import Statements from './components/Statements';
import Home from './components/Home';

function App() {

  return (
    <>  
        <Navbar />
        <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/statements" element={<Statements />} />
        </Switch>
    </>
  );
}

export default App;
