var dateInput = document.querySelector("#date");
var btnSubmit = document.querySelector("#btn-submit");
var output = document.querySelector("#output");

btnSubmit.addEventListener("click",clickHandler);

function clickHandler(e){
    var birthDate = dateInput.value;

    if(birthDate !== ''){
        var listOfBirthDate = birthDate.split('-');

        var date = {
            day: Number(listOfBirthDate[2]),
            month: Number(listOfBirthDate[1]),
            year: Number(listOfBirthDate[0])
        };

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            output.innerText = "🎁🎁 Hurray!! Your birthday is a palindrome.";
        }
        else{
            var [nextCtr, nextDate] = getNextPalindromeDate(date);
            var [previousCtr, previousDate] = getPreviousPalindromeDate(date);
            if(previousCtr < nextCtr){
                output.innerText = "The nearest pallindrome date is " + previousDate.day + "-" + previousDate.month + " - " + 
                               previousDate.year + ", you missed it by " + previousCtr + " days!";
            }
            else{
                output.innerText = "The nearest pallindrome date is " + nextDate.day + "-" + nextDate.month + " - " + 
                               nextDate.year + ", you missed it by " + nextCtr + " days!";
            }
            

        }
    }
}

function convertDateToStr(date){
    var dateStr = {day: '',month: '',year: ''};    

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;

}

function reverseStr(str){
    
    return str.split('').reverse().join('');

}

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

function getAllDateFormats(date){
    var dateString  = convertDateToStr(date);
    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
     var listOfAllFormats = getAllDateFormats(date);
     var checkPalindrome = false;

     for(let i = 0; i< listOfAllFormats.length;i++){
         if(isPalindrome(listOfAllFormats[i])){
             checkPalindrome = true;
             break;
         }
     }
     return checkPalindrome;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function isLeapYear(year){
    
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 3){
        if(isLeapYear(year)){
            if(day === 1){
                day = 29;
                month--;
            }
        }
        else{
            if(day === 1){
                day = 28;
                month--;
            }
        }
    }
    else{
        if(day === 1){
            day = daysInMonth[month - 2];
            month--;
        }
    }

    if(month === 1){
        month = 12;
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function getPreviousPalindromeDate(date){
    var ctr = 0;
    var previousDate = getPreviousDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if(isPalindrome){
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [ctr, previousDate];
}

