import type { Coupon } from '@/types'

export const dummyCoupons: Coupon[] = [
	{
		id: 'coupon-001',
		instructorId: 'user-001',
		code: 'SPRING2025',
		discountType: 'percent',
		discountValue: 20,
		maxUses: 100,
		usedCount: 37,
		expiresAt: '2025-05-31T23:59:59+09:00',
		createdAt: '2025-03-01T09:00:00+09:00',
	},
	{
		id: 'coupon-002',
		instructorId: 'user-001',
		courseId: 'course-001',
		code: 'ENGLISH5000',
		discountType: 'fixed',
		discountValue: 5000,
		maxUses: 50,
		usedCount: 12,
		expiresAt: '2025-06-30T23:59:59+09:00',
		createdAt: '2025-03-15T09:00:00+09:00',
		courseTitle: '왕초보 영어회화 — be동사부터 시작',
	},
	{
		id: 'coupon-003',
		instructorId: 'user-001',
		code: 'WELCOME10',
		discountType: 'percent',
		discountValue: 10,
		usedCount: 88,
		createdAt: '2025-01-15T09:00:00+09:00',
	},
]