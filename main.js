/* =========================================================
   STAR TERRITORY V2
   Main JavaScript
   Music system removed
   ========================================================= */

const SUPABASE_URL = "https://mfjwnecnrvwneomrcybi.supabase.co";
const SUPABASE_KEY = "sb_publishable_mhZ5GrPUC2Ax6VxsaHms1A_m6_LSYrJ";
const BUCKET_NAME = "STAR_FILES";
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* =========================================================
   DARK MODE
   ========================================================= */

function toggleDark() {
  document.body.classList.toggle("dark");
}

window.toggleDark = toggleDark;


/* =========================================================
   ELEMENTS
   ========================================================= */

const fileInput = document.getElementById("fileInput");
const uploadText = document.getElementById("upload-text");
const previewContainer = document.getElementById("preview-container");
const imagePreview = document.getElementById("image-preview");
const videoPreview = document.getElementById("video-preview");

const dropZone = document.getElementById("dropZone");

const messageForm = document.getElementById("message-form");
const popup = document.getElementById("popup");
const uploadPopup = document.getElementById("upload-popup");

const darkToggle = document.querySelector(".dark-toggle");
const uploadButton = document.getElementById("upload-button");

const darkToggle = document.querySelector(".dark-toggle");
const uploadButton = document.getElementById("upload-button");

if (darkToggle) {
  darkToggle.onclick = function () {
    toggleDark();
  };
}

if (uploadButton) {
  uploadButton.onclick = function () {
    uploadFile();
  };
}


/* =========================================================
   FILE PREVIEW
   ========================================================= */

function showSelectedFile(file) {

  if (!file) return;

  if (file.size > MAX_FILE_SIZE) {

    alert("File is larger than 50 MB.");

    if (fileInput) {
      fileInput.value = "";
    }

    if (uploadText) {
      uploadText.textContent = "Drop your file here";
    }

    if (previewContainer) {
      previewContainer.style.display = "none";
    }

    return;
  }


  if (uploadText) {
    uploadText.textContent = "📄 " + file.name;
  }


  if (
    previewContainer &&
    imagePreview &&
    videoPreview &&
    (
      file.type.startsWith("image/") ||
      file.type.startsWith("video/")
    )
  ) {

    const fileURL = URL.createObjectURL(file);

    previewContainer.style.display = "block";


    if (file.type.startsWith("image/")) {

      imagePreview.src = fileURL;

      imagePreview.style.display = "block";

      videoPreview.src = "";

      videoPreview.style.display = "none";

    } else {

      videoPreview.src = fileURL;

      videoPreview.style.display = "block";

      imagePreview.src = "";

      imagePreview.style.display = "none";
    }

  } else {

    if (previewContainer) {
      previewContainer.style.display = "none";
    }
  }
}


/* =========================================================
   FILE INPUT
   ========================================================= */

if (fileInput) {

  fileInput.addEventListener("change", function () {

    const file = fileInput.files
      ? fileInput.files[0]
      : null;

    showSelectedFile(file);

  });

}


/* =========================================================
   DRAG AND DROP
   ========================================================= */

if (dropZone) {

  dropZone.addEventListener("dragover", function (event) {

    event.preventDefault();

    dropZone.classList.add("dragover");

  });


  dropZone.addEventListener("dragleave", function () {

    dropZone.classList.remove("dragover");

  });


  dropZone.addEventListener("drop", function (event) {

    event.preventDefault();

    dropZone.classList.remove("dragover");

    const file =
      event.dataTransfer &&
      event.dataTransfer.files
        ? event.dataTransfer.files[0]
        : null;

    if (!file) return;


    if (file.size > MAX_FILE_SIZE) {

      alert("File is larger than 50 MB.");

      return;
    }


    try {

      const transfer = new DataTransfer();

      transfer.items.add(file);

      fileInput.files = transfer.files;

      showSelectedFile(file);

    } catch (error) {

      if (uploadText) {

        uploadText.textContent =
          "📄 " + file.name;
      }
    }

  });

}


/* =========================================================
   SEND MESSAGE
   ========================================================= */

if (messageForm) {

  messageForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();

      try {

        const response = await fetch(
          "https://formspree.io/f/xdapnpgo",
          {
            method: "POST",

            body: new FormData(messageForm),

            headers: {
              Accept: "application/json"
            }
          }
        );


        if (!response.ok) {

          throw new Error("Message failed.");

        }


        messageForm.reset();


        if (popup) {

          popup.classList.add("show");

          setTimeout(function () {

            popup.classList.remove("show");

          }, 3000);
        }


      } catch (error) {

        console.error(error);

        alert("Message failed.");

      }

    }
  );

}


