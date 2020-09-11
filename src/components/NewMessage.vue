<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New Message (enter to add):</label>
      <input type="text" name="new-message" v-model="newMessage" />
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
    </form>
  </div>
</template>
<script>
import db from '@/firebase/init'

export default {
  name: 'NewMessage',
  props: ['name'],
  data() {
    return {
      newMessage: '',
      feedback: '',
    }
  },
  methods: {
    async addMessage() {
      if (this.newMessage) {
        try {
          db.collection('messages').add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now(),
          })

          this.newMessage = ''
          this.feedback = ''
        } catch (error) {
          console.error(error)
        }
      } else {
        this.feedback = 'You must enter a message in order to send one'
      }
    },
  },
}
</script>
<style></style>
