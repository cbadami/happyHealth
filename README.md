# happyHealth

##### This repo is created to implement progressive web app

#### Hosted App link:
- https://cb-test-health-app-dev-test.azurewebsites.net/

## Setup app in local machine
### Prerequisites
Following must be downloaded, installed, and configured according to the product directions:  
1. Node.js (comes with npm)  
1. Git version control system  
1. VS Code light-weight, cross-platform code editor or other IDE  
1. MySQL workbench
### Clone the repo to local machine
```
git clone https://github.com/cbadami/happyHealth.git
```
### Local database Setup
#### Database creation:
- Open latest version of happyhealthScript.sql in Mysql workbench and run script (It creates database and tables in workbench).
#### .env setup:
- Create .env file in root directory
- Copy data from .env-example to .env file
- Enter your Local SQL username and password
### Install dependencies
``` 
npm install
```
```
npm install --dev
```
### To start the app
```
npm start
```
### To run app in development
```
npm run dev
```

### Instructions to merge branch:
- https://stackoverflow.com/questions/26751970/how-to-push-changes-from-one-branch-to-another
## Useful Resources:
- https://expressjs.com/2x/guide.html
- https://www.voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/
### GitHub branch commands:
- https://gist.github.com/nanusdad/7e516743e5e709073f7e
- https://linuxize.com/post/how-to-rename-local-and-remote-git-branch/

## App Design Architecture:

