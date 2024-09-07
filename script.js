"use strict";
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
});
