// pages/selectDate/selectDate.js
const now = new Date()


// 数据处理函数

function process(value) { //处理选项 <10 加0
  return value < 10 ? '0' + value : value
}



// 年   直接获取
let years = []
for (let year = 1990; year <= now.getFullYear(); year++) {
  years.push(year)
}

// 月  需要根据 年份 判断

function getCurrentYearMonth(year) { //获取当年 月份数  如果是今年 截止到当前日期
  let months = []
  let month = year === now.getFullYear() ? now.getMonth() + 1 : 12
  for (let i = 1; i <= month; i++) {
    months.push(process(i))
  }
  return months
}
let months = getCurrentYearMonth(now.getFullYear())



// 日  需要根据 月份 判断
function getCurrentMonthDay(year, month) { //获取当前月份天数
  let d = new Date(year, month, 0);
  let monthDay = d.getDate()
  let days = []
   d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() ? monthDay=now.getDate() : '' // 当前天数截至到当天
  for (let day = 1; day <= monthDay; day++) {
    days.push(process(day))
  }
  return days
}
let days = getCurrentMonthDay(now.getFullYear(), now.getMonth() + 1)






Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '',
    //日期选择模式  true  按日期   false  按月份
    model: true,
    // 年 月 日 列表
    years,
    months,
    days,
    //切换  选择哪个时间  按月选择/按日选择的开始时间/按日选择的结束时间
    click: 0,
    //按日选择
    value: [years.length - 1, months.length - 1],

    //按月选择
    startValue: [years.length - 1, months.length - 1, days.length - 1],
    endValue: [years.length - 1, months.length - 1, days.length - 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.option(options.currentDate)
  },
  //判断展示页面  今日/本月/按日/按月
  option(currentDate) {
    if (currentDate === "本日") {
      this.setData({
        click: 1
      })
    } else if (currentDate === "本月") {
      this.setData({
        model: false
      })
    } else if (currentDate.split('-').length > 1) {
      this.setData({
        click: 1
      })
    } else {
      this.setData({
        model: false
      })
    }
  },



  //切换日期选择模式  按日/按月
  changeModel() {
    this.setData({
      model: !this.data.model,
      click: !this.data.model ? 1 : 0
    })
  },
  //切换  选择哪个时间  按月选择时间/按日选择的开始时间/按日选择的结束时间
  clickChange() {

  },
   //切换日期
   selectDateChange(event) {
    let value = event.detail.value
    this.monthDayChange(value)
  },
  // 日期切换后  月份数  天数 将会变化
  monthDayChange(value) {
    if (this.data.click === 0) { //按月份选择

      this.setData({
        value,
        months: getCurrentYearMonth(this.data.years[value[0]])
      })

    } else { //按天数选择
      let year = this.data.click === 1 ? this.data.years[value[0]] : this.data.years[value[0]]
      let month = this.data.click === 1 ? Number(this.data.months[value[1]]) : Number(this.data.months[value[1]])
      this.setData({
        value,
        months: getCurrentYearMonth(year),
        days: getCurrentMonthDay(year, month)
      })
    }
  },


  //取消
  cancle() {

  },
  //确认
  confirm() {
    let currentDate = ""
    if (this.data.model) {

    } else {
      let year = years[this.data.value[0]]
      let month = months[this.data.value[1]]
      currentDate = year === now.getFullYear() && month === now.getMonth() + 1 ? '本月' : year + '/' + month
    }
    let pages = getCurrentPages()
    console.log(pages)
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];
      //获取上一个页面实例对象
      beforePage.setData({
        currentDate
      }, () => {
        wx.navigateBack({
          delta: 0,
        })
      })
    }
  },

 

})