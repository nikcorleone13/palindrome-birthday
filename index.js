var dateInput = document.querySelector("#birthday-input");
var showBtn = document.querySelector("#check-btn");
var outputEl = document.querySelector("#output");


function reverseStr(str) {
    var listOfChars = str.split("");
    var reversedListOfChars = listOfChars.reverse();
    var reversedStr = reversedListOfChars.join("");
  
    return reversedStr;
  }

function isPalindrome(ipString) {
    var reverse = reverseStr(ipString);
  
    if (reverse === ipString) {
      return true;
    } else {
      return false;
    }
  }
  
  function convertDateToString(date) {
    var dateStr = { day: "", month: "", year: "" };
  
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
  
    return dateStr;
  }
  

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  
function checkPalindromeForAllDateFormats(date) {
    listOfDateFormats = getAllDateFormats(date);
  
    var flag = false;
    for (var i = 0; i < listOfDateFormats.length; i++) {
      if (isPalindrome(listOfDateFormats[i])) {
        flag = true;
        break;
      }
    }
  
    return flag;
  }

  function isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }
  
function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        } else {
          if (day > 28) {
            day = 1;
            month++;
          }
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return { day: day, month: month, year: year };
  }
  
function getNextPalindromeDate(date) {
    let counter = 0;
    let nextDate = getNextDate(date);
  
    while (1) {
      counter++;
      let isPal = checkPalindromeForAllDateFormats(nextDate);
      if (isPal) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
  
    return [counter, nextDate];
  }
  
function getPrevDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }
  
    return { day: day, month: month, year: year };
  }
  function getPreviousPalindromeDate(date) {
    let counter = 0;
    let prevDate = getPrevDate(date);
  
    while (1) {
      counter++;
      let isPal = checkPalindromeForAllDateFormats(prevDate);
      if (isPal) {
        break;
      }
      prevDate = getPrevDate(prevDate);
    }
  
    return [counter, prevDate];
  }
  

  function clickHandler() {
    var bdayStr = dateInput.value;
  
    if (bdayStr !== "") {
      var splitDates = bdayStr.split("-");
      var dateObj = {
        day: Number(splitDates[2]),
        month: Number(splitDates[1]),
        year: Number(splitDates[0]),
      };
      let isPalin = checkPalindromeForAllDateFormats(dateObj);
      if (isPalin) {
        outputEl.innerText = "Yes. It is Palindrome!! 🤩";
      } else {
        var [ctr1, nextDate] = getNextPalindromeDate(dateObj);
        var [ctr2, prevDate] = getPreviousPalindromeDate(dateObj);
        if (ctr1 <= ctr2) {
          outputEl.innerText =  `Not a palindrome.You missed by ${ctr1} days! The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`;
        } else {
          outputEl.innerText = `Not a palindrome.You missed by ${ctr2} days! The nearest palindrome date was ${prevDate.day}-${prevDate.month}-${prevDate.year}`;
        }
      }
    } else {
      outputEl.innerText = "Birthday Input required or operation";
    }
  }
  
  showBtn.addEventListener("click", clickHandler);