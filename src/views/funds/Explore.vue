<template>
  <section class="container">
    <!-- debug: sort={{currentSort}}, dir={{currentSortDir}}, current page={{currentPage}}, last page={{lastPage}} -->
    <div class="row">
      <div class="col-md-2">
        <div class="form-group">
          <label for="fund_category" class="label">Fund Category</label>
          <select
            name="fund_category"
            id="fund_category"
            class="form-control"
            v-model="selectedFundCategory"
          >
            <option value selected>-- No Fund Category --</option>
            <option
              :value="fund_category"
              v-for="fund_category in fund_categories"
              :key="fund_category"
            >{{fund_category}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <label for="fund_type" class="label">Fund Types</label>
          <select name="fund_type" id="fund_type" class="form-control" v-model="selectedFundType">
            <option value selected>-- No Fund Type --</option>
            <option
              :value="fund_type"
              v-for="fund_type in fund_types"
              :key="fund_type"
            >{{fund_type}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group">
          <label for="plan" class="label">Plan</label>
          <select name="plan" id="plan" class="form-control" v-model="selectedFundPlan">
            <option value selected>-- No Plans --</option>
            <option :value="plan" v-for="plan in plans" :key="plan">{{plan}}</option>
          </select>
        </div>
      </div>
      <div class="col-md-2"></div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="search" class="label">Search</label>

          <input
            name="search"
            id="search"
            type="text"
            v-model="search"
            class="form-control"
            placeholder="Search funds by name"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-light table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" @click="sort('name')" style="cursor:pointer">Name</th>
              <th scope="col" @click="sort('fund_category')" style="cursor:pointer">Category</th>
              <th scope="col" @click="sort('fund_type')" style="cursor:pointer">Type</th>
              <th scope="col" @click="sort('plan')" style="cursor:pointer">Plan</th>
              <th scope="col" @click="sort('returns.year_1')" style="cursor:pointer">
                Returns
                <br />
                <small class="font-italic">[ year 1 ]</small>
              </th>
              <th scope="col" @click="sort('returns.year_3')">
                Returns
                <br />
                <small class="font-italic">[ year 3 ]</small>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fund in pageItems" :key="fund.code">
              <td>
                <router-link :to="{name:'funds.details', params: {code: fund.code}}">{{fund.name}}</router-link>
              </td>
              <td>{{fund.fund_category}}</td>
              <td>{{fund.fund_type}}</td>
              <td>{{fund.plan}}</td>
              <td>{{fund.returns.year_1}}</td>
              <td>{{fund.returns.year_3}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 d-flex justify-content-between">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="currentPage == 1? 'disabled' : ''">
              <a class="page-link" @click="prevPage" href="javascript:;">Previous</a>
            </li>
            <li class="page-item" :class="currentPage == lastPage? 'disabled' : ''">
              <a class="page-link" @click="nextPage" href="javascript:;">Next</a>
            </li>
          </ul>
        </nav>
        <div>Page {{currentPage}}/{{lastPage}}</div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Explore",
  data() {
    return {
      funds: [],
      fundRepository: [],
      currentSort: "",
      currentSortDir: "",
      pageItems: [],
      pageSize: 100,
      currentPage: 1,
      search: "",
      selectedFundPlan: "",
      selectedFundCategory: "",
      selectedFundType: "",
      lastPage: "",
      selections: {
        plan: "",
        fund_type: "",
        fund_category: ""
      }
    };
  },

  created() {
    this.fetchAllFunds();
  },

  watch: {
    selections: {
      handler(val) {
        let filtered = this.fundRepository;
        for (let key in val) {
          if (val[key]) {
            filtered = filtered.filter(fund => {
              return (
                fund[key] &&
                fund[key].toLowerCase().indexOf(val[key].toLowerCase()) == 0
              );
            });
          }
        }
        this.currentPage = 1;
        this.paginate(filtered);
      },
      deep: true
    },
    selectedFundPlan(val) {
      if (val) {
        this.selections["plan"] = val;
      } else {
        this.selections["plan"] = "";
      }
    },

    selectedFundType(val) {
      if (val) {
        this.selections["fund_type"] = val;
      } else {
        this.selections["fund_type"] = "";
      }
    },

    selectedFundCategory(val) {
      if (val) {
        this.selections["fund_category"] = val;
      } else {
        this.selections["fund_category"] = "";
      }
    },

    search(val) {
      let searched = [];
      this.selectedFundPlan = "";
      this.selectedFundType = "";
      this.selectedFundCategory = "";
      if (val) {
        searched = this.fundRepository.filter(fund => {
          return fund.name.toLowerCase().indexOf(val.toLowerCase()) >= 0;
        });
      } else {
        searched = this.fundRepository;
      }
      this.currentPage = 1;
      this.paginate(searched);
    },

    currentSort(val) {
      let sorted = [];
      if (val) {
        // sorted = _.orderBy(this.funds, [val],[this.currentSortDir]);
        sorted = this.funds.sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;

          if (a[val]) {
            return a[val].localeCompare(b[val]) * modifier;
          }

          if (val === "returns.year_1") {
            return a.returns.year_1 < b.returns.year_1
              ? -1 * modifier
              : modifier;
          }

          if (val === "returns.year_3") {
            return a.returns.year_3 < b.returns.year_3
              ? -1 * modifier
              : modifier;
          }

          return modifier;
        });

        this.currentPage = 1;
        this.paginate(sorted);
      }
    },

    currentSortDir(val) {
      let sorted = [];
      if (val) {
        // sorted = _.orderBy(this.funds, [this.currentSort],[val]);
        sorted = this.funds.sort((a, b) => {
          let modifier = 1;
          if (val === "desc") modifier = -1;

          if (a[this.currentSort]) {
            return (
              a[this.currentSort].localeCompare(b[this.currentSort]) * modifier
            );
          }

          if (this.currentSort === "returns.year_1") {
            return a.returns.year_1 < b.returns.year_1
              ? -1 * modifier
              : modifier;
          }

          if (this.currentSort === "returns.year_3") {
            return a.returns.year_3 < b.returns.year_3
              ? -1 * modifier
              : modifier;
          }

          return modifier;
        });

        this.currentPage = 1;
        this.paginate(sorted);
      }
    }
  },

  computed: {
    fund_categories() {
      return [
        ...new Set(this.fundRepository.map(fund => fund.fund_category))
      ].filter(Boolean);
    },

    fund_types() {
      return [
        ...new Set(this.fundRepository.map(fund => fund.fund_type))
      ].filter(Boolean);
    },

    plans() {
      return [...new Set(this.fundRepository.map(fund => fund.plan))].filter(
        Boolean
      );
    }
  },

  methods: {
    fetchAllFunds() {
      this.$Progress.start();
      axios
        .get("https://api.kuvera.in/api/v3/funds.json")
        .then(response => {
          this.$Progress.finish();
          this.fundRepository = response.data;
          this.paginate(this.fundRepository);
        })
        .catch(error => {
          this.$Progress.fail();
          console.log(error);
        });
    },

    paginate(rows) {
      this.funds = rows;
      this.lastPage = Math.ceil(rows.length / this.pageSize);
      this.pageItems = rows.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },

    sort(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },

    nextPage() {
      if (this.currentPage * this.pageSize < this.funds.length) {
        this.currentPage++;
        this.paginate(this.funds);
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginate(this.funds);
      }
    }
  }
};
</script>

<style scoped>
.table thead th,
.table tbody td {
  vertical-align: middle;
}
</style>