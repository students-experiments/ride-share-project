## CREATE Table Students Final Project

## Description

For those who have used the UIC’s nighttime riding application, there may have been moments when you were frustrated with the inaccurate time estimates and route planning. The service runs after 11pm and is unreliable for UIC students that are looking out for their safety. Our project’s goal is to tackle the issues that the UIC nighttime ridesharing fails to accomplish. This application will try to implement more efficient and smarter routing algorithms to provide more informative and accurate estimates on time to pickup and dropoff. If the application surpasses the current application in terms of functionality, there will be requests made to UIC to reassess their current implementation.

This project will be utilizing basic CRUD functionalities, geolocation, Google maps API, Firebase, and Docker.

## English-langugage test descriptions: (User -> Driver / Rider)

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
* Account Logout
  - It lets a user logout
  - It doesn’t let you logout if you aren’t logged in
  - It saves the user’s data in the database 
* Transit (user or driver)
  - It checks if the user (or driver) is in transit upon login
  - It checks if the user (or driver) is in transit once a match is made
  - It doesn’t let a user make another request once in transit
  - It shares rides for riders in a given perimeter
* Ending Transit
  - It checks if the user is no longer in the database for users currently in transit
  - It checks if the driver is no longer in the database for drivers currently in transit
  - It sends the driver to the availability page
  - It sends the user back to the request page  

## Authors

| Member | Web dev level | Specialization |
| --- | --- | --- |
| Siddhanth | Web Programming Novice | Cloud database integration with Firebase |
| Anoop | Web Programming Novice | Cloud database integration with Firebase |
| Kevin | Web Programming Novice | Cloud database integration with Firebase |

## Deliverables for checkpoint 2
The UI should be completed with some of the CRUD functionalities in place and asking for a ride. 
* Registration
  - Driver Registration API
  - Rider Registration API
  - List Drivers Registered 
  - List Riders Registered
* Upon starting the application, the user is prompted to login
  - Authenticate Registered Rider
  - Authenticate Registered Driver
  - Redirect to relevant pages for authenticated driver and rider

## Deliverables for checkpoint 4
* Drivers should be able to:
  - Start a ride
  - End ride with confirmation
  - Have transit information
* Riders should be able to:
  - Request one ride with Geo location & other relevant parameters
  - Get assigned to a driver for pickup
  - View transit information 

## Deliverables for final project

* Multiple rides should be shareable
* Algorithm for ride sharing is neesh and simple
* Rider should be able to track driver after making a request
* Enable notification for rider and driver with relevant information

## Specialization deliverables

For each student/team adding a specialization, name that specialization and describe what
functionality you will be adding.

# Installation

*TBD*
