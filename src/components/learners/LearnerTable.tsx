import { MoreHorizontal, BookOpen, Frown } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, StickyTable, StickyTHead, THead, TBody, TR, TD, TH } from '@/components/common/Table/Table'
import EmptyState from '../common/EmptyState'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import type { User } from '@/types'

interface Learner extends User {
	enrollCount: number
}

interface LearnerTableProps {
	learners: Learner[]
}

export default function LearnerTable({ learners }: LearnerTableProps) {
	return (
		<>
			<Table>
				<THead>
					<TR>
						<TH>수강생</TH>
						<TH>연락처</TH>
						<TH>수강중</TH>
						<TH>가입일</TH>
						<TH>최근 접속</TH>
						<TH className="px-4 py-3 w-10" />
					</TR>
				</THead>
				<TBody>
					{learners.map((learner) => (
						<TR>
							{/* 아바타 + 이름 */}
							<TD>
								<div className="flex items-center gap-3">
									<Avatar className="w-8 h-8">
										<AvatarFallback className="bg-brand-50 text-brand-700 text-xs font-medium">
											{learner.name.slice(0, 2)}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium text-foreground">{learner.name}</p>
										<p className="text-xs text-muted-foreground">{learner.email}</p>
									</div>
								</div>
							</TD>

							{/* 연락처 */}
							<TD>
								{learner.phone ?? '—'}
							</TD>

							{/* 수강중 */}
							<TD>
								<div className="flex items-center gap-1 text-muted-foreground">
									<BookOpen size={13} />
									<span>{learner.enrollCount}개</span>
								</div>
							</TD>

							{/* 가입일 */}
							<TD>
								{learner.createdAt.slice(0, 10)}
							</TD>

							{/* 최근 접속 */}
							<TD>
								{learner.lastLoginAt ? learner.lastLoginAt.slice(0, 10) : '—'}
							</TD>

							{/* 더보기 */}
							<TD onClick={(e) => e.stopPropagation()}>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors">
											<MoreHorizontal size={15} />
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>학습 현황 보기</DropdownMenuItem>
										<DropdownMenuItem>수강 내역 보기</DropdownMenuItem>
										<DropdownMenuItem className="text-destructive">
											수강생 삭제
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TD>
						</TR>
					))}
					<TR>
						<TD colSpan={6}>
							<EmptyState
								icon={(<Frown className='text-gray-500' />)}
								title="등록한 수강생이 없습니다"
								action={
									<Button
										variant={'default'}
										className='h-auto p-4 w-full max-w-50'
									>수강생 초대</Button>
								}
							/>
						</TD>
					</TR>
				</TBody>

			</Table>
		</>

	)
}