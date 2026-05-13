
import * as React from "react"
import { cn } from "@/lib/utils"

// 일반 목록 테이블 컴포넌트
export function Table({ children, className, ...props }: React.ComponentProps<"table">) {

	return (
		<div className={cn("bg-white rounded-xl border border-border overflow-hidden", className)}>
			<table className={cn("w-full text-sm ", className)} {...props}>
				{children}
			</table>
		</div>
	)
}

// 스티키 형태	
export function StickyTable({ children, className, maxHeight = '200px', ...props }: React.ComponentProps<"table"> & { maxHeight?: string }) {
	return (
		<div className={cn("bg-white rounded-xl border border-border overflow-auto", className)} style={{ maxHeight }}>
			<table className={cn("w-full text-sm ", className)} {...props}>
				{children}
			</table>
		</div>
	)
}

export function THead({ children, className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead className={cn("border-b border-border bg-gray-50 ", className)} {...props}>
			{children}
		</thead>
	)
}

export function StickyTHead({ children, className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead className={cn("  bg-gray-50 sticky top-0 z-10 border-b ", className)}
			style={{
				boxShadow: '0 1px 1px 0 var(--color-gray-200'
			}} {...props}>
			{children}
		</thead>
	)
}

export function TBody({ children, className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody className={cn("", className)} {...props}>
			{children}
		</tbody>
	)
}

export function TFoot({ children, className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props}>
			{children}
		</tfoot>
	)
}

export function TR({ children, className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			className={cn(
				"border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted  last:border-0",
				className
			)}
			{...props}
		>
			{children}
		</tr>
	)
}

export function TH({ children, className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			className={cn(
				"text-left text-xs text-muted-foreground font-medium px-4 py-3",
				className
			)}
			{...props}
		>
			{children}
		</th>
	)
}

export function TD({ children, className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			className={cn("px-4 py-3", className)}
			{...props}
		>
			{children}
		</td>
	)
}	