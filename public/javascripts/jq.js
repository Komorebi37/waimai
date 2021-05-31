
$(function(){
    
    $("#nextPage").click(function(){

        $.ajax({
            type:"post",
            url:"/nextpage",
            success:function(data){
                console.log(data);
   document.getElementById("showdata").innerHTML  = data.map((o,ind) => `
                <tr>
                <td>${o.name}</td>
                <td>${o.s1}</td>
                <td>${o.s2}</td>
                <td>${o.s3}</td>
                <td>${o.amount}</td>
                <td>
                    <input data-id=${ind} type="button" value="删除" class="del_button"/>
                    <input data-id=${ind} type="button" value="修改" class="upd_button"/>
                </td>
            </tr>

                `).join(""); 
                
            }
        })
    })
})