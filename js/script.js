document.addEventListener('DOMContentLoaded', () => {

  // Select header and target section
  const header = document.querySelector('header');
  const whySection = document.querySelector('.why-section');

  // --- Cookie Bar Logic ---
  const cookieBar = document.getElementById('cookieBar');
  const acceptBtn = document.getElementById('acceptBtn');
  const declineBtn = document.getElementById('declineBtn');

  const closeCookieBar = () => {
    if (cookieBar) cookieBar.classList.add('hidden');
  };

  if (acceptBtn) acceptBtn.addEventListener('click', closeCookieBar);
  if (declineBtn) declineBtn.addEventListener('click', closeCookieBar);

  // --- Hero & Animation Elements ---
  const scrollTrack = document.querySelector('.scroll-track');
  const heroContent = document.getElementById('heroContent');
  const buildingWrapper = document.getElementById('buildingWrapper');
  const wireframeContainer = document.getElementById('wireframeContainer');
  const maskedContainer = document.getElementById('maskedContainer');
  const cloudRight = document.querySelector('.bg-cloud-right');
  const imgSmoke = document.getElementById('imgSmoke');

  // --- Combined Scroll Listener ---
  window.addEventListener('scroll', () => {

    // 1. Header Scrolled State Toggle (Triggers when .why-section reaches top offset)
    if (header) {
      if (whySection) {
        const whySectionTop = whySection.getBoundingClientRect().top;
        if (whySectionTop <= 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      } else {
        // Fallback check if .why-section isn't present
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }

    // 2. Hero Scroll Animation logic
    if (!scrollTrack) return;

    const totalScroll = scrollTrack.clientHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);

    if (cloudRight) {
      cloudRight.style.transform = `translateY(${currentScroll * 0.1}px)`;
    }

    if (progress <= 0.35) {
      const p1 = progress / 0.35;
      const translateY = -p1 * 400;

      if (buildingWrapper) {
        buildingWrapper.style.transform = `translateX(-50%) translateY(${translateY}px)`;
        buildingWrapper.style.opacity = 1;
      }

      if (imgSmoke) {
        const currentBottom = -309 + p1 * 69;
        imgSmoke.style.bottom = `${currentBottom}px`;
        imgSmoke.style.opacity = 0.9;
      }

      if (heroContent) {
        heroContent.style.opacity = 1 - p1 * 1.2;
        heroContent.style.transform = `translateY(${-p1 * 50}px)`;
      }

      if (wireframeContainer) wireframeContainer.style.opacity = 0;
      if (maskedContainer) maskedContainer.style.opacity = 0;
    } 
    else if (progress > 0.35 && progress <= 0.60) {
      const p2 = (progress - 0.35) / 0.25;

      if (heroContent) heroContent.style.opacity = 0;

      if (buildingWrapper) {
        buildingWrapper.style.transform = `translateX(-50%) translateY(-400px)`;
        buildingWrapper.style.opacity = 1;
      }

      if (imgSmoke) {
        imgSmoke.style.bottom = `-240px`;
        imgSmoke.style.opacity = 0.9;
      }

      if (wireframeContainer) wireframeContainer.style.opacity = Math.min(p2 * 1.2, 1);
      if (maskedContainer) maskedContainer.style.opacity = 0;
    } 
    else {
      const p3 = (progress - 0.60) / 0.40;

      if (heroContent) heroContent.style.opacity = 0;

      if (imgSmoke) {
        imgSmoke.style.bottom = `-240px`;
        imgSmoke.style.opacity = Math.max(0.9 - p3 * 0.4, 0.4);
      }

      if (buildingWrapper) {
        buildingWrapper.style.transform = `translateX(-50%) translateY(-400px)`;
        buildingWrapper.style.opacity = Math.max(1 - p3 * 2, 0);
      }

      if (wireframeContainer) wireframeContainer.style.opacity = Math.max(1 - p3 * 1.5, 0);
      if (maskedContainer) maskedContainer.style.opacity = Math.min(p3 * 1.5, 1);
    }
  });

  // --- Agents Section Observer ---
  const agentsSection = document.getElementById('agentsSection');

  if (agentsSection) {
    const observerOptions = {
      root: null,
      threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          agentsSection.classList.add('is-visible');
        }
      });
    }, observerOptions);

    observer.observe(agentsSection);
  }

  // --- Testimonials Switcher ---
  const testimonials = [
    {
      quote: `"Michael was a great realtor. Such a hard worker, dedicated to helping us find the perfect neighborhood, price point and home. He's a workaholic so he was available morning, noon and night. Tireless and dedicated. Would recommend him 100%!"`,
      author: "BERNADETTE HOGAN"
    },
    {
      quote: `"Shirin was truly a blessing to work with. She helped us find our perfect condo in a great area. She was patient and very understanding. I would recommend working with her if you are in need of someone who will go out of their way to make sure you find the home of your dreams. She is honest and has a pure heart."`,
      author: "TYLEEN"
    },
    {
      quote: `"Working with the FIND team redefined our home buying process. They provided constant clarity, zero pressure, and secured our dream home below ask!"`,
      author: "MARCUS & SARAH JENKINS"
    },
    {
      quote: `"Unmatched expertise and genuine care. From the initial market assessment to signing day, every detail was handled with precision and absolute transparency."`,
      author: "ELENA ROSTOVA"
    },
    {
      quote: `"They don't just sell properties—they help you align your entire next chapter. Outstanding strategy, responsiveness, and human leadership."`,
      author: "DAVID VAUGHN"
    }
  ];

  const navBalls = document.querySelectorAll('.nav-ball');
  const quoteText = document.getElementById('quoteText');
  const authorName = document.getElementById('authorName');
  const testimonialBody = document.getElementById('testimonialBody');

  if (navBalls.length && quoteText && authorName && testimonialBody) {
    navBalls.forEach((ball) => {
      ball.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-index'), 10);
        if (isNaN(index) || !testimonials[index]) return;

        navBalls.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        testimonialBody.classList.add('fade-out');

        setTimeout(() => {
          quoteText.textContent = testimonials[index].quote;
          authorName.textContent = testimonials[index].author;
          testimonialBody.classList.remove('fade-out');
        }, 250);
      });
    });
  }


  // --- Image Unwrap Scroll Observer (Right to Left) ---
const revealImages = document.querySelectorAll('.reveal-img-wrapper');

if (revealImages.length) {
  const imageObserverOptions = {
    root: null,
    threshold: 0.2, // Triggers when 20% of the image wrapper enters viewport
    rootMargin: '0px 0px -50px 0px'
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target); // Unobserve so animation runs once
      }
    });
  }, imageObserverOptions);

  revealImages.forEach((imgWrapper) => {
    imageObserver.observe(imgWrapper);
  });
}

// --- Testimonial Image Unwrap Observer (Left to Right) ---
const testimonialImg = document.querySelector('.reveal-img-left');

if (testimonialImg) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(testimonialImg);
}
});