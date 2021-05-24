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

eval("/*\r\n * @Description: 使用 d3 绘制图表\r\n * @Author: zyc\r\n * @Date: 2021-05-24 10:22:37\r\n * @LastEditTime: 2021-05-24 12:25:05\r\n */\r\n\r\n// const d3 = require('d3')\r\n\r\nclass Draw {\r\n    constructor(className, w, h) {\r\n        this.svg = d3.select('.' + className)\r\n            .append(\"svg\")\r\n            .attr(\"width\", w)\r\n            .attr(\"height\", h)\r\n            // 对 svg 宽高进行移动, 以使其中心点对准需要放置的位置\r\n            .attr('transform', `translate(${-w / 2}, ${-h / 2})`)\r\n            .style('overflow', 'visible')\r\n\r\n        this.w = w\r\n        this.h = h\r\n    }\r\n    /**\r\n     * @description: \r\n     * @param {*} dataset\r\n     * @param {Boolean} isRing 是否是空心环\r\n     * @return {*}\r\n     */\r\n    pie(dataset, isRing) {\r\n        const {\r\n            svg,\r\n            w,\r\n            h\r\n        } = this\r\n        const outerRadius = w / 2 // 饼图半径\r\n        const innerRadius = isRing ? w / 4 : 0 // 内环半径(绘制 pie 时设置 0)\r\n        // d3 方法\r\n        const arc = d3.arc()\r\n            .innerRadius(innerRadius)\r\n            .outerRadius(outerRadius);\r\n        const pie = d3.pie()\r\n\r\n        // Easy colors accessible via a 10-step ordinal scale\r\n        const color = d3.scaleOrdinal(d3.schemeCategory10);\r\n\r\n        // 设置arc\r\n        const arcs = svg.selectAll(\"g.arc\")\r\n            .data(pie(dataset))\r\n            .enter()\r\n            .append(\"g\")\r\n            .attr(\"class\", \"arc\")\r\n            // 通过 transform ,省得定义 起始点\r\n            .attr(\"transform\", \"translate(\" + outerRadius + \",\" + outerRadius + \")\");\r\n\r\n        // 绘制路径\r\n        arcs.append(\"path\")\r\n            .attr(\"fill\", (d, i) => color(i))\r\n            .transition()\r\n            .attr(\"d\", arc)\r\n\r\n        // 添加注记\r\n        arcs.append(\"text\")\r\n            .attr(\"transform\", d => `translate(${arc.centroid(d)})`)\r\n            .attr('font-size', '11px')\r\n            .attr('fill', 'white')\r\n            .attr(\"text-anchor\", \"middle\")\r\n            .text(d => d.value)\r\n    }\r\n\r\n    doughnut(dataset) {\r\n        this.pie(dataset, true)\r\n    }\r\n\r\n    bar(dataset) {\r\n        const {\r\n            svg,\r\n            w,\r\n            h\r\n        } = this\r\n        const color = d3.scaleOrdinal(d3.schemeCategory10);\r\n\r\n        const padding = 20\r\n        // 比例尺\r\n        const xScale = d3.scaleBand()\r\n            .domain(d3.range(dataset.length))\r\n            .rangeRound([0, w])\r\n            .paddingInner(0.1)\r\n\r\n        // 比例尺\r\n        const yScale = d3.scaleLinear()\r\n            .domain([0, d3.max(dataset)])\r\n            .range([padding, h - padding])\r\n\r\n        // 设置arc\r\n        const bars = svg.selectAll(\"g.bar\")\r\n            .data(dataset)\r\n            .enter()\r\n            .append(\"g\")\r\n            .attr(\"class\", \"bar\")\r\n\r\n        bars.append('rect')\r\n            .attr('x', (d, i) => xScale(i)) // x 定位\r\n            .attr('y', d => h - yScale(d)) // y 定位\r\n            .attr('width', xScale.bandwidth()) // 宽度\r\n            .attr('fill', (d, i) => color(i)) // 色彩\r\n            .transition()\r\n            .attr('height', d => yScale(d)) // 高度\r\n\r\n        // 添加注记\r\n        bars.append(\"text\")\r\n            .attr('x', (d, i) => xScale.bandwidth() / 2)\r\n            .attr('y', d => 14)\r\n            .attr(\"transform\", (d, i) => `translate(${xScale(i)}, ${h - yScale(d)})`)\r\n            .text(d => d)\r\n            .attr('font-size', '11px')\r\n            .attr('fill', 'white')\r\n            .attr(\"text-anchor\", \"middle\")\r\n    }\r\n}\r\n\r\nmodule.exports = Draw\n\n//# sourceURL=webpack://leaflet.charts/./src/drawByD3.js?");

