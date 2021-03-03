<template>
  <div class="text-center bg-gradient-to-r from-green-400 to-blue-500">
    <h4 class="font-bold pb-5 pt-5 text-4xl text-center">
      Breaking Bad Characters
    </h4>
    <div class="p-6" id="nav">
      <router-link class="font-bold text-gray-700" to="/">Cards</router-link> |
      <router-link class="font-bold text-gray-700" to="/profile/1"
        >Profile</router-link
      >
      |
      <router-link class="font-bold text-gray-700" to="/episodes"
        >Episodes</router-link
      >
    </div>
    <router-view
      @CharacterSelected="characterSelected"
      @EpisodeSelected="episodeSelected"
    />
  </div>
</template>

<script>
export default {


  data() {
    return {
      char_id: "1",
    }
  },

  methods: {
    characterSelected(char_id) {
      console.log("App CharacterSelected:", char_id);
      this.char_id = char_id;
      this.$router.push({ name: 'Profile', params: { char_id } });
    },
    episodeSelected(episode_id) {
      console.log("App EpisodeSelected", episode_id);
    }
  },


}
</script>


<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
