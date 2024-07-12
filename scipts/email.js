document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();

      // Prepare the data to be sent
      const formData = new FormData(this);
      const templateParams = {
        from_name: `${formData.get('first_name')} ${formData.get('last_name')}`,
        to_name: 'Abbas Uddin'
        ,
        email: formData.get('email'),
        reply_to: formData.get('email'),
        message: formData.get('comments'),
      };

      // Send the email
      emailjs.send('service_eg730jo', 'template_9i94an9', templateParams)
        .then(function() {
          alert('Email sent successfully!');
        }, function(error) {
          alert('Failed to send email. Error: ' + JSON.stringify(error));
        });
    });
