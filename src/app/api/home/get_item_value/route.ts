import { getItemValue } from '@/services/home.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const data = await req.json()
	const res = await getItemValue(data, req.headers.get('authorization'))

	return NextResponse.json(res, {
		status: res.status
	})
}
