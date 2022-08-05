function createEmployeeRecord(arr) {
    let employeeRecord = {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    }
    return employeeRecord
  }
  
  function deriveDate(dateAndTime) {
    let date = dateAndTime.split('').slice(0, 10).join('')
    return date
  }
  
  function deriveTime(dateAndTime) {
    let time = dateAndTime.split('').slice(11, 15).join('')
    parseInt(time, 10)
    return time
  }
  
  function createTimeInEvent(obj, dateAndTime) {
    let date = deriveDate(dateAndTime)
    let time = parseInt(deriveTime(dateAndTime), 10)
    let timeInObj = {
      type: 'TimeIn',
      hour: time,
      date: date,
    }
    obj.timeInEvents.push(timeInObj)
    return obj
  }
  
  function createTimeOutEvent(obj, dateAndTime) {
    let date = deriveDate(dateAndTime)
    let time = parseInt(deriveTime(dateAndTime), 10)
    let timeOutObj = {
      type: 'TimeOut',
      hour: time,
      date: date,
    }
    obj.timeOutEvents.push(timeOutObj)
    return obj
  }
  
  let hoursWorkedDate
  
  function hoursWorkedOnDate(obj, date) {
    let targetDateInTime = obj.timeInEvents.find(event => event.date === `${date}`)
    let targetDateOutTime = obj.timeOutEvents.find(event => event.date === `${date}`)
    let hoursWorkedDate = (targetDateOutTime.hour - targetDateInTime.hour) / 100
    return hoursWorkedDate
  }
  
  let wagesEarnedDate
  

  
  function allWagesFor(obj) {
    const allWages = []
    for (let i = 0; i < obj.timeInEvents.length; i++) {
      let date = obj.timeInEvents[i].date
      hoursWorkedDate = hoursWorkedOnDate(obj, date)
      wagesEarnedDate = wagesEarnedOnDate(obj, date)
      allWages.push(wagesEarnedDate)
    }
    return sum(allWages)
  }
  
  function sum(arr) {
    const reducer = (sum, val) => sum + val
    const initialValue = 0
    return arr.reduce(reducer, initialValue)
  }

  let employeeRecords

  function createEmployeeRecords(arr) {
    employeeRecords = arr.map(emp => createEmployeeRecord(emp))
    return employeeRecords
  }

  function wagesEarnedOnDate(obj, date) {
    hoursWorkedDate = hoursWorkedOnDate(obj, date)
    wagesEarnedDate = hoursWorkedDate * obj.payPerHour
    return parseInt(wagesEarnedDate)
  }

  function calculatePayroll(arr) {
    let grandTotalOwed = arr.reduce((sum, value) => sum + allWagesFor(value), 0);
    return grandTotalOwed
  }

  let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)