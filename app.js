
/*
Build all of your functions for displaying and gathering information below (GUI).
*/
 // app is the function called to start the entire application
 function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchByTraits(people);
      break;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people); // restart app
      break;
  }


  // once we get one person,
  // go to mainMenu();
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
    // case "mulitples":
    //   break;
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
    // return true if el.eyecolor matches userInputeyeColor
  });
   return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("Is this person male or female?");
  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
    // return true if el.gender matches userInputGender
  });
   return newArray;
}

function searchByAge(people) {
  let userInputAge = prompt("How old is this person?");
  // need to be changed
   age = []; 
   for(i=0; i<people.length; i++){
        
        let dobYear = people[i].dob.slice(people[i].dob.length-4, people[i].dob.length);

            dobYear = new Date(dobYear);
            newDate = new Date();
            year = dobYear.getFullYear() + 1;
            year2 = newDate.getFullYear();

//  = people[i].dob.push();
            people[i].age = year2 - year;
    }
   if(data.age == userInputAge) {
    return true;
  }
  
   console.log(age);

          //  age = Date.now() - el.dob;
          // for(i=0; i<data.length; i++){
          // dob[i] = people.dob.push("age");

          // };

  let newArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
    // return true if el.weight matches userInputHeight
  });
   return newArray;
}

// function searchByAge(people) {
//   let userInputAge = prompt("How old is this person DD/MM/YYYY?");
//   let today = new Date();
//   let birthDate = new Date(userInputAge);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   let m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 ||  (m === 0 && today.getDate()< birthDate.getDate())) {
//       age--;
//   }
//   return age;

//   let newArray = people.filter(function (el) {
//     if(el.Age == userInputAge) {
//       return true;
//     }
//     // return true if el.age matches userInputAge
//   });
//    return newArray;
// }

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is this persons occupation?");
  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.occupation matches userInputOccupation
  });
   return newArray;
}


 // Menu function to call once you find who you are looking for
function mainMenu(person, people){
   /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
   if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
   var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
   switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
      displayPeople(people)
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
 

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  // var filter = "firstName";
  // var keyword = "lastName";
  var filteredData = people.filter(function(obj) {
    if(firstName === obj.firstName.toLowerCase() && lastName === obj.lastName.toLowerCase()) {
      return true;
    }
  });
   console.log(filteredData);
   return filteredData;
   // TODO: find the person using the name they entered
 }


 // alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}


function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "height:" + person.height + "\n";
  personInfo += "weight:" + person.weight + "\n";
  personInfo += "age:" + person.age + "\n";
  personInfo += "occupation:" + person.occupation + "\n";
  personInfo += "eye color:" + person.eyeColor + "\n";

  alert(personInfo);
  return personInfo;
}
 

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}


 // helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

 // helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
