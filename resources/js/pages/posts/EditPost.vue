<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Edit Post</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="update">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label
                                        >Title
                                        <span class="text-danger"
                                            >*</span
                                        ></label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="post.title"
                                        required="true"
                                    />
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="post.description"
                                    />
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiGet, apiPut } from "../../helper/apiHelper";

export default {
    name: "update-post",
    data() {
        return {
            post: {
                title: "",
                description: "",
            },
        };
    },
    mounted() {
        this.getPost();
    },
    methods: {
        async getPost() {
            await apiGet("/posts/" + this.$route.params.id, this.post)
                .then((response) => {
                    if (response.status) {
                        this.post.title = response.data.title;
                        this.post.description = response.data.description;
                    } else {
                        alert(response.data.message);
                    }
                    // this.$router.push({name:"posts"})
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        },
        async update() {
            await apiPut("/posts/" + this.$route.params.id, this.post)
                .then((response) => {
                    if (response.status) {
                        this.$router.push({ name: "posts" });
                    }
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        },
    },
};
</script>
