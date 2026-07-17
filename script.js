function scrollToElement(elementSelector, instance = 0) {
  // Select all elements that match the given selector
  const elements = document.querySelectorAll(elementSelector);
  // Check if there are elements matching the selector and if the requested instance exists
  if (elements.length > instance) {
    // Scroll to the specified instance of the elements
    elements[instance].scrollIntoView({ behavior: "smooth" });
  }
}

const scroll1 = document.getElementById("link1");
const scroll2 = document.getElementById("link2");
const scroll3 = document.getElementById("link3");

scroll1.addEventListener("click", (e) => {
  e.preventDefault(); // Not reload the page
  scrollToElement(".header");
});

scroll2.addEventListener("click", (e) => {
  // Scroll to the second element with "header" class
  e.preventDefault();
  scrollToElement(".header", 1);
});

scroll3.addEventListener("click", (e) => {
  e.preventDefault();
  scrollToElement(".column");
});
