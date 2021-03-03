<template>
  <div>
    <div
      class="grid gap-10 mt-8 ml-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <div
        @click="cardSelected(character.char_id)"
        class="relative overflow-hidden transition duration-300 ease-out transform bg-white rounded shadow-md w-72 hover:shadow-lg hover:scale-105"
      >
        <img
          class="object-cover w-72 h-96"
          :src="character.img"
          alt="character"
        />
        <div class="m-4">
          <span class="font-bold">{{ character.name }}</span>
          <span class="block text-sm text-gray-500">{{
            character.nickname
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

/* CharacterCard Component

  Purpose:  displays information about a single character, card style, with image, name and nickname

  Requires: the full data object of a single character, passed via props

  Events:   CharacterSelected payload: char_id (number)

*/


export default {

  name: 'CharacterCard',

  props: {
    character: Object,
  },

  emits: ['CharacterSelected'],

  methods: {
    cardSelected(char_id) {
      this.$emit('CharacterSelected', char_id);
    }
  },

}
</script>