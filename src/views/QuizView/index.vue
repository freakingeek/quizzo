<template>
  <div v-if="statuses[step]" :class="`status status--${statuses[step]}`">
    <span class="status__text">{{ statusText }}</span>
  </div>

  <DefaultLayout class="quiz-view">
    <div class="timeout" :style="`width: ${width}%`"></div>

    <h1 class="quiz-view__title">{{ quiz.title }}</h1>

    <div class="quizes quiz-view__quizes">
      <template v-for="item in quiz.items" :key="item.id">
        <div class="quiz" @click="checkAnswer(item.id)">
          <span class="quiz__title">{{ item.title }}</span>
        </div>
      </template>
    </div>

    <div class="quiz-counters">
      <template v-for="counter in quizes.length" :key="counter">
        <span :class="counterClasses(counter - 1)" />
      </template>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '/src/layouts/DefaultLayout/index.vue';

// Mock Api
import quizes from '/src/assets/mock/quizes.json';

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
      if (val <= 0) this.onLose()
    },
  },

  computed: {
    quizes() {
      return quizes;
    },

    quiz() {
      return this.quizes[this.step];
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
        if (this.step + 1 > this.quizes.length - 1) {
          return this.$router.push('/result')
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
  },
};
</script>

<style src="./QuizView.scss" lang="scss" scoped />