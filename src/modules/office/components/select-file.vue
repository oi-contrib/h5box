<template>
  <div class="container">
    <h2 class="title">{{ title }}</h2>
    <div class="tips">{{ tips }}</div>
    <div class="file">
      <input type="file" multiple id="input" @change="doChange($event)" :accept="accept" />
      <label for="input"> 选择{{ type }}文件 </label>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    tips: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  emits: {
    change: (files: FileList) => null,
  },
  setup(props, ctx) {
    let doChange = (event: Event) => {
      ctx.emit("change", (event.target as any).files);
    };
    return {
      doChange,
      accept: {
        pdf: "application/pdf",
        image: "image/*"
      }[props.type],
    };
  },
});
</script>
<style lang="scss" scoped>
.container {
  &>.title {
    text-align: center;
    font-weight: 700;
    color: rgb(26, 26, 26);
    font-size: 36px;
    line-height: 48px;
    padding-top: 30px;
  }

  &>.tips {
    text-align: center;
    line-height: 30px;
    font-size: 22px;
    color: rgb(26, 26, 26);
    font-weight: 300;
  }

  &>.file {
    text-align: center;
    margin-top: 30px;

    input {
      display: none;
    }

    label {
      line-height: 50px;
      display: inline-block;
      border: 1px solid gray;
      background-image: url("../images/addFile.svg");
      background-repeat: no-repeat;
      background-position: 5px center;
      background-size: auto 70%;
      padding-left: 40px;
      padding-right: 10px;
      border-radius: 5px;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>