document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // 2. Interactive Image Slider (Gallery Page)
    const galleryImages = [
        'images/university campus.jpeg',
        'images/3 stydents.jpeg',
        'images/2 student.jpeg',
        'images/2 mens student.jpeg'
    ];
    let currentIndex = 0;

    const sliderImage = document.getElementById('sliderImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (sliderImage && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? galleryImages.length - 1 : currentIndex - 1;
            sliderImage.src = galleryImages[currentIndex];
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === galleryImages.length - 1) ? 0 : currentIndex + 1;
            sliderImage.src = galleryImages[currentIndex];
        });
    }

    // 3. Toggleable FAQ Accordion (Resources Page)
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isVisible = content.style.display === 'block';
            
            document.querySelectorAll('.faq-content').forEach(item => item.style.display = 'none');
            
            if (!isVisible) {
                content.style.display = 'block';
            }
        });
    });

    // 4. FAQ Dropdown & Custom Input Logic (Resources Page)
    const faqSelect = document.getElementById('faqSelect');
    const customQuestionGroup = document.getElementById('customQuestionGroup');
    const customQuestion = document.getElementById('customQuestion');
    const faqForm = document.getElementById('faqForm');
    const faqAnswerDisplay = document.getElementById('faqAnswerDisplay');
    const answerTitle = document.getElementById('answerTitle');
    const answerText = document.getElementById('answerText');

    if (faqSelect) {
        faqSelect.addEventListener('change', () => {
            if (faqSelect.value === 'other') {
                customQuestionGroup.style.display = 'block';
                faqAnswerDisplay.style.display = 'none';
            } else {
                customQuestionGroup.style.display = 'none';
            }
        });
    }

    if (faqForm) {
        faqForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedValue = faqSelect.value;

            if (!selectedValue) {
                alert('Please select a question from the dropdown.');
                return;
            }

            faqAnswerDisplay.style.display = 'block';

            if (selectedValue === 'software') {
                answerTitle.textContent = 'How do I access the computer lab software?';
                answerText.textContent = 'All software required for CLI15W2B is pre-installed on every desktop in Building A, Lab 102. Login with your standard student portal credentials.';
            } else if (selectedValue === 'study_rooms') {
                answerTitle.textContent = 'Can we book study rooms for group assignments?';
                answerText.textContent = 'Yes, group study rooms can be reserved at the Library Level 2 help desk or submitted via our Contact page.';
            } else if (selectedValue === 'other') {
                const userQuery = customQuestion.value.trim();
                if (!userQuery) {
                    alert('Please type your question in the text box before submitting.');
                    faqAnswerDisplay.style.display = 'none';
                    return;
                }
                answerTitle.textContent = 'Question Submitted Successfully!';
                answerText.textContent = `Thank you for your question: "${userQuery}". A campus support staff member will respond to your registered student portal email soon.`;
                customQuestion.value = '';
            }
        });
    }

    // 5. Contact Form Submission via Formspree (Contact Page)
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!fullName || !email || !message) {
                formFeedback.style.color = '#dc3545';
                formFeedback.textContent = 'Please fill in all required fields.';
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                formFeedback.style.color = '#dc3545';
                formFeedback.textContent = 'Please enter a valid email address.';
                return;
            }

            const formData = new FormData(contactForm);

            try {
                formFeedback.style.color = '#0056b3';
                formFeedback.textContent = 'Sending inquiry to ICT Support...';

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formFeedback.style.color = '#28a745';
                    formFeedback.textContent = 'Inquiry sent successfully! ICT Support (250270463@mywsu.ac.za) has received your request.';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed.');
                }
            } catch (error) {
                formFeedback.style.color = '#dc3545';
                formFeedback.textContent = 'Oops! There was a problem submitting your form. Please try again.';
            }
        });
    }

});