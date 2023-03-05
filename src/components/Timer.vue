<template>
    <div class="timer">
        <ul>
            <li><span id="hours">
                {{hours}}
            </span>h</li>
            <li><span id="minutes">
                {{minutes}}
            </span>m</li>
            <li><span id="seconds">
                {{seconds}}
            </span>s</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, watch } from "vue";
    import { TimerModes } from '../views/views_enums';
    import type { Ref } from 'vue'
    import { ITimerInfo } from "./components";


    // Ohne "any" gings net... Ist eigentlich "Object" - da hat TS aber kein Bock drauf
    const props = defineProps<{
        timerMode: TimerModes,
        getTime: boolean
    }>()

    let hours: Ref<number> = ref(0);
    let minutes: Ref<number>  = ref(0);
    let seconds: Ref<number>  = ref(0);
    let totalSeconds: number = 0;
    let totalMinutes: number = 0;

    let startDate: number = 0;
    
    let timerInterval: any = 0;

    watch(() => (props.timerMode), (timerMode, timerMode_old) => {
        if(timerMode == TimerModes.Start){
            startDate = Date.now()
            timerInterval = setInterval(timer, 1000);
        }else if(timerMode == TimerModes.Pause){
            clearInterval(timerInterval);
        }else if(timerMode == TimerModes.Stop){
            clearInterval(timerInterval);
            totalSeconds = 0;
            totalMinutes = 0;
            hours.value = 0;
            minutes.value = 0;
            seconds.value = 0;
        }
    },
    { deep: true }
    );

    const emit = defineEmits<{
        (e: 'getTime', time: ITimerInfo): void
    }>();

    watch(() => (props.getTime), (getTime) => {
        if(getTime){
            let timerInfo: ITimerInfo = {
                seconds: seconds.value,
                minutes: minutes.value,
                hours: hours.value,
                totalSeconds: totalSeconds,
                totalMinutes: totalMinutes
            };
            emit('getTime', timerInfo)
        }
    });

    function timer():void{
        totalSeconds++;
        totalMinutes = Math.floor(totalSeconds / 60);
        seconds.value = totalSeconds % 60;
        minutes.value = totalMinutes % 60;
        hours.value = Math.floor(totalMinutes / 60); 
    }

    /*
    //TODO implement pause!
    function timer(): void{
        let delta: number = Date.now() - startDate;
        totalSeconds = Math.floor(delta/1000);
        totalMinutes = Math.floor(totalSeconds / 60);
        seconds.value = totalSeconds % 60;
        minutes.value = totalMinutes % 60;
        hours.value = Math.floor(totalMinutes / 60); 
    }
    */
        
</script>

<style lang="stylus" scoped>
.timer
    li
        display: inline-block
        font-size: 1.5rem
        list-style-type: none
        padding: 0.5rem
        span
            font-size: 2.5rem
</style>