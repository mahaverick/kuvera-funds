<template>
  <div class="home container">
    <div class="row align-items-center justify-content-center" style="min-height:30rem;">
      <div class="col-md-12">
        <h3 class="text-center">
          Kuvera Funds Assignment
          <br />
          <small class="text-muted">built by Abhijeet Mahavarkar</small>
        </h3>
        <br>
        <h5 class="text-center mt-4">
          <router-link class="nav-link" exact to="/funds">Go to Funds Explore Page</router-link>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>
