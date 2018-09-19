
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
      findSpouse(person, people);
    break;
    case "descendants":
      displayPeople(people)
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
  personInfo += "spouse: " + person.spouse + "\n";
  personInfo += "family: " + person.parents + "\n";


  alert(personInfo);
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

function chars(input){
  return true; // default validation only
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

function findFamily(person, people){
  findParents();
  findSpouse();
}



function findParents (people) {
let newArray;
   for(let i=0; i<people.length; i++){
    if(people[i].id == people[i].parents){
      
      person[i].push("family") = newArray;

      return true;
    };
  
    }
// let family = "";
  // family = people.filter(function (el) {
  //   if(person.id == person.parents) {

      
  //   }
  // });
   return newArray;
};


<<<<<<< HEAD
function findFamily(person, people){
  let spouse = people.filter(function (el){
    if(el.id == person.currentSpouse){
      return true;
    }
    console.log(spouse);
    return spouse;
  });
  if(spouse.length < 0) {
    spouse = spouse[0].firstName;
  }
}

=======

// function findParents(person, people){
//   let parents = people.filter(function (el){
//     for(let i=0; i < el.parents.length; i++){
//       if()
      

//         return 
//     }
//   });
>>>>>>> bb0b59bf566757e7e3a3fb5dee653ccc16f837be
