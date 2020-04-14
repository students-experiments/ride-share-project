
## Report

**What were the different functionalities you aimed to finish for each deadline (checkpoints 2, 3, 4)?**

- Current Functionality of the app:
	- security:
		- added route protection for UI pages: role based.
		- firebase authentication based routing for all pages.
		- email and pass verification on FE. 
	- client side:
		- Integration with create-react-app from just a server rendered FE.
		- Rider and driver register through firebase on client side.
		- auth protected routes for driver landing and rider landing.
		- Role based login based on the firebase auth user.
		- role based routing within the app components.
    	- Server Side:
		- Integration with firebase firestore using admin sdk
		- Exploration of GeoPoint Data type for searching based on lat/long.(partial working)
		- AddUserClaims API: adds role based claims to User
		- AddRide API: addrs rider's request to ride.
		- AddLocation API: adds driver location 
		- GetRide API: Fetches the ride to Rider if there exists an idle dirver.
		- Changing status for drivers and riders based on the activity.
    	-   Who accomplished what
		- TODO this item
    	-   What didn’t get done in time
		- Wanted to finish the FE code for transit between rider and driver.
		- Wanted to complete the transit flow on server side.
		- 
  **What is the plan of attack for finishing Checkpoint 5??** 


 - Finish server side entirely by 1-2 person.
 - Server side needs 3-5 API's for supporting features mentioned.
 - Parallelly add FE pages: 4 pages in total. 
 - 2-3 days for server code to be fully operational.
 - 3-4 days for the FE pages to be added
 - next 2-3 days for tieing up ends on both sides.
 
**What functionality remains to be finished ??** 

- security:
	- Planned to use firebase session keys for auth users. Due to re-architecturing this was lost in server code.
	- the current app has this code in server side, need that to be ported to client side for auth.
	- add protection for remainder of the routes.
	- add user auth for firestore access. ( learned how to do, but havent done for this checkpoint) 
 - Driver:
	- End Transit : ends ride for rider and driver
	- Add UI for Driver pages
	- Allow multiple riders to be grouped
 - Rider:
	- UI pages for Rider pages

**Who will be in charge of finishing what**

 - Anoop: Client Side Components and Pages. (3 UI ) 
 - Kevin: Client Side pages and Server API (1 UI and 2 Server) 
 - Siddanth: Server Side api( 4 API's)

**What changes, if any, do you want to make from your original plan?**

 - Initially wanted to have only a server rendered app.
 - But figured it would help in building a comprehensive UI and API's.
 - wanted to support Multiple riders with a single driver. But that seems slightly far fetched given the remaining items. But will push for it in the next checkpoint.
 - Learning:
	 - Building an entire react app from scratch
	 - Building the UI elements using the Components design architecture.
	 - GCP architecture and tools: firebase, firestore, auth.
	 -  Geo based searching 
 - Way harder than expected:
	 - React components setup
	 - understanding firebase hosting rules
	 - mistake: tried to use React static pages to get render dynamic content. Spent a lot of time trying to understand the right way of doing FE.
	 - Firebase auth SDK: firestore cannot be accessed from FE. needs admin sdk for complete access. 
	 - firebase sessions and auth tokens: initially very  convoluted concepts. but better now.
 - why did we go for react client ?
	 - the initial way of using react hindered the architecture.
	 - It was very difficult to manage user at each step. 
	 - authentication was a major issue. 
    
