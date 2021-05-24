/*
 * @Description: 用 echarts 绘制图表
 * @Author: zyc
 * @Date: 2021-05-24 10:57:59
 * @LastEditTime: 2021-05-24 12:48:20
 */

// const echarts = require('echarts')

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

    pie(dataset, isRing) {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                // radius: ['50%', '90%'],
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
                data: [{
                        value: 1048,
                        name: '搜索引擎'
                    },
                    {
                        value: 735,
                        name: '直接访问'
                    },
                    {
                        value: 580,
                        name: '邮件营销'
                    },
                    {
                        value: 484,
                        name: '联盟广告'
                    },
                    {
                        value: 300,
                        name: '视频广告'
                    }
                ]
            }]
        };
        this._setOption(option)
    }

    bar(dataset) {
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed']
            },
            yAxis: {
                type: 'value',
                splitLine: false

            },
            series: [{
                data: [{
                    value: 120,
                    itemStyle: {
                        color: '#5470c6'
                    }
                }, {
                    value: 200,
                    itemStyle: {
                        color: '#91cc75'
                    }
                }, {
                    value: 80,
                    itemStyle: {
                        color: '#fac858'
                    }
                }, ],
                type: 'bar'
            }]
        };

        this._setOption(option)
    }

    doughnut(dataset) {
        this.pie(dataset, true)
    }

    /**
     * @description: 设置图形生效
     * @param {*} option
     * @return {*}
     */    
    _setOption(option) {
        this.myChart.setOption(option)
    }

}

module.exports = DrawByEcharts
