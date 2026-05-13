import { useState, useMemo } from 'react'
import { Download, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/common/PageHeader'
import SearchFilterBar from '@/components/common/SearchFilterBar'
import { Table, THead, TBody, TR, TH, TD } from '@/components/common/Table/Table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { dummyLearnerProgress } from '@/data/progress'
import { cn } from '@/lib/utils'

export default function CertificatesPage() {
	const [search, setSearch] = useState('')

	// 수료 완료된 수강생만
	const completed = useMemo(() => {
		return dummyLearnerProgress
			.filter((p) => p.status === 'completed')
			.filter((p) =>
				p.learnerName.includes(search) ||
				p.courseTitle.includes(search)
			)
	}, [search])

	return (
		<div>
			<PageHeader
				title="수료증 발급"
				description={`수료 완료 ${completed.length}명`}
			/>

			{/* 안내 카드 */}
			<div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-5 flex items-start gap-3">
				<Award size={18} className="text-brand-600 shrink-0 mt-0.5" />
				<div>
					<p className="text-sm font-medium text-brand-800">
						수료증 자동 발급 설정
					</p>
					<p className="text-xs text-brand-600 mt-0.5">
						강의 진도율이 설정한 수료 기준에 도달하면 수강생에게 수료증이 자동으로 발급돼요.
						수료 기준은 각 강의 설정에서 변경할 수 있어요.
					</p>
				</div>
			</div>

			<SearchFilterBar
				searchPlaceholder="수강생 이름, 강의명 검색..."
				searchValue={search}
				onSearchChange={setSearch}
			/>

			{completed.length === 0 ? (
				<div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
					수료한 수강생이 없어요
				</div>
			) : (
				<Table>
					<THead>
						<TR>
							<TH>수강생</TH>
							<TH>강의</TH>
							<TH>수료일</TH>
							<TH>진도율</TH>
							<TH className="text-right">수료증</TH>
						</TR>
					</THead>
					<TBody>
						{completed.map((item) => (
							<TR key={item.id}>
								{/* 수강생 */}
								<TD>
									<div className="flex items-center gap-2.5">
										<Avatar className="w-7 h-7 shrink-0">
											<AvatarFallback className="bg-brand-50 text-brand-700 text-xs">
												{item.learnerName.slice(0, 2)}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium text-foreground">
												{item.learnerName}
											</p>
											<p className="text-xs text-muted-foreground">
												{item.learnerEmail}
											</p>
										</div>
									</div>
								</TD>

								{/* 강의 */}
								<TD className="text-sm text-muted-foreground max-w-[200px] truncate">
									{item.courseTitle}
								</TD>

								{/* 수료일 */}
								<TD className="text-sm text-muted-foreground">
									{item.lastAccessedAt.slice(0, 10)}
								</TD>

								{/* 진도율 */}
								<TD>
									<span className="text-sm font-medium text-blue-600">
										{item.progress}%
									</span>
								</TD>

								{/* 수료증 다운로드 */}
								<TD className="text-right">
									<Button
										variant="outline"
										size="sm"
										className="gap-1 text-xs h-7"
									>
										<Download size={12} />
										발급
									</Button>
								</TD>
							</TR>
						))}
					</TBody>
				</Table>
			)}
		</div>
	)
}