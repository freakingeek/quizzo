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
import VModal from '@/components/VModal/index.vue';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';

// Mock Api
import characters from '@/assets/mock/characters.json';

import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ResultView',

  components: {
    VModal,
    DefaultLayout,
  },

  setup() {
    const score = ref(0);
    const isModalOpen = ref(false);

    const router = useRouter();

    const character = computed(() => {
      return characters.find((c) => score.value >= c.minimumScore);
    });

    onBeforeMount(() => {
      if (localStorage.getItem('score')) {
        score.value = JSON.parse(localStorage.getItem('score'));
      }
    });

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const updateLeaderboard = (character) => {
      let leaderboard = [];

      if (localStorage.getItem('leaderboard')) {
        leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
      }

      leaderboard.push(character);
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    };

    const onCharacterSubmited = () => {
      updateLeaderboard({
        image: character.value.image,
        name: character.value.name,
        score: score.value,
      });

      isModalOpen.value = false;
      router.push('/');
    };

    return { score, isModalOpen, characters, character, openModal, closeModal, onCharacterSubmited };
  },
};
</script>

<style src="./ResultView.scss" lang="scss" scoped />
