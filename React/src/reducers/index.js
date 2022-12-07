import { combineReducers } from 'redux'
import stateDataStore from './reducer-data.js'
import companyListData from './reducer-companiesList.js'

const rootReducer = combineReducers({
    // stateData: stateDataStore,
    // companyList: companyListData
})

export default rootReducer