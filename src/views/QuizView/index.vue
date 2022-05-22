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
      <template v-for="item in quizItems" :key="item.id">
        <div class="quiz" @click="checkAnswer(item.id)">
          <span class="quiz__title">{{ item.title }}</span>
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
import DefaultLayout from '/src/layouts/DefaultLayout/index.vue';

// Mock Api
import quizzes from '/src/assets/mock/quizzes.json';

// utils
import { shuffleArray } from '/src/utils/index.js';

export default {
  name: 'QuizView',

  components: {
    DefaultLayout,
  },

  data() {
    return {
      step: 0,
      width: 100,
      timer: null,
      statuses: [],
    };
  },

  watch: {
    width(val) {
      if (val <= 0) this.onLose();
    },
  },

  computed: {
    quizzes() {
      return shuffleArray(quizzes);
    },

    quiz() {
      return this.quizzes[this.step];
    },

    quizItems() {
      return shuffleArray(this.quiz.items);
    },

    statusText() {
      return this.statuses[this.step] === 'win' ? this.quiz.response.win : this.quiz.response.lose;
    },
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    checkAnswer(answerId) {
      this.stopTimer();

      const isWin = this.quiz.currectAnswer === answerId;
      isWin ? this.onWin() : this.onLose();
    },

    onWin() {
      this.statuses[this.step] = 'win';
      this.changeStep();
    },

    onLose() {
      this.statuses[this.step] = 'lose';
      this.changeStep();
    },

    changeStep() {
      setTimeout(() => {
        this.width = 100;
        this.status = null;

        // Check if next step is available or not
        if (this.step + 1 > this.quizzes.length - 1) {
          localStorage.setItem('score', JSON.stringify(this.calculateScore()));

          return this.$router.push('/result');
        }

        this.step += 1;

        this.startTimer();
      }, 3000);
    },

    startTimer() {
      if (this.width <= 0) return this.stopTimer();

      this.width -= 1;
      this.timer = setTimeout(this.startTimer, 100);
    },

    stopTimer() {
      clearTimeout(this.timer);
      this.timeout = null;
    },

    counterClasses(counter) {
      if (this.statuses[counter]) {
        return `quiz-counters__couter quiz-counters__couter--${this.statuses[counter]}`;
      }

      return `quiz-counters__couter quiz-counters__couter--${counter === this.step ? 'current' : 'normal'}`;
    },

    calculateScore() {
      let score = 0;

      for (const status of this.statuses) {
        if (status === 'win') score += 100;
      }

      const timeLeft = this.width / 10;
      const finalScore = Math.floor(score * timeLeft);

      return finalScore;
    },
  },
};
</script>

<style src="./QuizView.scss" lang="scss" scoped />
