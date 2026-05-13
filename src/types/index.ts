// src/types/index.ts 에 추가

// ============================================================
// users (강사 + 수강생 통합)
// ============================================================
export interface User {
	id: string
	email: string
	role: 'owner' | 'admin' | 'instructor' | 'learner'
	name: string
	avatarUrl?: string
	phone?: string
	createdAt: string
	lastLoginAt?: string
}

// ============================================================
// courses
// ============================================================
export interface Course {
	id: string
	categoryId?: string
	title: string
	description?: string
	thumbnailUrl?: string
	courseType: 'vod' | 'live' | 'live_bundle'
	price: number
	originalPrice?: number
	isPublished: boolean
	completionThreshold: number
	shortUrlSlug?: string
	createdAt: string
	updatedAt: string
	// 조인용 (실제 DB 컬럼 아님)
	studentCount?: number
	chapterCount?: number
}

// ============================================================
// chapters (차시)
// ============================================================
export interface Chapter {
	id: string
	courseId: string
	title: string
	sortOrder: number
	description?: string
	createdAt: string
	// 조인용
	lessonItemCount?: number
}

// ============================================================
// lesson_items
// ============================================================
export interface LessonItem {
	id: string
	chapterId: string
	title: string
	contentType: 'video' | 'document'
	sortOrder: number
	videoSource?: 'bunny' | 'youtube'
	bunnyVideoId?: string
	youtubeUrl?: string
	durationSec?: number
	docContent?: string
	docFileUrl?: string
	isFreePreview: boolean
	completionType: 'auto' | 'manual'
	createdAt: string
}

// ============================================================
// enrollments (수강신청)
// ============================================================
export interface Enrollment {
	id: string
	learnerId: string
	courseId: string
	status: 'active' | 'completed' | 'refunded'
	enrolledAt: string
	completedAt?: string
	couponId?: string
	// 조인용
	learnerName?: string
	learnerEmail?: string
	courseTitle?: string
	progress?: number
}

// ============================================================
// payments (결제)
// ============================================================
export interface Payment {
	id: string
	enrollmentId: string
	learnerId: string
	instructorId: string
	tossPaymentKey: string
	orderId: string
	amount: number
	originalAmount: number
	pgFee?: number
	platformFee?: number
	payoutAmount?: number
	payoutStatus: 'pending' | 'paid'
	status: 'pending' | 'success' | 'failed' | 'cancelled'
	paidAt?: string
	createdAt: string
}

// ============================================================
// coupons
// ============================================================
export interface Coupon {
	id: string
	instructorId: string
	courseId?: string
	code: string
	discountType: 'percent' | 'fixed'
	discountValue: number
	maxUses?: number
	usedCount: number
	expiresAt?: string
	createdAt: string
	// 조인용
	courseTitle?: string
}

// ============================================================
// board_posts (게시글)
// ============================================================
export interface BoardPost {
	id: string
	boardId: string
	authorId: string
	authorName: string
	title: string
	body: string
	isAnonymous: boolean
	isPinned: boolean
	isAnswered: boolean
	likeCount: number
	commentCount: number
	createdAt: string
	updatedAt: string
	// 조인용
	courseTitle?: string
}

// ============================================================
// board_comments (댓글)
// ============================================================
export interface BoardComment {
	id: string
	postId: string
	parentCommentId?: string
	authorId: string
	authorName: string
	body: string
	isAnonymous: boolean
	likeCount: number
	isDeleted: boolean
	createdAt: string
}



// ============================================================
// course form 전용 타입 (DB 타입과 별개)
// ============================================================

export interface ChapterForm {
	id: string
	title: string
	lessons: LessonItemForm[]
	isOpen: boolean
}

export interface LessonItemForm {
	id: string
	title: string
	contentType: 'video' | 'document'
	videoSource?: 'bunny' | 'youtube'
	youtubeUrl?: string
	isFreePreview: boolean
}

export interface CourseForm {
	title: string
	description: string
	categoryId: string
	courseType: 'vod' | 'live' | 'live_bundle'
	thumbnailUrl: string
	price: string
	originalPrice: string
	completionThreshold: string
	isPublished: boolean
}