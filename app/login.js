let log = document.querySelector("input");
document.onkeyup = (event)=>{
    if(event.keyCode=="13" && log.value){
       location.href = "/view/windows.html";
    }
}