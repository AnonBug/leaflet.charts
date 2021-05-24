/*
 * @Description: 使用 d3 绘制图表
 * @Author: zyc
 * @Date: 2021-05-24 10:22:37
 * @LastEditTime: 2021-05-24 12:25:05
 */

// const d3 = require('d3')

class Draw {
    constructor(className, w, h) {
        this.svg = d3.select('.' + className)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            // 对 svg 宽高进行移动, 以使其中心点对准需要放置的位置
            .attr('transform', `translate(${-w / 2}, ${-h / 2})`)
            .style('overflow', 'visible')

        this.w = w
        this.h = h
    }
    /**
     * @description: 
     * @param {*} dataset
     * @param {Boolean} isRing 是否是空心环
     * @return {*}
     */
    pie(dataset, isRing) {
        const {
            svg,
            w,
            h
        } = this
        const outerRadius = w / 2 // 饼图半径
        const innerRadius = isRing ? w / 4 : 0 // 内环半径(绘制 pie 时设置 0)
        // d3 方法
        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        const pie = d3.pie()

        // Easy colors accessible via a 10-step ordinal scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // 设置arc
        const arcs = svg.selectAll("g.arc")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("class", "arc")
            // 通过 transform ,省得定义 起始点
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        // 绘制路径
        arcs.append("path")
            .attr("fill", (d, i) => color(i))
            .transition()
            .attr("d", arc)

        // 添加注记
        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr('font-size', '11px')
            .attr('fill', 'white')
            .attr("text-anchor", "middle")
            .text(d => d.value)
    }

    doughnut(dataset) {
        this.pie(dataset, true)
    }

    bar(dataset) {
        const {
            svg,
            w,
            h
        } = this
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const padding = 20
        // 比例尺
        const xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .rangeRound([0, w])
            .paddingInner(0.1)

        // 比例尺
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([padding, h - padding])

        // 设置arc
        const bars = svg.selectAll("g.bar")
            .data(dataset)
            .enter()
            .append("g")
            .attr("class", "bar")

        bars.append('rect')
            .attr('x', (d, i) => xScale(i)) // x 定位
            .attr('y', d => h - yScale(d)) // y 定位
            .attr('width', xScale.bandwidth()) // 宽度
            .attr('fill', (d, i) => color(i)) // 色彩
            .transition()
            .attr('height', d => yScale(d)) // 高度

        // 添加注记
        bars.append("text")
            .attr('x', (d, i) => xScale.bandwidth() / 2)
            .attr('y', d => 14)
            .attr("transform", (d, i) => `translate(${xScale(i)}, ${h - yScale(d)})`)
            .text(d => d)
            .attr('font-size', '11px')
            .attr('fill', 'white')
            .attr("text-anchor", "middle")
    }
}

module.exports = Draw