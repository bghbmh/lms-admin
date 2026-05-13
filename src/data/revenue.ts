// 월별 매출 데이터 (최근 6개월)
export const dummyMonthlyRevenue = [
	{ month: '11월', revenue: 320000, enrollments: 8 },
	{ month: '12월', revenue: 480000, enrollments: 12 },
	{ month: '1월', revenue: 390000, enrollments: 9 },
	{ month: '2월', revenue: 560000, enrollments: 14 },
	{ month: '3월', revenue: 720000, enrollments: 18 },
	{ month: '4월', revenue: 1240000, enrollments: 28 },
]

// 강의별 매출
export const dummyCourseRevenue = [
	{ courseTitle: '왕초보 영어회화', revenue: 620000, enrollments: 14 },
	{ courseTitle: '비즈니스 영어 이메일', revenue: 390000, enrollments: 8 },
	{ courseTitle: '영어 발음 교정 클래스', revenue: 230000, enrollments: 4 },
	{ courseTitle: '미국 드라마 영어', revenue: 0, enrollments: 0 },
]

// 최근 결제 내역
export const dummyRecentPayments = [
	{
		id: 'pay-001',
		learnerName: '박수강',
		courseTitle: '왕초보 영어회화 — be동사부터 시작',
		amount: 44100,
		paidAt: '2025-04-19T10:05:00+09:00',
		status: 'success' as const,
	},
	{
		id: 'pay-002',
		learnerName: '최학생',
		courseTitle: '왕초보 영어회화 — be동사부터 시작',
		amount: 49000,
		paidAt: '2025-04-18T11:10:00+09:00',
		status: 'success' as const,
	},
	{
		id: 'pay-003',
		learnerName: '정배움',
		courseTitle: '직장인을 위한 비즈니스 영어 이메일',
		amount: 59000,
		paidAt: '2025-04-17T09:15:00+09:00',
		status: 'success' as const,
	},
	{
		id: 'pay-004',
		learnerName: '김철수',
		courseTitle: '영어 발음 교정 클래스',
		amount: 89000,
		paidAt: '2025-04-16T14:30:00+09:00',
		status: 'success' as const,
	},
	{
		id: 'pay-005',
		learnerName: '이영희',
		courseTitle: '왕초보 영어회화 — be동사부터 시작',
		amount: 49000,
		paidAt: '2025-04-15T16:20:00+09:00',
		status: 'refunded' as const,
	},
]