/**
 * Created by renlinfei on 2019-09-17.
 */

/**设置默认溢出显示数量 */
var spillDataNum = 10
// listen
var oldFunctions = {}

var oldTopNums = {}
var oldScrollTops = {}
/**设置隐藏函数 */
let timeout = false
let setRowDisableNone = function (topNum, showRowNum, binding) {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum)
  })
}
import Vue from 'vue'

export default () => {
  Vue.directive("loadmore", {
    componentUpdated: function (el, binding, vnode, oldVnode) {
      const dataSize = vnode.data.attrs['data-size']
      const oldDataSize = oldVnode.data.attrs['data-size']

      const sizeChange = vnode.data.attrs['sizeChange']
      const oldSizeChange = oldVnode.data.attrs['sizeChange']
      /** logManage */
      const currentPage = vnode.data.attrs['currentPage']
      const oldcurrentPage = oldVnode.data.attrs['currentPage']
      const tableId = el.__vue__.tableId
      if (!oldFunctions[tableId]) {
        oldFunctions[tableId] = null
      }
      if (!oldTopNums[tableId]) {
        oldTopNums[tableId] = 0
      }
      if (!oldScrollTops[tableId]) {
        oldScrollTops[tableId] = 0
      }
      setTimeout(() => {
        if (dataSize === oldDataSize && (sizeChange === undefined || sizeChange === oldSizeChange) && (currentPage === undefined || currentPage === oldcurrentPage)) {
          return
        }
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        const selectTbody = selectWrap.querySelector('table tbody')
        const selectTable = selectWrap.querySelector('table')
        const selectRows = selectWrap.getElementsByTagName('tr')
        let createElementBottomTR = el.querySelector('#overflowBottomTr')
        let createElementTopTR = el.querySelector('#overflowTopTr')
        if (!selectRows || selectRows.length === 0 || selectRows[1].clientHeight === 0) {
          return
        }
        const rowHeight = selectRows[1].clientHeight
        let showRowNum = Math.ceil(selectWrap.clientHeight / rowHeight)
        if (selectWrap.clientHeight === 0) {
          if (el.parentNode.parentNode.parentNode.parentNode.parentNode.clientHeight === 0) {
            showRowNum = 1 / 2 * spillDataNum
          } else {
            showRowNum = Math.ceil(el.parentNode.parentNode.parentNode.parentNode.parentNode.clientHeight / rowHeight)
          }
        }

        // bottom
        if (createElementBottomTR) {
          let createElementTRHeight = (dataSize - oldDataSize) * rowHeight
          createElementBottomTR.setAttribute('style', `height: ${createElementBottomTR.clientHeight + createElementTRHeight}px;`)
        } else {
          createElementBottomTR = document.createElement('tr')
          createElementBottomTR.id = 'overflowBottomTr'
          let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight
          createElementBottomTR.setAttribute('style', `height: ${createElementTRHeight}px;`)
          selectTbody.appendChild(createElementBottomTR)
        }

        Node.prototype.prependChild = function (newNode) {
          this.insertBefore(newNode, this.firstChild)
        }
        // top
        if (createElementTopTR) {
        } else {
          createElementTopTR = document.createElement('tr')
          createElementTopTR.id = 'overflowTopTr'
          createElementTopTR.setAttribute('style', `height: 0px;`)
          selectTbody.prependChild(createElementTopTR)
        }
        var createElementTopTRHieght = 0
        selectWrap.removeEventListener('scroll', oldFunctions[tableId])
        oldFunctions[tableId] = function () {
          let topNum = oldTopNums[tableId]
          if (oldScrollTops[tableId] > this.scrollTop) {
            if (this.scrollTop - createElementTopTRHieght <= 0) {
              topNum = (Math.round(this.scrollTop / rowHeight) - spillDataNum) > 0 ? (Math.round(this.scrollTop / rowHeight) - spillDataNum) : 0
            }
          } else if (oldScrollTops[tableId] < this.scrollTop) {
            if (this.scrollTop - createElementTopTRHieght >= spillDataNum * rowHeight) {
              topNum = Math.round(this.scrollTop / rowHeight)
            }
          }
          oldScrollTops[tableId] = this.scrollTop
          let minTopNum = dataSize - spillDataNum - showRowNum
          if (topNum >= minTopNum && minTopNum >= 0) {
            topNum = minTopNum
          }

          if (oldTopNums[tableId] !== topNum) {
            createElementTopTRHieght = topNum * rowHeight
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
              selectTable.setAttribute('style', `transform: translateY(${topNum * rowHeight}px)`)
            } else {
              selectTbody.setAttribute('style', `transform: translateY(${topNum * rowHeight}px)`)
            }
            createElementBottomTR.setAttribute('style', `height: ${(dataSize - showRowNum - topNum - spillDataNum) * rowHeight}px;`)
          }
          oldTopNums[tableId] = topNum
          setRowDisableNone(topNum, showRowNum, binding)
        }
        //
        selectWrap.addEventListener('scroll', oldFunctions[tableId])
      })
    },
    /**
     * Scroll
     * @param {element} el
     * @param {object} binding
     * @param {object} vnode
     */
    bind: function (el, binding, vnode) {
      const dataSize = vnode.data.attrs['data-size']

      const tableId = el.__vue__.tableId
      if (!oldFunctions[tableId]) {
        oldFunctions[tableId] = null
      }
      if (!oldTopNums[tableId]) {
        oldTopNums[tableId] = 0
      }
      if (!oldScrollTops[tableId]) {
        oldScrollTops[tableId] = 0
      }
      setTimeout(() => {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        const selectTbody = selectWrap.querySelector('table tbody')
        const selectTable = selectWrap.querySelector('table')
        const selectRows = selectWrap.getElementsByTagName('tr')
        let createElementBottomTR = el.querySelector('#overflowBottomTr')
        let createElementTopTR = el.querySelector('#overflowTopTr')
        if (!selectRows || selectRows.length === 0 || selectRows[1].clientHeight === 0) {
          return
        }
        const rowHeight = selectRows[1].clientHeight
        let showRowNum = Math.ceil(selectWrap.clientHeight / rowHeight)
        if (selectWrap.clientHeight === 0) {
          if (el.parentNode.parentNode.parentNode.parentNode.parentNode.clientHeight === 0) {
            showRowNum = 1 / 2 * spillDataNum
          } else {
            showRowNum = Math.ceil(el.parentNode.parentNode.parentNode.parentNode.parentNode.clientHeight / rowHeight)
          }
        }

        // bottom
        if (createElementBottomTR) {
          let createElementTRHeight = (dataSize) * rowHeight
          createElementBottomTR.setAttribute('style', `height: ${createElementBottomTR.clientHeight + createElementTRHeight}px;`)
        } else {
          createElementBottomTR = document.createElement('tr')
          createElementBottomTR.id = 'overflowBottomTr'
          let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight
          createElementBottomTR.setAttribute('style', `height: ${createElementTRHeight}px;`)
          selectTbody.appendChild(createElementBottomTR)
        }

        Node.prototype.prependChild = function (newNode) {
          this.insertBefore(newNode, this.firstChild)
        }
        // top
        if (createElementTopTR) {
        } else {
          createElementTopTR = document.createElement('tr')
          createElementTopTR.id = 'overflowTopTr'
          createElementTopTR.setAttribute('style', `height: 0px;`)
          selectTbody.prependChild(createElementTopTR)
        }
        var createElementTopTRHieght = 0
        selectWrap.removeEventListener('scroll', oldFunctions[tableId])
        oldFunctions[tableId] = function () {
          let topNum = oldTopNums[tableId]
          if (oldScrollTops[tableId] > this.scrollTop) {
            if (this.scrollTop - createElementTopTRHieght <= 0) {
              topNum = (Math.round(this.scrollTop / rowHeight) - spillDataNum) > 0 ? (Math.round(this.scrollTop / rowHeight) - spillDataNum) : 0
            }
          } else if (oldScrollTops[tableId] < this.scrollTop) {
            if (this.scrollTop - createElementTopTRHieght >= spillDataNum * rowHeight) {
              topNum = Math.round(this.scrollTop / rowHeight)
            }
          }
          oldScrollTops[tableId] = this.scrollTop
          let minTopNum = dataSize - spillDataNum - showRowNum
          if (topNum >= minTopNum && minTopNum >= 0) {
            topNum = minTopNum
          }

          if (oldTopNums[tableId] !== topNum) {
            createElementTopTRHieght = topNum * rowHeight
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
              selectTable.setAttribute('style', `transform: translateY(${topNum * rowHeight}px)`)
            } else {
              selectTbody.setAttribute('style', `transform: translateY(${topNum * rowHeight}px)`)
            }
            createElementBottomTR.setAttribute('style', `height: ${(dataSize - showRowNum - topNum - spillDataNum) * rowHeight}px;`)
          }
          oldTopNums[tableId] = topNum
          setRowDisableNone(topNum, showRowNum, binding)
        }
        //
        selectWrap.addEventListener('scroll', oldFunctions[tableId])
      })
    }
  })
}