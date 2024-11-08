import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
	appSlice,
	carInsuranceSlice,
	customerDetailsSlice,
	motorSlice,
	premiumMotorSlice
} from './slices'
import { commonApi } from './api/commonApi'
import { homeInsuranceSlice } from './slices/home-insurance.slice'
import { nonMotorSlice } from './slices/non-motor-details.slice'
import { homeApi } from './api/homeApi'

const reducer = combineReducers({
	[carInsuranceSlice.reducerPath]: carInsuranceSlice.reducer,
	[customerDetailsSlice.reducerPath]: customerDetailsSlice.reducer,
	[appSlice.reducerPath]: appSlice.reducer,
	[homeInsuranceSlice.reducerPath]: homeInsuranceSlice.reducer,
	[commonApi.reducerPath]: commonApi.reducer,
	[homeApi.reducerPath]: homeApi.reducer,
	[premiumMotorSlice.reducerPath]: premiumMotorSlice.reducer,
	[motorSlice.reducerPath]: motorSlice.reducer,
	[nonMotorSlice.reducerPath]: nonMotorSlice.reducer
})

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(commonApi.middleware, homeApi.middleware)
})

setupListeners(store.dispatch)
