<template>
    <component :is="instance" :data="data"></component>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        dialog: {
            type: Function,
            required: true,
        },
        data: {
            validator: () => true,
            required: false,
        },
    },
    setup(props) {
        let instance = ref(<any>null);

        props.dialog().then((data: any) => {
            instance.value = data.default;
        });

        return {
            instance,
            data: props.data,
        };
    },
});
</script>