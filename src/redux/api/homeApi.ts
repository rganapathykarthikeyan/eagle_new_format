import { type SaveNonMotorDetailRequest } from '@/services/models/home.models'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { store } from '../store'
import { type GuestLoginResponse, type SaveNonMotorDetailResponse } from '@/services/home.services'
import { type SaveCustomerDetailResponse } from '@/services/common.services'
import { type SaveCustomerDetailRequest } from '@/services/models/common.models'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
	// eslint-disable-next-line indent
	return action.type === HYDRATE
}

export const homeApi = createApi({
	reducerPath: 'home',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/home/'
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (isHydrateAction(action)) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (build) => ({
		guestLogin: build.mutation<GuestLoginResponse, void>({
			query: () => ({
				url: 'do_guest_login',
				method: 'POST'
			})
		}),
		saveNonMotorDetails: build.mutation<SaveNonMotorDetailResponse, SaveNonMotorDetailRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: SaveNonMotorDetailRequest
				headers: { Authorization: string }
			} => ({
				url: 'save_non_motor_details',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		saveCustomerDetails: build.mutation<SaveCustomerDetailResponse, SaveCustomerDetailRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: SaveCustomerDetailRequest
				headers: { Authorization: string }
			} => ({
				url: 'save_customer_details',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		})
	})
})

export const {
	useSaveNonMotorDetailsMutation,
	useGuestLoginMutation,
	useSaveCustomerDetailsMutation
} = homeApi
