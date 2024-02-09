<template>
  <component :is="instance" :data="data"></component>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import dialogs from "../dialogs/lazy-load";

interface dialogInterface {
  [key: string]: Function;
}

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      validator: () => true,
      required: false,
    },
  },
  setup(props) {
    let instance = ref(<any>null);

    (<dialogInterface>dialogs)[props.id]().then((data: any) => {
      instance.value = data.default;
    });

    return {
      instance,
      data: props.data,
    };
  },
});
</script>
