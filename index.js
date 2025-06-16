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

  if (state.pickOneParty) {
    renderSingleParty(state.pickOneParty); // this will call a function to be written that creates the visual part in the browser
    return;
  }

  for (let party of state.partyList) {
    // this will go through each party in the array/list and create a new div/thing that says the name of the party in the h3 heading. also adds to the app element i think???
    const partyCard = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = party.name;

    partyCard.appendChild(name);
    app.appendChild(partyCard);
  }
}

// this function should make all the stuff i want to be shown in the browser. hopefully.
function renderSingleParty() {
  // add this later
}
