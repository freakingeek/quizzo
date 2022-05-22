<template>
  <VModal :show="isModalOpen" @on-close="closeModal">
    <div class="character">
      <div class="character__avatar-box">
        <img src="/src/assets/images/sloths.jpg" alt="تنبل نیمه‌جان" class="character__avatar" />
      </div>

      <span class="character__name">تنبل نیمه‌جان</span>

      <p class="character__summary">
        شما موفق به کسب کاراکتر <span class="character__summary-bold">«تنبل نیمه‌جان»</span> شدید! شاید اگر حتی اندکی
        کارتان بهتر بود والدین‌تان به شما افتخار می‌کردند.
      </p>
    </div>

    <button class="action" @click="onCharacterSubmited">پذیرش کاراکتر</button>
  </VModal>

  <DefaultLayout class="result-view">
    <h1 class="result-view__title">تموم شد!</h1>
    <span class="result-view__description">شما توی این مسابقه ۱۴۱۴ امتیاز دریافت کردید و با افتخار سوم شدید!</span>

    <div class="result-view__actions">
      <button class="result-view__show-results" @click="openModal">مشاهده نتایج</button>
      <RouterLink to="/quiz" class="result-view__retry">تلاش مجدد</RouterLink>
    </div>
  </DefaultLayout>
</template>

<script>
import VModal from '/src/components/VModal/index.vue';
import DefaultLayout from '/src/layouts/DefaultLayout/index.vue';

export default {
  name: 'ResultView',

  components: {
    VModal,
    DefaultLayout,
  },

  data() {
    return {
      isModalOpen: false,
    };
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    onCharacterSubmited() {
      this.updateLeaderboard({
        image: '/src/assets/images/sloths.jpg',
        name: 'تنبل نیمه‌جان',
        score: '1212',
      });
      this.isModalOpen = false;
      this.$router.push('/');
    },

    updateLeaderboard(character) {
      let leaderboard = [];

      if (localStorage.getItem('leaderboard')) {
        leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
      }

      leaderboard.push(character);
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    },
  },
};
</script>

<style src="./ResultView.scss" lang="scss" scoped />
