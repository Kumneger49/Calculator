const keypads = document.querySelectorAll(".keypad"),
  input = document.querySelector(".result-box"),
  equalTo = document.querySelector(".equal-to"),
  reset = document.querySelector(".reset"),
  del = document.querySelector(".del"),
  root = document.querySelector(":root"),
  toggler_disk=document.querySelector(".toggler-disk");

toggler_disk.addEventListener('click', handleToggler)

let toggler_index=1;

function handleToggler(){
  
  if(toggler_index===1){
    toggler_disk.classList.toggle('toggler-disk-2');
    root.classList.toggle('root-white-theme');
    toggler_index++;
  }

  else if(toggler_index===2){
    toggler_disk.classList.toggle('toggler-disk-3');
    root.classList.toggle('root-purple-theme')
    toggler_index++;
  }

  else{
    toggler_disk.classList.remove('toggler-disk-2');
    root.classList.remove('root-white-theme');
    toggler_disk.classList.remove('toggler-disk-3');
    root.classList.remove('root-purple-theme')
    toggler_index=1;
  }
}

let value = "";
let operators = ["+", "-", "x", "/"];

keypads.forEach((keypad) => {
  keypad.addEventListener("click", () => handleKeypadClick(keypad));
});

function handleKeypadClick(keypad) {
  value = value.concat(keypad.textContent);
  input.value = value;
}

del.addEventListener("click", () => {
  value = input.value.slice(0, -1);
  input.value = value;
});

equalTo.addEventListener("click", handleEqualTo);

function handleEqualTo() {
  let temporary_operators = [];
  let temporary_variables = [];
  let variable_holder = "";

  for (let i = 0; i < input.value.length; i++) {
    if (operators.includes(value[i])) {
      // var value1 = value.slice(j+1, i);
      temporary_variables.push(variable_holder);
      temporary_operators.push(value[i]);
      variable_holder = "";
      // console.log(value.slice(j + 1, i))

      // for (let j = i + 1; j < input.value.length; j++) {
      //   if (operators.includes(value[j])) {
      //     // var value2 = value.slice(i + 1, j+1);
      //     temporary_variables.push(value.slice(i + 1, j));
      //     temporary_operators.push(value[j]);
      //     console.log(value.slice(i + 1, j))
      //     i = j + 1;
      //   }
      // }
      // calculate(value1, value[i], value2);
    } else {
      variable_holder = variable_holder.concat(value[i]);
    }
  }
  temporary_variables.push(variable_holder);

  value=Modifier(temporary_operators, temporary_variables);
  input.value=value;


  // console.log(
  //   `operators are ${temporary_operators}, and the variables are ${temporary_variables}, and the length of the temporary_variables is ${temporary_variables.length}`
  // );
}

function Modifier(temporary_operators, temporary_variables) {
   while(temporary_operators.includes("x")||temporary_operators.includes('/')) {
    temporary_operators.includes("x")?index=temporary_operators.indexOf("x"):index=temporary_operators.indexOf("/");
    solution = calculate(
      temporary_variables[index],
      temporary_operators[index],
      temporary_variables[index + 1]
    );
    temporary_operators.splice(index, 1);
    temporary_variables.splice(index, 2);
    temporary_variables=[...temporary_variables.slice(0, index), solution, ...temporary_variables.slice(index)]
    console.log(
      `operators are ${temporary_operators}, and the variables are ${temporary_variables}, and the length of the temporary_variables is ${temporary_variables.length}. inside the modifier`
    );

    console.log(`the solution is ${solution}`)
    // temporary_variables=[...temporary_variables.slice(0, index), solution, ...temporary_variables.slice(index)]
    // Modifier(temporary_operators, temporary_variables)
  } 
  
    for (let i = 0; i < temporary_operators.length; i++) {
      console.log(`i am inside the for loop`)
      solution = calculate(
        temporary_variables[0],
        temporary_operators[i],
        temporary_variables[1]
      );
      temporary_variables.splice(0, 2);
      temporary_variables.unshift(solution);

    }
    console.log(
      `operators are ${temporary_operators}, and the variables are ${temporary_variables}, and the length of the temporary_variables is ${temporary_variables.length}. inside the for loop`
    );

    return temporary_variables[0];
  }

// function handleEqual(){
//   var opers=[], variables=[], j=0;

//   for (let i = 0; i < input.value.length; i++) {
//     if (operators.includes(value[i])) {
//       variables.push(value.slice(i-j, i));
//       variables.push(value.slice(j + 1, i));
//       opers.push(value[i])
//       j=i;
//     }
//   }

//   console.log(`variables are ${variables}, the value is ${value} and operators are ${opers}`)
// }

function calculate(operand1, operator, operand2) {
  operand1 = Number(operand1);
  operand2 = Number(operand2);
  switch (operator) {
    case operators[0]:
      return String(operand1 + operand2);
    // input.value = value;
    // break;
    case operators[1]:
      return String(operand1 - operand2);
    // input.value = value;
    // break;
    case operators[2]:
      return String(operand1 * operand2);
    // input.value = value;
    // break;
    case operators[3]:
      return String(operand1 / operand2);
    // input.value = value;
    // break;
    default:
      return null;
  }
}

reset.addEventListener("click", () => {
  input.value = "";
  value = "";
});

 