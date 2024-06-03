<template>
    <div class="row">
        <div class="col-12 mb-2 text-end">
            <router-link :to="{ name: 'postCreate' }" class="btn btn-primary"
                >Create a Post</router-link
            >
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Posts</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="posts.length > 0">
                                <tr v-for="(post, key) in posts" :key="key">
                                    <td>{{ post.id }}</td>
                                    <td>{{ post.title }}</td>
                                    <td>{{ post.description }}</td>
                                    <td>
                                        <router-link
                                            :to="{
                                                name: 'postEdit',
                                                params: { id: post.id },
                                            }"
                                            class="btn btn-success mr-2"
                                            >Edit</router-link
                                        >
                                        <button
                                            type="button"
                                            @click="deleteCategory(post.id)"
                                            class="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" align="center">
                                        No Posts Found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiDelete, apiGet } from "../../helper/apiHelper";

export default {
    name: "posts",
    data() {
        return {
            posts: [],
        };
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        async getPosts() {
            await apiGet("/posts")
                .then((response) => {
                    if (response.status) {
                        console.log("response", response.data);
                        this.posts = response.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.posts = [];
                });
        },
        deleteCategory(id) {
            if (confirm("Are you sure to delete this post?")) {
                apiDelete(`/posts/${id}`)
                    .then((response) => {
                        if (response.status) {
                            this.getPosts();
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch((error) => {
                        alert(error.response.data.message);
                    });
            }
        },
    },
};
</script>
