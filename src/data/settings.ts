
export type PlanType = 'free' | 'starter' | 'pro'
export type PlanStatus = 'active' | 'paused' | 'cancelled'

export const dummySiteSettings = {
	id: 'site-001',
	userId: 'user-001',
	brandName: '홍쌤 영어연구소',
	subdomain: 'honggd',
	customDomain: 'www.hongenglish.com',
	domainStatus: 'connected' as const,
	businessNumber: '123-45-67890',
	bankAccount: '국민은행 123-456-789012',
	tossClientKey: 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Emo',
	tossSecretKey: 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5p',
	tossMode: 'test' as const,
	onboardingCompleted: true,
}

export const dummySitePlan: {
	id: string
	siteId: string
	planType: PlanType    // ← 'starter' 고정값이 아닌 PlanType 유니온으로
	status: PlanStatus
	enrollmentLimit: number
	enrollmentUsed: number
	billingCycleStart: string
	nextBillingDate: string
	payoutRate: number
} = {
	id: 'plan-001',
	siteId: 'site-001',
	planType: 'starter',
	status: 'active',
	enrollmentLimit: 100,
	enrollmentUsed: 37,
	billingCycleStart: '2025-04-01',
	nextBillingDate: '2025-05-01',
	payoutRate: 0.95,
}