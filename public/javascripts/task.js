document.getElementById("add_button").onclick = function(){
    window.location.href='/order/addpage';
}


Array.from(document.getElementsByClassName("del_button")).forEach(i=>{
    i.onclick = function(){
        let ind = this.getAttribute("data-id");
        window.location.href = '/order/del/'+ind;
    }
})





Array.from(document.getElementsByClassName("upd_button")).forEach(i=>{
    i.onclick = function(){
        let ind = this.getAttribute("data-id"); 
        window.location.href = '/order/update/'+ind;
    }
})


document.getElementById('nextpage').onclick = function(){
    window.location.href="/order/nextpage";
};