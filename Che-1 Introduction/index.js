console.log("Hello Node JS");

let a = 20, b = 24;

console.log(`${a} + ${b} =  ${a + b}`);
// 45 + 20 = 65

if (a > b) {
    console.log(`${a} is max..`);
} else {
    console.log(`${b} is max..`);
}

(b % 2 === 0) ? console.log(`${b} is even..`) : console.log(`${b} is odd..`);

let num = 20;

for (let i = 1; i <= 10; i++) {
    console.log(`${num} * ${i} = ${num * i}`);
}

let array = [10, 20, 30, 3.14, "Maulik", true];

array.push(55); 
array.push(22);

console.log(array);
console.log(array.length);
