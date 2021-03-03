<template>
  <div>
    <div>
      <div v-for="episode in episodesList" :key="episode.episode_id">
        <div class="m-4 font-bold" @click="episodeSelected(episode.episode_id)">
          Title: {{ episode.title }} No: {{ episode.episode }} season:
          {{ episode.season }}
          <div v-for="name in episode.characters" :key="name">
            <div
              @click.stop="characterSelected(name)"
              class="font-normal text-gray-600"
            >
              {{ name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'EpisodesList',
  components: {
  },

  emits: ['EpisodeSelected', 'CharacterSelected'],

  data() {
    return {
      episodesList: [],
      selectedEpisode: 0
    }
  },

  methods: {

    episodeSelected(episode_id) {
      console.log("episodeSelected", episode_id);
      this.$emit('EpisodeSelected', episode_id);
    },

    async characterSelected(name) {

      console.log("characterSelected", name);
      
      
      // have the name, but need the char_id

      const { data, error } = await to(getCharacterByName(name));
      
      if (error) {
        return;
      }

      if (data.length !== 1) {
        return
      }

      if (!data[0]?.char_id) {
        return;
      }

      this.$emit('CharacterSelected', data[0].char_id);
    },

  },

  async mounted() {

    // load the list of episodes

    const { data, error } = await to(getEpisodeList());
    if (!error) {
      this.episodesList = data;
    }

  }

}


// ----------- this code is here to simplify combining components by making each component independent -----------------
// In a real app this code should be imported from a single file that is handling all the communication with the backend

const url = "https://www.breakingbadapi.com/api/"

export function getEpisodeList() {

  return fetch(url + "episodes");

}


function getCharacterByName(name) {

  console.log("todo: fix name to build correct query string", name)

  return fetch(url + "characters?name=" + name.replaceAll(" ", "+")); // this is not clean code, but works for now

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
