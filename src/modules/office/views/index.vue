<template>
  <div class="container">
    <div class="block">
      <h2>PDF 相关</h2>
      <ul>
        <li class="img" @click="router.push('/image-to-pdf')">
          <span> 图片转PDF </span>
        </li>
        <li class="img" @click="router.push('/pdf-to-image')">
          <span> PDF转图片 </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router"
let router = useRouter()
</script>
<style lang="scss" scoped>
.container {
  padding: 10px;

  &>.block {
    display: inline-block;
    width: 230px;
    vertical-align: top;
    margin: 10px;

    &>h2 {
      color: rgb(117, 117, 117);
      font-size: 16px;
      padding-left: 10px;
      line-height: 2.4em;
      font-weight: 200;
    }

    &>ul {
      &>li {
        line-height: 40px;
        background-repeat: no-repeat;
        background-position: 8px center;
        background-size: auto 24px;
        padding-left: 40px;
        color: black;

        &>a {
          color: inherit;
        }

        &>a,
        span {
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }

        &.img {
          background-image: url("../images/img.svg");
        }
      }
    }
  }
}
</style>