//Function to login to workout tracker pro app
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('input[name="email-login"]').value.trim();
  const password = document.querySelector('input[name="password-login"]').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      swal("Try Again!", "Incorrect email or password!", "error");
    }
  }
}

//Function to sign-up to workout tracker pro app
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      //alert(response.statusText);
      swal("Try Again!", "Email is either taken or invalid!", "error");
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);