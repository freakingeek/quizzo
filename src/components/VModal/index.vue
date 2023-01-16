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
import { toRef, watch } from 'vue';

export default {
  name: 'VModal',

  props: {
    show: {
      type: String,
      default: true,
    },
  },

  setup(props, { emit }) {
    const show = toRef(props, 'show');

    const onClose = () => {
      emit('on-close');
    };

    const onBackgroundClicked = (e) => {
      const modalWrapper = document.querySelector('.modal-wrapper');

      if (e.target === modalWrapper) {
        onClose();
      }
    };

    const onEscapeKeyClicked = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const watchHandler = (canShow) => {
      if (canShow) {
        document.addEventListener('keyup', onEscapeKeyClicked);
        document.addEventListener('click', onBackgroundClicked);
      } else {
        document.removeEventListener('keyup', onEscapeKeyClicked);
        document.removeEventListener('click', onBackgroundClicked);
      }
    };

    watch(show, watchHandler, { immediate: true });

    return { show, onBackgroundClicked, onEscapeKeyClicked };
  },
};
</script>

<style src="./VModal.scss" lang="scss" scoped />
