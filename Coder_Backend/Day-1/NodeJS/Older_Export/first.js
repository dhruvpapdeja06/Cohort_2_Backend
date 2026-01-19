
// CJS --> common JS module

// By default all the code comes as private
const sum = require("../second")

// If I want to call the function that is present in other lang

sum(3,3);


// When we write the require (IIFE) --> Immediately invoke function second.file wrap inside one function , IIFE call immediately

// (function (){

//     console.log("Hello from the second file");


//     function sum(a,b){
//         console.log(a + b);
//     }

//     sum(4,6);
// })()



// function sum(a,b){
//     console.log(a + b);
// }
// console.log(sum(4,9)); //sum is not defined(Reference Error)





// I need code from the second.js file(dependency) to run the first.js file code (like import , export)

console.log("Hy from the first file");