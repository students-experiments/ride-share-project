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
1. The rider side of the application should be able to:  
   * Have a front-end that is very simple in looks   
   * Login or register the rider and take them to their respective page 
   * Update the database with a new user with a userID and role (rider or driver) and other basic information
   * Allow a ride request from the rider with geolocation
   * Be assigned to a driver for pickup
   * Update the status of the rider in the database once they join a ride
   * View the information about the driver 
   * View transit information
   * Update the rider's status in the database when the rider gets off
   * Send the rider to the 'request a ride' page once the ride is over
   
2. The driver side of the application should be able to:  
   * Have a front-end that is very simple in looks   
   * Login or register the driver and take them to their respective page 
   * Update the database with a new user with a userID and role (rider or driver) and other basic information
   * Allow the driver to be available for picking up riders
   * Be assigned a rider to pick up
   * Update the amount of room left in the ride when picking up a rider 
   * View basic information about the rider
   * Show the driver the route to take to efficiently drop off the rider
   * Update the driver's status if the driver ends their driving session
   * Sends the driver to the 'available to pickup' page if ending their session
   [Wiki for more imformation](https://github.com/ckanich-classrooms/final-project-create-table-students/wiki/Discusssions)
   
  
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
After cloning the repository:
  - npm install
  - npm install -g firebase-tools

For testing https-based deployment:
  - https://uic-rider.firebaseapp.com
