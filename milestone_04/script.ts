function adjustContentHeight() {
    const sideBar = document.querySelector('.side-bar') as HTMLElement;
    const contentContainer = document.querySelector('.content-container') as HTMLElement;

    if (sideBar && contentContainer) {
        contentContainer.style.height = `${sideBar.offsetHeight - 100}px`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleSkillsButton = document.getElementById('toggleSkills') as HTMLButtonElement;
    const skillsSection = document.getElementById('skillsSection') as HTMLDivElement;

    const toggleEducationButton = document.getElementById('toggleEducation') as HTMLButtonElement;
    const educationSection = document.getElementById('educationSection') as HTMLDivElement;

    const toggleVisibility = (section: HTMLDivElement, button: HTMLButtonElement) => {
        const isVisible = section.style.display === 'flex';
        section.style.display = isVisible ? 'none' : 'flex';
        button.innerHTML = isVisible ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    };

    toggleSkillsButton.addEventListener('click', () => {
        toggleVisibility(skillsSection, toggleSkillsButton);
    });

    toggleEducationButton.addEventListener('click', () => {
        toggleVisibility(educationSection, toggleEducationButton);
    });

    // Form functionality
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    const formContainer = document.getElementById('formContainer') as HTMLFormElement;
    const resumeContainer = document.getElementById('resumeContainer') as HTMLFormElement;
    const controlsContainer = document.getElementById('controlsContainer') as HTMLFormElement;

    const addJobButton = document.getElementById('addJobButton') as HTMLButtonElement;
    const jobFieldsContainer = document.getElementById('jobFieldsContainer') as HTMLDivElement;
    const experienceContainer = document.querySelector('.experience-container') as HTMLDivElement;

    addJobButton.addEventListener('click', () => {
        const newJobFields = document.createElement('div');
        newJobFields.className = 'job-fields';
        newJobFields.innerHTML = `
            <input type="text" name="jobTitle[]" placeholder="Job Title" required>
            <input type="text" name="jobSubtitle[]" placeholder="Subtitle" required>
            <textarea name="jobDescription[]" placeholder="Description" required></textarea>
        `;
        jobFieldsContainer.appendChild(newJobFields);
    });

    resumeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const profilePicture = (document.getElementById('profilePicture') as HTMLInputElement).value;
        const organization = (document.getElementById('organization') as HTMLInputElement).value;
        const location = (document.getElementById('location') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const expertise = (document.getElementById('expertise') as HTMLTextAreaElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const bioInput = (document.getElementById('bio') as HTMLTextAreaElement).value;

        // Update resume preview
        (document.getElementById('resumeName') as HTMLInputElement).textContent = name;
        (document.getElementById('profileImage') as HTMLImageElement).src = profilePicture;
        (document.getElementById('organizationDisplay') as HTMLElement).textContent = `Organization: ${organization}`;
        (document.getElementById('locationDisplay') as HTMLElement).textContent = `Location: ${location}`;
        (document.getElementById('resumeEmail') as HTMLInputElement).textContent = `Email: ${email}`;
        (document.getElementById('resumePhone') as HTMLInputElement).textContent = `Phone: ${phone}`;
        (document.getElementById('dynamicBio') as HTMLInputElement).textContent = bioInput;
        // (document.getElementById('skillsSection') as HTMLInputElement).textContent = expertise;
        // (document.getElementById('educationSection') as HTMLInputElement).textContent = education;

        // Update Expertise section
        const expertiseList = expertise.split(',').map(item => item.trim());
        const expertiseContainer = document.getElementById('skillsSection') as HTMLInputElement;
        expertiseContainer.innerHTML = ''; // Clear previous entries
        expertiseList.forEach(item => {
            const expertiseItem = document.createElement('p');
            expertiseItem.classList.add('rela-block', 'list-thing');
            expertiseItem.textContent = item;
            expertiseContainer.appendChild(expertiseItem);
        });

        // Update Education section
        const educationList = education.split(',').map(item => item.trim());
        const educationContainer = document.getElementById('educationSection') as HTMLInputElement;
        educationContainer.innerHTML = ''; // Clear previous entries
        educationList.forEach(item => {
            const educationItem = document.createElement('p');
            educationItem.classList.add('rela-block', 'list-thing');
            educationItem.textContent = item;
            educationContainer.appendChild(educationItem);
        });

        // Clear previous job entries
        experienceContainer.innerHTML = '';

        // Get form data
        const formData = new FormData(resumeForm);
        const titles = formData.getAll('jobTitle[]');
        const subtitles = formData.getAll('jobSubtitle[]');
        const descriptions = formData.getAll('jobDescription[]');

        // Create and add job entries
        titles.forEach((title, index) => {
            if (title && subtitles[index] && descriptions[index]) {
                const jobItem = document.createElement('div');
                jobItem.classList.add('experience-item');
                jobItem.innerHTML = `
                     <h3>${title}</h3>
                     <p class="light">${subtitles[index]}</p>
                     <p class="justified">${descriptions[index]}</p>
                 `;
                experienceContainer.appendChild(jobItem);
            }
        });

        // Hide the form and show the resume
        formContainer.classList.add('hidden');
        resumeContainer.classList.remove('hidden');
        controlsContainer.classList.remove('hidden');
        adjustContentHeight();
    });

});

document.addEventListener('DOMContentLoaded', () => {

    // Adjust the height initially
    adjustContentHeight();

    // Adjust the height whenever the window is resized
    window.addEventListener('resize', adjustContentHeight);
});

document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('editButton') as HTMLButtonElement;
    const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
    const resumeContainer = document.getElementById('resumeContainer') as HTMLElement;

    function toggleEditMode(editMode: boolean) {
        resumeContainer.contentEditable = editMode ? 'true' : 'false';
        resumeContainer.classList.toggle('editing', editMode);
        editButton.style.display = editMode ? 'none' : 'inline-block';
        saveButton.style.display = editMode ? 'inline-block' : 'none';
    }

    editButton.addEventListener('click', () => {
        toggleEditMode(true);
    });

    saveButton.addEventListener('click', () => {
        toggleEditMode(false);
    });

    // Optional: Save changes on blur or enter key press
    resumeContainer.addEventListener('blur', () => {
        if (resumeContainer.contentEditable === 'true') {
            toggleEditMode(false);
        }
    });

    resumeContainer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey && resumeContainer.contentEditable === 'true') {
            event.preventDefault();
            resumeContainer.blur();
        }
    });
});