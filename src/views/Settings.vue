<template>
  <div class="settings">
    <div class="container">
      <div class="tile">
        <p>Wochenarbeitszeit (h):</p>
        <input
          type="number"
          v-model.number="worktime"
          :placeholder="placeholders.worktime"
        />
      </div>
      <div class="tile">
        <p>Tage pro Woche:</p>
        <input
          type="number"
          v-model.number="daysPerWeek"
          :placeholder="placeholders.days"
        />
      </div>
      <div class="tile">
        <p>Pause pro Tag (min):</p>
        <input
          type="number"
          v-model.number="breakPerDay"
          :placeholder="placeholders.break"
        />
      </div>
      <div class="tile">
        <p>Max. Überstunden pro Woche (h):</p>
        <input
          type="number"
          v-model.number="overtime"
          :placeholder="placeholders.overtime"
        />
      </div>
      <div class="tile">
        <p>
          Default Modus:
          <Transition name="fade" mode="out-in">
            <span key="1" v-if="!check">Manuell</span>
            <span key="2" v-else>Auto</span>
          </Transition>
        </p>
        <label class="checkbox path">
          <input type="checkbox" v-model="check" />
          <svg viewBox="0 0 21 21">
            <path
              d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"
            ></path>
          </svg>
        </label>
      </div>
      <div class="tile">
        <button @click="save">Speichern</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Ref } from 'vue'

// TODO implement extra interface datei
interface Placeholder{
  worktime: string,
  days: string,
  break: string,
  overtime: string
}

const placeholders: Placeholder = reactive({
  worktime: "35",
  days: "5",
  break: "45",
  overtime: "50",
});

const check:Ref<boolean> = ref(false);
const worktime:Ref<number|undefined> = ref();
const daysPerWeek:Ref<number|undefined> = ref();
const breakPerDay:Ref<number|undefined> = ref();
const overtime:Ref<number|undefined> = ref();

function save() {
  console.log(
    worktime.value,
    daysPerWeek.value,
    breakPerDay.value,
    overtime.value
  );
}
</script>

<style lang="stylus" scoped>

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.3s ease


.fade-enter-from,
.fade-leave-to
  opacity: 0
.settings
    display: flex
    justify-content: center
    .container
        max-width: 400px
        display: flex
        flex-direction: column
        text-align: left
        .tile
            display: flex
            flex-direction: row
            justify-content: flex-start
            align-items: center
            p
                width: 40vw
                min-width: 256px
            input
                border: var(--cl-bg)
                border-radius: 5px
                padding: 0.5rem
                width: 2rem
                &:focus
                    outline: 1px solid var(--cl-accent);
            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button
                -webkit-appearance: none
                margin: 0
            span
                font-style: italic
                font-weight: 500
            button
                border-radius: 5px
                margin-top: 0.5rem
                cursor: pointer
                transition-duration: 0.3s
                background: var(--bg-secondary)
                color: var(--cl-text)
                padding: 12px 24px
                text-align: center
                text-decoration: none
                border: none
                &:hover
                    background: var(--bg-secondary-darkened)
            .checkbox
                flex-direction: column
                --background: #fff
                --border: #D1D6EE
                --border-hover: #BBC1E1
                --border-active: #1E2235
                --tick: #fff
                position: relative
                input
                svg
                    width: 21px
                    height: 21px
                    display: block
                input
                    -webkit-appearance: none
                    -moz-appearance: none
                    position: relative
                    outline: none
                    background: var(--background)
                    border: none
                    margin: 0
                    padding: 0
                    cursor: pointer
                    border-radius: 4px
                    transition: box-shadow .3s
                    box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border))
                    &:hover
                        --s: 2px
                        --b: var(--border-hover)
                    &:checked
                        --b: var(--border-active)
                svg
                    pointer-events: none
                    fill: none
                    stroke-width: 2px
                    stroke-linecap: round
                    stroke-linejoin: round
                    stroke: var(--stroke, var(--border-active))
                    position: absolute
                    top: 0
                    left: 0
                    width: 21px
                    height: 21px
                    transform: scale(var(--scale, 1)) translateZ(0)
                &.path
                    input
                        &:checked
                            --s: 2px
                            transition-delay: .4s
                            & + svg
                                --a: 16.1 86.12
                                --o: 102.22
                    svg
                        stroke-dasharray: var(--a, 86.12)
                        stroke-dashoffset: var(--o, 86.12)
                        transition: stroke-dasharray .6s, stroke-dashoffset .6s
</style>
