
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
 function app(people){
  let searchResults = [];

  do{

  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      console.log(searchResults);
      break;
    case 'no':
      searchByTraits(people);
      break;
      
    case 'quit':
      return;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people); // restart app
      break;
  }
  if (searchResults.length > 1) {
    alert("Your search contained more then one result. Refine your search please.");
    people = searchResults;
  }
} while (searchResults.length > 1);
   let foundPerson = searchResults[0];
   mainMenu(foundPerson, people);
}
   
 

function searchByTraits(people) {
  let filteredPeople = [];
  do{
  
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      console.log(filteredPeople);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      console.log(filteredPeople);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      console.log(filteredPeople);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      console.log(filteredPeople);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      console.log(filteredPeople);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      console.log(filteredPeople);
      break;
    case "quit":
      return;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
    }  

  if (filteredPeople.length > 1) {
    alert("Your search contained more then one result. Refine your search please.");
    people = filteredPeople;
  }
} while (filteredPeople.length > 1);
   let foundPerson = filteredPeople[0];
   mainMenu(foundPerson, people);
}


function searchByHeight(people) {
  let newArray = [];
  do {
    let userInputHeight = prompt("How tall is this person?");
    newArray = people.filter(function (el) {
      if (el.height.toString() === userInputHeight) {
        return true;
      }
    });
  console.log(newArray);
  if(newArray.length < 1) {
    alert("No results. Please enter a vaild number.")
    }
   } while (newArray.length < 1){
  return newArray;
   }
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");
  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.weight matches userInputWeight
  });
   return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is this persons eye color?");
  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
  });
   return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("Is this person male or female?");
  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
   return newArray;
}

function searchByAge(people) {
  let userInputAge = prompt("How old is this person?");
   age = []; 
   for(i=0; i<people.length; i++){
        
        let dobYear = people[i].dob.slice(people[i].dob.length-4, people[i].dob.length);

            dobYear = new Date(dobYear);
            newDate = new Date();
            year = dobYear.getFullYear() + 1;
            year2 = newDate.getFullYear();

            people[i].age = year2 - year;
    }
   if(data.age == userInputAge) {
    return true;
  }
  
   console.log(age);

  let newArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
  });
   return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is this persons occupation?");
  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });
   return newArray;
}


function mainMenu(person, people){
   if(!person){
    alert("Could not find that individual.");
    return app(people);
  }
   var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
   switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
    searchFamily(person);
    break;
    case "descendants":
    let descendants = searchDescendants(person);
    let descendantsString = "";
    descendants.forEach(function (descendant) {
      descendantsString += descendant.firstName + " " + descendant.lastName + "\n";
    });
    alert(descendantsString);
    break;
    case "restart":
    app(people); 
    break;
    case "quit":
    return; 
    default:
    return mainMenu(person, people); 
  }
}
 function setAge() {
  data.map(function (el) {
    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
    let currentDay = date.getDay();
    let birthString = el.dob;
    let holder = birthString.split("/")
    let birthMonth = holder[0];
    let birthDay = holder[1];
    let birthYearString = holder[2];
    let birthMonthInt = parseInt(birthMonth);
    let birthDayInt = parseInt(birthDay);
    let birthYearInt = parseInt(birthYearString)

    el.age = currentYear - birthYearInt;

    if (birthMonthInt < currentMonth && birthDayInt < currentDay) {
      el.age -= 1;
    }
    else if (birthMonthInt < currentMonth) {
      el.age -= 1;
    }
  })
}
function searchDescendants(person) {
  let results = data.filter(function (el) {
    if (el.parents.includes(person.id)) {
      return true;
    }
  });

  if (results.length == 0) {
    return [];
  } else {
    for (let i = 0; i < results.length; i++) {
      results = results.concat(searchDescendants(results[i]));
    }
    return results;
  }

}


function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  var filteredData = people.filter(function(obj) {
    if(firstName === obj.firstName.toLowerCase() && lastName === obj.lastName.toLowerCase()) {
      return true;
    }
  });
   console.log(filteredData);
   return filteredData;
 }

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}


function displayPerson(person){
  let people = [];
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "age: " + person.age + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  personInfo += "eye color: " + person.eyeColor + "\n";
 


  alert(personInfo);
}
function searchFamily(person) {
  let resultString = "";
  let siblingsResults = [];

  if (person.parents.length > 0) {
    resultString += "Parents:\n";
    parentResults = data.filter(function (el) {
      if (person.parents.includes(el.id)) {
        return true;
      }
    });
    for (let i = 0; i < parentResults.length; i++) {
      resultString += parentResults[i].firstName + " " + parentResults[i].lastName + "\n";
    }
  }
  let tempResults;
  for (let x = 0; x < parentResults.length; x++) {
    tempResults = data.filter(function (el) {
      if (el.parents.includes(parentResults[x].id) && el.id != person.id && !siblingsResults.includes(el)) {
        return true;
      }
    })
    for (let k = 0; k < tempResults.length; k++) {
      siblingsResults.push(tempResults[k]);
    }
  }

  if (siblingsResults.length > 0) {
    resultString += "Siblings:\n"
    for (let h = 0; h < siblingsResults.length; h++) {
      resultString += siblingsResults[h].firstName + " " + siblingsResults[h].lastName + " " + "\n";
    }
  }

  let kidResults = data.filter(function (el) {
    if (el.parents.includes(person.id)) {
      return true;
    }
  })
  if (kidResults.length > 0) {
    resultString += "Kids:\n";
    for (let x = 0; x < kidResults.length; x++) {
      resultString += kidResults[x].firstName + " " + kidResults[x].lastName + "\n";
    }
  }


  alert(resultString);

}
 

function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } 
  while(!response || !callback(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function numbers(input) {
  const numsRegExp = /\d+/;
  return numsRegExp.test(input);
}

// helper function to pass in as default promptFor validation
function chars(input) {
  const charsRegExp = /[A-Za-z]+/;
  return charsRegExp.test(input);
}

function findSpouse(person, people){
  let spouse = people.filter(function (el){
    if(el.id === person.currentSpouse){
      return person.firstName;
    }
  });
    if(spouse.length < 0) {
        spouse = spouse[1].firstName;
      }
    console.log(spouse);
    return spouse;
}





// let family = "";
  // family = people.filter(function (el) {
  //   if(person.id == person.parents) {

      
  //   }
  // });
  



