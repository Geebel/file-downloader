//Map the input and the button to functions
const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener('click',e => {
    e.preventDefault(); //preventing form from submitting
    downloadBtn.innerText = "Downloading file...." //change button text
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    //fetching file and returning response as blob 
    fetch(url).then(res => res.blob()).then(file =>{
        // URL.createObjURL creates a url of passed objects
        let tempUrl = URL.createObjectURL(file);
        console.log(tempUrl);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        //passing file last name and extension as download name
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag); // adding atag inside body
        aTag.click(); //clicking atag so the file can download
        aTag.remove(); //removing the atag when the file downloads
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Downloading file"
    }).catch(() => {
        //catch if any error occurs before or while downloading 
        downloadBtn.innerText = "Downloading file"
        alert("Failed to download file!!!!");
    })
}