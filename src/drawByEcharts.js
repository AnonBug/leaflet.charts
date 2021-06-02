/*
 * @Description: 用 echarts 绘制图表
 * @Author: zyc
 * @Date: 2021-05-24 10:57:59
 * @LastEditTime: 2021-05-27 11:09:55
 */

// const echarts = require('echarts')

const COLOR = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

class DrawByEcharts {
    constructor(className, w, h) {
        // 向 div icon 中添加一个 div 元素，并设置其宽高、偏移
        const node = document.querySelector(`.${className}`)
        const div = document.createElement('div')
        node.appendChild(div)
        div.style.height = `${h}px` // 高
        div.style.width = `${w}px` // 宽
        div.style.transform = `translate(${-w / 2}px, ${-h / 2}px)` // 偏移
        this.myChart = echarts.init(div)
    }

    /**
     * @description: 饼图
     * @param {Number[]} dataset 数据
     * @param {[]} fields 字段名
     * @param {Boolean} isRing 是否有内环
     * @return {*}
     */    
    pie(dataset, fields, isRing) {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            series: [{
                type: 'pie',
                // 是否是环状 pie
                radius: isRing ? ['50%', '90%'] : ['100%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        // show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: dataset.map((item, index) => ({
                    value: item,
                    name: fields[index]
                }))
            }]
        };
        this._setOption(option)
    }

    /**
     * @description: 柱形图
     * @param {Number[]} dataset 数据
     * @param {[]} fields 字段名
     * @return {*}
     */    
    bar(dataset, fields) {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            xAxis: {
                type: 'category',
                data: fields
            },
            yAxis: {
                type: 'value',
                splitLine: false

            },
            series: [{
                data: dataset.map((item, index) => ({
                    value: item,
                    itemStyle: {
                        color: COLOR[index]
                    }
                })),
                type: 'bar'
            }]
        };

        this._setOption(option)
    }

    /**
     * @description: 圆环图
     * @param {Number[]} dataset 数据
     * @param {[]} fields 字段名
     * @return {*}
     */    
    doughnut(dataset, fields) {
        this.pie(dataset, fields, true)
    }

    /**
     * @description: 设置图形生效
     * @param {{}} option
     * @return {*}
     */
    _setOption(option) {
        this.myChart.setOption(option)
    }

}

module.exports = DrawByEcharts
