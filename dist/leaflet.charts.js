/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/drawByD3.js":
/*!*************************!*\
  !*** ./src/drawByD3.js ***!
  \*************************/
/***/ ((module) => {

eval("/*\r\n * @Description: 使用 d3 绘制图表\r\n * @Author: zyc\r\n * @Date: 2021-05-24 10:22:37\r\n * @LastEditTime: 2021-05-27 11:15:20\r\n */\r\n\r\n// const d3 = require('d3')\r\n\r\nclass Draw {\r\n    constructor(className, w, h) {\r\n        this.svg = d3.select('.' + className)\r\n            .append(\"svg\")\r\n            .attr(\"width\", w)\r\n            .attr(\"height\", h)\r\n            // 对 svg 宽高进行移动, 以使其中心点对准需要放置的位置\r\n            .attr('transform', `translate(${-w / 2}, ${-h / 2})`)\r\n            .style('overflow', 'visible')\r\n\r\n        this.w = w\r\n        this.h = h\r\n    }\r\n    /**\r\n     * @description: 饼图\r\n     * @param {Number[]} dataset 数据\r\n     * @param {[]} fields 字段名\r\n     * @param {Boolean} isRing 是否有内环\r\n     * @return {*}\r\n     */\r\n    pie(dataset, fields, isRing) {\r\n        const {\r\n            svg,\r\n            w,\r\n            h\r\n        } = this\r\n        const outerRadius = w / 2 // 饼图半径\r\n        const innerRadius = isRing ? w / 4 : 0 // 内环半径(绘制 pie 时设置 0)\r\n        // d3 方法\r\n        const arc = d3.arc()\r\n            .innerRadius(innerRadius)\r\n            .outerRadius(outerRadius);\r\n        const pie = d3.pie()\r\n\r\n        // Easy colors accessible via a 10-step ordinal scale\r\n        const color = d3.scaleOrdinal(d3.schemeCategory10);\r\n\r\n        // 设置arc\r\n        const arcs = svg.selectAll(\"g.arc\")\r\n            .data(pie(dataset))\r\n            .enter()\r\n            .append(\"g\")\r\n            .attr(\"class\", \"arc\")\r\n            // 通过 transform ,省得定义 起始点\r\n            .attr(\"transform\", \"translate(\" + outerRadius + \",\" + outerRadius + \")\");\r\n\r\n        // 绘制路径\r\n        arcs.append(\"path\")\r\n            .attr(\"fill\", (d, i) => color(i))\r\n            .transition()\r\n            .attr(\"d\", arc)\r\n\r\n        // 添加注记\r\n        arcs.append(\"text\")\r\n            .attr(\"transform\", d => `translate(${arc.centroid(d)})`)\r\n            .attr('font-size', '11px')\r\n            .attr('fill', 'white')\r\n            .attr(\"text-anchor\", \"middle\")\r\n            .text((d, i) => `${fields[i]}\\n${d.value} `)\r\n\r\n    }\r\n\r\n    /**\r\n     * @description: 圆环图\r\n     * @param {Number[]} dataset 数据\r\n     * @param {[]} fields 字段名\r\n     * @return {*}\r\n     */\r\n    doughnut(dataset, fields) {\r\n        this.pie(dataset, fields, true)\r\n    }\r\n\r\n    /**\r\n     * @description: 柱形图\r\n     * @param {Number[]} dataset 数据\r\n     * @param {[]} fields 字段名\r\n     * @return {*}\r\n     */\r\n    bar(dataset, fields) {\r\n        const {\r\n            svg,\r\n            w,\r\n            h\r\n        } = this\r\n        const color = d3.scaleOrdinal(d3.schemeCategory10);\r\n\r\n        const padding = 20\r\n        // 比例尺\r\n        const xScale = d3.scaleBand()\r\n            .domain(d3.range(dataset.length))\r\n            .rangeRound([0, w])\r\n            .paddingInner(0.2)\r\n\r\n        // 比例尺\r\n        const yScale = d3.scaleLinear()\r\n            .domain([0, d3.max(dataset)])\r\n            .range([padding, h - padding])\r\n\r\n        // 设置arc\r\n        const bars = svg.selectAll(\"g.bar\")\r\n            .data(dataset)\r\n            .enter()\r\n            .append(\"g\")\r\n            .attr(\"class\", \"bar\")\r\n\r\n        bars.append('rect')\r\n            .attr('x', (d, i) => xScale(i)) // x 定位\r\n            .attr('y', d => h - yScale(d)) // y 定位\r\n            .attr('width', xScale.bandwidth()) // 宽度\r\n            .attr('fill', (d, i) => color(i)) // 色彩\r\n            .transition()\r\n            .attr('height', d => yScale(d)) // 高度\r\n\r\n        // 添加注记\r\n        bars.append(\"text\")\r\n            .attr('x', (d, i) => xScale.bandwidth() / 2)\r\n            .attr('y', d => -5)\r\n            .attr(\"transform\", (d, i) => `translate(${xScale(i)}, ${h - yScale(d)})`)\r\n            .text(d => d)\r\n            .attr('font-size', '11px')\r\n            .attr('fill', 'white')\r\n            .attr(\"text-anchor\", \"middle\")\r\n    }\r\n}\r\n\r\nmodule.exports = Draw\r\n\n\n//# sourceURL=webpack://leaflet.charts/./src/drawByD3.js?");

/***/ }),

