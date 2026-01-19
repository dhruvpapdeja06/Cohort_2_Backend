
console.log("Hello from the second file");

// function add
function sum(a,b){
    console.log(a + b);
}

function sub(a,b){
    console.log(a - b);
}

// single export 
// module.exports = sum;

// Older method to import and export , even mostly it used by people

console.log(module.exports);  //empty obj
// more than one export

// {sum : sum , sub : sub} when key and value is same then we can export it as an obj
// module.exports.sum = sum;
// module.exports.sub = sub;
module.exports = {sum,sub};



// sum(3,9); // here if we call it then it works 