"use strict";
function adjustContentHeight() {
    const sideBar = document.querySelector('.side-bar');
    const contentContainer = document.querySelector('.content-container');
    if (sideBar && contentContainer) {
        contentContainer.style.height = `${sideBar.offsetHeight - 100}px`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const toggleSkillsButton = document.getElementById('toggleSkills');
    const skillsSection = document.getElementById('skillsSection');
    const toggleEducationButton = document.getElementById('toggleEducation');
    const educationSection = document.getElementById('educationSection');
    const toggleVisibility = (section, button) => {
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
    const resumeForm = document.getElementById('resumeForm');
    const formContainer = document.getElementById('formContainer');
    const resumeContainer = document.getElementById('resumeContainer');
    const controlsContainer = document.getElementById('controlsContainer');
    const addJobButton = document.getElementById('addJobButton');
    const jobFieldsContainer = document.getElementById('jobFieldsContainer');
    const experienceContainer = document.querySelector('.experience-container');
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
        const name = document.getElementById('name').value;
        const profilePicture = document.getElementById('profilePicture').value;
        const organization = document.getElementById('organization').value;
        const location = document.getElementById('location').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const expertise = document.getElementById('expertise').value;
        const education = document.getElementById('education').value;
        const bioInput = document.getElementById('bio').value;
        // Update resume preview
        document.getElementById('resumeName').textContent = name;
        document.getElementById('profileImage').src = profilePicture;
        document.getElementById('organizationDisplay').textContent = `Organization: ${organization}`;
        document.getElementById('locationDisplay').textContent = `Location: ${location}`;
        document.getElementById('resumeEmail').textContent = `Email: ${email}`;
        document.getElementById('resumePhone').textContent = `Phone: ${phone}`;
        document.getElementById('dynamicBio').textContent = bioInput;
        // (document.getElementById('skillsSection') as HTMLInputElement).textContent = expertise;
        // (document.getElementById('educationSection') as HTMLInputElement).textContent = education;
        // Update Expertise section
        const expertiseList = expertise.split(',').map(item => item.trim());
        const expertiseContainer = document.getElementById('skillsSection');
        expertiseContainer.innerHTML = ''; // Clear previous entries
        expertiseList.forEach(item => {
            const expertiseItem = document.createElement('p');
            expertiseItem.classList.add('rela-block', 'list-thing');
            expertiseItem.textContent = item;
            expertiseContainer.appendChild(expertiseItem);
        });
        // Update Education section
        const educationList = education.split(',').map(item => item.trim());
        const educationContainer = document.getElementById('educationSection');
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
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    const resumeContainer = document.getElementById('resumeContainer');
    function toggleEditMode(editMode) {
        resumeContainer.contentEditable = editMode ? 'true' : 'false';
        resumeContainer.classList.toggle('editing', editMode);
        editButton.style.display = editMode ? 'none' : 'inline-block';
        saveButton.style.display = editMode ? 'inline-block' : 'none';
    }
    editButton.addEventListener('click', () => {
        toggleEditMode(true);
    });
    downloadPdfButton.addEventListener('click', () => {
        const { html2canvas } = window;
        html2canvas(resumeContainer, {
            allowTaint: true,
            foreignObjectRendering: true,
            scale: 1, // Adjust for better quality
        }).then((canvas) => {
            const { jsPDF } = window.jspdf;
            const imgData = canvas.toDataURL('image/png');
            // Initialize jsPDF with 'p' (portrait) mode, 'mm' unit, and 'a4' format
            const pdf = new jsPDF('p', 'mm', 'a4');
            // A4 dimensions
            const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm for A4
            const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm for A4
            // Canvas dimensions
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            // Calculate the aspect ratio to fit the image into the PDF's width
            const imgHeight = (pdfWidth * canvasHeight) / canvasWidth;
            let heightLeft = imgHeight;
            let position = 0;
            // Add the first page
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
            // Add more pages if necessary
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }
            // Save the PDF
            pdf.save('resume.pdf');
        });
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
