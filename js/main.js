const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const heroImage = document.querySelector(".hero__image");
const siteHeader = document.querySelector(".home-header");
const imageBand = document.querySelector(".image-band");
const imageBandSlides = imageBand ? Array.from(imageBand.querySelectorAll(".image-band__slide")) : [];
const ceremonyCarousel = document.querySelector(".ceremony-carousel");
const ceremonySlides = ceremonyCarousel ? Array.from(ceremonyCarousel.querySelectorAll(".ceremony-carousel__slide")) : [];
const wholesaleHeroMedia = document.querySelector(".wholesale-hero__media");
const wholesaleHeroSlides = wholesaleHeroMedia ? Array.from(wholesaleHeroMedia.querySelectorAll(".wholesale-hero__slide")) : [];
const heritageLeaves = Array.from(document.querySelectorAll(".heritage-leaf"));
const mobileMenuToggle = document.querySelector(".home-header__menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const pageTransitionTargets = ["index.html", "venta-mayorista.html"];

if (!reduceMotion.matches) {
  document.body.classList.add("ruay-page-enter");

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("ruay-page-leaving");
    document.body.classList.add("ruay-page-enter");
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank") {
      return;
    }

    const nextUrl = new URL(link.href, window.location.href);
    const currentUrl = new URL(window.location.href);
    const nextPage = nextUrl.pathname.split("/").pop() || "index.html";
    const currentPage = currentUrl.pathname.split("/").pop() || "index.html";
    const samePageHash = nextUrl.pathname === currentUrl.pathname && nextUrl.hash;

    if (nextUrl.origin !== currentUrl.origin || samePageHash || !pageTransitionTargets.includes(nextPage) || !pageTransitionTargets.includes(currentPage) || nextPage === currentPage) {
      return;
    }

    event.preventDefault();
    document.body.classList.remove("ruay-page-enter");
    document.body.classList.add("ruay-page-leaving");
    window.setTimeout(() => {
      window.location.href = nextUrl.href;
    }, 400);
  });
}

