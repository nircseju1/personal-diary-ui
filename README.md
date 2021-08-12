# Getting Started

### Prerequisite  
* IntelliJ IDEA
* Node.js

### Guideline to incorporate project into IntelliJ IDEA  
Steps to follow:

* Navigate "File > New > Project From Existing Sources" path
* Select project folder from local path
* Resolve dependency (if required)

### Install tools by using followings command:
* npm install
* npm install -g @angular/cli (if required)

### Guideline for Build and Deployment Process  
Steps to follow:
* Step-1: Run command "ng build --prod --base-href=/personaldiary-app/ --deploy-url=/personaldiary-app/"

* Step-2: Create a folder named "personaldiary-app" into "webapps" of tomcat directory 

* Step-3: Copy all "files and folder" from project directory "\personal-diary-ui\dist" into tomcat "personaldiary-app" folder 

* Step-4: Build WAR file for back-end application [Note: WAR build process is defined into "README.md" file of back-end application]

* Step-5: Copy WAR file from back-end application and keep into "webapps" of tomcat directory

* Step-6: Rename WAR file as "ROOT.war"

* Step-7: Rund "Tomcat" to complete deployment process

### Access Application from deployed URL
* Step-1: Application URL will look like as follows "http://localhost:8080/personaldiary-app/"

* Step-2: Two users have been added into system. User credentials are as follows:
  1. [User Name # rose, Password  # abc123$]
  2. [User Name # lily, Password  # abc123$]
  
### Application Sample UI  
* Several Sample UIs are kept at "\personal-diary-ui\sample-app-snapshot\" folder  
  
     



