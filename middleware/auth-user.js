export default function ({ $auth, redirect }) {
  const user = $auth.loggedIn
  if (user) {
    redirect('/')
  }
}
