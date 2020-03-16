import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Detail from './screens/Detail/Detail'
import Home from './screens/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/detail" component={Detail} />
      </Switch>
    </BrowserRouter>
  )
}

export default App