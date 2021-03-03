<template>
  <div class="container">
    <table class="w-6/6 table-auto">
      <thead class="justify-between">
        <tr class="bg-gray-800">
          <th class="px-16 py-2">
            <span class="text-gray-300">Quote</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray-300">Series</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-gray-200">
        <tr v-for="quote in quotes" :key="quote.id" class="bg-white border-4 border-gray-200"  >
          <td>
            <span class="ml-2 font-semibold text-center">{{quote.quote}}</span>
          </td>
          <td>
            <span class="ml-2 font-semibold text-center">{{quote.series}}</span>
          </td>
        </tr>
      </tbody>
    </table>
 </div>
</template>

<script>

/* CharacterQuotes Component

  Purpose:  lists quotes by the provided character from the tv show "Breaking Bad",
            it watches for changes of the char_it and updates the quotes data from the backend, if needed.

  Requires: the char_id of the character passed in via props.

  Events:   none

*/

export default {
  name: 'CharacterQuotes',

  props: {
    char_id: String,
  },

  data() {
    return {
      quotes: [],
    }
  },

  mounted() {

    this.loadQuotesByCharacterID(this.char_id)

  },

  watch: {

    char_id(new_id, old_id) {
      if (new_id && new_id !== old_id) {
        this.loadQuotesByCharacterID(new_id);
      }
    }
  },

  methods: {

    async loadQuotesByCharacterID(charID) {

      // reset local state
      this.quotes = [];

      // protect the function from invalid input data
      if (!charID) {
        return;
      }

      let name

      // get character data from the backend
      {
        let { data, error } = await to(getCharacterByID(charID));

        if (error) {
          return;
        }

        if (!data[0]?.name) {
          return;
        }

        name = data[0].name;
      }

      // get quotes data from the backend
      {
        const { data, error } = await to(getQuotes(name));

        if (error) {
          return;
        }

        // update the local state 
        this.quotes = data
      }
     
    }
  }
}


// ----------- this code is here to simplify combining components by making each component independent -----------------
// In a real app this code should be imported from a single file that is handling all the communication with the backend

const url = "https://www.breakingbadapi.com/api/"

function getCharacterByID(charID) {

  return fetch(url + "characters/" + charID);

}

function getQuotes(name) {

  console.log("todo: fix name to build correct query string", name)
  
  // return fetch(url + "quote?author=Jesse+Pinkman");

  return fetch(url + "quote?author="+ name.replaceAll(" ", "+")); // this is not clean code, but works for now

}



/*
The 'to' function is a helper function that abstracts away the handling of promises. 
It accepts a promise as an argument, i.e. returned from a call to the fetch api 
and 'thens' down into the json and the data content.
*/

function to(promise) {
  return promise.then(response => response.json())
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }));
}

</script>
