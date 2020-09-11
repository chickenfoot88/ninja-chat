<template>
  <div class="chat container">
    <h2 class="center teal-text">Ninja chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span  :class="[ isUser(message.name) ? 'orange-text darken-1' : 'teal-text' ]">{{ message.name }}</span>
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
import moment from 'moment'

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
    isUser(messageName) {
      return this.name.toLowerCase() === messageName.toLowerCase()
    },
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
              timestamp: moment(doc.data().timestamp).format('lll')
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
  font-size: .8em;
}

.chat .messages {
  max-height: 300px;
  overflow: auto;
}

/* .chat .messages::scrollbar, */
.chat .messages::-webkit-scrollbar {
  width: 3px;
}

/* .chat .messages::scrollbar-track, */
.chat .messages::-webkit-scrollbar-track {
  background: #ddd;
}

/* .chat .messages::scrollbar-thumb, */
.chat .messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>
