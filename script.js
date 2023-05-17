const cloudName = 'dkaxmhco0';
const unsignedUploadPreset = 'lqt0ve5g';
var fileSelect = document.getElementById("fileSelect"),
fileElem = document.getElementById("fileElem"),
urlSelect = document.getElementById("urlSelect");
fileSelect.addEventListener("click", function (e) {
if (fileElem) {
  fileElem.click();
}
e.preventDefault();
}, false);
urlSelect.addEventListener("click", function (e) {
uploadFile('https://res.cloudinary.com/dkaxmhco0/image/upload/sample.jpg');
e.preventDefault();
}, false);
function dragenter(e) {
e.stopPropagation();
e.preventDefault();
}
function dragover(e) {
e.stopPropagation();
e.preventDefault();
}
dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
function drop(e) {
e.stopPropagation();
e.preventDefault();
var dt = e.dataTransfer;
var files = dt.files;
handleFiles(files);
}
function uploadFile(file) {
var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
var xhr = new XMLHttpRequest();
var fd = new FormData();
xhr.open('POST', url, true);
xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
document.getElementById('progress').style.width = 0;
xhr.upload.addEventListener("progress", function (e) {
  var progress = Math.round(e.loaded * 100.0 / e.total);
  document.getElementById('progress').style.width = progress + "%";

  console.log(`fileuploadprogress data.loaded: ${e.loaded},
data.total: ${e.total}`);
});

xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    var url = response.secure_url;
    var tokens = url.split('/');
    tokens.splice(-2, 0, 'w_1080,h_1920,c_fill');
    var img = new Image();
    img.src = tokens.join('/');
    img.alt = response.public_id;
    document.getElementById('gallery').appendChild(img);
  }
};
fd.append('upload_preset', unsignedUploadPreset);
fd.append('tags', 'browser_upload');
fd.append('file', file);
xhr.send(fd);
}
var handleFiles = function (files) {
for (var i = 0; i < files.length; i++) {
  uploadFile(files[i]);
}
};


function processFile() {
  const fileInput = document.getElementById('txtFileInput');
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const content = event.target.result;
      const lines = content.split('\n');
      if (lines.length >= 20) {
        const imageNames = [];
        const descriptions = [];
        for (let i = 0; i < 10; i++) {
          const imageName = lines[i * 2].trim() || '%20';
          const description = lines[i * 2 + 1].trim() || '%20';
          const encodedImageName = imageName.replace(/,/g, '%E2%80%9A').replace(/\?/g, '%3F');
          const encodedDescription = description.replace(/,/g, '%E2%80%9A').replace(/\?/g, '%3F');
          imageNames.push(encodedImageName);
          descriptions.push(encodedDescription);
        }
        const cloudinaryURL = 'https://res.cloudinary.com/dkaxmhco0/video/upload/fn_render:fps_25;vars_(';
        let titleVariables = '';
        let imageVariables = '';
        for (let i = 0; i < 10; i++) {
          const titleVar = `title${i + 1}_${descriptions[i]}`;
          const imageVar = `image${i + 1}_${imageNames[i]}`;
          titleVariables += `${titleVar};`;
          imageVariables += `${imageVar};`;
        }
        const finalURL = `${cloudinaryURL}${imageVariables}${titleVariables})/l_audio:audio_1/final-1.mp4`;
        const downloadButton = document.createElement('a');
        downloadButton.href = finalURL;
        downloadButton.textContent = 'Download Video';
        const cloudinaryURLDisplay = document.getElementById('cloudinaryURL');
        cloudinaryURLDisplay.innerHTML = '';
        cloudinaryURLDisplay.appendChild(downloadButton);
      } else {
        alert('Invalid file format. The file should contain 10 image names and 10 descriptions.');
      }
    };

    reader.readAsText(file);
  } else {
    alert('No file selected.');
  }
}