/***/ "./src/drawByEcharts.js":
/*!******************************!*\
  !*** ./src/drawByEcharts.js ***!
  \******************************/
/***/ ((module) => {

eval("/*\r\n * @Description: 用 echarts 绘制图表\r\n * @Author: zyc\r\n * @Date: 2021-05-24 10:57:59\r\n * @LastEditTime: 2021-05-27 11:09:55\r\n */\r\n\r\n// const echarts = require('echarts')\r\n\r\nconst COLOR = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']\r\n\r\nclass DrawByEcharts {\r\n    constructor(className, w, h) {\r\n        // 向 div icon 中添加一个 div 元素，并设置其宽高、偏移\r\n        const node = document.querySelector(`.${className}`)\r\n        const div = document.createElement('div')\r\n        node.appendChild(div)\r\n        div.style.height = `${h}px` // 高\r\n        div.style.width = `${w}px` // 宽\r\n        div.style.transform = `translate(${-w / 2}px, ${-h / 2}px)` // 偏移\r\n        this.myChart = echarts.init(div)\r\n    }\r\n\r\n    /**\r\n     * @description: 饼图\r\n     * @param {Number[]} dataset 数据\r\n     * @param {[]} fields 字段名\r\n     * @param {Boolean} isRing 是否有内环\r\n     * @return {*}\r\n     */    \r\n    pie(dataset, fields, isRing) {\r\n        const option = {\r\n            tooltip: {\r\n                trigger: 'item'\r\n            },\r\n            series: [{\r\n                type: 'pie',\r\n                // 是否是环状 pie\r\n                radius: isRing ? ['50%', '90%'] : ['100%'],\r\n                avoidLabelOverlap: false,\r\n                label: {\r\n                    show: false,\r\n                    position: 'center'\r\n                },\r\n                emphasis: {\r\n                    label: {\r\n                        // show: true,\r\n                        fontSize: '40',\r\n                        fontWeight: 'bold'\r\n                    }\r\n                },\r\n                labelLine: {\r\n                    show: false\r\n                },\r\n                data: dataset.map((item, index) => ({\r\n                    value: item,\r\n                    name: fields[index]\r\n                }))\r\n            }]\r\n        };\r\n        this._setOption(option)\r\n    }\r\n\r\n    /**\r\n     * @description: 柱形图\r\n     * @param {Number[]} dataset 数据\r\n     * @param {[]} fields 字段名\r\n     * @return {*}\r\n     */    \r\n    bar(dataset, fields) {\r\n        const option = {\r\n            tooltip: {\r\n                trigger: 'item'\r\n            },\r\n            xAxis: {\r\n                type: 'category',\r\n                data: fields\r\n            },\r\n            yAxis: {\r\n                type: 'value',\r\n                splitLine: false\r\n\r\n            },\r\n            series: [{\r\n                data: dataset.map((item, index) => ({\r\n                    value: item,\r\n                    itemStyle: {\r\n                        color: COLOR[index]\r\n                    }\r\n                })),\r\n                type: 'bar'\r\n            }]\r\n        };\r\n\r\n        this._setOption(option)\r\n    }\r\n\r\n    /**\r\n     * @description: 圆环图\r\n     * @param {Number[]} dataset 数据\r\n     * @param {[]} fields 字段名\r\n     * @return {*}\r\n     */    \r\n    doughnut(dataset, fields) {\r\n        this.pie(dataset, fields, true)\r\n    }\r\n\r\n    /**\r\n     * @description: 设置图形生效\r\n     * @param {{}} option\r\n     * @return {*}\r\n     */\r\n    _setOption(option) {\r\n        this.myChart.setOption(option)\r\n    }\r\n\r\n}\r\n\r\nmodule.exports = DrawByEcharts\r\n\n\n//# sourceURL=webpack://leaflet.charts/./src/drawByEcharts.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\r\n * @Description: 入口文件\r\n * @Author: zyc\r\n * @Date: 2021-05-24 09:57:08\r\n * @LastEditTime: 2021-06-04 19:54:40\r\n */\r\n\r\n// 保留使用 d3 绘图的接口，以便能够自定义一些图表的绘制\r\nconst drawByD3 = __webpack_require__(/*! ./drawByD3 */ \"./src/drawByD3.js\")\r\n// 接入 echarts 的图形绘制，借用 echarts 成熟的图形绘制和动态图表特性\r\nconst drawByEcharts = __webpack_require__(/*! ./drawByEcharts */ \"./src/drawByEcharts.js\")\r\n\r\nlet count = 0 // 类名计数器\r\n\r\nclass Charts {\r\n    constructor(dataset, {\r\n        /* \r\n        函数默认参数的解构赋值 https://es6.ruanyifeng.com/#docs/function\r\n        */\r\n        scale = 1, // 缩放尺度\r\n        type = 'pie', // 制图类型\r\n        width_height = 1, // 容器宽高比例\r\n        mode = 'd3',\r\n    } = {}, options = [], events = {}) {\r\n        count++\r\n        this.scale = scale // div 尺寸放大比例\r\n        /* \r\n            数据格式说明\r\n            {\r\n                fields:['字段名1', '字段名2', ...],\r\n                dataset:[\r\n                    {\r\n                        lng:经度,\r\n                        lat:纬度,\r\n                        data:[字段1的值, 字段2的值, ...]\r\n                    }\r\n                ]\r\n            }\r\n        */\r\n        this.dataset = dataset.dataset // 数据\r\n        this.fields = dataset.fields\r\n        this.type = type // 制图类型\r\n        this.width_height = width_height // 容器宽高比例, 默认为 1\r\n        // 制图引擎(d3 或 echarts), 考虑为不同制图引擎添加不同的图表类型\r\n        this.Draw = mode === 'd3' ? drawByD3 : drawByEcharts\r\n\r\n        /* 增加 marker 的传参和事件支持 \r\n            - options 同 marker api 一致(icon 会被自定义 div 替代)\r\n            - events 以键值对的方式传参: 'move':function(){\r\n                // 为在回调中使用 this ,不能使用箭头函数方式\r\n            }\r\n        */\r\n        this.options = options\r\n        this.events = events\r\n        // 初始化图层\r\n        this.chartLayer = this._init()\r\n    }\r\n\r\n    _init() {\r\n        let {\r\n            dataset,\r\n            type,\r\n            width_height,\r\n            scale,\r\n            Draw,\r\n            options,\r\n            events,\r\n            fields,\r\n        } = this\r\n        /* 根据数据情况, 为各区图表设置适当比例 */\r\n        let bili = dataset.map(item => item.data.reduce((pre, next) => pre + next))\r\n        let base = Math.pow(Math.min(...bili), 0.3) // 以最小值为基准进行放大\r\n        bili = bili.map(item => Math.pow(item, 0.3) / base)\r\n\r\n        const markers = [] // 存储生成的 marker 图层\r\n        for (let i = 0; i < dataset.length; i++) {\r\n            let {\r\n                lat,\r\n                lng,\r\n                data\r\n            } = dataset[i]\r\n\r\n            /* 使用 divIcon 向 leaflet 添加 div 容器, 后面需要依赖这个容器追加 svg 图表\r\n                为避免类名冲突，使用一个闭包的计数器\r\n            */\r\n            let className = `charts-icon-${count}-${i}` // 自定义类\r\n            let marker = L.marker([lat, lng], {\r\n                ...options, // 传入 marker 参数\r\n                // 重要，使用自定义类名的 div 作为 icon 容器\r\n                icon: L.divIcon({\r\n                    className\r\n                }),\r\n            })\r\n\r\n            if (events) { // 添加事件\r\n                for (const [event, callback] of Object.entries(events)) {\r\n                    marker.on(event, callback)\r\n                }\r\n            }\r\n\r\n            markers.push(marker)\r\n            // svg 的宽高对比取决于数据的总和大小对比, 在这之外才是 scale 的缩放比例\r\n            const w = 40 * width_height * scale * bili[i];\r\n            const h = 40 / width_height * scale * bili[i];\r\n\r\n            // 当图层添加至地图时, 进行渲染(这是为了应对图层移除再添加后, svg 内容消失的问题)\r\n            marker.on('add', () => {\r\n                /* 重要：Draw 的定义必须放在 add 事件内部！\r\n                因为只有 add 事件发生了，才有 className 对应的 div 。\r\n                */\r\n                const draw = new Draw(className, w, h)\r\n                // 根据绘制类型, 渲染不同的图表形式\r\n                switch (type) {\r\n                    case 'ring': // 圆环\r\n                        draw.doughnut(data, fields)\r\n                        break;\r\n                    case 'bar': // 柱状图\r\n                        draw.bar(data, fields)\r\n                        break;\r\n                    default: // 默认为实心圆\r\n                        draw.pie(data, fields)\r\n                        // draw.pie([50, 50], ['字段1', '字段2'])\r\n                        break;\r\n                }\r\n            })\r\n        }\r\n        return L.featureGroup(markers, {})\r\n    }\r\n\r\n    /**\r\n     * @description: 返回图表所在的图层 layer\r\n     * @param {*}\r\n     * @return {Layer} 返回值为 featureGroup 图层类型\r\n     */\r\n    layer() {\r\n        return this.chartLayer\r\n    }\r\n\r\n    /**\r\n     * @description: 生成图例, 初步考虑以 innerHTML 的形式(或 element 的形式传出)\r\n     *              只有 layer 被添加到 map 之后, 才能得到图例(在这之前, 并未绘图, 也就不存在图例了)\r\n     * @param {*}\r\n     * @return {Element}\r\n     */\r\n    legend() {\r\n        const legend = document.createElement('div')\r\n        legend.className = 'legend-count'\r\n        const body = document.querySelector('body')\r\n        body.appendChild(legend)\r\n        const draw = new this.Draw('legend-count', 50, 50)\r\n        draw.doughnut([50, 50], ['字段1', '字段2'])\r\n        body.removeChild(legend)\r\n        return legend\r\n    }\r\n}\r\n\r\n// 通过 new 引用\r\nL.Charts = L.charts = (...args) => {\r\n    return new Charts(...args)\r\n}\n\n//# sourceURL=webpack://leaflet.charts/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;