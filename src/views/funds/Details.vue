<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div
            class="card-header text-white d-flex align-items-center justify-content-between bg-primary"
            style="min-height:4rem;"
          >
            <h4 class="m-0">{{fund.short_name}}</h4>
            <h4>
              <span class="badge badge-light">{{fund.category}}</span>
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
                  <dt class="col-md-3">Plan</dt>
                  <dd class="col-md-9">{{fund.plan}}</dd>
                  <dt class="col-md-3">Fund Category</dt>
                  <dd class="col-md-9">{{fund.fund_category}}</dd>
                  <dt class="col-md-3">Fund Manager</dt>
                  <dd class="col-md-9 text-capitalize">{{fund.fund_manager}}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dl class="row mt-4">
      <dl class="col-md-12">
        <dl class="card-deck">
          <dl class="card">
            <div class="card-header">
              <h5 class="m-0">More Information</h5>
            </div>
            <dl class="card-body">
              <dl class="row">
                <dt class="col-md-5">Start Date</dt>
                <dd class="col-md-7">{{fund.start_date}}</dd>
                <dt class="col-md-5">Crisil Rating</dt>
                <dd class="col-md-7">{{fund.crisil_rating}}</dd>
                <dt class="col-md-5">Maturity Type</dt>
                <dd class="col-md-7 text-capitalize">{{fund.maturity_type}}</dd>
              </dl>
            </dl>
          </dl>
          <div class="card">
            <div class="card-header">
              <h5 class="m-0">Returns</h5>
            </div>
            <div class="card-body">
              <dl class="row">
                <dt class="col-md-5">
                  Returns
                  <small>[Year 1]</small>
                </dt>
                <dd class="col-md-7">{{fund.returns ? fund.returns.year_1 : null}}</dd>
                <dt class="col-md-5">
                  Returns
                  <small>[Year 3]</small>
                </dt>
                <dd class="col-md-7">{{fund.returns ? fund.returns.year_3 : null}}</dd>
                <dt class="col-md-5">
                  Returns
                  <small>[Year 5]</small>
                </dt>
                <dd class="col-md-7">{{fund.returns ? fund.returns.year_5 : null}}</dd>
              </dl>
            </div>
          </div>
        </dl>
      </dl>
    </dl>
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