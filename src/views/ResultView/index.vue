<template>
  <VModal :show="isModalOpen" @on-close="closeModal">
    <div class="character">
      <div class="character__avatar-box">
        <img :src="character.image" :alt="character.name" class="character__avatar" />
      </div>

      <span class="character__name">{{ character.name }}</span>

      <p class="character__summary">
        شما موفق به کسب کاراکتر <span class="character__summary-bold">«{{ character.name }}»</span> شدید!
        {{ character.summary }}
      </p>
    </div>

    <button class="action" @click="onCharacterSubmited">پذیرش کاراکتر</button>
  </VModal>

  <DefaultLayout class="result-view">
    <h1 class="result-view__title">تموم شد!</h1>
    <span class="result-view__description">تبریک! شما توی این مسابقه {{ score }} امتیاز دریافت کردید!</span>

    <div class="result-view__actions">
      <button class="result-view__show-results" @click="openModal">مشاهده نتایج</button>
      <RouterLink to="/quiz" class="result-view__retry">تلاش مجدد</RouterLink>
    </div>
  </DefaultLayout>
</template>

<script>
import VModal from '/src/components/VModal/index.vue';
import DefaultLayout from '/src/layouts/DefaultLayout/index.vue';

// Mock Api
import characters from '/src/assets/mock/characters.json';

export default {
  name: 'ResultView',

  components: {
    VModal,
    DefaultLayout,
  },

  data() {
    return {
      characters,

      score: 0,
      isModalOpen: false,
    };
  },

  computed: {
    character() {
      return this.characters.find((c) => this.score >= c.minimumScore)
    },
  },

  created() {
    if (localStorage.getItem('score')) {
      this.score = JSON.parse(localStorage.getItem('score'));
    }
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
        image: this.character.image,
        name: this.character.name,
        score: this.score,
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
