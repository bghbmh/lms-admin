import { useState } from 'react'
import { MessageSquare, Pin, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BoardPost } from '@/types'
import { dummyQnaComments } from '@/data/qna'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface QnaTableProps {
	posts: BoardPost[]
}

export default function QnaTable({ posts }: QnaTableProps) {
	const [expandedId, setExpandedId] = useState<string | null>(null)
	const [replyText, setReplyText] = useState<Record<string, string>>({})

	const toggleExpand = (id: string) => {
		setExpandedId((prev) => (prev === id ? null : id))
	}

	return (
		<div className="flex flex-col gap-3">
			{posts.map((post) => {
				const isExpanded = expandedId === post.id
				const comments = dummyQnaComments.filter((c) => c.postId === post.id)

				return (
					<div
						key={post.id}
						className={cn(
							'bg-white rounded-xl border transition-colors',
							post.isAnswered ? 'border-border' : 'border-amber-200'
						)}
					>
						{/* 질문 헤더 */}
						<div
							className="flex items-start gap-3 p-4 cursor-pointer"
							onClick={() => toggleExpand(post.id)}
						>
							{/* 아바타 */}
							<Avatar className="w-8 h-8 shrink-0 mt-0.5">
								<AvatarFallback className="bg-brand-50 text-brand-700 text-xs font-medium">
									{post.authorName.slice(0, 2)}
								</AvatarFallback>
							</Avatar>

							{/* 내용 */}
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 flex-wrap">
									{post.isPinned && (
										<Pin size={12} className="text-brand-500 shrink-0" />
									)}
									<span className="font-medium text-foreground text-sm">
										{post.title}
									</span>
									{post.isAnswered ? (
										<Badge className="bg-brand-50 text-brand-700 border-brand-200 text-xs px-1.5 py-0">
											답변완료
										</Badge>
									) : (
										<Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs px-1.5 py-0">
											미답변
										</Badge>
									)}
								</div>
								<div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
									<span>{post.authorName}</span>
									<span>{post.courseTitle}</span>
									<span>{post.createdAt.slice(0, 10)}</span>
									<span className="flex items-center gap-0.5">
										<MessageSquare size={11} />
										{post.commentCount}
									</span>
								</div>
							</div>

							{/* 펼치기 */}
							<ChevronDown
								size={16}
								className={cn(
									'text-muted-foreground transition-transform shrink-0 mt-1',
									isExpanded && 'rotate-180'
								)}
							/>
						</div>

						{/* 펼쳐진 내용 */}
						{isExpanded && (
							<div className="border-t border-border">
								{/* 질문 본문 */}
								<div className="px-4 py-3 bg-gray-50/50">
									<p className="text-sm text-foreground leading-relaxed">
										{post.body}
									</p>
								</div>

								{/* 기존 댓글 */}
								{comments.length > 0 && (
									<div className="px-4 py-3 border-t border-border flex flex-col gap-3">
										{comments.map((comment) => (
											<div key={comment.id} className="flex gap-3">
												<Avatar className="w-7 h-7 shrink-0">
													<AvatarFallback className="bg-brand-500 text-white text-xs font-medium">
														{comment.authorName.slice(0, 2)}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center gap-2">
														<span className="text-xs font-medium text-brand-700">
															{comment.authorName}
														</span>
														<span className="text-xs text-muted-foreground">
															강사
														</span>
														<span className="text-xs text-muted-foreground">
															{comment.createdAt.slice(0, 10)}
														</span>
													</div>
													<p className="text-sm text-foreground mt-1 leading-relaxed">
														{comment.body}
													</p>
												</div>
											</div>
										))}
									</div>
								)}

								{/* 답변 입력 */}
								{!post.isAnswered && (
									<div className="px-4 py-3 border-t border-border">
										<textarea
											placeholder="답변을 입력하세요..."
											value={replyText[post.id] ?? ''}
											onChange={(e) =>
												setReplyText((prev) => ({
													...prev,
													[post.id]: e.target.value,
												}))
											}
											className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
											rows={3}
										/>
										<div className="flex justify-end mt-2">
											<Button
												size="sm"
												className="bg-brand-500 hover:bg-brand-600 text-white"
												disabled={!replyText[post.id]?.trim()}
											>
												답변 등록
											</Button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}