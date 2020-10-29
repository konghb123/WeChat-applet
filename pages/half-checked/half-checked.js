// pages/half-checked/half-checked.js
Page({
  data: {
    list: [],
    //半选状态全选按钮
    checkedList: []
  },
  onLoad() {
    //进入页面获取数据
    this.getList()
  },
  getList() {
    //可以发送请求获取数据
    let checkedList = this.data.checkedList
    let list = [{
        id: 1,
        name: '歌曲',
        isSelected: true,
        arr: [{
            id: 11,
            name: '答案',
            isSelected: true
          },
          {
            id: 12,
            name: '彩虹',
            isSelected: true
          },
          {
            id: 13,
            name: '情非得以',
            isSelected: true
          },
        ]
      },
      {
        id: 2,
        name: '小说',
        isSelected: false,
        arr: [{
            id: 21,
            name: '雪中悍刀行',
            isSelected: false
          },
          {
            id: 22,
            name: '异常生物见闻录',
            isSelected: true
          },
          {
            id: 23,
            name: '唐砖',
            isSelected: false
          },
        ]
      },
      {
        id: 3,
        name: '地点',
        isSelected: false,
        arr: [{
            id: 31,
            name: '北京',
            isSelected: false
          },
          {
            id: 32,
            name: '上海',
            isSelected: false
          },
          {
            id: 33,
            name: '杭州',
            isSelected: false
          },
        ]
      },
    ]

    //渲染数据时 判断是否半选
    list.forEach(v => {
      let flag = true
      v.arr.forEach(arrItem => {
        flag = arrItem.isSelected ? false : flag
      })
      if (!flag && !v.isSelected) {
        checkedList.push(v.id)
      }
    })
    this.setData({
      list,
      checkedList
    })
  },
  //点击 全选按钮
  selectAll(e) {
    let {
      list,
      checkedList
    } = this.data
    list.forEach(v => {
      if (v.id === e.currentTarget.dataset.state.id) {
        v.isSelected = !v.isSelected
        if (!v.isSelected) {
          checkedList.includes(v.id) ? checkedList=checkedList.filter(check => check != v.id) : ""
        }
        v.arr.forEach(e => {
          e.isSelected = v.isSelected
        })
      }
    })
    this.setData({
      list,
      checkedList
    })
  },
  //checkbox-group 事件  被选中checkbox value 的数据 组成的数组 
  change(e) {
    let id = e.currentTarget.dataset.id
    let value = e.detail.value
    let list = this.data.list
    let checkedList = this.data.checkedList
    // console.log(checkedList)

    list.forEach(v => {
      if (v.id === id) {
        //设置 全选按钮
        v.isSelected = v.arr.length === value.length ? true : false
        if (v.isSelected) {
          checkedList.includes(id) ? checkedList=checkedList.filter(v => v != id) : ''
        } else if (!v.isSelected && value.length) {
          checkedList.includes(id) ? '' : checkedList.push(id)
        } else if (!v.isSelected && !value.length) {
          checkedList.includes(id) ? checkedList=checkedList.filter(v => v != id) : ''
        }
        //设置 单个按钮
        v.arr.filter(arrItem => arrItem.isSelected = false)
        v.arr.forEach(arrItem => {
          value.forEach(val => {
            arrItem.isSelected = arrItem.id == val ? true : arrItem.isSelected
          })
        })
      }
    })
    this.setData({
      list,
      checkedList
    })
  }
})