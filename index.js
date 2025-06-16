// made a variable for the api so that i can use it easier when coding
const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-PT/events";

// made an object that holds the parties array and selected party.
const state = {
  partyList: [],
  pickOneParty: null,
};

// made an asyc function that fetches the parties array to be used for later
async function fetchParties() {
  try {
    const response = await fetch(`${API}`);
    const result = await response.json();
    state.partyList = result.data;
    render();
  } catch (error) {
    console.error("did not fetch party list", error);
  }
}

// made async function to be able to fetch the selected party by id and used later
async function fetchPartyById(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    state.pickOneParty = result.data;
    render();
  } catch (error) {
    console.error("could not retrieve single party", error);
  }
}

//update. i understand that this defines what is inside the app div. and when we call render the app.innerHTML will clear this data so we can use it over and over.
const app = document.getElementById("app");

function render() {
  app.innerHTML = ""; //this should clear the inside of the 'app' div. I think because it defines app as an empty string as soon as render is called?

  //container
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.gap = "30px";

  // left list

  const partyList = document.createElement("div");
  partyList.style.flex = "1";

  if (state.pickOneParty) {
    renderSingleParty(state.pickOneParty); // this calls a function that makes all this visual in the browser.
    return;
  }

  const instructions = document.createElement("p");
  instructions.textContent =
    "Click on the party that you wish to know more about.";
  app.appendChild(instructions);

  for (let party of state.partyList) {
    // this will go through each party in the array/list and create a new div/thing that says the name of the party in the h3 heading. also adds to the app element i think???
    const partyCard = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = party.name;
    // makes the party name a button and when you click it the date is shown.
    name.addEventListener("click", () => {
      fetchPartyById(party.id);
    });

    partyCard.appendChild(name);
    partyList.appendChild(partyCard);
  }

  //party information
  const partyInfo = document.createElement("div");
  partyInfo.style.flex = "1";
  partyInfo.id = "party-info";

  container.appendChild(partyList);
  container.appendChild(partyInfo);
  app.appendChild(container);
}

// this function should make all the stuff i want to be shown in the browser. hopefully.
function renderSingleParty(party) {
  app.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = party.name;

  const date = document.createElement("p");
  date.textContent = `Date: ${new Date(party.date).toLocaleString()}`; // this SHOULD turn the raw date data into something readable. hopefully. I am not entirely sure.

  const id = document.createElement("p");
  id.textContent = `ID: ${party.id}`;

  const location = document.createElement("p");
  location.textContent = `Location: ${party.location}`;

  const description = document.createElement("p");
  description.textContent = `Description: ${party.description}`;

  //testing to see how toLocaleString works on date. had to move inside of function because call was not working.
  // it didn't work with console log figure that out later
  //console.log("Raw date from API:", party.date);
  //console.log("formatted:", new Date(party.date).toLocaleString());

  app.appendChild(title);
  app.appendChild(date);
  app.appendChild(id);
  app.appendChild(location);
  app.appendChild(description);
}
// triggers fetch
fetchParties();
//testing to see how toLocaleString works on date
//console.log("Raw date from API:", party.date);
//console.log("formatted:", new Date(party.date).toLocaleString());
