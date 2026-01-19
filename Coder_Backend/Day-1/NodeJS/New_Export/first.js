import sum from './second.js'

// 1. First solution to rename the file extension with .mjs

console.log("First come from the New export ")

// In React import export work without change the extension because there everything is handle by bundler, we don't have to manage all the things

// In commonJs it will thrown an error --> If we use it here require work properly


//  By defualt NodeJs support the require method(CJS module)

// New Type Module (MJS) -- > import,export 
// In package.json file mention type : module if want to use without change the extension.
