Array.from(document.getElementsByClassName("del1_button")).forEach(i=>{
    i.onclick = function(){
        let ind = this.getAttribute("data-id");
        window.location.href = '/tbindex/del/'+ind;
    }
})

document.getElementById("add1_button").onclick = function(){
    window.location.href='/tbindex/addpage';
}


Array.from(document.getElementsByClassName("upd1_button")).forEach(i=>{
    i.onclick = function(){
        let ind = this.getAttribute("data-id"); 
        window.location.href = '/tbindex/updateindex/'+ind;
    }
})