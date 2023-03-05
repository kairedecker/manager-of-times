<template>
  <div class="main">
    <Navbar></Navbar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navbar from './components/Navbar.vue'
import router from "./router/index"
router.push('/');


</script>

<style lang="stylus">
body
  --cl-bg: rgba(245, 245, 245, 1)
  --bg-secondary: rgba(218, 218, 218, 1)
  --bg-secondary-darkened: rgba(205, 205, 205, 1)
  --cl-accent: rgba(236, 179, 101, 1)
  --cl-text: rgba(44, 62, 80, 1)
  --cl-link: rgba(44, 62, 80, 1)
  --cl-border: var(--bg-secondary-darkened)
  transition-property: color, background
  transition-duration: 300ms
  transition-timing-function: ease-in-out

  &.dark-mode
    --cl-bg:  rgba(5, 37, 66, 1)
    --bg-secondary:rgba(4, 28, 50, 1)
    --bg-secondary-darkened: rgba(3, 25, 44, 1)
    --cl-accent: rgba(236, 179, 101, 1)
    --cl-text: rgba(255, 255, 255, 1)
    --cl-link: rgba(255, 255, 255, 1)
    --cl-border: var(--cl-bg)
  a
    color: var(--cl-link)
    &:visited
      color: var(--cl-link)

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  margin: 0
  padding: 0
body
  margin: 0
  padding: 0
  background: var(--cl-bg)
  color: var(--cl-text)
  .main
    display: flex
    flex-direction: row
    .content
      //margin-left: 1rem
      //margin-right: 1rem
      margin: 1rem
      flex-grow: 1
      text-align: center
      h1
        margin-top: 0.5rem
</style>
