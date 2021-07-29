<template>
  <div class="create-profile">
    <div class="create-profile-header">
      <h1 class="create-profile-header-title">Criar perfil</h1>
    </div>

    <hr />
    <div class="create-profile-form-container">
      <CreateProfileForm :username="username" />
    </div>
  </div>
</template>

<script>
import CreateProfileForm from "./CreateProfileForm";

export default {
  props: ["username"],
  components: { CreateProfileForm },
};
</script>

<style>
.create-profile {
  padding: 20px;
}

.create-profile-header {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1em;
  width: 30%;
}

.create-profile-header-title {
  font-size: 1.7em;
  width: 100%;
}

.create-profile-form-container {
  display: flex;
  justify-content: center;
}
</style>