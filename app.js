var dateInput = document.querySelector("#date");
var btnSubmit = document.querySelector("#btn-submit");

btnSubmit.addEventListener("click",clickHandler);

function clickHandler(e){
    e.preventDefault();
    if(dateInput === ""){
        output.innerText = "Birthdate can't be empty";
    }
    else{
        const date = dateInput.value.split("-");
        const yyyy = date[0];
        const mm = date[1];
        const dd = date[2];
        //console.log(yyyy + " " + mm + " " + dd);
        if(palindromeBirthday){
            output.innerText = "Hurray! Your birthday is a pallindrome birthday."
        }
        else{
            output.innerText = "Aah! Your birthday is not a pallindrome birthday."
        }
    }
}

function ispalindrome(dateInput){
    let reverseBirthDate = dateInput.split("").reverse("").join("");
    return reverseBirthDate === dateInput;
}

function checkFormat(year,month,day){
    const dateFormat1 = year + month + day;
    const dateFormat2 = day + month + year;
    const dateFormat3 = month + day + year.substring(2);
    const dateFormat4 = Number(month) + day + year;
    
    if(isPlaindrome(dateFormat1)){
        return ;
    }
    else  if(isPlaindrome(dateFormat2)){
        return ;
    }
    else  if(isPlaindrome(dateFormat3)){
        return ;
    }
    else{
        return null;
    }
}