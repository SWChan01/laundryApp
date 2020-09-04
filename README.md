# laundryApp
 
 A Web Application using node.js following the MVC design pattern


**Technologies used**:


* Node.JS
* MySql
* Handlebars.JS
* Bootstrap


**Main Features**:
* Login and register accounts for a laundromat owner and non laundromat owner(the customer)
* CRUD operations for user information and order statuses
* Search for registered laundromats with a zipcode



**Features for non laundromat owners (the customer)**:
* Cancel the order (Has to be done before the laundromat owner accepts it)
* Check the order price and expected delivery date after the laundry is picked up
* Rate the order after laundromat owner clicks "Order delivered"


**Features for laundromat owners**:
* Accept or cancel an incoming order  (note:Once order is accepted it can not be canceled)
* Once order is accepted, owner can click "Pick Up Order" and input a delivery time and price of the order
* After successful delivery, owner clicks "Order delivered".
* Usage of Google places API to help laundromat owners register for their account

**Views** (Desktop):  


Homepage

<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/home.png">        

1.Looking up for laundromats and submitting order


<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/1.png">  

*****

<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/2.png">  

*****

2.The order page of both customer and owner


(Owner's order page) note:delivery time and order price will be unavailable before the laundroamt owner picks up the order
<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/4.png">

*****

(Customer's order page) note:delivery time and order price will be unavailable before the laundroamt owner picks up the order
<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/3.png">

*****


3.The laundromat owner accepts the order and after pickup, price and estimated delivery time is given

(Owner's order page) note: clicking "Pick up" would prompt user for delivery time and order price
<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/5.png">

*****

(Owner's order page) note: delivery time and order price gets updated
<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/6.png">

*****

(Customer's order page) note:delivery time and order price gets updated
<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/7.png">

*****

4.After sucessful delivery, the customer gets to rate the order. After a review is given, the order is complete and gets deleted

(Customer's order page) note:rating order
<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/8.png">

*****

(Customer' order page) note:order gets deleted
<img src="https://github.com/Singwahwah/laundryApp/blob/master/public/images/9.png">

*****



**Things to work on**:
* Better UI for order managements
* Dashboard for laundromat owners to see earnings overtime
* Pricing mechanics needs work (owners can charge however much they want)
