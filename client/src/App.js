import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" exact component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
