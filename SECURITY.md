# Security Analysis

Security evaluation (OWASP):  
An attacker may want to:  
Injection  
Modify a driver or rider’s information  
Delete or overwrite personal info  
Delete or overwrite a database/table  
Broken Authentication  
Gain access to accounts  
Brute force potentially weak passwords   
Gain admin privileges  
Check if passwords are encrypted  
Sensitive Data Exposure  
Check faults in system architecture  
Check API vulnerabilities  
Check if API keys were stored properly  
 
Best Practices security-wise for the assignment:  
Linter to enforce code structure and avoid unneeded visual complexity  
Database input sanitation to prevent injection attacks such as SQLi  
Check the input before sending to the database for odd input  
Close the database access right after the CRUD operation is performed  
Keep the logic flow simple to minimize errors  
Clever solutions usually add confusion; KISS  
Hide/encrypt passwords and keys to prevent breaches  

