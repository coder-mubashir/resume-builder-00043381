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
});