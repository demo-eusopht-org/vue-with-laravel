<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { apiGet } from "../helper/apiHelper";
import logoutImage from "../assets/website_images/logout.png";
const route = useRouter();
function logout() {
    apiGet("/logout").then((response) => {
        if (response.status) {
            localStorage.removeItem("token");
            route.push({ name: "login" });
        }
    });
}
</script>
<template>
    <main>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <RouterLink to="/" class="navbar-brand" href="#"
                    >Crud App</RouterLink
                >
                <div class="collapse navbar-collapse">
                    <div class="navbar-nav">
                        <RouterLink
                            exact-active-class="active"
                            to="/"
                            class="nav-item nav-link"
                            >Home</RouterLink
                        >
                        <RouterLink
                            exact-active-class="active"
                            to="/posts"
                            class="nav-item nav-link"
                            >Posts</RouterLink
                        >
                    </div>
                    <ul class="navbar-nav ml-auto">
                        <button
                            @click="logout"
                            class="btn btn-danger float-right"
                        >
                            <img :src="logoutImage" width="25px" />
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container mt-5">
            <RouterView />
        </div>
    </main>
</template>
