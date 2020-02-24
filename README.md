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
| Siddhanth | Web Programming Novice | |
| Anoop | Web Programming Novice | |
| Kevin | Web Programming Novice | |

## Deliverables for checkpoint 2

Outline in English what the deliverables will be for checkpoint 2. Provide a concise list that is
amenable to being translated into specific tests. Pro-tip: if you write that concise list here, you
should be able to easily translate it into a collection of test suites.

For each specialization, you must list specific checkpoints that are relevant to that particular specialization.

## Deliverables for checkpoint 4

Outline in English what the deliverables will be for checkpoint 4. Reminder that this is not *due*
until checkpoint 2, but failing to plan is planning to fail.

For each specialization, you must list specific checkpoints that are relevant to that particular specialization.

## Deliverables for final project

Outline in English what the deliverables will be for the final checkpoint. This will should be
similar to the **Description** above, but written out as an explicit checklist rather than a human
readable description. Reminder that this is not *due* until checkpoint 4, but failing to plan is
planning to fail.

For each specialization, you must list specific checkpoints that are relevant to that particular specialization.

## Specialization deliverables

For each student/team adding a specialization, name that specialization and describe what
functionality you will be adding.

# Installation

By the time you get to the end of the final project, this section should have a full set of
instructions for how to spin up your app.
