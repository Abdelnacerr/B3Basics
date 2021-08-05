// d3.select('h1').style('color', 'red')
// d3.select('h1').attr('class', 'heading')
// d3.select('h1').text('New header 1')

// d3.select('body').append('p').text('Frist Paragraph')
// d3.select('body').append('p').text('Second Paragraph')
// d3.select('body').append('p').text('Third Paragraph')

// d3.selectAll('p').style('color', 'blue')

// const dataset = [1, 2, 3, 4, 5]

// d3.select('body')
// 	.selectAll('p')
// 	.data(dataset)
// 	.enter()
// 	.append('p') //appends Paragraph for each data element
// 	// .text('D3 is Awsome')
// 	.text(function (element) {
// 		return element
// 	})

//Bar Chart
const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160]
const dataset2 = [1, 2, 3, 4, 5]

//svg container width/height
const svgWidth = 500,
	svgHeight = 300,
	barPadding = 5 //padding between bars

const barWidth = svgWidth / dataset.length //width of each bar

//svg container with width and height
const svg1 = d3
	.select('.bar-chart')
	.attr('width', svgWidth)
	.attr('height', svgHeight)

const barChart = svg1
	.selectAll('rect')
	.data(dataset) //data in waiting state
	.enter() //enter readies data for operation
	.append('rect') //a rect appended for each data element
	.attr('y', function (d) {
		return svgHeight - d
	})
	.attr('height', function (d) {
		return d
	})
	.attr('width', barWidth - barPadding)
	.attr('transform', function (d, i) {
		const translate = [barWidth * i, 0]
		return 'translate(' + translate + ')'
	})
	.style('fill', 'skyblue')

const text = svg1
	.selectAll('text')
	.data(dataset) //data in waiting state
	.enter()
	.append('text') //takes a string or a function as a param
	.text(function (d) {
		return d
	})
	.attr('y', function (d) {
		return svgHeight - d - 2 //subtract extra 2 pixels
	})
	.attr('x', function (d, i) {
		return barWidth * i
	})
	.style('fill', 'red')

//Scales

const bar_chart_scale_SVG = d3
	.select('.bar-chart-scale')
	.attr('width', svgWidth)
	.attr('height', svgHeight)

const yScale = d3
	.scaleLinear()
	.domain([0, d3.max(dataset2)])
	.range([0, svgHeight])

const barChartScale = bar_chart_scale_SVG
	.selectAll('rect')
	.data(dataset2)
	.enter()
	.append('rect')
	.attr('y', function (d) {
		return svgHeight - yScale(d)
	})
	.attr('height', function (d) {
		return yScale(d)
	})
	.attr('width', barWidth - barPadding)
	.attr('transform', function (d, i) {
		const translate = [barWidth * i, 0]
		return 'translate(' + translate + ')'
	})
	.style('fill', 'skyblue')

//Axes
d3.axisTop()
d3.axisRight()
d3.axisLeft()
d3.axisBottom()

const svgAxis = d3
	.select('.svg-axis')
	.attr('width', svgWidth)
	.attr('height', svgHeight)

const xScale = d3
	.scaleLinear()
	.domain([0, d3.max(dataset)])
	.range([0, svgWidth])

const yScale2 = d3
	.scaleLinear()
	.domain([0, d3.max(dataset)])
	.range([svgHeight, 0])

const x_axis = d3.axisBottom().scale(xScale)
const y_axis = d3.axisLeft().scale(yScale2)

svgAxis.append('g').attr('transform', 'translate(50, 10)').call(y_axis)
const xAxisTranslate = svgHeight - 20
svgAxis
	.append('g') //group element
	.attr('transform', 'translate(50,' + xAxisTranslate + ')')
	.call(y_axis)
	.call(x_axis)

//SVG
const lineWidth = 600,
	lineHeight = 500

const svg_container = d3
	.select('.svg-line')
	.attr('width', lineWidth)
	.attr('height', lineHeight)
	.attr('class', 'svg-container')

//Line
const line = svg_container
	.append('line')
	.attr('x1', 100)
	.attr('x2', 500)
	.attr('y1', 50)
	.attr('y2', 50)
	.attr('stroke', 'red')
	.attr('stroke-width', '2')

//rec
const rect = svg_container
	.append('rect')
	.attr('x', 100)
	.attr('y', 100)
	.attr('width', 200)
	.attr('height', 100)
	.attr('fill', 'red')

//circle
const circle = svg_container
	.append('circle')
	.attr('cx', 200)
	.attr('cy', 300)
	.attr('r', 80)
	.attr('fill', 'red')

//Pie Chart
const osdata = [
	{ platform: 'Android', 'percentage': 40.11 },
	{ platform: 'Windows', 'percentage': 36.69 },
	{ platform: 'iOS', 'percentage': 13.06 },
];
const radius = Math.min(svgWidth, svgHeight) / 2

const svg_pie = d3
	.select('.svg-pie')
	.attr('width', svgWidth)
	.attr('height', svgHeight)

//Create a group element to hold a pie chart
const g = svg_pie
	.append('g')
	.attr('transform', 'translate(' + radius + ',' + radius + ')') //translate to the center of the container

const color = d3.scaleOrdinal(d3.schemeCategory10) //range of colors provided by D3

const pie = d3.pie().value(function (d) {
	//pass data through pie() method
	return d.percentage
})

var path = d3.arc().outerRadius(radius).innerRadius(0)

var arc = g
	.selectAll('arc')
	.data(pie(osdata))
	.enter()
	.append('g')

arc
	.append('path')
	.attr('d', path)
	.attr('fill', function (d) {
		return color(d.osdata.percentage)
	})
