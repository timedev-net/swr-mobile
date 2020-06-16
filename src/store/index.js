import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'

import thunk from 'redux-thunk';

const store = applyMiddleware(thunk)(createStore)(reducers);


// console.log(store.getState());

export default store;
