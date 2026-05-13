import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '@/components/layout/AdminLayout'

// ── 대시보드 ──────────────────────────────────────────────
import DashboardPage from '@/pages/DashboardPage'

// ── 내 사이트 ─────────────────────────────────────────────
import ThemeSettingsPage from '@/pages/ThemeSettingsPage'
import PageEditorPage from '@/pages/PageEditorPage'
import GnbSettingsPage from '@/pages/GnbSettingsPage'
import SettingsDomainPage from '@/pages/SettingsDomainPage'

// ── 콘텐츠 ───────────────────────────────────────────────
import CoursesPage from '@/pages/CoursesPage'
import CourseFormPage from '@/pages/CourseFormPage'
import CourseDetailPage from '@/pages/CourseDetailPage'
import CategoriesPage from '@/pages/CategoriesPage'
import CouponsPage from '@/pages/CouponsPage'

// ── 수강생 관리 ───────────────────────────────────────────
import LearnersPage from '@/pages/LearnersPage'
import LearnerDetailPage from '@/pages/LearnerDetailPage'
import EnrollmentsPage from '@/pages/EnrollmentsPage'
import CertificatesPage from '@/pages/CertificatesPage'

// ── 소통 ─────────────────────────────────────────────────
import BoardsPage from '@/pages/BoardsPage'
import QnaPage from '@/pages/QnaPage'
import NoticePage from '@/pages/NoticePage'
import NotificationsPage from '@/pages/NotificationsPage'

// ── 마케팅 ───────────────────────────────────────────────
import MarketingChannelsPage from '@/pages/MarketingChannelsPage'
import MarketingLinksPage from '@/pages/MarketingLinksPage'
import MarketingStatsPage from '@/pages/MarketingStatsPage'

// ── 매출·정산 ─────────────────────────────────────────────
import RevenuePage from '@/pages/RevenuePage'
import SettlementsPage from '@/pages/SettlementsPage'

// ── 설정 ─────────────────────────────────────────────────
import SettingsInfoPage from '@/pages/SettingsInfoPage'
import SettingsPgPage from '@/pages/SettingsPgPage'
import ShowcasePage from '@/pages/ShowcasePage'
import SettingsMembersPage from '@/pages/SettingsMembersPage'

// ── 내 플랜 ──────────────────────────────────────────────
import PlanPage from '@/pages/PlanPage'
import PlanBillingPage from '@/pages/PlanBillingPage'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />

				<Route element={<AdminLayout />}>

					{/* ── 대시보드 ── */}
					<Route path="/dashboard" element={<DashboardPage />} />

					{/* ── 내 사이트 ── */}
					<Route path="/settings/theme" element={<ThemeSettingsPage />} />
					<Route path="/settings/site" element={<PageEditorPage />} />
					<Route path="/settings/gnb" element={<GnbSettingsPage />} />
					<Route path="/settings/domain" element={<SettingsDomainPage />} />

					{/* ── 콘텐츠 ── */}
					<Route path="/courses" element={<CoursesPage />} />
					<Route path="/courses/new" element={<CourseFormPage />} />
					<Route path="/courses/categories" element={<CategoriesPage />} />
					<Route path="/courses/:id" element={<CourseDetailPage />} />
					<Route path="/coupons" element={<CouponsPage />} />

					{/* ── 수강생 관리 ── */}
					<Route path="/learners" element={<LearnersPage />} />
					<Route path="/learners/:id" element={<LearnerDetailPage />} />
					<Route path="/enrollments" element={<EnrollmentsPage />} />
					<Route path="/certificates" element={<CertificatesPage />} />

					{/* ── 소통 ── */}
					<Route path="/boards" element={<BoardsPage />} />
					<Route path="/boards/qna" element={<QnaPage />} />
					<Route path="/boards/notice" element={<NoticePage />} />
					<Route path="/boards/notifications" element={<NotificationsPage />} />

					{/* ── 마케팅 ── */}
					<Route path="/marketing/channels" element={<MarketingChannelsPage />} />
					<Route path="/marketing/links" element={<MarketingLinksPage />} />
					<Route path="/marketing/stats" element={<MarketingStatsPage />} />

					{/* ── 매출·정산 ── */}
					<Route path="/payments" element={<RevenuePage />} />
					<Route path="/settlements" element={<SettlementsPage />} />

					{/* ── 설정 ── */}
					<Route path="/settings/info" element={<SettingsInfoPage />} />
					<Route path="/settings/pg" element={<SettingsPgPage />} />
					<Route path="/settings/showcase" element={<ShowcasePage />} />
					<Route path="/settings/members" element={<SettingsMembersPage />} />

					{/* ── 내 플랜 ── */}
					<Route path="/plan" element={<PlanPage />} />
					<Route path="/plan/upgrade" element={<PlanPage />} />
					<Route path="/plan/billing" element={<PlanBillingPage />} />

				</Route>
			</Routes>
		</BrowserRouter>
	)
}