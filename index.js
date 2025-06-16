
// made a variable for the api so that i can use it easier when coding
const API = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-PT/events';

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
async function fetchParyById(id) {
    try {
        const response = await fetch(`${API}/${id}`)
    }
}



const app = document.getElementById('app');