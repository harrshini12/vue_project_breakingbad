<template>
  <div>
    <div
      class="grid gap-10 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <div v-for="character in characterList" :key="character.char_id">
        <CharacterCard @CharacterSelected="cardSelected" :character="character"/>
      </div>
    </div>
  </div>
</template>

<script>

import CharacterCard from '../components/CharacterCard.vue'

export default {
  name: 'CharacterCardContainer',
  components: {
    CharacterCard,
  },

  data() {
    return {
      characterList: [],
      selectedCharacter: 0
    }
  },

  methods: {
      cardSelected(character_id) {
        console.log("cardSelected", character_id);
        this.$emit('CharacterSelected',character_id);
      }
  },

  async mounted() {

    // load the list of characters
    
    const { data, error } = await to(getCharacterList());
    if (!error) {
      this.characterList = data;
    }

  }

}


// ----------- this code is here to simplify combining components by making each component independent -----------------
// In a real app this code should be imported from a single file that is handling all the communication with the backend

const url = "https://www.breakingbadapi.com/api/"

export function getCharacterList() {

    return fetch(url + "characters");

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
