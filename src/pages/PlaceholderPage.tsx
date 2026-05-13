interface Props {
	title: string
}

export default function PlaceholderPage({ title }: Props) {
	return (
		<div className="flex items-center justify-center h-64 text-muted-foreground">
			<p className="text-lg">{title} — 준비 중</p>
		</div>
	)
}