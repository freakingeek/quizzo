<template>
  <Transition name="modal">
    <div v-if="show" class="modal-wrapper">
      <div class="modal">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'VModal',

  props: {
    show: {
      type: String,
      default: true,
    },
  },

  watch: {
    show: {
      handler(hasShow) {
        if (hasShow) {
          document.addEventListener('keyup', this.onEscapeKeyClicked);
          document.addEventListener('click', this.onBackgroundClicked);
        } else {
          document.removeEventListener('keyup', this.onEscapeKeyClicked);
          document.removeEventListener('click', this.onBackgroundClicked);
        }
      },
      immediate: true,
    },
  },

  methods: {
    onClose() {
      this.$emit('on-close');
    },

    onBackgroundClicked(e) {
      const modalWrapper = document.querySelector('.modal-wrapper');
      if (e.target === modalWrapper) this.onClose();
    },

    onEscapeKeyClicked(e) {
      if (e.key === 'Escape') this.onClose();
    },
  },
};
</script>

<style src="./VModal.scss" lang="scss" scoped />
