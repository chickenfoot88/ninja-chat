<template>
  <div class="chat container">
    <h2 class="center teal-text">Ninja chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages">
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }}</span>
            <span class="grey-text text-darken-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <new-message :name="name"/>
      </div>
    </div>
  </div>
</template>
<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'

export default {
  name: 'Chat',
  components: {
    NewMessage,
  },
  props: ['name'],
  data() {
    return {
      messages: []
    }
  },
  created() {
    this.listenChat()
  },
  methods: {
    listenChat() {
      const ref = db.collection('messages').orderBy('timestamp')
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const doc = change.doc
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              content: doc.data().content,
              timestamp: doc.data().timestamp
            })
          }
        })
      })
    }
  }
}
</script>
<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}

.chat span {
  font-size: 1.4em;
  margin-right: 5px;
}

.chat .time {
  display: block;
  font-size: 1.2em;
}
</style>
