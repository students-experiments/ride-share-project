# General Security Measures
### Security Analysis (OWASP):
Big issues being tackled taken from: https://owasp.org/www-project-top-ten/

* Injection  
  - An attacker may want to:   
        - Modify a driver or rider’s information 
        - Delete or overwrite personal info  
        - Delete or overwrite a database/table  
        - Modify a driver or rider’s information 
* Broken Authentication 
  - An attacker may want to:   
        - Gain access to accounts
        - Brute force potentially weak passwords   
        - Gain admin privileges  
        - Check if passwords are hidden  
* Sensitive Data Exposure 
  - An attacker may want to:   
        - Check faults in system architecture
        - Check known API vulnerabilities   
        - Check if API keys were stored properly 
        - Check if passwords are encrypted  
* Security Misconfiguration 
  - An attacker may want to:   
        - Check for verbose error messages for sensitive data
        - Check for misconfigured http headers
        - Check if configs are updated
* Cross-Site Scripting XSS
  - An attacker may want to:   
        - Check if input data is being sanitized
        - Check if scripts can be integrated to manipulate session     


## Best practices (security-wise) for the assignment to be on the defensive:  
* Linter to enforce code structure and avoid unneeded visual complexity 
* Make sure the environments are following the same configurations  
* Database input sanitation to prevent injection attacks such as SQLi  
* Check the input before sending to the database for odd input  
* Close the database access right after the CRUD operation is performed  
* Keep the logic flow simple to minimize semantic errors  
* Clever solutions usually add confusion; KISS  
* Hide/encrypt passwords and keys to prevent breaches
  * Firebase is not HIPAA complient, so breaches deemed to be possible. More encryption needed.
  
# Security Measures for Project-Specific Issues

* Geolocation
  - An attacker may want to:   
        - Gather information on user's locations 
        - Make drivers appear to take an alternate path
        - Make riders location change 
        - Alter estimated time arrival 
        - Nullify a driver or rider's transit request

* FirebaseAuth/Firestore 
  - An attacker may want to:   
        - Steal account information
        - Erase information 
        - Find API keys
        - Add wrong/corrupted data

* Front-end React 
  - An attacker may want to:   
        - Inject javascript files where possible
        - Try to register a driver as a rider 
        - Try to register a rider as a driver
        - End sessions abrutly to cause data leaks
   
   
## Best Practices (security-wise) for the project in specific would be:
* Geolocation
  - Vet geolocation service providers for vulnerability possibilities
  - Use Firebase Authentication to ensure encrypted data transfers
  - Have rider and driver map functionalities restricted by user credentials 

* FirebaseAuth/Firestore:
  - Use the authentification functionalities in Firebase to create secure database snapshots
  - Ensure firestore documents to not store sensitive information in fields 
  - Use Firebase authentication to keep track of user sessions  
  - Have API keys encrypted and off the project file directories
  
* Front-end React
  - Sanitize data inputs from text fields
  - Only support more recent versions of tool kits and APIs
  