![](https://github.com/annie0sc/gdp_health_app/blob/master/design-architecture/App%20Design%20Architecture.PNG)

## Tasks we did as part of Agile

## Understanding the requirements :

Read RFP, understood and analyzed the requirements clearly to formulate the design of the application. Also we identified
the stakeholders required to implement the project.

## Formulating the design :

Discussed on creating better solution which meets all the client requirements. Also we discussed on tools and technologies to be used which delivers most reliable and cost efficient project.

## Communicating the designed architecture :

We planned to communicate our views to other designed units and ensure that everyone understands the architecture.

## Discussion on Tools and Technologies :

### Express FrameWork:

**Advantages of express FrameWork**

- Minimalistic and fast web framework
- Easy to setup and straightforward to learn
- Great routing API
- Availability of large number of plugins for use
- Offers numerous HTTP utility methods to build dynamic and perceptive APIs  
  Source: https://expressjs.com/

### Connecting to different databases from express framework:

- https://expressjs.com/en/guide/database-integration.html

### Appliation programming interfaces(API's):

- Google Api:https://developers.google.com/identity/sign-in/web/sign-in
- https://www.youtube.com/watch?v=KwOmVpd1DUA
- Facebook Api: https://developers.facebook.com/docs/facebook-login/web/
- Distance Travel Api: https://docs.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-route?redirectedfrom=MSDN
- TravelTime API http://docs.traveltimeplatform.com/reference/time-filter/
- Kintone API: https://developer.kintone.io/hc/en-us/articles/360019245194-Get-Records
- Source: https://gis.stackexchange.com/questions/15199/looking-for-free-web-service-that-calculates-driving-distance-between-2-addresse

### Heroku - Cloud Platform:

**Advantages of Heroku**

- Free dyno: The free cloud instance is not always on, and you’ll have to turn it back on after 30 minutes of inactivity. This limits its functionality to situations like code and app presentations, as its availability can’t be counted on.
- Easy to use: Using Heroku’s sleek user interface, dynos and any other extras can be easily and immediately added. Heroku lets you focus on the actual development, taking most of the infrastructure responsibility off your back.
- Buildpacks: Heroku lets you immediately deploy development environments for PHP, Node.js, Python, and many other languages, pre-configured with all necessary settings and dependencies.
- Add-ons: Many add-ons are available to install on your cloud account, some for free and others for a low monthly cost. Add-ons like Heroku Redis, Timber.io, and Mailgun all offer a free plan.  
  Source: https://www.websiteplanet.com/blog/best-free-cloud-hosting-services/

### Testing Tools:

1. [Cypress](https://www.cypress.io/)

- Advantages of Cypress: https://dzone.com/articles/why-should-you-switch-to-cypress-for-modern-web-te
- https://docs.cypress.io/guides/overview/why-cypress.html#Cypress-ecosystem
- Tech Radar: https://www.thoughtworks.com/radar/tools/cypress

2. [Mochajs](https://mochajs.org/)

### Formatter & Linters:

1. [Prettier](https://prettier.io/)
2. [JSLint](https://jslint.com/)
3. [ESLint](https://eslint.org/)
4. [TypeScript](https://www.typescriptlang.org/)

### Proposed names for Application:

1. Fitryse
2. Fitrilizer
3. Fitnos
4. Athleticor
5. FitGalactica
6. HappyHealth
7. ByeDegrees

## Insights to other team updates:

### Design UI/Themes

#### Introduction to UI/UX Design Proposal

UI / UX is a fast growing field that is quickly expanding across organizations and evolving into the development of new niches. User Experience Design, User Interface Design, Customer Experience, and Product Design all frame the larger landscape of building digital content.

This article is a technical onboarding document that can help you write your own UX Plan. It captures the detailed structure and syntax that we use.

#### Wireframes :

- [Web UI](https://xd.adobe.com/view/1dfb8c5e-6714-428e-6813-ceed7f8de535-6bca/screen/2d4265b0-0c13-4b9d-ba94-4dd6701156f2)

- [Mobile UI](https://xd.adobe.com/view/64cbfb4c-2c05-40eb-5c30-bae44fa3b9d4-12fa/screen/fab92490-6d21-4829-9a52-9728726feba3)

[For more updates](https://github.com/annie0sc/gdp-happy-health/tree/master/Design_UI_and_Themes)

### Design Data

#### Introduction to Design data:

Design data complies with the app requirements to facilitate secure data transactions. You must design this dimension so that it can be rescaled over time as business needs change.

#### ER diagram:

![image](https://github.com/annie0sc/gdp-happy-health/blob/master/Design%20Data/Updated/ER%20diagram/HAPPY_HEALTH_ERD.png)

[For more updates](https://github.com/annie0sc/gdp-happy-health/tree/master/Design%20Data)

### Sprint Planning and Userstories

[For more updates](https://github.com/annie0sc/gdp-happy-health/tree/master/Sprint%20Planning%20and%20UserStories)

## General Queries:

### what back end languages and platforms will you test?

we have decided to use java Script as back end language and the frame work as express.js.

### What formatters (e.g prettier (Links to an external site.)), what linters (e.g. ESLint (Links to an external site.) for JavaScript)?

we gonna use prettier in visual studio and JSLint for javaScript

### what devops tools (e.g. Husky (Links to an external site.) for GitHub) do you want to use?

We can implement the project using continuous integration and development tools like Jenkins for testing and packaging the application.

For building or compiling the project, we can use Maven.

We can deploy the application using Apache TomCat web server, which helps for implementation of the Java Servlet, JavaServer Pages, Java Expression.

### What datastores will you test? Who will try each possible option? You must have at least one industry standard implementation. (Java, C#, or Node on the back-end) - work with data team.

In order to keep up with the current technology pace we should learn and practice with more languages, technologies, libraries and platforms, not to mention the planning, architect, development, deploy and maintain an entire application and the stack it run by the whole project team be planned in making the architecture.

### what devops tools (e.g. Husky (Links to an external site.) for GitHub) do you want to use?

We can implement the project using continuous integration and development tools like Jenkins for testing and packaging the application.

For building or compiling the project, we can use Maven.

We can deploy the application using Apache TomCat web server, which helps for implementation of the Java Servlet, JavaServer Pages, Java Expression.

### What datastores will you test? Who will try each possible option? You must have at least one industry standard implementation. (Java, C#, or Node on the back-end) - work with data team.

In order to keep up with the current technology pace we should learn and practice with more languages, technologies, libraries and platforms, not to mention the planning, architect, development, deploy and maintain an entire application and the stack it run by the whole project team be planned in making the architecture
