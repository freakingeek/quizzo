<template>
  <DefaultLayout>
    <header class="header">
      <span class="header__text">آماده یه مسابقه کوچیک هستی؟</span>
      <RouterLink class="header__link" to="#">شروع مسابقه جدید</RouterLink>
    </header>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '/src/layouts/DefaultLayout/index.vue';

export default {
  name: 'HomeView',

  components: {
    DefaultLayout,
  },
};
</script>

<style src="./HomeView.scss" lang="scss" sciped />