if (mobileMenuToggle && mobileMenu) {
  const mobileMenuBreakpoint = window.matchMedia("(max-width: 1024px)");
  let mobileMenuScrollY = 0;

  const lockMobileMenuScroll = () => {
    mobileMenuScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${mobileMenuScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockMobileMenuScroll = () => {
    const scrollTarget = mobileMenuScrollY;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollTarget);
  };

  const setMobileMenuState = (isOpen) => {
    const wasOpen = document.body.classList.contains("mobile-menu-open");

    if (isOpen && !mobileMenuBreakpoint.matches) {
      return;
    }

    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    mobileMenu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("mobile-menu-open", isOpen);

    if (isOpen && !wasOpen) {
      lockMobileMenuScroll();
    }

    if (!isOpen && wasOpen) {
      unlockMobileMenuScroll();
    }
  };

  mobileMenuToggle.addEventListener("click", () => {
    setMobileMenuState(mobileMenuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenuState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      document.body.classList.contains("mobile-menu-open") &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuToggle.contains(event.target)
    ) {
      setMobileMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (!mobileMenuBreakpoint.matches) {
      setMobileMenuState(false);
    }
  });
}

if (imageBandSlides.length > 0) {
  imageBandSlides[0].classList.add("is-active");
  imageBandSlides[0].style.zIndex = "2";
  imageBand.classList.add("image-band--ready");
}

if (imageBandSlides.length > 1 && !reduceMotion.matches) {
  let currentImageBandSlide = 0;
  const imageBandVisibleMs = 3000;
  const imageBandFadeMs = 2000;

  const showNextImageBandSlide = () => {
    const previousImageBandSlide = currentImageBandSlide;
    currentImageBandSlide = (currentImageBandSlide + 1) % imageBandSlides.length;

    imageBandSlides[currentImageBandSlide].style.zIndex = "2";
    imageBandSlides[previousImageBandSlide].style.zIndex = "1";
    imageBandSlides[currentImageBandSlide].classList.add("is-active");
    imageBandSlides[previousImageBandSlide].classList.remove("is-active");

    window.setTimeout(() => {
      imageBandSlides[previousImageBandSlide].style.zIndex = "0";
      window.setTimeout(showNextImageBandSlide, imageBandVisibleMs);
    }, imageBandFadeMs);
  };

  window.setTimeout(showNextImageBandSlide, imageBandVisibleMs);
}

if (ceremonySlides.length > 0) {
  ceremonySlides[0].classList.add("is-active");
  ceremonySlides[0].style.zIndex = "2";
  ceremonyCarousel.classList.add("ceremony-carousel--ready");
}

if (ceremonySlides.length > 1 && !reduceMotion.matches) {
  let currentCeremonySlide = 0;
  const ceremonyVisibleMs = 3600;
  const ceremonyFadeMs = 1600;

  const showNextCeremonySlide = () => {
    const previousCeremonySlide = currentCeremonySlide;
    currentCeremonySlide = (currentCeremonySlide + 1) % ceremonySlides.length;

    ceremonySlides[currentCeremonySlide].style.zIndex = "2";
    ceremonySlides[previousCeremonySlide].style.zIndex = "1";
    ceremonySlides[currentCeremonySlide].classList.add("is-active");
    ceremonySlides[previousCeremonySlide].classList.remove("is-active");

    window.setTimeout(() => {
      ceremonySlides[previousCeremonySlide].style.zIndex = "0";
      window.setTimeout(showNextCeremonySlide, ceremonyVisibleMs);
    }, ceremonyFadeMs);
  };

  window.setTimeout(showNextCeremonySlide, ceremonyVisibleMs);
}

if (wholesaleHeroSlides.length > 0) {
  wholesaleHeroSlides[0].classList.add("is-active");
  wholesaleHeroSlides[0].style.zIndex = "2";
  wholesaleHeroMedia.classList.add("wholesale-hero__media--ready");
}

if (wholesaleHeroSlides.length > 1 && !reduceMotion.matches) {
  let currentWholesaleHeroSlide = 0;
  const wholesaleHeroVisibleMs = 4000;
  const wholesaleHeroFadeMs = 1800;

  const showNextWholesaleHeroSlide = () => {
    const previousWholesaleHeroSlide = currentWholesaleHeroSlide;
    currentWholesaleHeroSlide = (currentWholesaleHeroSlide + 1) % wholesaleHeroSlides.length;

    wholesaleHeroSlides[currentWholesaleHeroSlide].style.zIndex = "2";
    wholesaleHeroSlides[previousWholesaleHeroSlide].style.zIndex = "1";
    wholesaleHeroSlides[currentWholesaleHeroSlide].classList.add("is-active");
    wholesaleHeroSlides[previousWholesaleHeroSlide].classList.remove("is-active");

    window.setTimeout(() => {
      wholesaleHeroSlides[previousWholesaleHeroSlide].style.zIndex = "0";
      window.setTimeout(showNextWholesaleHeroSlide, wholesaleHeroVisibleMs);
    }, wholesaleHeroFadeMs);
  };

  window.setTimeout(showNextWholesaleHeroSlide, wholesaleHeroVisibleMs);
}

if (heritageLeaves.length > 0 && !reduceMotion.matches && window.matchMedia("(min-width: 1025px)").matches) {
  const placeLeaf = (leaf, index, initial = false) => {
    const x = 8 + Math.random() * 84;
    const drift = (Math.random() * 7 - 3.5).toFixed(2);
    const scale = (0.9 + Math.random() * 0.2).toFixed(2);
    const duration = (24 + Math.random() * 8).toFixed(2);
    const rotation = (Math.random() > 0.5 ? 1 : -1) * (26 + Math.random() * 24);

    leaf.style.setProperty("--leaf-x", `${x.toFixed(2)}vw`);
    leaf.style.setProperty("--leaf-drift", `${drift}vw`);
    leaf.style.setProperty("--leaf-scale", scale);
    leaf.style.setProperty("--leaf-duration", `${duration}s`);
    leaf.style.setProperty("--leaf-rotate", `${rotation.toFixed(2)}deg`);
    leaf.style.setProperty("--leaf-delay", initial ? `${(-index * 5 - Math.random() * 5).toFixed(2)}s` : "0s");
  };

  heritageLeaves.forEach((leaf, index) => {
    placeLeaf(leaf, index, true);
    leaf.addEventListener("animationiteration", () => placeLeaf(leaf, index));
  });
}

if (siteHeader) {
  let headerTicking = false;

  const updateHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
    headerTicking = false;
  };

  const requestHeaderState = () => {
    if (!headerTicking) {
      window.requestAnimationFrame(updateHeaderState);
      headerTicking = true;
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", requestHeaderState, { passive: true });
}

if (heroImage && !reduceMotion.matches) {
  let ticking = false;

  const updateHeroParallax = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const rect = heroImage.parentElement.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewport / 2 - (rect.top + rect.height / 2)) / viewport;
    const range = isMobile ? 20 : 40;
    const offset = Math.max(-range, Math.min(range, progress * range));

    heroImage.style.setProperty("--hero-parallax-y", `${offset.toFixed(2)}px`);
    ticking = false;
  };

  const requestHeroParallax = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeroParallax);
      ticking = true;
    }
  };

  updateHeroParallax();
  window.addEventListener("scroll", requestHeroParallax, { passive: true });
  window.addEventListener("resize", requestHeroParallax);
}

