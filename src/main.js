import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRightFromBracket, faHotdog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faRightFromBracket, faHotdog)


createApp(App).component('fa', FontAwesomeIcon).use(router).mount('#app')