/***/ }),

/***/ "./src/drawByEcharts.js":
/*!******************************!*\
  !*** ./src/drawByEcharts.js ***!
  \******************************/
/***/ ((module) => {

eval("/*\r\n * @Description: 用 echarts 绘制图表\r\n * @Author: zyc\r\n * @Date: 2021-05-24 10:57:59\r\n * @LastEditTime: 2021-05-24 12:46:08\r\n */\r\n\r\n// const echarts = require('echarts')\r\n\r\nclass DrawByEcharts {\r\n    constructor(className, w, h) {\r\n        // 向 div icon 中添加一个 div 元素，并设置其宽高、偏移\r\n        const node = document.querySelector(`.${className}`)\r\n        const div = document.createElement('div')\r\n        node.appendChild(div)\r\n        div.style.height = `${h}px` // 高\r\n        div.style.width = `${w}px` // 宽\r\n        div.style.transform = `translate(${-w / 2}px, ${-h / 2}px)` // 偏移\r\n        this.myChart = echarts.init(div)\r\n    }\r\n\r\n    pie(dataset, isRing) {\r\n        const option = {\r\n            tooltip: {\r\n                trigger: 'item'\r\n            },\r\n            series: [{\r\n                name: '访问来源',\r\n                type: 'pie',\r\n                // radius: ['50%', '90%'],\r\n                radius: isRing ? ['50%', '90%'] : ['100%'],\r\n                avoidLabelOverlap: false,\r\n                label: {\r\n                    show: false,\r\n                    position: 'center'\r\n                },\r\n                emphasis: {\r\n                    label: {\r\n                        // show: true,\r\n                        fontSize: '40',\r\n                        fontWeight: 'bold'\r\n                    }\r\n                },\r\n                labelLine: {\r\n                    show: false\r\n                },\r\n                data: [{\r\n                        value: 1048,\r\n                        name: '搜索引擎'\r\n                    },\r\n                    {\r\n                        value: 735,\r\n                        name: '直接访问'\r\n                    },\r\n                    {\r\n                        value: 580,\r\n                        name: '邮件营销'\r\n                    },\r\n                    {\r\n                        value: 484,\r\n                        name: '联盟广告'\r\n                    },\r\n                    {\r\n                        value: 300,\r\n                        name: '视频广告'\r\n                    }\r\n                ]\r\n            }]\r\n        };\r\n        this._setOption(option)\r\n    }\r\n\r\n    bar(dataset) {\r\n        const option = {\r\n            xAxis: {\r\n                type: 'category',\r\n                data: ['Mon', 'Tue', 'Wed']\r\n            },\r\n            yAxis: {\r\n                type: 'value',\r\n                splitLine: false\r\n\r\n            },\r\n            series: [{\r\n                data: [{\r\n                    value: 120,\r\n                    itemStyle: {\r\n                        color: '#5470c6'\r\n                    }\r\n                }, {\r\n                    value: 200,\r\n                    itemStyle: {\r\n                        color: '#91cc75'\r\n                    }\r\n                }, {\r\n                    value: 80,\r\n                    itemStyle: {\r\n                        color: '#fac858'\r\n                    }\r\n                }, ],\r\n                type: 'bar'\r\n            }]\r\n        };\r\n\r\n        this._setOption(option)\r\n    }\r\n\r\n    doughnut(dataset) {\r\n        this.pie(dataset, true)\r\n    }\r\n\r\n    /**\r\n     * @description: 设置图形生效\r\n     * @param {*} option\r\n     * @return {*}\r\n     */    \r\n    _setOption(option) {\r\n        this.myChart.setOption(option)\r\n    }\r\n\r\n}\r\n\r\nmodule.exports = DrawByEcharts\r\n\n\n//# sourceURL=webpack://leaflet.charts/./src/drawByEcharts.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\r\n * @Description: contents\r\n * @Author: zyc\r\n * @Date: 2021-05-24 09:57:08\r\n * @LastEditTime: 2021-05-24 12:26:37\r\n */\r\n\r\n// 保留使用 d3 绘图的接口，以便能够自定义一些图表的绘制\r\nconst drawByD3 = __webpack_require__(/*! ./drawByD3 */ \"./src/drawByD3.js\")\r\n// 接入 echarts 的图形绘制，借用 echarts 成熟的图形绘制和动态图表特性\r\nconst drawByEcharts = __webpack_require__(/*! ./drawByEcharts */ \"./src/drawByEcharts.js\")\r\n\r\nclass Charts {\r\n    constructor(dataset, {\r\n        /* \r\n        函数默认参数的解构赋值 https://es6.ruanyifeng.com/#docs/function\r\n        */\r\n        scale = 1, // 缩放尺度\r\n        type = 'pie', // 制图类型\r\n        width_height = 1, // 容器宽高比例\r\n        mode='d3',\r\n    } = {}) {\r\n        this.scale = scale\r\n        this.dataset = dataset\r\n        this.type = type\r\n        this.width_height = width_height\r\n        this.chartLayer = this.init()\r\n        this.draw = mode === 'd3' ? drawByD3 : drawByEcharts\r\n    }\r\n\r\n    init() {\r\n        let {\r\n            dataset,\r\n            type,\r\n            width_height,\r\n            scale\r\n        } = this\r\n        /* 根据数据情况, 为各区图表设置适当比例 */\r\n        let bili = dataset.map(item => item.data.reduce((pre, next) => pre + next))\r\n        let base = Math.pow(Math.min(...bili), 0.3) // 以最小值为基准进行放大\r\n        bili = bili.map(item => Math.pow(item, 0.3) / base)\r\n\r\n        let markers = [] // 存储生成的 marker 图层\r\n        for (let i = 0; i < dataset.length; i++) {\r\n            let {\r\n                lat,\r\n                lng,\r\n                data\r\n            } = dataset[i]\r\n\r\n            // 使用 divIcon 向 leaflet 添加 div 容器, 后面需要依赖这个容器追加 svg 图表\r\n            let className = `my-div-icon-${i}` // 自定义类\r\n            let marker = L.marker([lat, lng], {\r\n                icon: L.divIcon({\r\n                    className\r\n                })\r\n            })\r\n            markers.push(marker)\r\n\r\n            // 当图层添加至地图时, 进行渲染(这是为了应对图层移除再添加后, svg 内容消失的问题)\r\n            marker.on('add', () => {\r\n                // svg 的宽高对比取决于数据的总和大小对比, 在这之外才是 scale 的缩放比例\r\n                var w = 40 * width_height * scale * bili[i];\r\n                var h = 40 / width_height * scale * bili[i];\r\n\r\n                const draw = new this.draw(className, w, h)\r\n\r\n                // 根据绘制类型, 渲染不同的图表形式\r\n                switch (type) {\r\n                    case 'ring': // 圆环\r\n                        // this._drawPie(svg, data, w, h, true)\r\n                        draw.doughnut(data, true)\r\n                        break;\r\n                    case 'bar': // 柱状图\r\n                        // this._drawBar(svg, data, w, h)\r\n                        draw.bar(data)\r\n                        break;\r\n                    default: // 默认为实心圆\r\n                        // this._drawPie(svg, data, w, h)\r\n                        draw.pie(data)\r\n                        break;\r\n                }\r\n            })\r\n        }\r\n        return L.featureGroup(markers)\r\n    }\r\n\r\n    /**\r\n     * @description: 返回图表所在的图层 layer\r\n     * @param {*}\r\n     * @return {*}\r\n     */    \r\n    layer() {\r\n        return this.chartLayer\r\n    }\r\n\r\n}\r\n\r\n// 通过 new 引用\r\nL.Charts = L.charts = (...args) => {\r\n    return new Charts(...args)\r\n}\n\n//# sourceURL=webpack://leaflet.charts/./src/index.js?");

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