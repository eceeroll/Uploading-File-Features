// selecting dom elements
const dropArea = document.querySelector(".drag-area");
const header = document.getElementsByTagName("header")[0];
const browseFile = document.querySelector("button");
const input = document.getElementsByTagName("input")[0];

let file; // global file variable
let validTypes = ["image/jpeg", "image/jpg", "image/png"];

// Browse File : 

browseFile.addEventListener("click", () => {
    input.click(); // direct user to local files
})

input.addEventListener("change", function() {
    file = this.files[0];
    showFile();
    dropArea.classList.add("active");
})


// Drag & Drop :

// If user drag a file over Drop Area
dropArea.addEventListener("dragover", (e) => {
    dropArea.classList.add("active");
    header.textContent = "Release Here to Upload File";
    e.preventDefault();
})

// If user leave dragging file from Drop Area 
dropArea.addEventListener("dragleave", (e) => {
    header.textContent = "Drag & Drop to Upload File";
})

// If user drop the file on Drop Area
dropArea.addEventListener("drop", (e) => {
    dropArea.classList.add("active");
    e.preventDefault();

    file = e.dataTransfer.files[0]; // if user drops multiple files then we will be select only the first one 
    
    showFile();
})

function showFile() {
    let fileType = file.type; 
    
    if(validTypes.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}">`
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }
    else {
        alert("Image format must be jpg,jpeg or png.");
        dropArea.classList.remove("active");
        header.textContent = "Drag & Drop to Upload File";
    }
}
