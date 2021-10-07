
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector ('#username-signup') .value.trim();
    const password = document.querySelector ('#password-signup') .value.trim();
    const email = document.querySelector ('#email-signup') .value.trim();
    
  
    if (username && password && email) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify ({ username, password, email }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) { document.location.replace('/dashboard');} 
      else { alert(response.statusText); }
    }}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector ('#email-login').value.trim();
  const password = document.querySelector ('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {document.location.replace('/dashboard/');} 
    else { alert(response.statusText);}
  }}

document.querySelector ('#signup-form').addEventListener ('click', signupFormHandler);
document.querySelector ('#lognin-form').addEventListener ('click', logninFormHandler);
// document.querySelector('.signup-form').addEventListener ('submit', signupFormHandler); 
// document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
