const navItems = document.querySelectorAll(".nav-item");
const underline = document.querySelector(".underline");

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const itemRect = e.target.getBoundingClientRect();
    const parentRect = e.target.parentNode.getBoundingClientRect();

    underline.style.width = `${itemRect.width}px`;
    underline.style.left = `${itemRect.left - parentRect.left}px`;

    navItems.forEach((nav) => (nav.style.color = "#aaa"));
    e.target.style.color = "#fff";
  });
});
