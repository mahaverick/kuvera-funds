<template>
  <header class="container py-4">
    <div class="inner">
      <h4 class="kuvera-brand text-uppercase">Kuvera Funds</h4>
      <nav class="nav nav-kuvera justify-content-center">
          <router-link class="nav-link" exact to="/">Home</router-link>
          <router-link class="nav-link" exact to="/funds">Explore</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.kuvera-brand {
  color: #112e4b;
}

.nav-kuvera .nav-link {
  padding: .25rem 0;
  font-weight: 600;
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-kuvera .nav-link:hover,
.nav-kuvera .nav-link:focus {
  border-bottom-color: #2a2a91;
}

.nav-kuvera .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-kuvera .router-link-active {
  color: #2a2a91;
  border-bottom-color:#2a2a91;
}

@media (min-width: 48em) {
  .kuvera-brand {
    float: left;
  }
  .nav-kuvera {
    float: right;
  }
}

</style>