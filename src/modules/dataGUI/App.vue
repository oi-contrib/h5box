<template>
    <div class="main-view">
        <AppHeader title="dataGUI" tips="可视化用例项目，包含可视化大屏、图表、小游戏和一些有趣的创意～
" logo="../dataGUI.png" @goback="router.push('/')"></AppHeader>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/app-header.vue'
import { useRouter } from "vue-router"

let router = useRouter()
</script>

<style lang="scss" scoped>
.main-view {}
</style>