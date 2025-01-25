<script setup></script>

<template>
  <div class="loader_cont">
    <img src="./3dots.gif" alt="" />
  </div>
</template>

<style>
.loader_cont {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  /* box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.7); */
  z-index: 999999;
}
</style>
