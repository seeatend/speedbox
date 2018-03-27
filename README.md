# Speedbox Dashboard client side development

## Folder Structure
-----------------------------------
```
├── app
│   ├── components
│   │   ├── Header
│   │   │   ├── index.js
│   │   │   ├── style.css
│   │   ├── Footer
│   │   │   ├── index.js
│   │   │   ├── style.css
│   │   ├── Other Components...
│   │   .
│   │   .
│   ├── constants
│   │   └── AppConstants.js
│   │   └── Tables.js
│   ├── core
│   │   └── actions
│   │   └── reducers
│   │   └── store.js
│   ├── pages
│   │  	├── admin
│   │   │   ├── bills
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── customers
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── orders
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── rates
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── stats
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   ├── app
│   │   │   ├── login  
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── about
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   ├── customer
│   │   │   ├── bills
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── customers
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── orders
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── placeOrders
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   │   │   ├── stats
│   │   │   │	├── index.js
│   │   │   │	├── style.css
│   ├── utils
│   │	├── dateUtil.js
│   │	├── errorHandler.js
│   │	├── serviceUtils.js
│   │	├── stringAndValidationUtil.js
│   ├── index.js
│   ├── routes.js
├── public
│   ├── css/style.css
│   ├── images/
│   ├── js/bundle.js
│   └── index.html
├── .babelrc
├── .gitignore
├── .README.md
├── .package.json
├── .webpack.config.js

```

The above gives a basic overview of folder structure which we are going to follow, a basic details about each one of them is being explained below:

### app
-----------------
This folder is going to contain all the client-side react and redux related logic along with the components, routes, services, actions and reducers which are to be used for our frontend rendering and for connecting frontend to server api's.
The app folder in itself is going to contain some subfolders:

#### components
This will explicitly going to contain only the sub-components in which props will be passed. This will mainly be *dummy components/ child components*.

#### constants
The folder will contain all the constants files and variables that are static to our project. All the action types can be initialized here and other headings and all.

#### core
This is important folder. All the business logic will be here only.
The core folder in itself is going to contain all the actions and reducers here, and store.js file.
Actions of particular role must be defined in the corresponding role_related folder, for ex: actions related to admin will be there in admin folder and there reducers will be there in reducers/admin folder.

#### pages
This will have all the *parent component/main component* in a folder like structure. The routes will initially render this components. Components related to admin will be present in admin folder itself.

#### utils
This are the common utilities which will can be used in any other component.
It's like a *helper or common functions* we use.

### public
------------------
This is going to contain all the public resources that we'll be needing, basically the css, images, js and build js codes.
It has the main file index.html

### __tests__
-----------------
This is where we will be defining our test cases and write them accordingly.

For starting up with the project, the following dependencies needs to be met:
 1. Node.js
 2. Webpack globally

The following steps needs to be followed in order to start the server:

 1. Clone the repository
 2. Navigate into the project directory
 3. Use the command `npm start`

Upon successful starting one should see the following message up in the console at last line:
```
webpack: Compiled successfully.
```
In case you need to specify the environment then one should pass in the environment variable as follows:
```
npm build
NODE_ENV=production PORT=3004 npm start
```
The above should run the app in production mode on a port 3004.

## Contribution Guidelines
-----------------------------------
While contributing to the project the following points needs to kept in mind:

 1. Create a branch named after the feature that you are currently developing, so if you are adding authentication system then you should create a branch named `authentication` or whatever suits best for you. You can use the command `git checkout -b "feature_<branch_name>_<your_firstname>"` this should create the new branch and also switch it over to your one.
 If your fixing a bug the branch should have name like- `git checkout -b "fix<branch_name>_<your_firstname>"`
 2. Always pull in the latest code before developing in order to avoid merge conflicts. Merge conflicts should be avoided as much as possible.
 3. After developing your feature please create a pull request, describing in brief what all changes has been made for that particular pull request.
 4. **DO NOT MERGE THE CODE TO MASTER OR TEST BRANCH**. One should not merge the code to master branch without the code being reviewed and tested properly. The code should be merged only after code has been reviewed thoroughly by everyone and the merge should be done by the project moderators.
 5. All commits should have reference to issues on GitLab. In case you have made a change that you felt necessary and there is no existing issue up on GitLab for that, you should create an issue describing in brief what it is concerned with and refer the issue number in your commit message.
 6. Commit messages should be as appropriate as possible describing the changes in short. For example commit messages should not be like: "orders.js added" it should have a proper message describing exactly what has been added in orders.js and what purpose it solves. Check https://chris.beams.io/posts/git-commit/ this article to read more about good commit messages.
 7. The issues that are raised on GitLab should not be closed. It should only be closed by project moderators upon completion and proper testing. Once you are done with an issue add the label `Ready to Test` to the issue and refer the same in your pull request. 
 8. Make sure eslint is set up properly and your code is linted properly before you make a push.
