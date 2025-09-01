// for making UI of the dev tinder, we use react+vite
// React + Vite simply means using React (a frontend library) together with Vite 
// (a build tool / bundler) to create fast, modern web applications.

// Here’s the breakdown:

// 🔹 React

// A JavaScript library for building UI components.

// Lets you create single-page applications (SPAs).

// Uses concepts like components, props, state, hooks, and virtual DOM.

// 🔹 Vite

// A next-generation frontend build tool made by the creator of Vue.js.

// Works as a faster alternative to Webpack, CRA (Create React App), and Parcel.

// Provides:

// ⚡ Super fast development server (starts instantly, no long waits).

// 📦 Optimized production build (uses Rollup under the hood).

// 🛠️ Hot Module Replacement (HMR) (changes show instantly in the browser without reloading).

// 🚀 Lightweight and easy configuration.

// 🔹 React + Vite Together

// When you combine them:

// React provides the UI framework.

// Vite provides the development and build tooling.

// 👉 Developers often use Vite instead of Create React App (CRA) because it’s much faster and more modern.

// A bundler is a tool that takes all the different files in your project (JavaScript, CSS, images, etc.)
//  and combines them into optimized files that browsers can understand and load efficiently.

// when we make an api call from x domain to y domain then it gives CORS (Cross-Origin Resource Sharing) error
// to iske liye hame api side se handle krna padega

// if our api is not https then axios doesnt allows it to set token value in cookies 

// we can set origin and credentials in cors like below, so by setting origin:"http://localhost:3000" or
// origin: ["http://localhost:3000", "https://myapp.com"]
// we are providing the origin(domain) ,which is allowed only to make api call on that api and other domin
// are blocked for making api call on this api

// credentials in CORS

// Purpose: Controls whether cookies, authorization headers, or TLS client certificates are sent in cross-origin requests.

// Why needed:
// By default, browsers do not send credentials in cross-origin requests for security.
// You must explicitly enable this if your app needs cookies or JWT tokens in Authorization headers.
// and by setting credential:true.....we are allowing frontend to send jwt token provided by this api to
// another api call for authentication purpose
// for allowing to send jwt token we need to set credential:true and if we have set credential:true then 
// we must specify domain ,we cant open our api to allow request from any domain
// agr hamne credential:true nhi set kiya hai to agr ham fronted se koi api call me agr credential:
// "include" bhi kr denge to bhi jwt token nhi jawega ,as we know ki jwt token ko bhejne ke liye hame api 
// me credential:'include' set krna padta hai...like below
// fetch("http://localhost:5000/api/user", {
//   credentials: "include"
// });


// in strict mode all the APIs are called twice in devMode but in production it will make only 
// one api call 


