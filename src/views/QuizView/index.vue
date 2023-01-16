<template>
  <Transition name="fade">
    <div v-if="statuses[step]" :class="`status status--${statuses[step]}`">
      <span class="status__text">{{ statusText }}</span>
    </div>
  </Transition>

  <DefaultLayout class="quiz-view">
    <div class="timeout" :style="`width: ${width}%`"></div>

    <h1 class="quiz-view__title">{{ quiz.title }}</h1>

    <div class="quizzes quiz-view__quizzes">
      <template v-for="answer in answers" :key="answer.id">
        <div class="quiz" @click="checkAnswer(answer.id)">
          <span class="quiz__title">{{ answer.title }}</span>
        </div>
      </template>
    </div>

    <div class="quiz-counters">
      <template v-for="counter in quizzes.length" :key="counter">
        <span :class="counterClasses(counter - 1)" />
      </template>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';

// Mock Api
import quizzesList from '@/assets/mock/quizzes.json';

// utils
import { shuffleArray } from '@/utils/index.js';

import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'QuizView',

  components: {
    DefaultLayout,
  },

  setup() {
    const step = ref(0);
    const width = ref(100);
    const timer = ref(null);
    const statuses = ref([]);

    const router = useRouter();

    const quizzes = computed(() => {
      return shuffleArray(quizzesList);
    });

    const quiz = computed(() => {
      return quizzes.value[step.value];
    });

    const answers = computed(() => {
      return shuffleArray(quiz.value.items);
    });

    const statusText = computed(() => {
      return statuses.value[step.value] === 'win' ? quiz.value.response.win : quiz.value.response.lose;
    });

    const stopTimer = () => {
      clearTimeout(timer.value);
      timer.value = null;
    };

    const startTimer = () => {
      if (width.value <= 0) {
        return stopTimer();
      }

      width.value -= 1;
      timer.value = setTimeout(startTimer, 100);
    };

    const calculateScore = () => {
      let score = 0;

      for (const status of statuses.value) {
        if (status === 'win') score += 100;
      }

      const timeLeft = width.value / 10;
      const finalScore = Math.floor(score * timeLeft);

      return finalScore;
    };

    const changeStep = () => {
      setTimeout(() => {
        width.value = 100;

        // Check if next step is available or not
        if (step.value + 1 > quizzes.value.length - 1) {
          localStorage.setItem('score', JSON.stringify(calculateScore()));

          return router.push('/result');
        }

        step.value += 1;

        startTimer();
      }, 3000);
    };

    const onWin = () => {
      statuses.value[step.value] = 'win';
    };

    const onLose = () => {
      statuses.value[step.value] = 'lose';
    };

    const checkAnswer = (answerId) => {
      stopTimer();

      quiz.value.currectAnswer === answerId ? onWin() : onLose();

      changeStep();
    };

    const counterClasses = (counter) => {
      if (statuses.value[counter]) {
        return `quiz-counters__couter quiz-counters__couter--${statuses.value[counter]}`;
      }

      return `quiz-counters__couter quiz-counters__couter--${counter === step.value ? 'current' : 'normal'}`;
    };

    watch(width, (value) => {
      if (value <= 0) {
        onLose();
        changeStep();
      }
    });

    onMounted(startTimer);

    return { step, width, statuses, quiz, quizzes, answers, statusText, checkAnswer, counterClasses };
  },
};
</script>

<style src="./QuizView.scss" lang="scss" scoped />
