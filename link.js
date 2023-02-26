import { computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { useBrowserLocation } from '@vueuse/core'

export default {
  install(app, options) {
    app.component('RouterLink', {
      useLink(props) {
        const browserLocation = useBrowserLocation()
        const currentUrl = computed(
          () => `${browserLocation.value.origin} ${browserLocation.value.pathname}`
        )
        // console.log(usePage().url)
        return {
          route: computed(() => ({ href: props.to })),
          isExactActive: computed(() => usePage().url === props.to),
          isActive: computed(() => usePage().url.startsWith(props.to)),
          // isActive: computed(() => currentUrl.value.startsWith(props.to)),
          navigate(e) {
            if (e.shiftKey || e.metaKey || e.ctrlKey) return

            e.preventDefault()

            router.visit(props.to)
          },
        }
      },
    })
  },
}
