/*
 * @Description: 入口文件
 * @Author: zyc
 * @Date: 2021-05-24 09:57:08
 * @LastEditTime: 2021-06-04 19:54:40
 */

// 保留使用 d3 绘图的接口，以便能够自定义一些图表的绘制
const drawByD3 = require('./drawByD3')
// 接入 echarts 的图形绘制，借用 echarts 成熟的图形绘制和动态图表特性
const drawByEcharts = require('./drawByEcharts')

let count = 0 // 类名计数器

class Charts {
    constructor(dataset, {
        /* 
        函数默认参数的解构赋值 https://es6.ruanyifeng.com/#docs/function
        */
        scale = 1, // 缩放尺度
        type = 'pie', // 制图类型
        width_height = 1, // 容器宽高比例
        mode = 'd3',
    } = {}, options = [], events = {}) {
        count++
        this.scale = scale // div 尺寸放大比例
        /* 
            数据格式说明
            {
                fields:['字段名1', '字段名2', ...],
                dataset:[
                    {
                        lng:经度,
                        lat:纬度,
                        data:[字段1的值, 字段2的值, ...]
                    }
                ]
            }
        */
        this.dataset = dataset.dataset // 数据
        this.fields = dataset.fields
        this.type = type // 制图类型
        this.width_height = width_height // 容器宽高比例, 默认为 1
        // 制图引擎(d3 或 echarts), 考虑为不同制图引擎添加不同的图表类型
        this.Draw = mode === 'd3' ? drawByD3 : drawByEcharts

        /* 增加 marker 的传参和事件支持 
            - options 同 marker api 一致(icon 会被自定义 div 替代)
            - events 以键值对的方式传参: 'move':function(){
                // 为在回调中使用 this ,不能使用箭头函数方式
            }
        */
        this.options = options
        this.events = events
        // 初始化图层
        this.chartLayer = this._init()
    }

    _init() {
        let {
            dataset,
            type,
            width_height,
            scale,
            Draw,
            options,
            events,
            fields,
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

            /* 使用 divIcon 向 leaflet 添加 div 容器, 后面需要依赖这个容器追加 svg 图表
                为避免类名冲突，使用一个闭包的计数器
            */
            let className = `charts-icon-${count}-${i}` // 自定义类
            let marker = L.marker([lat, lng], {
                ...options, // 传入 marker 参数
                // 重要，使用自定义类名的 div 作为 icon 容器
                icon: L.divIcon({
                    className
                }),
            })

            if (events) { // 添加事件
                for (const [event, callback] of Object.entries(events)) {
                    marker.on(event, callback)
                }
            }

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
                        draw.doughnut(data, fields)
                        break;
                    case 'bar': // 柱状图
                        draw.bar(data, fields)
                        break;
                    default: // 默认为实心圆
                        draw.pie(data, fields)
                        // draw.pie([50, 50], ['字段1', '字段2'])
                        break;
                }
            })
        }
        return L.featureGroup(markers, {})
    }

    /**
     * @description: 返回图表所在的图层 layer
     * @param {*}
     * @return {Layer} 返回值为 featureGroup 图层类型
     */
    layer() {
        return this.chartLayer
    }

    /**
     * @description: 生成图例, 初步考虑以 innerHTML 的形式(或 element 的形式传出)
     *              只有 layer 被添加到 map 之后, 才能得到图例(在这之前, 并未绘图, 也就不存在图例了)
     * @param {*}
     * @return {Element}
     */
    legend() {
        const legend = document.createElement('div')
        legend.className = 'legend-count'
        const body = document.querySelector('body')
        body.appendChild(legend)
        const draw = new this.Draw('legend-count', 50, 50)
        draw.doughnut([50, 50], ['字段1', '字段2'])
        body.removeChild(legend)
        return legend
    }
}

// 通过 new 引用
L.Charts = L.charts = (...args) => {
    return new Charts(...args)
}