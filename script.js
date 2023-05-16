function processFile() {
    const fileInput = document.getElementById('txtFileInput');
    const file = fileInput.files[0];
    
    if (file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
    const content = event.target.result;
    const lines = content.split('\n');
    
    if (lines.length >= 20) {
    // Assuming the file has 10 image names and 10 descriptions
    const imageNames = [];
    const descriptions = [];
    
    for (let i = 0; i < 10; i++) {
    const imageName = lines[i * 2].trim();
    const description = lines[i * 2 + 1].trim();
    
    imageNames.push(imageName);
    descriptions.push(description);
    }
    
    const cloudinaryURL = 'https://res.cloudinary.com/dkaxmhco0/video/upload/fn_render:fps_25;vars_(';
    
    // Build the title and image variables for Cloudinary URL
    let titleVariables = '';
    let imageVariables = '';
    
    for (let i = 0; i < 10; i++) {
    const titleVar = `title${i + 1}_${descriptions[i]}`;
    const imageVar = `image${i + 1}_${imageNames[i]}`;
    
    titleVariables += `${titleVar};`;
    imageVariables += `${imageVar};`;
    }
    
    const finalURL = `${cloudinaryURL}${imageVariables}${titleVariables})/final-1.mp4`;
    
    // Create a link button to download the video
    const downloadButton = document.createElement('a');
    downloadButton.href = finalURL;
    downloadButton.textContent = 'Download Video';
    
    // Display the download button in the frontend
    const cloudinaryURLDisplay = document.getElementById('cloudinaryURL');
    cloudinaryURLDisplay.innerHTML = '';
    cloudinaryURLDisplay.appendChild(downloadButton);
    } else {
    console.log('Invalid file format. The file should contain 10 image names and 10 descriptions.');
    }
    };
    
    reader.readAsText(file);
    } else {
    console.log('No file selected.');
    }
    }
    