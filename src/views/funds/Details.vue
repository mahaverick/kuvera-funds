<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div
            class="card-header d-flex align-items-center justify-content-between bg-secondary"
            style="min-height:4rem;"
          >
            <h4 class="m-0">{{fund.short_name}}</h4>
            <h4>
              <span class="badge badge-success">{{fund.category}}</span>
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 d-flex align-items-center">
                <dl class="row">
                  <dt class="col-md-3">Name</dt>
                  <dd class="col-md-9">{{fund.name}}</dd>
                  <dt class="col-md-3">Investment Objective</dt>
                  <dd class="col-md-9">{{fund.investment_objective}}</dd>
                  <dt class="col-md-3">Crisil Rating</dt>
                  <dd class="col-md-9">{{fund.crisil_rating}}</dd>
                  <dt class="col-md-3">Fund Manager</dt>
                  <dd class="col-md-9 text-capitalize">{{fund.fund_manager}}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Details",
  data() {
    return {
      fund: []
    };
  },
  created() {
    this.fetchFundDetails();
  },
  methods: {
    fetchFundDetails() {
      this.$Progress.start();
      axios
        .get(
          "https://api.kuvera.in/api/v3/funds/" +
            this.$route.params.code +
            ".json"
        )
        .then(response => {
          this.$Progress.finish();
          this.fund = response.data[0];
        })
        .catch(error => {
          this.$Progress.fail();
          console.log(error);
        });
    }
  }
};
</script>