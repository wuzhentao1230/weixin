const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') 
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const stringToArray = str => {
  console.log(str)
}

const arraySub = (parArr,childArr) => {
  var result = [];
  parArr.forEach((item, index) => {
    if(childArr.indexOf(item) < 0) {
      result.push(item);
    }
  })
  return result;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  stringToArray: stringToArray,
  arraySub: arraySub
}
