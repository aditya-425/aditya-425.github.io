let genvalue = <T>(value: T): T => { 
return value; 
}; 
console.log("Generic variable (number):", 
genvalue<Number>(42)); 
console.log("Generic variable (string):", 
genvalue<String>("hello")); 
function genfun<T>(arg: T): T { 
return arg; 
} 
console.log("Generic function (Boolean):", 
genfun<Boolean>(true)); 
console.log("Generic function (array):", 
genvalue<number[]>([1, 2, 3])); 
function genfun_m<A, B>(first: A, second: B): [A, B] { 
return [first, second]; 
} 
console.log("Generic pair:", 
genfun_m<string, number>("Age", 19)); 
interface genc { 
length: number; 
} 
function printLength<T extends genc>(item: T): void { 
console.log("Length is:", item.length); 
} 
printLength("Typescript"); 
printLength([1, 2, 3, 4]);

class Box<T> { 
private _value: T; 
constructor(value: T) { 
this._value = value; 
} 
getValue(): T { 
return this._value; 
} 
} 
const stringBox = new Box<string>("Generic Box"); 
console.log("Box value:", stringBox.getValue()); 