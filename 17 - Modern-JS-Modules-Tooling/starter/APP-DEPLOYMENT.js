/* 

------------------------------------------------------ MODERN JAVASCRIPT DEVELOPMENT --------------------------------------------------------------

When building a real-web application, we don't put all of our code into one single file. We spread them out into `modules`, relevant to each functionality to the application or website. 

npm `node package manager` is both a repository and the software that we use to install npm packaeges. Contains open-source code.

When we deploy our real application, it's sent to the build process through the browser, which goes through 1.) Bundling process - which joins all of the modules into one singular file, compacts it and makes it easier for the browser to handle. 2.) Transpiling/ polyfilling - Converts all modern JS back to ES5 features and syntax, so that older browsers can understand code without breaking. This is done using BABEL.

After these two steps, we end up with our file bundle - ready to be deployed on a server for production.

Webpack or parcel are the JAVASCRIPT BUNDLERS used for deploying our file bundle to the website.

Webpack must be configured, parcel is an out of the box bundler that works immediately.

--------------------------------------------------------------------- MODULESS --------------------------------------------------------------------
-
A module is a reuseable piece of code that encapsulates implementation details of a certain part of our project. - Usually a standalone file, but doesn't have to be.

We can import or export functions, variables from one javascript file to another. Whatever we export from a module is called the public API.

When we import code from one module to another, the imported code is called the dependency because the existing code cannot work without that imported code. - TRUE FOR ALL PROGRAMMING

Modules act as building blocks. We use all of these modules together to make one application, ane import and export these files to our other modules so that we can use functions and variables that we may need on other modules and parts of the code. 

This way, engineers can work on a single part of the code or functionality of the website without having to worry about the other parts of the code or program at all. 

Modules make it easy to abstract our code and implement low level code in modules to export them and use them on other parts of the program. 

Modules naturally organize code by splitting up all of the implementation into multiple different files easier to understand.

There are modern ES6 MODULES and there are script.js files. They are different!

Modules: 
1.) Top-level variables are scoped to the module. Meaning variables are private to the module by default. One module can only access variables from another module by exportation. 
2.) Always in `strict-mode`
3.) Top-level this - Undefined
4.) Import / Export - YES

Imports and exports can only happen at the top-level. All imports are always hoisted.

HTML LINKING - <script type="module">

Scripts: 
1.) Top-level variables are scoped globally and can be accessed from multiple scripts.
2.) `SLoppy mode`
3.) Top-level this - Window
4.) Import / Export - NO

Module are downloaded and executed before the destination file.

When Importing modules, the code in the exporting module is always read and executed first. AND IT IS EXECUTED RIGHT AWAY

Write export in front of any varaiable or function you would like to export

Then you must import that variable or method as well. You must do import './shoppingCart.js' from 

Default exports are used when we only want to export one thing in a module. It works with the syntax 'export default (value itself)'

import add from './shoppingCart.js'; - This is the syntax to import default values from another module. We can give it any name we would like, since we are only exporting the value itself.

The preferred method of exporting it to use one default export per module ana export that by itself. 

Exports and Imports are live connections, so an addition or removal or change to one array or object in a module that is exporting, will also show in the importing module with the live results.

--------------------------------------------------------- TOP LEVEL AWAIT ---------------------------------------------------------------------

SCRIPT TYPE MUST BE A MODULE!!!!

Await in a module outside of an async function will block execution. 

The .at() method allows you to grab ANY ITEM AT ANY INDEX IN AN ARRAY

---------------------------------------------------------- The Module Pattern --------------------------------------------------------------

The module pattern is a method for sending and receiving imports and exports. It is done by creating a IIFE and declaring variables and/or methods and then returning those variables and methods from the function inside of an object. Then we must in order to save this data and be able to use it externally, we must save this IIFE to a variable.

If we don't return a variable from the function, then it will be undefined since it's declared in the functions scope.

There are also other modules used by developers before ES6 modules. One being CommonJS

Just like ES6, CommonJS with one file is one module.



------------------------------------------------------------ NPM -------------------------------------------------------------------------------


In order to use NPM in a project, we need to initialize it in the folder first by using the CMD command `npm init`. 

npm init will create a package.json file within your folder. 

npm init will ask you multiple questions regarding your package.json folder. 

When we install another package such as leaflet to this same file directory, the package.json file will update with leaflet as a dependency. This file alows 

YOU MUST have a package.json file before you can install any type of dependency packages. The package.json file is used by the npm CLI to identify your project and understand how to work with it and handle dependencies, run scripts, install scripts, install packages, publish to NPM registry. Must have one in order to deploy your website to the internet.

When we install a package, a folder called 'node moduless' is created, which is where all the packages we install in this particular project will be installed.

In order to use a package like leaflet, we would have to install a package bundler because leaflet uses CommonJS

A very useful JS library is lodash, which has a TON of functions for arrays, dates, numbers, everything you can think of. 

When you are trying to send your project file to another computer or another developer, you NEVER INCLUDE the node modules folder, there can be thousands of files in there that will take up a lot of space, as these files are already on npm.

When you need these dependencies in another location or another file, npm will look into your package.json folder and you can do npm i and it will install all of the dependencies required to run your project.


------------------------------------------------------------------------ PARCEL --------------------------------------------------------------------

parcel is a dev dependency.

To install parcel, we have to do `npx parcel (file)` we pass in the entry point, which would be index.html because that's where we include our script link and location.

When we use parcel, it no longer uses modules but it uses scripts, so if we have the script type="module" it wil throw an error.

The folder created by parcel called `dist` will be the one that we send for production. 

Parcel will also create a new live server in which will update the same as before. Any updates will be instantly parced and resaved as this new folder.

The following code: if (module.hot) {
  module.hot.accept();
}

Will make it so when you update your code, it will still get injected into the browser without triggering a whole page reload 

We can make custom scripts within the package.json file to shortcut actions we would like to preform

Use `npm run start` to start our live server for parcel and to build a new package. 

PARCEL USES BABEL TO TRANSPILE OUR CODE TO ES5

USe 'npm run build' to build/transpile your code.

npm i will install all dependencies listed in the package.json folder. 

With a transpiler, only syntax can be converted to ES5 syntax. Not new functions or capabilities.

polyfilling is what happens when code can't be transpiled, then we polyfill it, which is when we convert methods or functions to functions that are understandable by ES5 syntax.

 In order to polyfill async functions, we use the regenerator runtime npm package.


 ---------------------------------------------------------- HOW TO WRITE MODERN AND CLEAN CODE -----------------------------------------------------

1.) Write readable code ( so others can understand )
2.) Avoid writing too clever or overcomplicated code.
3.) Use descriptive names for variables for functions and variables.
4.) Use the DRY principle
5.) Don't pollute the global namespace, encapsulate data into functions, classes, or modules.
5.) Use strong type checks `!==` and `===`

------------------------------------------------------------------- WRITING FUNCTIONS --------------------------------------------------------------


1.) Generally, functions should only do ONE THING. Or one processm rather than having one single function handle multiple processes.
2.) Don't use more than 3 parameters in a function and use default parameters whenever possible.
3.) Generally, return the same data type as you receive. If you use numebrs as an input, you probably want to return numbers.
4.) Use arrow functions whenever they make the code more readable.


-------------------------------------------------------------- OBJECT ORIENTED PROGRAMMING ---------------------------------------------------------

1.) Use ES6 classes.
2.) Encapsulate any data, so it isn't accessible from outside the class, unless it needs to be. If you need to access these methods and properties, use helper functions to change this data internally.
3.) Implement method chaining when using classes.
4.) DO NOT use arrow functions as methods inside of regular objects.


----------------------------------------------------------------- AVOIDING NESTED CODE -------------------------------------------------------------

1.) Use early return (guard clause)
2.) Use ternary (conditional) or logical operators instead of if()
3.) Use multiple if statements instead of if else statements.
4.) Avoid for loops and use array methods instead.
5.) Avoid callback-based asynchronous APIs

------------------------------------------------------------------- ASYNCHRONOUS CODE --------------------------------------------------------------

1.) Consume promises with async/await for best readability
2.) Whenever possible, run promises in parallel. 
3.) Hande errors and promise rejections.

------------------------------------------------------------------- GENERAL NOTES ------------------------------------------------------------------

Get used to using the nullish coalescing operating. It takes two expressions and return the right operand if the left if undefined or null

Emojis count as two characters when slicing them from a string.


--------------------------------------------------------------- IMPERATIVE vs DECLARTATIVE ---------------------------------------------------------

IMPERATIVE 
1.) Write out step by step what the computer needs to do, e.g a for(let i = 0; i < arr.length; i++) loop, we tell it exactly what to do.

DECLARATIVE
1.) We tell the computer 'what to do' and it knows how to 'polyfill' the abstracted steps.
2.) We tell the computer the way it should achieve the end result.

---------------------------------------------------------------- FUNCTIONAL PROGRAMMING ------------------------------------------------------------

1.) Functional programming is a declarative sub-paradigm that is based on the idea of writing software by combining many pure functions, avoiding side effects and mutating data. (ES6 Syntax) 

2.) SIDE EFFECTS within functional programming are modifications or mutations of any data outside of the function in which the code is ran. (changing variable states, logging to the console, writing to the DOM etc.)

3.) PURE FUNCTION is a function that does not give off any side effects and does not depend on external variables. If given the same inputs, it always returns the same outputs.

4.) IMMUTABILITY state or data is NEVER modified. Instead, the state is copied and mutated and returned. Immunability makes it much easier to write and understand your program without having to jump all over the code looking for variables and functions.

5.) IMPURE FUNCTION is one that manipulates any outside data or doesn't strictly return a value.

- Try to avoid data mutations outside of functions.
- Use built-in methods that don't produce side effects. 
- Do data transformations with methods such as .map(), .filter(), and .reduce()
- Try to avoid side effects in functions as much as possible.

DECLARATIVE SYNTAX 

1.) Use array and object destrcturing whenever possible. 
2.) Use the spread (...) operator
3.) Use the ternary (conditional) operator
4.) Use template literals.

- We can do Object.freeze({object}) to make an object immutable, this also works on arrays as well. 
- Object.freeze() only freezes the first level, it does not freeze deeper than the first level of an object. Nested objects will not be changed.

- When practicing functional programming, in order to avoid mutation, we sometimes need to pass objects from one function call to the next function call, in the real world we would use 'composing' and create one function in order to complete all of these tasks.

- When we say in functional programming that we have to make functions self dependent, we still have to at least pass the data in, we just can't alter that data without mutating it internally.

- Whatever is returned from the map() callback, will be the element in the same position of the new array

- When practicing FP, creating and mutating variables inside of a function still goes againsnt the immutability rule. In FP, you should NEVER see the `let` variable

- DON'T FORGET THAT WE CAN MAP ITEMS TO AN ARRAY AND JOIN THOSE ITEMS IN THAT ARRAY WITH A SEPERATOR STRING!!

- Of course any program has to have side effects, otherwise it literally wouldn't do anything. The goal is to push these side effects to the end of the project so that we don't pollute and manipulate code throughout.
*/
