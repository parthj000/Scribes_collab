function person(name, age) {
  this.name = name;
  this.age = age;
  this.func = () => {
    console.log("working  " + this.name + this.age);
  };
}

const personOne = new person("parth", 18);
console.log(personOne.name);
console.log(personOne.age);
personOne.func();

const personTwo = new person("deepak", 25);
console.log(personTwo.name);

const authErr = new Error("Warning: You are not authenticated to do that ");
const moralErr = new Error("Warning : You have no moral");

function devide(num1, num2, authToken) {
  if (num2 == 0) throw moralErr;
  else if (authToken == null || authToken != "1") throw authErr;

  return num1 / num2;
}
try {
  const calc = devide(2, 5, 0);
  console.log(calc);
} catch (error) {
  console.log(error.message);
  //name , stack, message
}
