var mystring = "2+sqrt(2+2))";
mystring = mystring.replace('sqrt(','/');
mystring = mystring.replace(')','/');
console.log(mystring)

let s = "Hello this is a number [232 + 235]"
let t =  "Hello [-100] this is a number "
let u =  "Hello [-232a] this [121] is a number " // doesn't match 232a


let rx = /\[(-?\d+)\]/

console.log(t.match(rx)[1])
console.log(u.match(rx)[1])

var mystr = ("data-123");
mystr.slice(5,8);
console.log(mystr.slice(5,7))