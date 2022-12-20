<!-- eslint-disable vue/valid-define-props -->
<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import usePostStore from '../../store/Post';

const props = defineProps({
  id: { type: String, required: true },
});

const Router = useRouter();
const PostStore = usePostStore();

async function handleYes() {
  await PostStore.deletePost(props.id);
  if (PostStore.msgSuccess) Router.push('/dashboard/posts');
}
</script>

<template>
  <div class="modal fade" id="deletePost" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deletePostLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deletePostLabel">Delete Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body text-center">
          <h5 class="mb-3">Are you sure delete this POST?</h5>
          <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">No</button>
          <button type="button" class="btn btn-danger" @click="handleYes" data-bs-dismiss="modal">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>
