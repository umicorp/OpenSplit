# Getting Started 

This projects goal is:

* Feature parity with Splitwise, a popular expense tracking app.
* Deployable with docker for local/self-hosting


Checkout `unraid-compose.yaml` as an example of how to run this app in your local environment.
I find this app works well when you bookmark the app to your mobile phone's homepage. Since this is a progressive web app,
it acts like a native app rather than a site when bookmarked to your home screen. 
I've only tested this on IOS. Android testing and feedback welcome!

A word of **caution**, this app is **should not** be exposed to the internet. At least for now.

# Features

* Local Users
* Add expenses to groups
* Settle up expenses, IE reset the expense counter

## Limitations 

* Right now all expenses are split evenly by the number of users in a group.
* No user authentication
* Backend and frontend need to be exposed on the local network

# Development
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Since then the ``npm eject`` command has been run removing the create-a-react-app tooling. 
I plan to migrate it back to another framework for better dependency management in the future.

## Available Scripts

In the project directory, you can run:

## `npm install`

### `npm start`

Runs the client app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

### `nodemon`

Runs the Express backend server in development mode. Set ``NODE_ENV=production`` for a production build

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## Docker image

### Building for release

The CI handles building and pushing the release to GHR. As of now the CI just builds for x86 machines.

To build for arm and test the image locally, use the following script:
```
./release.sh                      
```

### Tagging notes

Find latest image

``docker image ls``

Tag that image

``docker image tag <Latest Image> ghcr.io/umicorp/opensplit:latest``

Push that image, for now just x86
``docker image push ghcr.io/umicorp/opensplit:latest ``

### Debugging 

`` docker run -i -t open_split-1 bash``
