<template>
  <v-card>
    <v-form @submit.prevent="loginUser" @keydown.enter="loginUser">
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="fname" label="Username" required></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
      <v-btn type="submit" color="primary" @click="getuser">user</v-btn>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      fname: '',
      password: '',
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            fname: this.fname,
            password: this.password,
          },
        })

        // Redirect or perform other actions after successful login
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
    async getuser() {
      try {
       await this.$auth.user.fetchUser();
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
