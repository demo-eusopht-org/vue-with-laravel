<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand" href="#"
                >Crud App</RouterLink
            >
            <div class="collapse navbar-collapse">
                <div class="navbar-nav ml-auto">
                    <RouterLink
                        exact-active-class="active"
                        to="/register"
                        class="nav-item nav-link"
                        >Register</RouterLink
                    >
                </div>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label for="email" class="form-label"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    v-model="auth.email"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    v-model="auth.password"
                                    required
                                />
                            </div>
                            <!-- <span v-if="errors.name" class="error" v-for="(error, index) in errors.name" :key="index">{{ error }}</span> -->
                            <button type="submit" class="btn btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue";
import { apiPost } from "../../helper/apiHelper";
export default {
    data() {
        return {
            auth: {
                email: "",
                password: "",
            },
            errors: null,
        };
    },
    methods: {
        login() {
            this.errors = null;
            apiPost("/login", this.auth)
                .then((response) => {
                    if (response.status) {
                        localStorage.setItem("token", response.token);
                        if (this.$route.query.redirect) {
                            this.$router.push({
                                path: this.$route.query.redirect,
                            });
                        } else {
                            this.$router.push({
                                name: "dashboard",
                            });
                        }
                    } else {
                        alert(response.message);
                    }
                })
                .catch((error) => {
                    // console.log("error", error);
                    alert(error?.response?.data?.message);
                    this.errors = error?.response?.data?.errors;
                });
        },
    },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
