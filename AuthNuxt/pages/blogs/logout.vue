<template>
    <div>
        <!-- Your UI components -->
        <v-btn @click="logout">Logout</v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        // Your other methods...

        async logoutUser() {
            try {
                // Make a request to the logout endpoint
                await this.$axios.delete('/users/logout');

                // Clear the user information on the client-side
                this.$auth.setUser(false);

                // Redirect or perform other actions after successful logout
                console.log("Logout successful");
            } catch (err) {
                console.log(err);
            }
            // $nuxt.$auth.strategy.token.get()  (this is process to call token that has loggin)
        },
         logout(){
            this.$auth.strategy.token.reset()
        }
    },
};
</script>