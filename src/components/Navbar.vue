<template>
    <div class="navbar">
        <div class="nav">
            <router-link to="/">
                <div class="link-wrapper">
                    <HomeIcon />
                    <span class="nav-link">Home</span>
                </div>
            </router-link>

            <router-link to="/tracking">
                <div class="link-wrapper">
                    <ClockIcon />
                    <span class="nav-link">Tracking</span>
                </div>
            </router-link>

            <router-link to="/overview">
                <div class="link-wrapper">
                    <ViewColumnsIcon />
                    <span class="nav-link">Overview</span>
                </div>
            </router-link>

            <router-link to="/settings">
                <div class="link-wrapper">
                    <CogIcon />
                    <span class="nav-link">Settings</span>
                </div>
            </router-link>
        </div>
        <div class="nav-footer">
            <div class="dark">
                <h3>Dark mode</h3>
                <ToggleButton />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ToggleButton from "./ToggleButton.vue";
import { ViewColumnsIcon, PlayIcon, CogIcon, HomeIcon, ClockIcon } from "@heroicons/vue/24/solid"

import { useRouter } from "vue-router";
const router = useRouter();
const push = function (route: string) {
    router.push(route);
}

</script>

<style lang="stylus" scoped>
.navbar
    height: 100vh
    display:flex
    flex-direction: column
    justify-content: space-between
    background: var(--bg-secondary)
    box-shadow: 1px 0 4px 1px rgba(0,0,0,0.4)
    .nav
        margin: 0
        padding: 0
        width: 170px
        overflow: auto
        display: flex
        flex-direction: column
        a
            text-decoration:none
            &.router-link-active
                background: var(--cl-border)
            .link-wrapper
                width: 100%
                border-bottom: 1px solid var(--cl-border)
                padding: 1rem 0
                display:flex
                align-items:center
                justify-content:space-between
                &:hover
                    background: var(--cl-border)
                svg
                    width: 1.5rem
                    height: 1.5rem
                    padding-left: 0.5rem
                .nav-link
                    cursor: pointer
                    padding-right:0.75rem
    .nav-footer
        padding: 1rem 0
        background: var(--bg-secondary-darkened)
        .dark
            h3
                margin: .25rem auto
                font-size: 1rem
</style>