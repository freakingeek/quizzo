<template>
  <DefaultLayout>
    <header class="header">
      <span class="header__text">آماده یه مسابقه کوچیک هستی؟</span>
      <RouterLink class="header__link" to="/quiz">شروع مسابقه جدید</RouterLink>
    </header>

    <section id="leaderboard" class="leaderboard home-view__leaderboard">
      <h2 class="leaderboard__title">جدول امتیازات</h2>

      <div class="leaders leaderboard__leaders">
        <template v-for="(leader, index) in leaderboard" :key="index">
          <div class="leader">
            <div class="leader__image-box">
              <img :src="leader.image" :alt="leader.name" class="leader__image" />
            </div>

            <span class="leader__name">{{ leader.name }}</span>
            <span class="leader__score">{{ leader.score }} امتیاز</span>
          </div>
        </template>
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '/src/layouts/DefaultLayout/index.vue';

export default {
  name: 'HomeView',

  components: {
    DefaultLayout,
  },

  data() {
    return {
      leaderboard: [],
    };
  },

  mounted() {
    if (localStorage.getItem('leaderboard')) {
      this.leaderboard = JSON.parse(localStorage.getItem('leaderboard'))
    }
  },
};
</script>

<style src="./HomeView.scss" lang="scss" sciped />
