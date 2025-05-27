gsap.registerPlugin(ScrollTrigger);

const alreadyShown = sessionStorage.getItem("greetingShown");
const greeting = document.querySelector(".first_greeting");


if (!alreadyShown) {
document.body.classList.add("no-scroll"); // 最初にスクロール禁止

const tl = gsap.timeline();

// 1個目の.item
tl.to(".first_greeting .text .item:nth-of-type(1)", {
  clipPath: "inset(0 0% 0 0)",
  duration: 1.2,
  ease: "power2.out"
});

// 2個目の.item（1つ目が終わったあとに開始）
tl.to(".first_greeting .text .item:nth-of-type(2)", {
  clipPath: "inset(0 0% 0 0)",
  duration: 1.2,
  ease: "power2.out"
});

// 2個目が終わったら消える
tl.to(".first_greeting", {
  opacity: 0,
  pointerEvents: "none",
  duration: 1.5,
  delay: 1,
  ease: "power2.out"
});

// アニメーション終了後にスクロール許可
tl.call(() => {
  document.body.classList.remove("no-scroll");

  // アニメーション済みを記録
  sessionStorage.setItem("greetingShown", "true");
});

} else {
  // アニメーション済みなら greeting を即非表示
  greeting.style.display = "none";
}

document.querySelectorAll(".ul_works > li, .ul_skill > li").forEach((el) => {
  gsap.fromTo(
    el,
    {
      rotationY: 180,
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      rotationY: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    }
  );
});