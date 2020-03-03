## CREATE Table Students Final Project

## Description

For those who have used the UIC’s nighttime riding application, there may have been moments when you were frustrated with the inaccurate time estimates and route planning. The service runs after 11pm and is unreliable for UIC students that are looking out for their safety. Our project’s goal is to tackle the issues that the UIC nighttime ridesharing fails to accomplish. This application will try to implement more efficient and smarter routing algorithms to provide more informative and accurate estimates on time to pickup and dropoff. If the application surpasses the current application in terms of functionality, there will be requests made to UIC to reassess their current implementation.

This project will be utilizing basic CRUD functionalities, geolocation, Openrouteservice, Firebase, and Docker.

## English-language test descriptions: (User -> Driver / Rider)

* Account Creation
  - It lets a user create an account 
  - It doesn’t let a user create an account with a taken username 
  - It doesn’t let a user create an account with a weak password
  - It doesn’t let a user create an account with an invalid password 
* Account Login
  - It lets a user login to their account
  - It doesn’t let a user login without the right password 
  - It lets a logged in user to update their profile 
  - It doesn’t let a user login while already logged in
  - It checks if a Rider is still in a ride or not
  - It checks if a Driver is still available for requests
* Account Logout
  - It lets a user logout
  - It doesn’t let you logout if you aren’t logged in
  - It checks if the user's current status reflects properly in the database 
* Transit (user or driver)
  - It checks if the user (or driver) is in transit upon login
  - It checks if the user (or driver) is in transit once a match is made
  - It doesn’t let a user make another request once in transit
  - It shares rides for riders in a given perimeter
  - It removes the driver from the available drivers list once thier vehicle capacity is full
  - It adds the driver to the available drivers list once their vehicle is no longer full
* Ending Transit
  - It checks if the user is no longer in the database for users currently in transit
  - It checks if the driver is no longer in the database for drivers currently in transit
  - It sends the driver to the "waiting for riders" page
  - It sends the user back to the request page  
  - It makes sure that the Driver ending one transit with a Rider does not take the Driver out from the available drivers list

## Authors

| Member | Web dev level | Team Specialization |
| --- | --- | --- |
| Siddhanth | Web Programming Novice | Express-React Views Integration |
| Anoop | Web Programming Novice | Cloud database integration with Firebase |
| Kevin | Web Programming Novice | Cloud database integration with Firebase |

## Deliverables for checkpoint 2
The UI should be completed with some of the CRUD functionalities. 
* Registration
  - Register a Driver and Rider
  - List Drivers Registered 
  - List Riders Registered
* Upon starting the application, the user is prompted to login
  - Authenticate Registered Rider
  - Authenticate Registered Driver
  - Redirect to relevant pages for authenticated driver and rider

## Deliverables for checkpoint 4
1. The front end should be able to:   
   * Have a front-end that is very simple in looks   
   * Login a user and take them to their respective page based on their role (rider or driver)    
   * Logout a user and take them to the login page    
   * Register a user and assign them a role (rider or driver) based on their inputs on account creation    
   * Allow a rider to request a ride     
   * Allow a driver to be available to pickup riders that sent out requests    
2. The database should be able to:     
   * Manage authorization of access to rider and driver's accounts
   * Add a rider or driver and assign them a userID along with their designated "roles"   
   * Update the status of a rider when they enter or exit a ride  
   * Update the status of the driver when he is waiting for requests or if ride is full   
   * Delete an account if the user so wishes to delete their account    
3. The backend should be able to:   
   * Create requests to the database for user information     
   * Get information from the database to prepare to be shown to the user  
4. Drivers should be able to:  
   * Start a ride 
   * Have basic information on the rider
   * State how much room they have left 
   * End a ride with confirmation  
   * Have current transit information   
5. Riders should be able to:    
   * Request a ride with geo location
   * Be assigned to a driver for pcikup
   * View transit information
   * Have basic information on the driver
   * Say how many people will be joining the ride
6. The application should be able to: 
   * Start a ride from beginning to end    
   * Have a basic algorithm for picking up and dropping off riders   
   * Show location of the driver in respect to the rider's requested location  
  
## Deliverables for final project

* Multiple rides should be shareable
* Algorithm for ride sharing is logical and simple
* Rider should be able to track driver after making a request
* Enable notification for rider and driver with relevant information

## Specialization deliverables

**Specializations**
  * Cloud:
    - Firebase for database CRUD functionalities and easy integration with other Google services
         
# Installation
*TBD*
No known installations needed for Firebase, Express-React Views to be downloaded/loaded on your computer.
