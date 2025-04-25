import { FunctionComponent, useCallback, useState } from 'react'
import { PieChart, Pie, Sector, Legend, Cell } from 'recharts'

const PieChartComponent: FunctionComponent<{ data: Array<{ name: string; value: number }>, colors: string[] }> = ({ data, colors }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const onPieEnter = useCallback(
		(_: any, index: number) => {
			setActiveIndex(index)
		},
		[setActiveIndex]
	)

	return (
		<PieChart width={240} height={350}>
			<Pie
				activeIndex={activeIndex}
				activeShape={renderActiveShape}
				data={data}
				cx={110}
				cy={125}
				innerRadius={60}
				outerRadius={80}
				fill="#8884d8"
				dataKey="value"
				onMouseEnter={onPieEnter}
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
				))}
			</Pie>
            <Legend />
		</PieChart>
	)
}

const renderActiveShape = (props: any) => {
	const RADIAN = Math.PI / 180
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
	const sin = Math.sin(-RADIAN * midAngle)
	const cos = Math.cos(-RADIAN * midAngle)
	const sx = cx + (outerRadius + 10) * cos
	const sy = cy + (outerRadius + 10) * sin
	const mx = cx + (outerRadius + 30) * cos
	const my = cy + (outerRadius + 30) * sin
	const ex = mx + (cos >= 0 ? 1 : -1) * 22
	const ey = my
	const textAnchor = cos >= 0 ? 'start' : 'end'

    const responsiveFontSize = payload.name.length > 13 ? '13px' : '18px'

	return (
		<g>
			<text x={cx} y={cy-10} dy={8} textAnchor="middle" fill={fill} fontSize={responsiveFontSize}>
				{payload.name}
			</text>
            <text x={cx} y={cy+15} dy={8} textAnchor="middle" fill={fill}>
            {`${value}`} {`(${(percent * 100).toFixed(1)}%)`}
			</text>
            

			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
		</g>
	)
}

export default PieChartComponent