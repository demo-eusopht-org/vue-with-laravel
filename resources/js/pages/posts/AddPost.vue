<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Add Post</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="create">
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
                                    Save
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
import { apiPost } from "../../helper/apiHelper";

export default {
    name: "add-post",
    data() {
        return {
            post: {
                title: "",
                description: "",
            },
        };
    },
    methods: {
        async create() {
            apiPost("/post", this.post)
                .then((response) => {
                    if (response.status) {
                        this.$router.push({ name: "posts" });
                    } else {
                        alert(response.message);
                    }
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        },
    },
};
</script>
