const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // To store the deferred prompt event

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Prevent the default browser prompt
  deferredPrompt = event; // Store the event for later use
  showInstallButton(); // Show the install button
});

// Event handler for the "Install" button click
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the browser prompt to install the PWA
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      console.log('PWA installed');
    } else {
      console.log('PWA installation declined');
    }
    deferredPrompt = null; // Reset the deferred prompt
    hideInstallButton(); // Hide the install button
  }
});

// Event handler for the "appinstalled" event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
});

// Helper function to show the install button
function showInstallButton() {
  butInstall.style.display = 'block';
}

// Helper function to hide the install button
function hideInstallButton() {
  butInstall.style.display = 'none';
}
