namespace MyMath { 
export function add(a: number, b: number): number { 
return a + b; 
} 
export function multiply(a: number, b: number): number { 
return a * b; 
} } 
// Using the namespace 
const sum = MyMath.add(2, 3); // 5 
const product = MyMath.multiply(4, 5); // 20 
console.log("Sum =", sum); 
console.log("Product =", product); 
// mathModule.ts 
 
 
export function add(a: number, b: number): number { 
return a + b; 
} 
//mathModule.ts 
export function multiply(a: number, b: number): number { 
return a * b; 
} 
// main.ts 
import { add, multiply } from "./mathModule"; 
const sum = add(2, 3); // 5 
const product = multiply(4, 5); // 20 
console.log("Sum =", sum); 
console.log("Product =", product);