/* =========================================================
   UPLOAD FILE
   ========================================================= */

async function uploadFile() {

  const file =
    fileInput &&
    fileInput.files
      ? fileInput.files[0]
      : null;

  const status =
    document.getElementById("status");

  const progressBar =
    document.querySelector(".progress-bar");

  const progressFill =
    document.getElementById("progress-fill");

  const progressText =
    document.getElementById("progress-text");


  if (!file) {

    alert("Select a file first.");

    return;
  }


  if (file.size > MAX_FILE_SIZE) {

    alert("This file is larger than 50 MB.");

    return;
  }


  if (progressBar) {

    progressBar.style.display = "block";

  }


  if (progressFill) {

    progressFill.style.width = "0%";

  }


  if (progressText) {

    progressText.style.display = "none";

  }


  if (status) {

    status.textContent = "";

  }


  try {

    const fileExtension =
      file.name.includes(".")
        ? "." + file.name.split(".").pop()
        : "";


    const baseName =
      file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_");


    const uniqueName =
      baseName +
      "_" +
      Date.now() +
      fileExtension;


    const result =
      await supabaseClient.storage
        .from(BUCKET_NAME)
        .upload(
          uniqueName,
          file,
          {
            cacheControl: "3600",
            upsert: false,
            contentType:
              file.type ||
              "application/octet-stream"
          }
        );


    if (result.error) {

      throw result.error;

    }


    if (progressFill) {

      progressFill.style.width = "100%";

    }


    if (uploadPopup) {

      uploadPopup.classList.add("show");

      setTimeout(function () {

        uploadPopup.classList.remove("show");

      }, 3000);

    }


    fileInput.value = "";


    if (uploadText) {

      uploadText.textContent =
        "Drop your file here";

    }


    if (previewContainer) {

      previewContainer.style.display =
        "none";

    }


    setTimeout(function () {

      if (progressBar) {

        progressBar.style.display =
          "none";

      }

      if (progressFill) {

        progressFill.style.width = "0%";

      }

    }, 1000);


    loadFiles();


  } catch (error) {

    console.error(error);


    if (status) {

      status.textContent =
        "❌ Upload failed: " +
        (error.message ||
          "Unknown error");

    }


    if (progressBar) {

      progressBar.style.display =
        "none";

    }

  }

}


window.uploadFile = uploadFile;


/* =========================================================
   LOAD SHARED FILES
   ========================================================= */

async function loadFiles() {

  const loading =
    document.getElementById(
      "file-loading"
    );

  const empty =
    document.getElementById(
      "file-empty"
    );

  const fileList =
    document.getElementById(
      "file-list"
    );


  if (
    !loading ||
    !empty ||
    !fileList
  ) {

    return;
  }


  loading.style.display = "block";

  empty.style.display = "none";

  fileList.innerHTML = "";


  try {

    const result =
      await supabaseClient.storage
        .from(BUCKET_NAME)
        .list(
          "",
          {
            limit: 100,

            sort: {
              column: "created_at",
              order: "desc"
            }
          }
        );


    if (result.error) {

      throw result.error;

    }


    const data =
      result.data || [];


    loading.style.display = "none";


    const files =
      data.filter(function (file) {

        return (
          file.name !==
          ".emptyFolderPlaceholder"
        );

      });


    if (files.length === 0) {

      empty.style.display = "block";

      return;

    }


    files.forEach(function (file) {

      const fileItem =
        document.createElement(
          "div"
        );

      fileItem.className =
        "file-item";


      const fileName =
        document.createElement(
          "span"
        );

      fileName.className =
        "file-name";

      fileName.textContent =
        "📄 " + file.name;


      const publicResult =
        supabaseClient.storage
          .from(BUCKET_NAME)
          .getPublicUrl(
            file.name
          );


      const download =
        document.createElement(
          "a"
        );

      download.className =
        "file-download";


      download.href =
        publicResult.data.publicUrl +
        "?download=" +
        encodeURIComponent(
          file.name
        );


      download.textContent =
        "⬇ Download";


      fileItem.appendChild(
        fileName
      );

      fileItem.appendChild(
        download
      );


      fileList.appendChild(
        fileItem
      );

    });


  } catch (error) {

    console.error(error);

    loading.style.display = "none";

    fileList.innerHTML =
      "<p>❌ Could not load shared files.</p>";

  }

}


window.loadFiles = loadFiles;


/* =========================================================
   INITIAL LOAD
   ========================================================= */

loadFiles();
