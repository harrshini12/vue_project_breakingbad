<template>
  <div class="container">
    <!-- <div>{{ char_id }}</div> -->
    <!-- <div>{{ episodes }}</div> -->
   <table class="w-6/6 table-auto">
      <thead class="justify-between">
        <tr class="bg-gray-800">
          <th class="px-16 py-2">
            <span class="text-gray-300">Episode</span>
          </th>
          <th class="px-15 py-2">
            <span class="text-gray-300">Season</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray-300">Name</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray-300">Series</span>
          </th>
          <th class="px-24 py-2">
            <span class="text-gray-300">Air-Date</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-gray-200">
        <tr v-for="episode in episodes" :key="episode.id" class="bg-white border-4 border-gray-200"  >
          <td>
            <span class="ml-2 font-semibold text-center">{{episode.episode}}</span>
          </td>
          <td>
            <span class="ml-2 font-semibold text-center">{{episode.season}}</span>
          </td>
          <td>
            <span class="ml-2 font-semibold text-center">{{episode.title}}</span>
          </td>
          <td>
            <span class="ml-2 font-semibold text-center">{{episode.series}}</span>
          </td>
          <td class="px-16 py-2"><span>{{ episode.airdate }}</span>
           </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

/* CharacterEpisodes Component

  Purpose:  lists episodes where the provided character appeared in from the tv show "Breaking Bad",
            it watches for changes of the char_it and updates the episode data from the backend, if needed.

  Requires: the char_id of the character passed in via props.

  Events:   none

*/

export default {
  name: 'CharacterEpisodes',

  props: {
    char_id: String,
  },

  data() {
    return {
      all_episodes: [],
      episodes: [],
    }
  },

  mounted() {

    this.loadEpisodesByCharacterID(this.char_id)

  },

  watch: {

    char_id(new_id, old_id) {
      if (new_id && new_id !== old_id) {
        this.loadEpisodesByCharacterID(new_id);
      }
    }
  },

  methods: {

    async loadEpisodesByCharacterID(charID) {

      // reset result
      this.episodes = [];

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

      // get episodes data from the backend
      if (this.all_episodes.length === 0)
      {
        const { data, error } = await to(getEpisodes());

        if (error) {
          return;
        }

        // update the local state - list of all episodes
        this.all_episodes = data

      }

      // here we have the full episodes list:

      // let's filter the character's episodes
      // then shape the data to fit our needs

      // update the local state - episodes with this character
      this.episodes = this.all_episodes
        .filter(episode => episode.characters.includes(name))
        .map(episode => ({
          id: episode.episode_id,
          episode: episode.episode,
          title: episode.title,
          season: episode.season,
          airdate: episode.air_date,
          series: episode.series
        }));

    }
  }
}


// ----------- this code is here to simplify combining components by making each component independent -----------------
// In a real app this code should be imported from a single file that is handling all the communication with the backend

const url = "https://www.breakingbadapi.com/api/"

function getCharacterByID(charID) {

  return fetch(url + "characters/" + charID);

}

function getEpisodes() {

  return fetch(url + "episodes/");

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
