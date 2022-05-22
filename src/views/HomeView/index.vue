<template>
  <DefaultLayout>
    <header class="header">
      <span class="header__text">آماده یه مسابقه کوچیک هستی؟</span>
      <RouterLink class="header__link" to="/quiz">شروع مسابقه جدید</RouterLink>
    </header>

    <VLeaderboard class="home-view__leaderboard" />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '/src/layouts/DefaultLayout/index.vue';
import VLeaderboard from '/src/components/VLeaderboard/index.vue';

export default {
  name: 'HomeView',

  components: {
    VLeaderboard,
    DefaultLayout,
  },
};
</script>

<style src="./HomeView.scss" lang="scss" sciped />
