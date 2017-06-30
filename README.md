# sap-odata-light
## Lightweight SAP OData mobile web app examples - plain XHR, no $ajax, no SAPUI5

In this repository I am trying to create **small** and **fast** mobile web apps who access an SAP OData backend and deal with their speciality, like special headers or CSRF tokens. [OData](http://www.odata.org/) is REST based, so you can use plain XHR (no $ajax) requests to deal with it.

For the frontend I have choosen [**Vue.js**](https://vuejs.org/) because it is very easy to understand. I used **[Pure.css](https://purecss.io/)** because it is a small CSS library and their colors looked neat.

## Simple, simple, simple
May goal is to make it as simple as possible - so no fancy libraries with bazillion of dependencies, no build-process - everything happens on the client. 

The things here are more a **Proof-of-Concept** than production ready code. In real life you would not re-invent the wheel (OData libray) - you would use a library. 

[**SAPUI5**](https://sapui5.hana.ondemand.com/) is a great framework with lots of capabilites for enterprise (internationalization, accessiblity, lots of controls, responsiveness) and OData support - but it is also quite big and rather complicated to get started. 

Here I just want to show what is possible with minimal coding to understand the basics. My current app triggers 6 requests and is 42 KB big (including Vue.js and Pure.css for styling).

In terms of JavaScript I have not used the latest features - I don't want to deal with transpiling now - I just want to code, try things out and get things done. I am using XHR, maybe in the feature fetch.

## App screenshot
![Vue.js app with OData](/examples/app-screenshot.png)
