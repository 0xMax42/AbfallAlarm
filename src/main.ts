// main.ts
import IcsModifier from './IcsModifier';

// Event listener for DOMContentLoaded to initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Loading the WebApp...');

    const workButton = document.getElementById('work-button') as HTMLButtonElement;
    const fileInput = document.getElementById('ical-upload') as HTMLInputElement;

    // Enable the work button once a file is selected
    fileInput.addEventListener('change', () => {
        workButton.disabled = false;
    });

    // Set up the click event for processing the file
    workButton.addEventListener('click', fileInputEvent);
});

// Handles the file input event
function fileInputEvent(event: Event) {
    hideDownloadArea();
    const fileInput = document.getElementById('ical-upload') as HTMLInputElement;

    const reminderDaysElement = document.getElementById('reminder-days-select') as HTMLSelectElement;
    const reminderHoursElement = document.getElementById('reminder-hours-select') as HTMLSelectElement;

    // Parse reminder settings from the form
    const reminderDays = parseInt(reminderDaysElement.value, 10);
    const reminderHours = parseInt(reminderHoursElement.value, 10);

    // Get the uploaded file
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
        console.log('File uploaded:', file.name);

        // Read the file content
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target?.result;

            if (typeof fileContent === 'string') {
                console.log('File content readable..');
                // Modify the ICS content with reminders
                const icsModifier = new IcsModifier(fileContent, reminderDays, reminderHours);
                const newIcsContent = icsModifier.modifyEvents();

                // Generate the new filename and set up download
                const newFileName = getNewFileName(file.name);
                const blob = new Blob([newIcsContent], { type: 'text/calendar' });
                const downloadUrl = URL.createObjectURL(blob);
                setupDownloadArea(newFileName, downloadUrl);
            }
        };
        reader.readAsText(file); // Read the file as text
    }
}

// Function to generate a new file name with reminders
function getNewFileName(originalFileName: string): string {
    const dotIndex = originalFileName.lastIndexOf('.');
    if (dotIndex === -1) {
        return originalFileName + ' with reminders';
    }
    return originalFileName.substring(0, dotIndex) + ' with reminders' + originalFileName.substring(dotIndex);
}

// Sets up the download area with the download link
function setupDownloadArea(fileName: string, url: string) {
    const downloadArea = document.getElementById('download-area');
    const downloadButton = document.getElementById('download-button') as HTMLAnchorElement;

    if (downloadArea && downloadButton) {
        downloadButton.href = url;
        downloadButton.download = fileName;

        // Add class to start the animation for the download area
        setTimeout(() => downloadArea.classList.add('show-download-area'), 0);

        // Disable the work button after processing
        const workButton = document.getElementById('work-button') as HTMLButtonElement;
        workButton.disabled = true;
    }
}

// Hides the download area
function hideDownloadArea() {
    const downloadArea = document.getElementById('download-area');
    if (downloadArea) {
        downloadArea.classList.remove('show-download-area');
    }
}
