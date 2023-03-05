<template>
<div class="dark-button">
    <input v-model="isDark" type="checkbox" id="toggle" class="toggle--checkbox"/>
    <label for="toggle" class="toggle--label"></label>
</div>

</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';

//Local Storage und OS nach Dark Mode Präferenz fragen
let darkHistory = localStorage.getItem('isDark') === 'true';
let darkPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

//OS Präferenz in Storage schreiben, primär zum Debuggen
localStorage.setItem('darkPreferred',darkPreference?'true':'false');

//Dark-Mode Status Initial setzen und Watcher bei Änderung initialisieren
const isDark = ref(darkHistory?darkHistory:darkPreference);
onMounted(() => checkDarkMode(isDark.value));
watch(isDark,()=> checkDarkMode(isDark.value));

//Funktion Toggelt die .dark-mode Klasse für <body>.
//Alle CSS Farbvariabeln (siehe App.vue) werden dann automatisch aktualisiert
function checkDarkMode(dark :boolean){
    if(dark){
        document.querySelector('body')!.classList.add('dark-mode');
        localStorage.setItem('isDark','true');
    }else{
        document.querySelector('body')!.classList.remove('dark-mode');
        localStorage.setItem('isDark','false');
    }
}

</script>

<style lang="stylus" scoped>

.dark-button
    .toggle--checkbox
        display: none
        &:checked + .toggle--label
            background: #6b7abb
            border-color: #5d6baa
            &:before
                background: #ffffff
                border-color: #e8e8ea
                animation-name: switch
                animation-duration: 350ms
                animation-fill-mode: forwards
            &:after
                transition-delay: 350ms
                opacity: 1
    .toggle--label
        width: 60px
        height: 30px
        background: #96dcee
        border-radius: 60px
        border: 5px solid #72cce3
        margin: 0 auto
        display: flex
        position: relative
        transition: all 350ms ease-in
        &:before
            animation-name: reverse
            animation-duration: 350ms
            animation-fill-mode: forwards
            transition: all 350ms ease-in
            content: ""
            width: 20px
            height: 20px
            border: 5px solid #f5eb71
            top: 0px
            left: 0px
            position: absolute
            border-radius: 20px
            background: #fffaa8
        &:after
            transition-delay: 0ms
            transition: all 250ms ease-in
            position: absolute
            content: ""
            box-shadow: #e8e8ea -14px 0 0 1px, #e8e8ea -20px 5px 0 -2px
            left: 55px
            top: 8px
            width: 7px
            height: 7px
            background: transparent
            border-radius: 50%
            opacity: 0

@keyframes switch
  0%
    left: 0px
  60%
    left: 0px
    width: 50px
  100%
    left: 30px
    width: 20px
@keyframes reverse
  0%
    left: 30px
    width: 20px
  60%
    left: 0px
    width: 50px
  100%
    left: 0px



</style>