<template>
  <DefaultLayout>
    <header class="header">
      <span class="header__text">آماده یه مسابقه کوچیک هستی؟</span>
      <RouterLink class="header__link" to="#">شروع مسابقه جدید</RouterLink>
    </header>

    <section id="leaderboard" class="leaderboard home-view__leaderboard">
      <h2 class="leaderboard__title">جدول امتیازات</h2>

      <div class="leaders leaderboard__leaders">
        <template v-for="num in 20" :key="num">
          <div class="leader">
            <div class="leader__image-box">
              <img src="/src/assets/images/sloths.jpg" alt="تنبل نیمه‌جان!" class="leader__image" />
            </div>

            <span class="leader__name">تنبل نیمه‌جان!</span>
            <span class="leader__score">۱۴۱۴ امتیاز</span>
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
};
</script>

<style src="./HomeView.scss" lang="scss" sciped />
