<template>
  <div class="home">
    <h1>Home</h1>
    <p>{{ test }}</p>
    <h3>Übersicht letzte 7 Tage:</h3>
    <p>Chart, Tabelle</p>
    <p>Soll-/Ist-Vergleich</p>
    <p>Fehlende Einträge (Arbeitszeit, übermittlung Arbeitgeber, etc.)</p>
  </div>
</template>

<script setup lang="ts">

const test = "test";
//api.test();

</script>

<style lang="stylus" scoped>
.home
  display: flex
  flex-direction: column 
  text-align: left
</style>