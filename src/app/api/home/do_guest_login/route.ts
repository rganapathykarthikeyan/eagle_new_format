import { doGuestLogin } from '@/services/home.services'
import { NextResponse } from 'next/server'

export async function POST() {
	const res = await doGuestLogin()

	return NextResponse.json(res, {
		status: res.status
	})
}
