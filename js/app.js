/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

//Tracks the current active section
let activeSection = document.querySelector(".active-section");

//Tracks the current active <li></li> in the navBar
let activeNav = document.querySelector(".active-nav");

// List of sections on the page
const sections = document.querySelectorAll("section");

//creates/populates the navBar with the appropriate event listeners
function initialSetup() {
  const navBar = document.querySelector("#navbar__list");
  const fragment = document.createDocumentFragment();
  for (const section of sections) {
    const newNavButton = makeNavButton(section);
    fragment.appendChild(newNavButton);
  }
  navBar.appendChild(fragment);
  createEventListeners(navBar);
}

// used to create a nav button on the navBar for each section
function makeNavButton(section) {
  const newNavButton = document.createElement("li");
  newNavButton.classList.add("menu__link");
  newNavButton.textContent = section.dataset.nav;
  newNavButton.setAttribute("data-id", section.id);
  newNavButton.id = `nav-${section.id}`;
  if (activeNav == null) {
    newNavButton.classList.add("active-nav");
    activeNav = newNavButton;
  }
  return newNavButton;
}
//adds event listener across site
//adding only two event listeners is optimal, rather than adding one to each element
function createEventListeners(navBar) {
  navBar.addEventListener("click", onNavBarClick);
  document.addEventListener("scroll", function () {
    scrollCheck();
  });
}

//function to navigate to the correct location on the page
function onNavBarClick(event) {
  const section = document.querySelector(`#${event.target.dataset.id}`);
  section.scrollIntoView({ behavior: "smooth", block: "end" });
}

//checks current position on page when a user scrolls and based on this updates active section
function scrollCheck() {
  for (const section of sections) {
    const position = section.getBoundingClientRect();
    if (position.top > 0) {
      setActiveSection(section);
      const activeNav = document.querySelector(`#nav-${section.id}`);
      setActiveNav(activeNav);
      break;
    }
  }
}

// Removes active-section class from active section, adds the class new active section.
function setActiveSection(section) {
  activeSection.classList.toggle("active-section");
  section.classList.add("active-section");
  activeSection = section;
}

//switches active section in navBar, and changes background color to clearly illustrate current active section
function setActiveNav(nav) {
  activeNav.classList.remove("active-nav");
  activeNav.style.backgroundColor = "white";
  nav.classList.add("active-nav");
  nav.style.backgroundColor = "grey";
  activeNav = nav;
}

//runs JS file
initialSetup();
