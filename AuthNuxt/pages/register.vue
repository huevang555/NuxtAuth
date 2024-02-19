<template>
  <v-card flat>
    <v-form @submit.prevent="loginUser" @keydown.enter="loginUser">
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="fname" label="Username" required></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
    </v-form>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="1024">
        <template #activator="{ props }">
          <v-btn color="primary" v-bind="props" @click="registerUser">
            Open Dialog
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">User OTP Number</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-otp-input
                  v-model="otp"
                  :length="4"
                  type="number"
                ></v-otp-input>
              </v-row>
            </v-container>
            <small>*OTP number required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="saveAndResetForm"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout" location="right">
        {{ text }}

        <template #actions>
          <v-btn color="blue" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      fname: '',
      password: '',
      dialog: false,
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
      otp: null,
    }
  },
  methods: {
    async registerUser() {
      try {
        if (this.email !== '' && this.fname !== '' && this.password !== '') {
          const response = await this.$axios.post(
            'http://localhost:3100/users/sendemailotp',
            {
              email: this.email,
              fname: this.fname,
              password: this.password,
            }
          )
          console.log(response.data)
          if (response.data === 'email already exists!!!') {
            this.snackbar = true
            return 0
          } else {
            this.dialog = true
          }
        } else {
          this.snackbar = true
        }
      } catch (error) {
        console.error(error)
        // Handle the error, show an error message, or navigate to an error page
      }
    },
   async saveAndResetForm() {
      // Perform save operation here
      const response = await this.$axios.post(
            'http://localhost:3100/users/checkmailotp',
            {
              email: this.email,
              otp:this.otp
            }
          )
          console.log(response.data);
            if (response.data === 'Register fail') {
            this.snackbar = true
            return 0
          } else {
            this.dialog = true
          }
      // After save operation, reset form values and close the dialog
      this.email = ''
      this.fname = ''
      this.password = ''
      this.otp = null
      this.dialog = false
    },
  },
}
</script>
