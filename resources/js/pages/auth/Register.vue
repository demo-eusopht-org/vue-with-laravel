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
                        to="/login"
                        class="nav-item nav-link"
                        >Login</RouterLink
                    >
                </div>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label for="first_name" class="form-label"
                                    >First Name</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="first_name"
                                    v-model="auth.first_name"
                                    max="15"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="last_name" class="form-label"
                                    >Last Name</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="last_name"
                                    v-model="auth.last_name"
                                    max="15"
                                    required
                                />
                            </div>
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
                            <div class="mb-3">
                                <label for="password" class="form-label"
                                    >Confirm Password</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password_confirmation"
                                    v-model="auth.password_confirmation"
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Register
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
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
        };
    },
    methods: {
        register() {
            console.log(this.password, "==", this.password_confirmation);
            if (this.password == this.password_confirmation) {
                apiPost("/register", this.auth)
                    .then((response) => {
                        if (response.status) {
                            alert(response.message);
                            localStorage.setItem("token", response.token);
                            this.$router.push({ name: "dashboard" });
                        } else {
                            alert(response.message);
                        }
                    })
                    .catch((error) => {
                        // if (error.response.data.message == "validation error") {

                        // } else {
                        alert(error.response.data.message);
                        // }
                    });
            } else {
                alert("Password and confirm password do not match");
            }
        },
    },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
