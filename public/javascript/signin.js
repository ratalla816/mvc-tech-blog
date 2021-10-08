

async function signinFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-signin').value.trim();
  const password = document.querySelector('#password-signin').value.trim();

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
      alert(response.statusText);
    }
  }
}

document.querySelector('#signin-form').addEventListener('submit', signinFormHandler);