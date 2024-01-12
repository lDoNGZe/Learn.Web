<template>
  <div>
    <upload-file
    :keyName="file"
    :uploadLimit="1"
    >上唇文件</upload-file>
  </div>
</template>

<script>
import uploadFile from "@/components/basic/components/upload-file.vue";
export default {
  components: { uploadFile },
};
</script>

<style>
</style>