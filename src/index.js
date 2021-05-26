/*
 * @Description: 入口文件
 * @Author: zyc
 * @Date: 2021-05-24 09:57:08
 * @LastEditTime: 2021-05-26 11:19:51
 */

// 保留使用 d3 绘图的接口，以便能够自定义一些图表的绘制
const drawByD3 = require('./drawByD3')
// 接入 echarts 的图形绘制，借用 echarts 成熟的图形绘制和动态图表特性
const drawByEcharts = require('./drawByEcharts')

class Charts {
    constructor(dataset, {
        /* 
        函数默认参数的解构赋值 https://es6.ruanyifeng.com/#docs/function
        */
        scale = 1, // 缩放尺度
        type = 'pie', // 制图类型
        width_height = 1, // 容器宽高比例
        mode = 'd3',
    } = {}) {
        this.scale = scale
        this.dataset = dataset
        this.type = type
        this.width_height = width_height
        this.Draw = mode === 'd3' ? drawByD3 : drawByEcharts
        this.chartLayer = this.init()

        // TODO: layer 常规传参 options

        // TODO: dataset 格式的最终确定
    }

    init() {
        let {
            dataset,
            type,
            width_height,
            scale,
            Draw
        } = this
        /* 根据数据情况, 为各区图表设置适当比例 */
        let bili = dataset.map(item => item.data.reduce((pre, next) => pre + next))
        let base = Math.pow(Math.min(...bili), 0.3) // 以最小值为基准进行放大
        bili = bili.map(item => Math.pow(item, 0.3) / base)

        const markers = [] // 存储生成的 marker 图层
        for (let i = 0; i < dataset.length; i++) {
            let {
                lat,
                lng,
                data
            } = dataset[i]

            // 使用 divIcon 向 leaflet 添加 div 容器, 后面需要依赖这个容器追加 svg 图表
            let className = `my-div-icon-${i}` // 自定义类
            let marker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className
                }),
                pane: 'basemap-point'
            })
            markers.push(marker)
            // svg 的宽高对比取决于数据的总和大小对比, 在这之外才是 scale 的缩放比例
            const w = 40 * width_height * scale * bili[i];
            const h = 40 / width_height * scale * bili[i];

            // 当图层添加至地图时, 进行渲染(这是为了应对图层移除再添加后, svg 内容消失的问题)
            marker.on('add', () => {
                /* 重要：Draw 的定义必须放在 add 事件内部！
                因为只有 add 事件发生了，才有 className 对应的 div 。
                */
                const draw = new Draw(className, w, h)

                // 根据绘制类型, 渲染不同的图表形式
                switch (type) {
                    case 'ring': // 圆环
                        // this._drawPie(svg, data, w, h, true)
                        draw.doughnut(data)
                        break;
                    case 'bar': // 柱状图
                        // this._drawBar(svg, data, w, h)
                        draw.bar(data)
                        break;
                    default: // 默认为实心圆
                        // this._drawPie(svg, data, w, h)
                        draw.pie(data)
                        break;
                }
            })
        }
        return L.featureGroup(markers, {})
    }

    /**
     * @description: 返回图表所在的图层 layer
     * @param {*}
     * @return {*}
     */
    layer() {
        return this.chartLayer
    }

}

// 通过 new 引用
L.Charts = L.charts = (...args) => {
    return new Charts(...args)
}