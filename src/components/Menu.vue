<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column" >
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" aria-current="page" :to="{name: 'Dashboard'}">
            <span data-feather="home"></span>
            Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" aria-current="page" :to="{name: 'users.index'}">
            <span data-feather="home"></span>
            Users
          </router-link>
        </li>

      </ul>
    </div>
  </nav>
</template>

<script>
export default {
name: "Menu"
}
</script>

<style scoped>
.nav-item a {
  color: black;
}
.nav-item a.active {
  color: cadetblue;
  font-weight: bold;
}
</style>