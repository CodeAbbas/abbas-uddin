window.onload = function() {
  // Initialize EmailJS with Public Key
  emailjs.init('Z35F2ocDmFcEAPZdS');
  
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    const serviceID = 'service_ovmjtxd';
    const templateID = 'template_pci5pcv';
    
    const templateParams = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Send the email
    emailjs.send(serviceID, templateID, templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        //success function to show a message
        showFormSuccess('Your message has been sent successfully!');
        // Reset the form
        document.getElementById('contactForm').reset();
      }, function(error) {
        console.log('FAILED...', error);
        //error function to show a message
        showFormError('Failed to send message. Please try again.');
      });
  });
}

// Form error message
function showFormError(message) {
  let errorElement = document.querySelector(".form-error");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "form-error";
    errorElement.style.color = "#ff4d4d";
    errorElement.style.marginTop = "1rem";
    errorElement.style.padding = "0.75rem";
    errorElement.style.borderRadius = "0.5rem";
    errorElement.style.backgroundColor = "rgba(255, 77, 77, 0.1)";
    errorElement.style.borderLeft = "3px solid #ff4d4d";
    document.getElementById('contactForm').appendChild(errorElement);
  }
  errorElement.textContent = message;
  setTimeout(() => { errorElement.remove(); }, 5000);
}

// Form success message
function showFormSuccess(message) {
  let successElement = document.querySelector(".form-success");
  if (!successElement) {
    successElement = document.createElement("div");
    successElement.className = "form-success";
    successElement.style.color = "#03dac6";
    successElement.style.marginTop = "1rem";
    successElement.style.padding = "0.75rem";
    successElement.style.borderRadius = "0.5rem";
    successElement.style.backgroundColor = "rgba(3, 218, 198, 0.1)";
    successElement.style.borderLeft = "3px solid #03dac6";
    document.getElementById('contactForm').appendChild(successElement);
  }
  successElement.textContent = message;
  setTimeout(() => { successElement.remove(); }, 5000);
}