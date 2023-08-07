const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  btn.value = 'Sending...';

  const serviceID = 'default_service';
  const templateID = 'template_4au4kf6';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    })
    .catch((err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
