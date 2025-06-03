const hamburger = document.getElementById("h_hamburger");
const navMenu = document.getElementById("h_fixed_menu");
const menuItems = document.querySelectorAll("#h_fixed_menu .menu_item");
const menuItemLinks = document.querySelectorAll("#h_fixed_menu .menu_item a");


let isOpen = false;

hamburger.addEventListener("click", () => {
  isOpen = !isOpen;
  
  if (isOpen) {
    navMenu.classList.add("active");
    hamburger.classList.add("active");
    
    gsap.fromTo(
      menuItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }
    );
  } else {
    gsap.to(menuItems, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.in",
      onComplete: () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }
});

menuItemLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
})