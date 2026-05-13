import { useState } from 'react'
import { Copy, Check, ExternalLink, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import { dummyCourses } from '@/data/courses'
import { cn } from '@/lib/utils'

const BASE_URL = 'https://honggd.lms.co.kr'

export default function MarketingLinksPage() {
	const [copiedId, setCopiedId] = useState<string | null>(null)

	const handleCopy = (text: string, id: string) => {
		navigator.clipboard.writeText(text)
		setCopiedId(id)
		setTimeout(() => setCopiedId(null), 2000)
	}

	const publishedCourses = dummyCourses.filter((c) => c.isPublished)

	return (
		<div>
			<PageHeader
				title="공유 링크"
				description="강의별 단축 URL을 복사해서 SNS나 카카오톡에 바로 공유해요"
			/>

			<div className="flex flex-col gap-4 max-w-2xl">

				{/* 사이트 메인 링크 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-3">사이트 메인</h2>
					<div className="flex items-center gap-2">
						<div className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground font-mono truncate">
							{BASE_URL}
						</div>
						<Button
							variant="outline"
							size="sm"
							className="gap-1 shrink-0"
							onClick={() => handleCopy(BASE_URL, 'main')}
						>
							{copiedId === 'main' ? (
								<><Check size={13} className="text-brand-500" /> 복사됨</>
							) : (
								<><Copy size={13} /> 복사</>
							)}
						</Button>

						<a href={BASE_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
						>
							<ExternalLink size={13} />
						</a>
					</div>
				</div>

				{/* 강의별 링크 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-3">
						강의별 공유 링크
					</h2>

					{publishedCourses.length === 0 ? (
						<p className="text-sm text-muted-foreground">공개된 강의가 없어요</p>
					) : (
						<div className="flex flex-col gap-3">
							{publishedCourses.map((course) => {
								const url = course.shortUrlSlug
									? `${BASE_URL}/l/${course.shortUrlSlug}`
									: `${BASE_URL}/courses/${course.id}`

								return (
									<div key={course.id} className="flex flex-col gap-2 p-3 rounded-lg border border-border">
										<div className="flex items-start justify-between gap-2">
											<p className="text-sm font-medium text-foreground line-clamp-1">
												{course.title}
											</p>
											<span className={cn(
												'text-xs px-2 py-0.5 rounded-full shrink-0',
												'bg-brand-50 text-brand-700'
											)}>
												공개
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="flex-1 bg-muted rounded-lg px-3 py-1.5 text-xs text-muted-foreground font-mono truncate">
												{url}
											</div>
											<Button
												variant="outline"
												size="sm"
												className="gap-1 shrink-0 h-7 text-xs"
												onClick={() => handleCopy(url, course.id)}
											>
												{copiedId === course.id ? (
													<><Check size={11} className="text-brand-500" /> 복사됨</>
												) : (
													<><Copy size={11} /> 복사</>
												)}
											</Button>

											<a href={url}
												target="_blank"
												rel="noopener noreferrer"
												className="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
											>
												<ExternalLink size={11} />
											</a>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>

				{/* UTM 링크 생성기 */}
				<div className="bg-white rounded-xl border border-border p-5">
					<h2 className="text-sm font-semibold text-foreground mb-1">UTM 링크 생성기</h2>
					<p className="text-xs text-muted-foreground mb-4">
						채널별 유입을 추적하는 UTM 파라미터가 포함된 링크를 만들어요
					</p>
					<div className="flex items-center justify-center h-20 rounded-lg border-2 border-dashed border-border">
						<Button variant="outline" size="sm" className="gap-1 text-xs">
							<Plus size={13} />
							UTM 링크 만들기
						</Button>
					</div>
				</div>

			</div>
		</div>
	)
}