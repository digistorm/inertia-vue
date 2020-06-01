import { Inertia, shouldIntercept } from '@inertiajs/inertia'

export default {
  functional: true,
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    href: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'get',
    },
    replace: {
      type: Boolean,
      default: false,
    },
    preserveScroll: {
      type: Boolean,
      default: false,
    },
    preserveState: {
      type: Boolean,
      default: false,
    },
    only: {
      type: Array,
      default: () => [],
    },
    tag: {
      type: String,
      default: 'a',
    },
    activeClass: {
      type: String,
      default: 'inertia-link-active',
    },
  },
  render(h, { props, data, children }) {
    return h(props.tag, {
      ...data,
      attrs: {
        ...data.attrs,
        href: props.href,
      },
      class: (props.activeClass && props.href === Inertia.page.url) ? { [props.activeClass]: true } : null,
      on: {
        ...(data.on || {}),
        click: event => {
          if (data.on && data.on.click) {
            data.on.click(event)
          }

          if (shouldIntercept(event)) {
            event.preventDefault()

            Inertia.visit(props.href, {
              data: props.data,
              method: props.method,
              replace: props.replace,
              preserveScroll: props.preserveScroll,
              preserveState: props.preserveState,
              only: props.only,
            })
          }
        },
      },
    }, children)
  },
}
