
$(document).ready(()=>{
    let userEmail;
    var status;

    function convertDate(inStr){
        if((typeof inStr == 'undefined') || (inStr == null) || 
            (inStr.length <= 0)) {
            return '';
            }
            var year = inStr.substring(0, 4);
            var month = inStr.substring(5, 7);
            var day = inStr.substring(8, 10);
            return month + '/' + day + '/' + year;
    }


    function findOrder(ID,result){

        return new Promise((resolve,reject)=>{
            result.forEach(element => {
                if(element.orderID==ID){
                    console.log(element)
                    resolve(element);
                }
            });
        })
    }



    $("#dialog").dialog({
        autoOpen:false,
        show: {
            effect: "blind",
            duration: 1000,
        },
        resizable: false,
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    $("#dialog2").dialog({
        autoOpen:false,
        show: {
            effect: "blind",
            duration: 1000,
        },
        resizable: false,
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    $("#info").dialog({
        autoOpen:false,
        show: {
            effect: "blind",
            duration: 1000,
        },
        resizable: false,
        hide: {
            effect: "explode",
            duration: 1000
        }
    });


    $(document).on("click",".show",(e)=>{



        $.ajax({url:'/api/orders',success:(result)=>{
            let i=$(e.target).attr("id");

            findOrder(i,result).then((order)=>{
                let pickupdate=convertDate(order.pickUpTime.split("at")[1].split(" ")[1]);
                let pickuptime=order.pickUpTime.split("at")[0];
                $("#pickUpDate").text(pickupdate);
                $("#pickUpTime").text(pickuptime);
                $("#deliveryDate").text(convertDate(order.preferedDeliveryDate));
                if(order.estimatedDeliveryTime==null) $("#deliveryTime").text("Not available");
                else $("#deliveryTime").text(order.estimatedDeliveryTime);
                if(order.orderPrice==null) $("#priceOfOrder").text("Not availble");
                else $("#priceOfOrder").text("$"+order.orderPrice);

                $("#info").dialog("open");
            })

        }})


    });


    $.ajax({url:'/api/userData', success: function(res){
        userEmail=res.userEmail
        status=res.status;
    }});



    $.ajax({url:'/api/orders/userOrder', success: function(result){

        if(!result.length){
            $("#first").html(`<h1 class="text-center">You currently have no order available!<h1>`);
        }

        else{

            console.log(JSON.stringify(result))


            if(status=="customer"){
                let header="<th>Order ID</th><th>Order status</th><th>Laundromat name</th><th>Laundromat phone#</th><th>Laundromat address</th><th>Comments</th><th>Pick up time,delivery,price informations</th><th>Actions</th>";
                $("#th").html(header);
            }else if(status=="owner"){
                let header="<th>Order ID</th><th>Order status</th><th>Customer phone#</th><th>Cusomter email</th><th>Customer address</th><th>Comments</th><th>Pick up time,delivery,price informations</th><th>Actions</th>";
                $("#th").html(header);
            }
    
    
    
            let body="";
    
            for(let i=0;i<result.length;i++){
    
    
                
    
                if(status=="customer"){
    
                    body+=`<tr>`;
                    body+="<td>"+result[i].orderID+"</td>";
                    body+="<td>"+result[i].orderStatus+"</td>";
                    body+="<td>"+result[i].laundromatName+"</td>";
                    body+="<td>"+result[i].ownerPhone+"</td>";
                    body+="<td>"+result[i].laundromatAddress+"</td>";
                    body+="<td>"+result[i].preferences+"</td>";
                    body+=`<td><button class="show btn btn-primary" id="${result[i].orderID}">view</button></td>`;
                    body+="<td>"+document.getElementById("customerDropdown").innerHTML+"</td>";
    
                    body+="</tr>";
                }
    
    
    
                else if(status=="owner"){
                        body+=`<tr>`;
                        body+="<td>"+result[i].orderID+"</td>";
                        body+="<td>"+result[i].orderStatus+"</td>";
                        body+="<td>"+result[i].customerPhone+"</td>"
                        body+="<td>"+result[i].userEmail+"</td>";
                        body+="<td class=address>"+result[i].customerAddress+"</td>";
                        body+="<td>"+result[i].preferences+"</td>";
                        body+=`<td><button class="show btn btn-primary" id="${result[i].orderID}">view</button></td>`;
                        body+="<td>"+document.getElementById("ownerDropdown").innerHTML+"</td>";
    
                        body+="</tr>";

                }
            }
    
    
    
            $("#tbody").html(body);
            
            
            var styles = `
                    th{
                        padding-left:30px;
                        background-color: lightskyblue;
                        color: black;
                        height: 30px;
                    }
                    tr{
                        border-bottom: 1px solid black;
                    }
                    td{
                        height: 50px;
                        word-wrap: break-word;         /* All browsers since IE 5.5+ */
                        overflow-wrap: break-word;
                    }
            `



            var styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);



        }


    }});


    $(document).on("click",".option",(e)=>{
        let option=$(e.target).text();
        let target = ($(e.target).parent().parent().parent().prev().prev().prev().prev().prev().prev().prev().text());
        if(option=="Accept order"){
            
            $.ajax({
                url:`/api/orders/acceptOrder/${target}`,
                type:'PUT',
                success:function(){
                    //location.reload();
                },
                error:()=>{
                    location.reload();
                }
            });
        }

        else if(option=="Notify pickup"){
            
            $.ajax({
                url:`/api/orders/notifyPickup/${target}`,
                type:'PUT',
                success:function(){
                    $('#orderID').val(`${target}`)
                    $('#dialog2').dialog("open");
                    //location.reload();
                },
                error:function(err){
                    location.reload();
                }
            });    
        }
        
        else if(option=="Cancel order"){

            $.ajax({
                url:`/api/orders/cancelOrder/${target}`,
                type:'DELETE',
                success:function(){
                    location.reload();
                },
                error:function(err){
                    location.reload();
                }
            })

        }

        else if(option=="Order delivered"){
            $.ajax({
                url:`/api/orders/orderDelivered/${target}`,
                type:'PUT',
                success:function(){
                    location.reload();
                },
                error:function(err){
                    location.reload();
                }
            })
        }

        else if(option=="Rate service"){
            $.ajax({
                url:`/api/orders/rateOrder/${target}`,
                type:'PUT',
                success:function(res){
                    $("#containID").val(`${target}`);
                    $( "#dialog" ).dialog( "open" );
                },
                error:function(err){
                    location.reload();
                }
            });
        }

    });


})
