import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Hero } from './pages/Hero';
import { HeroContextProvider } from './contexts/HeroContext'

function App() {
  return (
   <div>
     <BrowserRouter>
      <HeroContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/hero/:id" component={Hero} />
        </Switch>
      </HeroContextProvider>
     </BrowserRouter>
   </div>
  );
}

export default App;
