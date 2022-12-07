import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import Home from '../src/Pages/Home'
import AddOrganization from '../src/Pages/AddOrganization'
// import companies from '../src/Pages/Companies/companies'
import './index.css'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index.js'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'

const history = createBrowserHistory()
let store = createStore(reducers, applyMiddleware(thunk))

render(
	<Provider store={store}>
		<HashRouter history={history}>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/addOrganization/' component={AddOrganization} />
				{/* <Route exact path='/companiesList/' component={companies} /> */}
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
