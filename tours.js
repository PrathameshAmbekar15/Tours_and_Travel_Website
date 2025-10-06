
let loginBtn = document.getElementById("loginBtn");
let placename = document.getElementById("placeName");
let submit = document.getElementById("submit");
let Connect = document.getElementById("Connect");




loginBtn.addEventListener("click", function(){

    let email = document.getElementById("email");
    let pass = document.getElementById("pass");

    if(email.value == "" && pass.value == ""){
        alert("Please fill Details")
    }else{
        alert("You Iogged In")
        document.querySelector(".loginPage").computedStyleMap.display="none"
    }

})

submit.addEventListener("click", function(){
    if(placeName.value ==""){
        alert("Fill Form")
    }else{
        alert(placeName.value + " Tour Booked")
    }
})

Connect.addEventListener("click", function(){
    if(Call ==""){
        alert("Please enter details")
    }else{
        alert(Call + " Team will reach to you")
    }
})