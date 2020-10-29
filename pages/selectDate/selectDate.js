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
  let month = year == now.getFullYear() ? now.getMonth() + 1 : 12
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
  d.getFullYear() == now.getFullYear() && d.getMonth() == now.getMonth() ? monthDay = now.getDate() : '' // 当前天数截至到当天
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
    if (currentDate == "本日") { //本日  
      this.setData({
        click: 1
      })
    } else if (currentDate == "本月") { //本月
      this.setData({
        model: false
      })
    } else if (currentDate.split('-').length > 1) { //按日
      this.setData({
        click: 1
      })
      let start = currentDate.split('-')[0].split('/')
      let year = start[0]
      let month = start[1]
      let day = start[2]
      this.setData({
        months: getCurrentYearMonth(year),
        days: getCurrentMonthDay(year, month)
      })
      let startValue = [years.findIndex(item => item == year), this.data.months.findIndex(item => Number(item) == month), this.data.days.findIndex(item => Number(item) == month)]
      this.setData({
        startValue
      })
    } else { //按月
      let arr = currentDate.split('/')
      let year = arr[0]
      let month = arr[1]
      this.setData({
        model: false,
        months: getCurrentYearMonth(year),
      })
      let value = [years.findIndex(item => item == year), this.data.months.findIndex(item => Number(item) == month)]
      this.setData({
        value
      })
    }
  },



  //切换日期选择模式  按日/按月
  changeModel() {
    this.setData({
      model: !this.data.model,
      click: !this.data.model ? 1 : 0
    }, () => {
      this.determine()

    })
  },
  //切换  选择哪个时间  按月选择时间/按日选择的开始时间/按日选择的结束时间
  clickChange(event) {
    this.setData({
      click: event.target.dataset.type
    }, () => {
      this.determine()
    })
  },
  //在切换选择哪个模式 哪个时间的时候判断 月份数 天数
  determine() {
    console.log(this.data.click)
    let string = this.data.click==0 ? 'value' : (this.data.click == 1 ? 'startValue' : 'endValue')
    let year = years[this.data[string][0]]
    let month = this.data[string][1]
    this.setData({
      months: getCurrentYearMonth(year),
    },()=>{
      this.setData({
        days:getCurrentMonthDay(year,this.data.months[month])
      })
    })
  },


  //切换日期
  selectDateChange(event) {
    this.monthDayChange( event.detail.value) //日期切换后  月份数  天数 将会变化
  },
  // 日期切换后  月份数  天数 将会变化
  monthDayChange(value) {
    if (this.data.click == 0) { //按月份选择

      this.setData({
        value,
        months: getCurrentYearMonth(this.data.years[value[0]])
      })

    } else { //按日选择
      let string = this.data.click == 1 ? 'startValue' : 'endValue'
      let year = this.data.click == 1 ? this.data.years[value[0]] : this.data.years[value[0]]
      let month = this.data.click == 1 ? Number(this.data.months[value[1]]) : Number(this.data.months[value[1]])
      this.setData({
        [string]: value,
        months: getCurrentYearMonth(year),
        days: getCurrentMonthDay(year, month)
      })
    }
  },


  //取消
  cancle() {
    wx.navigateBack({
      delta: 0,
    })
  },
  //确认
  confirm() {
    let currentDate = ""
    let {
      years,
      months,
      days,
      startValue,
      endValue,
      value
    } = this.data
    if (this.data.model) { //按日选择

      //ios系统中,new Date()中的时间格式不能用 " - " 连接,应该用 " / "连接.否则会出现NaN
      let start = years[startValue[0]] + '/' + months[startValue[1]] + '/' + days[startValue[2]]
      let end = years[endValue[0]] + '/' + months[endValue[1]] + '/' + days[endValue[2]]
      let startTime = new Date(start).getTime()
      let endTime = new Date(end).getTime()

      currentDate = startTime == endTime && (years[startValue[0]] == now.getFullYear() && Number(months[startValue[1]]) == now.getMonth() + 1) && Number(days[startValue[2]]) == now.getDate() ? '本日' : (startTime < endTime ? start + '-' + end : end + '-' + start)

    } else { //按月选择
      let year = years[value[0]]
      console.log(months)
      let month = months[value[1]]
      currentDate = year == now.getFullYear() && month == now.getMonth() + 1 ? '本月' : year + '/' + month
    }


    //设置上一个页面  时间
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