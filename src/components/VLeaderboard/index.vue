<template>
  <section id="leaderboard" class="leaderboard">
    <h2 class="leaderboard__title">جدول امتیازات</h2>

    <div v-if="leaderboard.length" class="leaders leaderboard__leaders">
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

    <div v-else class="leaderboard__empty">
      <span>هنوز هیچ امتیازی ثبت نشده است ...</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VLeaderboard',

  data() {
    return {
      leaderboard: [],
    };
  },

  mounted() {
    if (localStorage.getItem('leaderboard')) {
      this.leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    }
  },
};
</script>

<style src="./VLeaderboard.scss" lang="scss" scoped />