if (wholesaleHeroMedia && wholesaleHeroSlides.length > 0 && !reduceMotion.matches) {
  let wholesaleHeroTicking = false;

  const updateWholesaleHeroParallax = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const rect = wholesaleHeroMedia.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewport / 2 - (rect.top + rect.height / 2)) / viewport;
    const range = isMobile ? 4 : 8;
    const offset = Math.max(-range, Math.min(range, progress * range));

    wholesaleHeroSlides.forEach((slide) => {
      slide.style.setProperty("--wholesale-hero-parallax-y", `${offset.toFixed(2)}px`);
    });

    wholesaleHeroTicking = false;
  };

  const requestWholesaleHeroParallax = () => {
    if (!wholesaleHeroTicking) {
      window.requestAnimationFrame(updateWholesaleHeroParallax);
      wholesaleHeroTicking = true;
    }
  };

  updateWholesaleHeroParallax();
  window.addEventListener("scroll", requestWholesaleHeroParallax, { passive: true });
  window.addEventListener("resize", requestWholesaleHeroParallax);
}

const photoImage = document.querySelector(".photo-block__frame img");

if (photoImage && !reduceMotion.matches) {
  let currentPhotoOffset = 0;
  let targetPhotoOffset = 0;
  let photoAnimating = false;

  const measurePhotoParallax = () => {
    const section = photoImage.closest(".photo-block");
    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const centerDelta = (viewport / 2 - (rect.top + rect.height / 2)) / viewport;

    targetPhotoOffset = Math.max(-3, Math.min(3, centerDelta * 6));

    if (!photoAnimating) {
      photoAnimating = true;
      window.requestAnimationFrame(updatePhotoParallax);
    }
  };

  const updatePhotoParallax = () => {
    currentPhotoOffset += (targetPhotoOffset - currentPhotoOffset) * 0.08;
    photoImage.style.setProperty("--photo-parallax-y", `${currentPhotoOffset.toFixed(2)}px`);

    if (Math.abs(targetPhotoOffset - currentPhotoOffset) > 0.01) {
      window.requestAnimationFrame(updatePhotoParallax);
      return;
    }

    photoAnimating = false;
  };

  measurePhotoParallax();
  window.addEventListener("scroll", measurePhotoParallax, { passive: true });
  window.addEventListener("resize", measurePhotoParallax);
}

if (!reduceMotion.matches) {
  document.body.classList.add("motion-ready");

  const revealSections = document.querySelectorAll("main > section:not(.origin-section):not(.photo-block)");
  const revealSelectors = [
    "h1",
    "h2",
    ".about-section__eyebrow",
    ".section-heading__eyebrow",
    ".products-intro__eyebrow",
    ".elixir-section__eyebrow",
    ".origin-section__eyebrow",
    ".ceremony-section__eyebrow",
    ".wholesale-content__eyebrow",
  ];

  revealSections.forEach((section) => {
    section.classList.add("reveal-section");

    section.querySelectorAll(revealSelectors.join(",")).forEach((node) => {
      node.classList.add("reveal-title");
    });

    section.querySelectorAll("p, .about-section__text").forEach((node) => {
      if (!node.classList.contains("about-section__eyebrow") && !node.classList.contains("section-heading__eyebrow") && !node.classList.contains("products-intro__eyebrow") && !node.classList.contains("elixir-section__eyebrow") && !node.classList.contains("origin-section__eyebrow") && !node.classList.contains("ceremony-section__eyebrow")) {
        node.classList.add("reveal-copy");
      }
    });

    section.querySelectorAll(".product-card__image img").forEach((node) => {
      node.classList.add("reveal-image");
    });

    section.querySelectorAll(".hero__button, .button").forEach((node) => {
      node.classList.add("reveal-button");
    });

    section.querySelectorAll(".product-card, .heritage-card, .elixir-feature").forEach((node) => {
      node.classList.add("reveal-card");
    });

    section.querySelectorAll(".heritage-divider").forEach((node) => {
      node.classList.add("reveal-divider");
    });
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: "0px 0px -8% 0px",
    });

    revealSections.forEach((section) => revealObserver.observe(section));
  } else {
    revealSections.forEach((section) => section.classList.add("is-visible"));
  }
}
