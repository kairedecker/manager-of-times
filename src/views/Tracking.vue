<template>
  <div class="tracking">

    <Transition mode="out-in">
    <div class="container" v-if="toggle">
      <h3>Manuelle Zeiteingabe</h3>
      <div class="tile">
        <input class="datepicker" v-model="datepicker" type="date" />
      </div>
      <div class="tile">
        <div class="time">
          <input class="left" v-model="startTime" type="time" />
          <span class="text">bis</span>
          <input class="right" v-model="stopTime" type="time" />
        </div>
      </div>
      <div class="tile">
        <v-select v-model="description" :options="projekte" :placeholder="'Beschreibung'" taggable></v-select>
      </div>
      <div class="tile">
        <v-select
          v-model="workType"
          :options="listOfWorkTypes"
          label="name"
          :reduce="(x: IWorkTypesSelect) => x.type"
          :clearable="false"
        ></v-select>
      </div>
      <div class="tile">
        <button class="btn" @click="saveManual()">Speichern</button>
        <button class="btn toggle" @click="toggleMode"><PlayIcon/>Automatisch Tracken</button>
      </div>
    </div>
  

    <div class="container" v-else>
      <h3>Automatische Zeiterfassung</h3>
      <div class="tile">
        <button class="play-btn" @click="startTimer"></button>
        <button class="pause-btn" @click="pauseTimer"></button>
        <button class="stop-btn" @click="stopTimer"></button>
        <Timer @get-time="gotTime" :timer-mode="timerMode" :get-time="getTime"></Timer>
      </div>
      <div class="tile">
        <button class="btn" @click="saveAuto()">Speichern</button>
        <button class="btn toggle" @click="toggleMode"><PlayIcon/>Manuell Tracken</button>
      </div>
    </div>
  </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { TimeInterval, WorkType } from "../electron/data/TimeInterval";
import Timer from "../components/Timer.vue";
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import { PlayIcon } from "@heroicons/vue/24/solid"
import type { Ref } from 'vue'
import { TimerModes } from '../views/views_enums';
import { IWorkTypesSelect } from './views';
import { ITimerInfo } from "../components/components";

// Manual Handling

//TODO get Variables From Storage
const workTime = 7;
const pauseTime = 0.75;
//Einfach alle letzten Tasks holen und die Beschreibungen rausziehen
const projekte = ["Kunde A", "ABB", "Mediamarkt", "Michael Wendler", "Windows Updates machen"];

//Berechnungen und Placeholders
const defaultDuration = (workTime + pauseTime) * 3600000;

//Kurze Liste, damit man den Enum Namen nicht anzeigen muss.
const listOfWorkTypes = reactive([
  { name: "Arbeit", type: WorkType.Work },
  { name: "Pause", type: WorkType.Break }
]);

const date = new Date();
let endDate = new Date(date.valueOf() + defaultDuration);

if (endDate.getDate() !== date.getDate()) {
  endDate = new Date();
  endDate.setHours(23);
  endDate.setMinutes(59);
}

//refs
const datepicker = ref(date.toISOString().slice(0, 10));
const startTime = ref(date.toLocaleTimeString().slice(0, 5));
const stopTime = ref(endDate.toLocaleTimeString().slice(0, 5));
const description = ref('');
const workType = ref(WorkType.Work);

function saveManual(): void{
  let start_date = new Date(`${datepicker.value}T${startTime.value}:00`);
  let end_date = new Date(`${datepicker.value}T${stopTime.value}:00`);
  let ti;

  try {
    //TODO WorkType und beschreibung setzen
    ti = new TimeInterval(start_date, workType.value, end_date, description.value);
  } catch (e) {
    //TODO Errorhandling
    console.log(e);
    ti = new TimeInterval(start_date, workType.value);
    ti.description = description.value;
  }
  console.table(ti);

  description.value = "";
  workType.value = WorkType.Work;
}

// Automatic Handling

let timerMode: Ref<TimerModes> = ref(TimerModes.Stop);
let toggle: Ref<boolean> = ref(true);
let getTime: Ref<boolean> = ref(false);

function toggleMode(): void{
  toggle.value = !toggle.value;
}

function startTimer(): void{
  timerMode.value = TimerModes.Start;
}

function pauseTimer(): void{
  timerMode.value = TimerModes.Pause;
}

function stopTimer(): void{
  timerMode.value = TimerModes.Stop;
}

function saveAuto(): void{
  if(timerMode.value != TimerModes.Start){
    getTime.value = true;
  }
  if(timerMode.value == TimerModes.Pause){
    timerMode.value = TimerModes.Stop;
  }
}

function gotTime(timerInfo: ITimerInfo): void{
  console.log(timerInfo);
  getTime.value = false;
}


</script>

<!--

  Variablen für vue-select

--vs-controls-color: #664cc3
--vs-border-color: #664cc3
--vs-dropdown-bg: #282c34
--vs-dropdown-color: #cc99cd
--vs-dropdown-option-color: #cc99cd
--vs-selected-bg: #664cc3
--vs-selected-color: #eeeeee
--vs-search-input-color: #eeeeee
--vs-dropdown-option--active-bg: #664cc3
--vs-dropdown-option--active-color: #eeeeee

-->

<style lang="stylus" scoped>

.v-select
    --vs-dropdown-color: black
    --vs-search-input-color: black
    --vs-search-input-placeholder-color: #999999;
    --vs-border-width: 0;
    background:white
    min-width: 250px
    border-radius: 5px

.v-enter-active
.v-leave-active
  transition: all 0.25s ease-out;
.v-enter-from
.v-leave-to
  opacity: 0;


.tracking
    display: flex
    justify-content: center
    .container
        display: flex
        max-width: 500px
        flex-direction: column
        text-align: left
        .tile
            display: flex
            flex-direction: row
            align-items: center
            margin: 0.5rem 0
            height: 40px
            .datepicker
                padding: 0.5rem
                width: 120px
                border-radius: 5px
                font-family: inherit
                border:none
                &:focus-visible
                        outline: none
            .time
                display: inline
                background: white
                border-radius: 5px
                padding: 0.5rem
                border: none
                color: black
                span
                  font-size: 0.75rem
                  padding: 0 0.5rem
                input
                    border: none
                    font-family: inherit
                    &:focus-visible
                        outline: none                   
.btn
    border-radius: 5px
    margin-right: 0.5rem
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
    &.toggle
      svg
          width: 0.75rem
          height: 0.75rem
          padding-right: 0.25rem
.play-btn
    box-sizing: border-box
    cursor: pointer
    position: relative
    display: block
    transform: scale(var(--ggs,1))
    width: 22px
    height: 22px
    border: 2px solid
    border-radius: 20px
    &::before
        content: ""
        display: block
        box-sizing: border-box
        position: absolute
        width: 0
        height: 10px
        border-top: 5px solid transparent
        border-bottom: 5px solid transparent
        border-left: 6px solid
        top: 4px
        left: 7px

.pause-btn
    margin: 5px
    box-sizing: border-box
    cursor: pointer
    position: relative
    display: block
    transform: scale(var(--ggs,1))
    width: 22px
    height: 22px
    border: 2px solid
    border-radius: 22px
    &::before
      content: ""
      display: block
      box-sizing: border-box
      position: absolute
      width: 6px
      height: 6px
      left: 6px
      top: 6px
      border-left: 2px solid
      border-right: 2px solid

.stop-btn
    box-sizing: border-box;
    position: relative;
    cursor: pointer
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid;
    border-radius: 20px
    &::before
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 6px;
        height: 6px;
        top: 6px;
        left: 6px;
        background: currentColor  

</style>
