import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent, h } from 'vue'
import AppStoreBadge from './components/AppStoreBadge.vue'
import MrsGuidance from './components/MrsGuidance.vue'
import ClashMascot from './components/ClashMascot.vue'
import ClashGuideInvite from './components/ClashGuideInvite.vue'
import ClashNotFound from './components/ClashNotFound.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'not-found': () => h(ClashNotFound)
  }),
  enhanceApp({ app }) {
    app.component('AppStoreBadge', AppStoreBadge)
    app.component('MrsGuidance', MrsGuidance)
    app.component('ClashMascot', ClashMascot)
    app.component('ClashGuideInvite', ClashGuideInvite)
    app.component('ClashNotFound', ClashNotFound)
    app.component(
      'ConfigFieldMatrix',
      defineAsyncComponent(() => import('./components/ConfigFieldMatrix.vue'))
    )
  }
}
