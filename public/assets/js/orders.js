

    let userEmail;
    var status;

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


    $.ajax({url:'/api/userData', success: function(res){
        userEmail=res.userEmail
        status=res.status;
        console.log("oirhgejio");
        console.log(userEmail);
    }});


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



    $.ajax({url:'/api/orders/userOrder', success: function(result){
        console.log(result);

        if(status=="customer"){
            let header="<th>Order ID</th><th>Delivery date</th><th>Order status</th><th>Laundromat name</th><th>Laundromat phone#</th><th>Laundromat address</th><th>Comments</th><th>Pick up time and date</th><th>Estimated Delivery Time</th><th>Order Price</th><th>Actions</th>";
            $("#th").html(header);
        }else if(status=="owner"){
            let header="<th>Order ID</th><th>Delivery date</th><th>Order status</th><th>Customer name</th><th>Cusomter email</th><th>Customer address</th><th>Comments</th><th>Pick up time and date</th><th>Estimated Delivery Time</th><th>Order Price</th><th>Actions</th>";
            $("#th").html(header);
        }



        let body="";


        for(let i=0;i<result.length;i++){

            console.log(status);


            

            if(status=="customer"){

                body+=`<tr>`;
                body+="<td>"+result[i].orderID+"</td>";
                body+="<td>"+convertDate(result[i].preferedDeliveryDate)+"</td>";
                body+="<td>"+result[i].orderStatus+"</td>";
                body+="<td>"+result[i].laundromatName+"</td>";
                body+="<td>"+result[i].ownerPhone+"</td>";
                body+="<td>"+result[i].laundromatAddress+"</td>";
                body+="<td>"+result[i].preferences+"</td>";
                body+="<td>"+result[i].pickUpTime+"</td>"
                if(result[i].estimatedDeliveryTime==null || result[i].estimatedDeliveryTime==undefined) body+="<td>Not available</td>";
                else body+="<td>"+result[i].estimatedDeliveryTime+"</td>";
                if(result[i].orderPrice==null || result[i].orderPrice==undefined) body+="<td>Not available</td>";
                else body+="<td>"+`$${result[i].orderPrice}`+"</td>";
                body+="<td>"+document.getElementById("customerDropdown").innerHTML+"</td>";

                body+="</tr>";
            }



            else if(status=="owner"){

                if(result[i].orderStatus!="Delivered"){

                    body+=`<tr>`;
                    body+="<td>"+result[i].orderID+"</td>";
                    body+="<td>"+convertDate(result[i].preferedDeliveryDate)+"</td>";
                    body+="<td>"+result[i].orderStatus+"</td>";
                    body+="<td>"+result[i].customerName+"</td>"
                    body+="<td>"+result[i].userEmail+"</td>";
                    body+="<td class=address>"+result[i].customerAddress+"</td>";
                    body+="<td>"+result[i].preferences+"</td>";
                    body+="<td>"+result[i].pickUpTime+"</td>"
                    if(result[i].estimatedDeliveryTime==null || result[i].estimatedDeliveryTime==undefined) body+="<td>Not available</td>";
                    else body+="<td>"+result[i].estimatedDeliveryTime+"</td>";
                    if(result[i].orderPrice==null || result[i].orderPrice==undefined) body+="<td>Not available</td>";
                    else body+="<td>"+`$${result[i].orderPrice}`+"</td>";
                    body+="<td>"+document.getElementById("ownerDropdown").innerHTML+"</td>";

                    body+="</tr>";
                }
            }
        }



        $("#tbody").html(body);
    }});


    $(document).on("click",".option",(e)=>{
        let option=$(e.target).text();
        console.log(option);
        let target = ($(e.target).parent().parent().parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().text());
        if(option=="Accept order"){
            console.log(target);
            
            $.ajax({
                url:`/api/orders/acceptOrder/${target}`,
                type:'PUT',
                success:function(){
                    location.reload();
                },
                error:()=>{
                    location.reload();
                }
            });
        }

        else if(option=="Notify pickup"){
            console.log(target);
            
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
            console.log("reguhoigre")
            console.log(target);

            $.ajax({
                url:`/api/orders/cancelOrder/${target}`,
                type:'DELETE',
                success:function(){
                    location.reload();
                },
                error:function(err){
                    location.reload();
                    console.log(err);
                }
            })

        }

        else if(option=="Order delivered"){
            console.log("order delivered")
            $.ajax({
                url:`/api/orders/orderDelivered/${target}`,
                type:'PUT',
                success:function(){
                    location.reload();
                },
                error:function(err){
                    location.reload();
                    console.log(err);
                }
            })
        }

        else if(option=="Rate service"){
            console.log("rating service");
            $.ajax({
                url:`/api/orders/rateOrder/${target}`,
                type:'PUT',
                success:function(res){
                    $("#containID").val(`${target}`);
                    $( "#dialog" ).dialog( "open" );
                    //location.reload();
                },
                error:function(err){
                    location.reload();
                    console.log(err);
                }
            });
        }

    });

