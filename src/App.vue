<template>
  <nav>
    <router-link to="/">Главная</router-link>
    <router-link to="/staking">Накопления</router-link>
    <router-link to="/pools">Пулы</router-link>
    <router-link to="/profile">Профиль</router-link>
  </nav>
  <router-view/>
  <footer class="footer">
    <h3>Чемпионат по профессиональному мастерству Санкт-Петербург</h3>
  </footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  display: flex;
  position: absolute;
  margin: 600px 0px;
  
}
</style>
