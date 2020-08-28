# laundryApp
 
 A Web Application using node.js following the MVC design pattern


**Technologies used**:


* Node.JS
* MySql
* Handlebars.JS
* Bootstrap


**Main Features**:
* Login and register accounts for a laundromat owner and non laundromat owner
* CRUD operations for user information and order statuses
* Search for registered laundromats with a zipcode



**Features for non laundromat owners**:
* Cancel the order (Has to be done before the laundromat owner accepts it)
* Rate the order after laundromat owner clicks "Order delivered"


**Features for laundromat owners**:
* Accept or cancel an incoming order  (note:Once order is accepted it can not be canceled)
* Once order is accepted, owner can click "Pick Up Order" and input a delivery time and price of the order
* After successful delivery, owner clicks "Order delivered". The order will then be removed from /myorders
* Usage of Google places API to help laundromat owners register for their account
