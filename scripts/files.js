document.addEventListener("DOMContentLoaded", function () {
  /// avatar info variables
  var backgroundimg = { width: null, height: null, url: null },
    useravatar = {
      width: null,
      height: null,
      x: null,
      y: null,
      url: null,
      avatar: null,
    },
    username = { width: null, height: null, x: null, y: null, url: null },
    Konvas = {
      Stage: null,
      layer: null,
      backimage: null,
      useravatar: null,
      avgroupe: null,
      username: null,
    };
  welcomedata = {
    backwidth: null,
    backheight: null,
    avawidth: null,
    avaheight: null,
    avaX: null,
    avaY: null,
    avapear: false,
  };
  /// elements variables
  const submitbtn = document.getElementById("submit"),
    resetbtn = document.getElementById("reset"),
    savebtn = document.getElementById("save"),
    imageurlinput = document.getElementById("imageurl"),
    filesform = document.getElementById("files"),
    filesdiv = document.getElementById("filesdiv"),
    fileInput = document.getElementsByClassName("file-input")[0];
  (wrongmsg = document.getElementById("wrongmsg")),
    (copied = document.getElementById("copied")),
    (toggles = document.getElementsByClassName("toggle")),
    (Usernametoggle = document.getElementById("Usernametoggle")),
    (Useravatartoggle = document.getElementById("Useravatartoggle")),
    (Usernamelabel = document.getElementById("Usernamelabel")),
    (Useravatarlabel = document.getElementById("Useravatarlabel")),
    (dashinfo = document.getElementById("results")),
    (iconcross = document.getElementsByClassName("icon cross")[0]),
    (copydiv = document.getElementsByClassName("copydiv")[0]),
    (copytext = document.getElementById("copytext")),
    (pelment = document.getElementsByTagName("p")[0]);
  finaldiv = document.getElementById("finaldiv");

  /////
  //// click input button after pressing div
  filesform.addEventListener("click", async (event) => {
    fileInput.click();
  });

  /// get file when drop
  // Style the drag-and-drop as a "copy file" operation.
  document.getElementById("files").addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });
  /// make changes when file drop
  document.getElementById("files").addEventListener("drop", async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", async (event) => {
      let filedata = reader.result.split(":");
      let fileformate = filedata[1].split("/")[0];
      if (fileformate !== "image") {
        wrongmsg.style.display = "block";
        setTimeout(() => {
          wrongmsg.style.display = "none";
        }, 5 * 1000);
        return;
      }
      let imgurl = event.target.result;
      await imagedash(imgurl);
    });
    reader.readAsDataURL(fileList);
  });

  fileInput.onchange = ({ target }) => {
    let file = target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", async (event) => {
      let filedata = reader.result.split(":");
      let fileformate = filedata[1].split("/")[0];
      if (fileformate !== "image") {
        wrongmsg.style.display = "block";
        setTimeout(() => {
          wrongmsg.style.display = "none";
        }, 5 * 1000);
        return;
      }
      await imagedash(event.target.result);
    });
    reader.readAsDataURL(file);
  };

  async function imagedash(imgurl) {
    let verifyImage = await verifyImageURL(imgurl);
    //cheking image width & height is more than 500
    if (verifyImage.width > 500 || verifyImage.height > 500) {
      let lenght = verifyImage.height;
      if (verifyImage.width > verifyImage.height) lenght = verifyImage.width;
      let Percentage = 1 - (lenght - 500) / lenght;
      if (verifyImage.width > 500)
        verifyImage.width = verifyImage.width * Percentage;
      if (verifyImage.height > 500)
        verifyImage.height = verifyImage.height * Percentage;
    }
    /// c inputs elements
    submitbtn.style.display = "none";
    imageurlinput.style.display = "none";
    filesdiv.style.display = "none";
    pelment.style.display = "none";
    /// appear dashboard elements
    finaldiv.style.display = "block";
    resetbtn.style.display = "block";
    toggles[0].style.display = "inline-flex";
    toggles[1].style.display = "inline-flex";
    copydiv.style.display = "flex";
    savebtn.style.display = "block";
    copytext.value = `{ "backwidth" : ${verifyImage.width}, "backheight" : ${verifyImage.height} }`;
    (welcomedata.backwidth = verifyImage.width),
      (welcomedata.backheight = verifyImage.height);
    var stage = new Konva.Stage({
      container: "finaldiv",
      width: verifyImage.width,
      height: verifyImage.height,
      "max-width": "100%",
    });
    var layer = new Konva.Layer();
    var backimg = new Konva.Image({
      width: verifyImage.width,
      height: verifyImage.height,
      Image: verifyImage.img,
      draggable: false,
    });
    stage.add(layer);
    layer.add(backimg);
    Konvas.Stage = stage;
    Konvas.layer = layer;
    Konvas.backimage = backimg;
  }

  function verifyImageURL(url) {
    var img = new Image();
    img.src = url;
    return new Promise((resolve, reject) => {
      img.onload = function () {
        resolve({
          error: true,
          width: this.width,
          height: this.height,
          img: img,
        });
      };
      img.onerror = function () {
        resolve({ error: false });
      };
    });
  }
});
