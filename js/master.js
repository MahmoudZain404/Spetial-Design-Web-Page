let intervelPlaceHolder;
// cheak if there is cololr in localstorge
let storgeColor = localStorage.getItem("color_option");
if (storgeColor !== null) {
  document.documentElement.style.setProperty("--main-color", storgeColor);
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.color === storgeColor) {
      e.classList.add("active");
    }
  });
}
//
let storgeBackgroundOp = localStorage.getItem("background_option");
if (storgeBackgroundOp !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (storgeBackgroundOp === "true") {
    randombackground();
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    clearInterval(intervelPlaceHolder);
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
} else {
  randombackground();
}

// fa-gear toggle class
document.querySelector(".settings-box .toggle-settings .fa-cog").onclick =
  function () {
    //gear spin toggle
    this.classList.toggle("fa-spin");
    //sitting box toggle
    document.querySelector(".settings-box").classList.toggle("open");
  };

//main colors list element
const colorList = document.querySelectorAll(".colors-list li");

colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    // add active color in localstorge
    localStorage.setItem("color_option", e.target.dataset.color);
  });
});

//random background option class toggol
document.querySelectorAll(".settings-box .option-box span").forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      randombackground();
      localStorage.setItem("background_option", true);
    } else {
      clearInterval(intervelPlaceHolder);
      localStorage.setItem("background_option", false);
    }
  });
});

// get landing page element
let landingElement = document.querySelector(".landing-page");

// landing background imges arry
let imgesArry = ["01.jpg", "02.jpg", "03.jpg"];

// background imge interval function
function randombackground() {
  intervelPlaceHolder = setInterval(() => {
    // Get random number
    let randomNumber = Math.floor(Math.random() * imgesArry.length);

    //landing element backgrounimeg styleing
    landingElement.style.backgroundImage = `url(../imges/${imgesArry[randomNumber]})`;
  }, 4000);
}

//get skills continer to measure it's size
let ourSkills = document.querySelector(".skills");
// event function on scroll
window.onscroll = function () {
  //get the top hight off-set of skills container
  let skillSart = ourSkills.offsetTop;
  // get the hight of skills container
  let skillsHight = ourSkills.offsetHeight;
  //get over all page hight
  let windoHight = this.innerHeight;
  //window live variable of hight of scroll Y axies
  let windoscrollTop = this.scrollY;

  if (windoscrollTop > skillSart + skillsHight - windoHight) {
    //get array of all .siklls span
    let allskills = document.querySelectorAll(".skills .skill-progress span");
    //span loop
    allskills.forEach((span) => {
      //set the width of each span form it's dataset attr
      span.style.width = span.dataset.progress;
    });
  }
};

// get array of gallery images
let galleryImgs = document.querySelectorAll(".gallery .images-box img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    //creat overlay element
    let overlay = document.createElement("div");
    //add overlay element class
    overlay.className = "popup-overlay";
    //append overlay element to body
    document.body.appendChild(overlay);
    // creating div container for img
    let popupBox = document.createElement("div");
    // add class to div container
    popupBox.className = "popup-box";
    //creating imag element
    let popupImag = document.createElement("img");
    // get the src of clicked image then add it to popup new image element
    popupImag.src = img.src;
    //append the imge to popup-box div
    popupBox.appendChild(popupImag);
    //appending popup div element to page body
    document.body.appendChild(popupBox);
    //check if image has alt.. text
    if (img.alt !== null) {
      //creat h3 element
      let h3 = document.createElement("h3");
      //creat h3 text from img alt text
      let h3Text = document.createTextNode(img.alt);
      //appent text nod to h3 element
      h3.appendChild(h3Text);
      //prepend the h3 element to popup box
      popupBox.prepend(h3);
    }
    // creating span element to use it as batn!
    let closeButton = document.createElement("span");
    //add calss to closebutton span
    closeButton.className = "close-button";
    //set X charcter to close button
    let closeButtonText = document.createTextNode("X");
    //append text to closebutton span
    closeButton.appendChild(closeButtonText);
    //append close button to popup element
    popupBox.appendChild(closeButton);
  });
});
//close popup on click event function
document.addEventListener("click", (e) => {
  //cheack if user press on closebutton element
  if (e.target.className === "close-button") {
    //remove the targeted element
    e.target.parentElement.remove();
    //remove the overlay
    document.querySelector(".popup-overlay").remove();
  }
});
// get array of bullets
let navBullets = document.querySelectorAll(".nav-bullets .bullet");

//get array of links
let navLinks = document.querySelectorAll(".landing-page .links a");

function scrollToSection(elements) {
  elements.forEach((element) => {
    //add click event to each bullet
    element.addEventListener("click", (e) => {
      e.preventDefault();
      //scroll to element by getting it's class from the targeted bullet using it's data set
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(navBullets);
scrollToSection(navLinks);
