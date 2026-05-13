import { dummyEnrollments } from '@/data/enrollments'
import { Badge } from '@/components/ui/badge'

const statusLabel: Record<string, string> = {
	active: '수강중',
	completed: '수료',
	refunded: '환불',
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
	active: 'default',
	completed: 'secondary',
	refunded: 'destructive',
}

export default function RecentEnrollments() {
	const recent = [...dummyEnrollments]
		.sort((a, b) => b.enrolledAt.localeCompare(a.enrolledAt))
		.slice(0, 5)

	return (
		<div className="bg-white rounded-xl border border-border p-5 flex-1">
			<h3 className="text-sm font-semibold text-foreground mb-4">최근 수강신청</h3>
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border">
						<th className="text-left text-xs text-muted-foreground font-medium pb-2">수강생</th>
						<th className="text-left text-xs text-muted-foreground font-medium pb-2">강의</th>
						<th className="text-left text-xs text-muted-foreground font-medium pb-2">신청일</th>
						<th className="text-left text-xs text-muted-foreground font-medium pb-2">상태</th>
					</tr>
				</thead>
				<tbody>
					{recent.map((e) => (
						<tr key={e.id} className="border-b border-border last:border-0">
							<td className="py-3">
								<p className="font-medium text-foreground">{e.learnerName}</p>
								<p className="text-xs text-muted-foreground">{e.learnerEmail}</p>
							</td>
							<td className="py-3 text-muted-foreground max-w-[180px] truncate">
								{e.courseTitle}
							</td>
							<td className="py-3 text-muted-foreground whitespace-nowrap">
								{e.enrolledAt.slice(0, 10)}
							</td>
							<td className="py-3">
								<Badge variant={statusVariant[e.status]}>
									{statusLabel[e.status]}
								</Badge>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}