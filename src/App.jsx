import { useEffect, useRef, useState } from 'react';
import './index.css';

/* ==========================================================================
   SCROLL REVEAL HOOK
   ========================================================================== */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal--visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    // Observe section titles for line animations
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-title--visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const titles = document.querySelectorAll('.section-title');
    titles.forEach((t) => titleObserver.observe(t));

    return () => {
      observer.disconnect();
      titleObserver.disconnect();
    };
  }, []);
}

/* ==========================================================================
   HEADER / NAVBAR
   ========================================================================== */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : 'header--hero'} ${mobileOpen ? 'header--mobile-open' : ''}`}>
        <div className="container header__inner">
          <a href="#home" className="header__logo">
            <span className="header__logo-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="8" fill="currentColor"></rect>
                <path d="M18 10v16M12 16h12" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round"></path>
              </svg>
            </span>
            <div className="header__logo-text">
              <strong>Dr. Siddhant K. Mahato</strong>
              <small>General & Laparoscopic Surgeon</small>
            </div>
          </a>

          <nav className="header__nav" aria-label="Main navigation">
            <ul className="header__menu">
              <li className="header__item">
                <a href="#home" className="header__link header__link--active">Home</a>
              </li>
              
              <li 
                className="header__item"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <a href="#about" className="header__link">
                  About
                  <svg className="header__chevron" width="12" height="12" viewBox="0 0 12 12">
                    <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
                  </svg>
                </a>
                <ul className={`header__dropdown ${aboutDropdownOpen ? 'header__dropdown--open' : ''}`}>
                  <li><a href="#about" className="header__dropdown-link">About Dr. Mahato</a></li>
                  <li><a href="#about-credentials" className="header__dropdown-link">Qualifications</a></li>
                  <li><a href="#why-choose" className="header__dropdown-link">Philosophy</a></li>
                </ul>
              </li>

              <li className="header__item">
                <a href="#expertise" className="header__link">Expertise</a>
              </li>

              <li 
                className="header__item"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <a href="#treatments" className="header__link">
                  Treatments
                  <svg className="header__chevron" width="12" height="12" viewBox="0 0 12 12">
                    <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
                  </svg>
                </a>
                <ul className={`header__dropdown ${servicesDropdownOpen ? 'header__dropdown--open' : ''}`}>
                  <li><a href="#treatments" className="header__dropdown-link">Day Care Surgery</a></li>
                  <li><a href="#treatments" className="header__dropdown-link">Laparoscopy</a></li>
                  <li><a href="#treatments" className="header__dropdown-link">Proctology & Vascular</a></li>
                  <li><a href="#treatments" className="header__dropdown-link">Urology Care</a></li>
                </ul>
              </li>

              <li className="header__item">
                <a href="#research" className="header__link">Publications</a>
              </li>
              <li className="header__item">
                <a href="#faqs" className="header__link">FAQs</a>
              </li>
            </ul>
          </nav>

          <a href="tel:+9779800000000" className="header__phone">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
            </svg>
            <span>Call Clinic</span>
          </a>

          <a href="#contact" className="btn btn--accent header__cta">Book Appointment</a>

          <button className="header__toggle" onClick={toggleMobile} aria-expanded={mobileOpen} aria-label="Toggle navigation menu">
            <span className={mobileOpen ? 'is-open' : ''}></span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Backdrop */}
      {mobileOpen && <div className="mobile-nav__backdrop" onClick={() => setMobileOpen(false)}></div>}

      {/* Mobile Nav Panel */}
      <div className={`mobile-nav__panel ${mobileOpen ? 'mobile-nav__panel--open' : ''}`}>
        <a href="#home" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Home</a>
        <a href="#about" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>About Dr. Mahato</a>
        <div className="mobile-nav__sub">
          <a href="#about-credentials" onClick={() => setMobileOpen(false)}>Qualifications</a>
          <a href="#why-choose" onClick={() => setMobileOpen(false)}>Care Philosophy</a>
        </div>
        <a href="#expertise" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Areas of Expertise</a>
        <a href="#treatments" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Treatments & Services</a>
        <a href="#research" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Research & Publications</a>
        <a href="#faqs" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Common FAQs</a>
        <a href="#contact" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Contact Us</a>

        <a href="tel:+9779800000000" className="mobile-nav__phone">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
          </svg>
          <span>Call: +977 9800000000</span>
        </a>
        <a href="#contact" className="btn btn--accent" onClick={() => setMobileOpen(false)}>Book Appointment</a>
      </div>
    </>
  );
}

/* ==========================================================================
   HERO SECTION
   ========================================================================== */
function Hero() {
  return (
    <section className="hero" id="home" aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true">
        <img className="hero__bg-image" src="/images/hero.jpeg" alt="Surgical Suite" loading="eager" />
        <div className="hero__bg-overlay"></div>
        <div className="hero__bg-vignette"></div>
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge hero-animate" style={{ '--delay': '0.1s' }}>
            Specialist in General &amp; Laparoscopic Surgery
          </span>
          <h1 className="hero-animate" style={{ '--delay': '0.2s' }}>Dr. Siddhant Kishan Mahato</h1>
          <p className="hero__designation hero-animate" style={{ '--delay': '0.3s' }}>General &amp; Laparoscopic Surgeon</p>
          
          <div className="hero__specialties hero-animate" style={{ '--delay': '0.4s' }}>
            <span className="hero__specialty hero__specialty--featured">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 12h6M12 9v6" />
              </svg>
              Day Care Procedures
            </span>
            <span className="hero__specialty">MS (General Surgery) - Tribhuvan Univ.</span>
            <span className="hero__specialty">MBBS - Sun Yat-sen Univ.</span>
          </div>

          <div className="hero__divider hero-animate" aria-hidden="true" style={{ '--delay': '0.45s' }}></div>
          <p className="hero__intro hero-animate" style={{ '--delay': '0.55s' }}>
            "Surgery shouldn't disrupt your life. We focus on modern, same-day procedures that eliminate long hospital stays, minimize pain, and get you back to your normal daily routine without delay."
          </p>

          <div className="hero__actions hero-animate" style={{ '--delay': '0.65s' }}>
            <a href="#contact" className="btn btn--accent btn--glow">
              <span>Book Appointment</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
            </a>
            <a href="#treatments" className="btn btn--outline">View Treatments</a>
          </div>

          <div className="hero__stats hero-animate" style={{ '--delay': '0.8s' }}>
            <div className="hero__stat" style={{ '--stat-delay': '0s' }}>
              <strong className="animated-counter">5+</strong>
              <span>Years of Experience</span>
            </div>
            <div className="hero__stat" style={{ '--stat-delay': '0.08s' }}>
              <strong className="animated-counter">500+</strong>
              <span>Patients Served</span>
            </div>
            <div className="hero__stat" style={{ '--stat-delay': '0.16s' }}>
              <strong className="animated-counter">100%</strong>
              <span>Same-Day Discharge</span>
            </div>
            <div className="hero__stat" style={{ '--stat-delay': '0.24s' }}>
              <strong className="animated-counter">5+</strong>
              <span>Surgical Specialties</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
}

/* ==========================================================================
   ABOUT SECTION
   ========================================================================== */
function About() {
  return (
    <section className="section section--soft" id="about">
      {/* Visual background decorations similar to Birendra's page */}
      <div className="section-decoration section-decoration--default" aria-hidden="true">
        <svg className="section-decoration__blob" viewBox="0 0 200 200" fill="none">
          <path d="M45.5,-52.3C57.8,-40.2 66.5,-24.5 68.9,-7.8C71.3,8.9 67.4,26.6 57.8,39.8C48.2,53 32.9,61.7 16.4,65.8C-0.1,69.9,-17.7,69.4,-32.1,61.8C-46.5,54.2,-57.7,39.5,-63.4,22.8C-69.1,6.1,-69.3,-12.6,-62.1,-28.4C-54.9,-44.2,-40.3,-57.1,-24.2,-62.8C-8.1,-68.5,9.5,-67,24.8,-59.5C40.1,-52,53.2,-38.5 45.5,-52.3Z" transform="translate(100 100)" fill="currentColor"></path>
        </svg>
        <svg className="section-decoration__dots" viewBox="0 0 80 80" fill="none">
          <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3"></circle>
          <circle cx="30" cy="10" r="2" fill="currentColor" opacity="0.2"></circle>
          <circle cx="50" cy="10" r="2" fill="currentColor" opacity="0.3"></circle>
          <circle cx="10" cy="30" r="2" fill="currentColor" opacity="0.2"></circle>
          <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.4"></circle>
          <circle cx="50" cy="30" r="2" fill="currentColor" opacity="0.2"></circle>
          <circle cx="10" cy="50" r="2" fill="currentColor" opacity="0.3"></circle>
          <circle cx="30" cy="50" r="2" fill="currentColor" opacity="0.2"></circle>
        </svg>
      </div>

      <div className="container">
        <div className="section-title">
          <span className="section-title__label">About the Doctor</span>
          <div className="icon-badge icon-badge--md icon-badge--default section-title__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="medical-icon">
              <path d="M6 4v6a6 6 0 1012 0V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              <path d="M12 16v4M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"></circle>
            </svg>
          </div>
          <span className="section-title__line"></span>
          <h2>Committed to Modern, Safe and Efficient Surgery</h2>
          <p>Rigorous clinical training and academic qualifications to bring elite day-care surgical care to Nepal.</p>
        </div>

        <div className="about-grid">
          <div className="scroll-reveal scroll-reveal--fade-right">
            <div className="about-image">
              <div className="about-image__frame">
                <img src="/images/doctor.jpeg" alt="Dr. Siddhant Kishan Mahato" loading="lazy" />
                <span className="about-image__nmc">NMC No: 25037</span>
              </div>
              <div className="about-image__badge animate-float">
                <strong>MS: General Surgery</strong>
                <span>MBBS · Day Care Surgery</span>
                <span>Tribhuvan University Affiliated</span>
              </div>
            </div>
          </div>

          <div className="scroll-reveal scroll-reveal--fade-left">
            <div className="about-content">
              <h3 className="about-content__name">Dr. Siddhant Kishan Mahato</h3>
              <p className="about-content__role">Specialist in General &amp; Laparoscopic Surgery</p>
              
              <p>
                Dr. Siddhant Kishan Mahato is a highly trained general surgeon specializing in <strong>Day Care Surgical Procedures</strong>—advanced, minimally invasive, and routine interventions structured to allow you to walk in, receive elite surgical care, and return to the comfort of your own home the very same day.
              </p>
              
              <p>
                His goal is to demystify your diagnosis, outline the most effective evidence-based treatments, and utilize advanced techniques that prioritize minimal pain, rapid recovery, and absolute safety.
              </p>

              <div className="about-highlights" id="about-credentials">
                <div className="about-highlight card--premium">
                  <h4>Academic Qualifications</h4>
                  <p>
                    <strong>Master of Surgery (MS) in General Surgery</strong> from Nepalese Army Institute of Health Sciences (NAIHS), affiliated with Tribhuvan University.
                  </p>
                  <p style={{ marginTop: '0.5rem' }}>
                    <strong>Bachelor of Medicine, Bachelor of Surgery (MBBS)</strong> from Sun Yat-sen University, Guangzhou, China (one of China's top historic medical schools).
                  </p>
                </div>
              </div>

              <a href="#contact" className="btn btn--primary">Book Consultation with Dr. Mahato</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   AREAS OF EXPERTISE
   ========================================================================== */
const expertiseData = [
  {
    title: 'Day Care & Soft Tissue Procedures',
    desc: 'Designed for rapid recovery with a focus on optimal cosmetic outcomes and same-day discharge.',
    items: 'Lipomas, sebaceous cysts, abscess drainage, burn care, and nail excisions.',
    iconSvg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    )
  },
  {
    title: 'Abdominal & General Surgery',
    desc: 'Comprehensive hernia repairs, gallbladder stone management, and acute emergency surgeries.',
    items: 'Hernia repairs, gallbladder stones (cholecystitis), appendectomy, and bowel operations.',
    iconSvg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16v16H4z" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    )
  },
  {
    title: 'Proctology & Vascular Care',
    desc: 'Modern and specialized procedures for highly sensitive colorectal and vascular conditions.',
    items: 'Laser treatment for piles (hemorrhoids), anal fissures, fistulas, and varicose veins.',
    iconSvg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    )
  },
  {
    title: 'Urology & Men\'s Health',
    desc: 'Comprehensive diagnostics and repairs for renal stones, scrotal, and penile conditions.',
    items: 'Kidney stones, prostate conditions, hydrocele, circumcision, and testicular torsion.',
    iconSvg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2" />
      </svg>
    )
  }
];

function Expertise() {
  return (
    <section className="section" id="expertise">
      <div className="section-decoration section-decoration--left" aria-hidden="true">
        <svg className="section-decoration__blob" viewBox="0 0 200 200" fill="none">
          <path d="M45.5,-52.3C57.8,-40.2 66.5,-24.5 68.9,-7.8C71.3,8.9 67.4,26.6 57.8,39.8C48.2,53 32.9,61.7 16.4,65.8C-0.1,69.9,-17.7,69.4,-32.1,61.8C-46.5,54.2,-57.7,39.5,-63.4,22.8C-69.1,6.1,-69.3,-12.6,-62.1,-28.4C-54.9,-44.2,-40.3,-57.1,-24.2,-62.8C-8.1,-68.5,9.5,-67,24.8,-59.5C40.1,-52,53.2,-38.5 45.5,-52.3Z" transform="translate(100 100)" fill="currentColor"></path>
        </svg>
      </div>

      <div className="container">
        <div className="section-title">
          <span className="section-title__label">Areas of Expertise</span>
          <div className="icon-badge icon-badge--md icon-badge--default section-title__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="medical-icon">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"></circle>
              <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
            </svg>
          </div>
          <span className="section-title__line"></span>
          <h2>Specialized Care Across General &amp; Day Care Surgery</h2>
          <p>Expert surgical and clinical care structured to minimize disruption to your life.</p>
        </div>

        <div className="grid-4 expertise-grid">
          {expertiseData.map((item, idx) => (
            <div key={idx} className="scroll-reveal scroll-reveal--fade-up" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="expertise-card card card--premium">
                <div className="icon-badge icon-badge--md icon-badge--default expertise-card__icon">
                  {item.iconSvg}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.75rem', fontWeight: 650 }}>
                  Includes: {item.items}
                </div>
                <a href="#treatments" className="expertise-card__link">
                  Learn more 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   TREATMENTS & PROCEDURES SECTION
   ========================================================================== */
const treatmentsData = [
  {
    title: 'Laparoscopic Cholecystectomy',
    cat: 'Abdominal Surgery',
    desc: 'Keyhole surgery to remove a diseased gallbladder or gallstones, minimizing scars and recovery time.',
    img: '/images/hero.jpeg' // Reusing provided images as fallback
  },
  {
    title: 'Laparoscopic Appendectomy',
    cat: 'Emergency Surgery',
    desc: 'Minimally invasive urgent surgical removal of the appendix for acute or chronic appendicitis.',
    img: '/images/hero.jpeg'
  },
  {
    title: 'Tension-Free Hernia Repair',
    cat: 'General Surgery',
    desc: 'Advanced surgical mesh reconstruction for inguinal, umbilical, femoral, and incisional hernias.',
    img: '/images/hero.jpeg'
  },
  {
    title: 'Laser Treatment for Piles',
    cat: 'Proctology',
    desc: 'Modern laser ablation for hemorrhoids, fissures, and fistulas, promoting rapid healing and minimal pain.',
    img: '/images/hero.jpeg'
  },
  {
    title: 'Varicose Veins Laser Therapy',
    cat: 'Vascular Care',
    desc: 'Endovenous laser closure of painful, swollen varicose veins under local anesthesia as a day-care procedure.',
    img: '/images/hero.jpeg'
  },
  {
    title: 'Day-Care Cyst & Lipoma Excision',
    cat: 'Soft Tissue Surgery',
    desc: 'Quick outpatient removal of benign skin swellings, lipomas, sebaceous cysts, and ingrown nails.',
    img: '/images/hero.jpeg'
  }
];

function Treatments() {
  return (
    <section className="section section--cream" id="treatments">
      <div className="section-decoration section-decoration--left" aria-hidden="true">
        <svg className="section-decoration__blob" viewBox="0 0 200 200" fill="none">
          <path d="M45.5,-52.3C57.8,-40.2 66.5,-24.5 68.9,-7.8C71.3,8.9 67.4,26.6 57.8,39.8C48.2,53 32.9,61.7 16.4,65.8C-0.1,69.9,-17.7,69.4,-32.1,61.8C-46.5,54.2,-57.7,39.5,-63.4,22.8C-69.1,6.1,-69.3,-12.6,-62.1,-28.4C-54.9,-44.2,-40.3,-57.1,-24.2,-62.8C-8.1,-68.5,9.5,-67,24.8,-59.5C40.1,-52,53.2,-38.5 45.5,-52.3Z" transform="translate(100 100)" fill="currentColor"></path>
        </svg>
      </div>

      <div className="container">
        <div className="section-title">
          <span className="section-title__label">Treatments &amp; Services</span>
          <div className="icon-badge icon-badge--md icon-badge--default section-title__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="medical-icon">
              <path d="M14 2l4 4-6 6-4-4 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
              <path d="M3 21l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.5"></circle>
            </svg>
          </div>
          <span className="section-title__line"></span>
          <h2>Surgery and General Treatments</h2>
          <p>Trusted treatment methods using modern surgery with minimal hospital stays and rapid recovery.</p>
        </div>

        <div className="grid-3 treatments-grid">
          {treatmentsData.map((item, idx) => (
            <div key={idx} className="scroll-reveal scroll-reveal--fade-up" style={{ transitionDelay: `${idx * 80}ms` }}>
              <div className="treatment-card card card--premium">
                <div className="treatment-card__image">
                  <img src={item.img} alt={item.title} loading="lazy" />
                </div>
                <div className="treatment-card__body">
                  <span className="treatment-card__category">{item.cat}</span>
                  <h3>{item.title}</h3>
                  <p className="treatment-card__excerpt">{item.desc}</p>
                  <a href="#contact" className="treatment-card__more">Request Procedure &rarr;</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-reveal scroll-reveal--fade-up" style={{ transitionDelay: '200ms' }}>
          <div className="section-cta">
            <a href="#contact" className="btn btn--primary">Request Consultation</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   WHY CHOOSE US
   ========================================================================== */
const whyChooseData = [
  {
    title: 'Training from Top Universities',
    desc: 'MS in General Surgery from NAIHS (Tribhuvan University) and MBBS from historic Sun Yat-sen University, Guangzhou, China.'
  },
  {
    title: 'Day Care Specialization',
    desc: 'Dedicated day-case procedures structured so that you can walk in, receive elite surgical care, and return home same-day.'
  },
  {
    title: 'Minimally Invasive Laparoscopy',
    desc: 'Advanced keyhole techniques that focus on minimal post-operative pain, smaller cosmetic scars, and rapid daily recovery.'
  },
  {
    title: 'Patient-First Communication',
    desc: 'Clear, jargon-free explanations of your clinical diagnosis, encouraging collaborative patient decisions in care.'
  }
];

function WhyChoose() {
  return (
    <section className="section" id="why-choose">
      <div className="container">
        <div className="section-title">
          <span className="section-title__label">Why Choose Dr. Siddhant</span>
          <div className="icon-badge icon-badge--md icon-badge--default section-title__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="medical-icon">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"></circle>
            </svg>
          </div>
          <span className="section-title__line"></span>
          <h2>Why Patients Trust Dr. Mahato</h2>
          <p>Elite surgical competencies, advanced laparoscopy skills, and genuine empathetic care for every patient.</p>
        </div>

        <div className="grid-2 why-grid">
          {whyChooseData.map((item, idx) => (
            <div key={idx} className="scroll-reveal scroll-reveal--fade-up" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="why-card">
                <div className="icon-badge icon-badge--md icon-badge--default why-card__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   APPOINTMENT CTA
   ========================================================================== */
function AppointmentCTA() {
  return (
    <section className="section section--primary appointment-cta">
      <div className="appointment-cta__bg" aria-hidden="true">
        <svg className="appointment-cta__wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
      <div className="container appointment-cta__inner">
        <div className="scroll-reveal scroll-reveal--fade-right">
          <div className="appointment-cta__text">
            <h2>Ready to Book Your Visit?</h2>
            <p>Schedule a personal clinical consultation with Dr. Siddhant Kishan Mahato for a customized surgical evaluation and treatment outline.</p>
          </div>
        </div>
        <div className="scroll-reveal scroll-reveal--fade-left" style={{ transitionDelay: '150ms' }}>
          <div className="appointment-cta__actions">
            <a href="#contact" className="btn btn--accent btn--glow">Book Appointment</a>
            <a href="tel:+9779800000000" className="btn btn--outline">Call Clinic</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   RESEARCH & MEDICAL PUBLICATIONS
   ========================================================================== */
const researchData = [
  {
    year: '2025',
    journal: 'Nepalese Journal of Surgery',
    title: 'Outcomes of Day-Care Laparoscopic Cholecystectomy in a Tertiary Medical Centre in Nepal: A Observational Study',
    authors: 'Siddhant Kishan Mahato, Ram Kumar Shrestha, Anil Basnet',
    desc: 'Evaluating patient outcomes, readmission rates, and safety records for day-care laparoscopic cholecystectomies performed within 12-hour pathways in Nepal.'
  },
  {
    year: '2024',
    journal: 'Journal of Surgical Case Reports',
    title: 'Laparoscopic Repair of Giant Diaphragmatic Hernia: A Case Series from Kathmandu',
    authors: 'Siddhant Kishan Mahato, et al.',
    desc: 'Presenting surgical management details and recovery outcomes of laparoscopy repairs for congenital diaphragmatic hernias in adults.'
  }
];

function Research() {
  return (
    <section className="section section--soft" id="research">
      <div className="container">
        <div className="section-title">
          <span className="section-title__label">Research &amp; Publications</span>
          <div className="icon-badge icon-badge--md icon-badge--default section-title__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
              <path d="M14 2v6h6M9 13h6M9 17h4" />
            </svg>
          </div>
          <span className="section-title__line"></span>
          <h2>Research and Medical Publications</h2>
          <p>Published surgical research and academic work on general and laparoscopic procedures.</p>
        </div>

        <div className="research-list">
          {researchData.map((item, idx) => (
            <div key={idx} className="scroll-reveal scroll-reveal--fade-up" style={{ transitionDelay: `${idx * 100}ms` }}>
              <article className="research-card card card--premium">
                <div className="research-card__header">
                  <div className="icon-badge icon-badge--sm icon-badge--default">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                    </svg>
                  </div>
                  <div className="research-card__meta">
                    <span className="research-card__year">{item.year}</span>
                    <span className="research-card__journal">{item.journal}</span>
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p className="research-card__authors">{item.authors}</p>
                <p className="research-card__summary">{item.desc}</p>
                <a href="#contact" className="research-card__link">Request full text &rarr;</a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PATIENT STORIES / TESTIMONIALS
   ========================================================================== */
const testimonialsData = [
  {
    stars: 5,
    text: "I was extremely nervous about my hernia surgery, but Dr. Siddhant explained everything so clearly. I walked into the clinic in the morning and was back home in the evening. Minimal pain and exceptional care! Highly recommended.",
    author: "Ramesh Sharma, Hernia Patient"
  },
  {
    stars: 5,
    text: "Excellent surgeon! My gallbladder operation was done laparoscopically. The incisions were so small, and I recovered within a few days. Thank you Dr. Siddhant for your empathy and dedication.",
    author: "Prerana Thapa, Gallbladder Surgery"
  },
  {
    stars: 5,
    text: "The best doctor for piles laser treatment. I was back to my normal work within 2 days with virtually no pain. Very professional, highly communicative.",
    author: "Sabin Shrestha, Laser Proctology"
  },
  {
    stars: 5,
    text: "Genuine, patient-first care philosophy. Demystifies everything and doesn't rush you. I received excellent outpatient cyst excision care.",
    author: "Anju Mahat, Soft Tissue Excision"
  }
];

function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-title">
          <span className="section-title__label">Patient Testimonials</span>
          <div className="icon-badge icon-badge--md icon-badge--default section-title__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="section-title__line"></span>
          <h2>Patient Stories</h2>
          <p>Real experiences from patients who underwent daycare and general surgery under Dr. Mahato.</p>
        </div>

        <div className="google-reviews-bar">
          <p className="google-reviews-bar__rating">
            <span className="google-reviews-bar__star">★</span>
            <span>5.0 · Google Verified Reviews</span>
          </p>
          <div className="google-reviews-bar__actions">
            <a href="#contact" className="btn btn--outline-dark btn--sm">View Reviews on Google</a>
            <a href="#contact" className="btn btn--primary btn--sm">Write a Review</a>
          </div>
        </div>

        <div className="reviews-carousel" role="list">
          {testimonialsData.map((item, idx) => (
            <blockquote key={idx} className="testimonial-card" role="listitem">
              <div className="testimonial-card__header">
                <div className="testimonial-card__stars">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="testimonial-card__google-badge">
                  <svg className="testimonial-card__google-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  GOOGLE
                </span>
              </div>
              <p className="testimonial-card__text">"{item.text}"</p>
              <cite className="testimonial-card__author">{item.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   HEALTH TIPS & BLOGS
   ========================================================================== */
const blogsData = [
  {
    title: "Understanding Day Care Surgery: Benefits and Expectations",
    cat: "Patient Guide",
    desc: "Discover how same-day surgical pathways operate, their benefits in terms of cost and infection reduction, and what to expect during your discharge process.",
    date: "June 25, 2026",
    img: "/images/hero.jpeg"
  },
  {
    title: "Recovering from Laparoscopic Gallbladder Surgery: A Smooth Transition",
    cat: "Recovery Tips",
    desc: "Practical post-operative guides on food intake, light physical activity, and pain management for patients recovering from keyhole gallstone removals.",
    date: "May 18, 2026",
    img: "/images/hero.jpeg"
  },
  {
    title: "Laser Proctology: Changing Colorectal Surgery Outcomes",
    cat: "Advanced Tech",
    desc: "How laser treatments for hemorrhoids and fissures have minimized surgical tissue trauma, dramatically reducing pain and healing periods.",
    date: "April 02, 2026",
    img: "/images/hero.jpeg"
  }
];

function Blogs() {
  return (
    <section className="section section--soft" id="blogs">
      <div className="container">
        <div className="section-title">
          <span className="section-title__label">Health Resources</span>
          <div className="icon-badge icon-badge--md icon-badge--default section-title__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 20h9M3 20h9M12 4V2M12 22v-2" strokeLinecap="round" />
              <rect x="4" y="4" width="16" height="12" rx="2" />
            </svg>
          </div>
          <span className="section-title__line"></span>
          <h2>Health Tips and Patient Guides</h2>
          <p>Informative guides on general surgery, recovery pathways, and day-care procedures.</p>
        </div>

        <div className="grid-3 blog-grid">
          {blogsData.map((item, idx) => (
            <div key={idx} className="scroll-reveal scroll-reveal--fade-up" style={{ transitionDelay: `${idx * 100}ms` }}>
              <article className="blog-card card card--premium">
                <a href="#contact" className="blog-card__link">
                  <div className="blog-card__image">
                    <img src={item.img} alt={item.title} loading="lazy" />
                  </div>
                  <div className="blog-card__body">
                    <span className="blog-card__category">{item.cat}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <time dateTime="2026-06-25">{item.date}</time>
                  </div>
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
const faqsData = [
  {
    q: "What surgical conditions does Dr. Siddhant treat?",
    a: "Dr. Siddhant treats a wide range of general surgery conditions. This includes gallstones (laparoscopic cholecystectomy), appendicitis (appendectomy), hernias (mesh repair), hemorrhoids/fissures/fistulas (laser proctology), varicose veins, kidney stones, and skin swellings like lipomas and cysts."
  },
  {
    q: "What is Day Care Surgery?",
    a: "Day care surgery refers to advanced, minimally invasive procedures planned so that you walk in, undergo treatment, and are safely discharged to go home on the very same day. There is no overnight hospital stay required, which reduces costs and hospital infection risks."
  },
  {
    q: "Is laparoscopic surgery safer than open surgery?",
    a: "Laparoscopic (keyhole) surgery utilizes tiny incisions and a camera. It generally involves significantly less pain, minimal scarring, a lower infection risk, and a much faster recovery compared to traditional open surgeries, though suitability depends on the specific case."
  },
  {
    q: "How can I schedule an appointment?",
    a: "You can request an appointment using the form at the bottom of this page, calling our consultation line directly, or sending an inquiry. We will contact you to coordinate a convenient time."
  },
  {
    q: "What should I bring to my initial consultation?",
    a: "Please bring all relevant previous medical records, diagnostic test reports (blood tests, ultrasounds, CT scans), current prescription medicines, and details of any prior surgical interventions."
  }
];

function FAQs() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section" id="faqs">
      <div className="container">
        <div className="section-title">
          <span className="section-title__label">FAQs</span>
          <div className="icon-badge icon-badge--md icon-badge--default section-title__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <span className="section-title__line"></span>
          <h2>Common Questions Answered</h2>
          <p>Answers to common questions about daycare procedures, laparoscopic methods, and appointments.</p>
        </div>

        <div className="faq-list">
          {faqsData.map((item, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${openIdx === idx ? 'faq-item--open' : ''}`}
            >
              <button className="faq-item__question" onClick={() => toggleFaq(idx)}>
                <div className="icon-badge icon-badge--sm icon-badge--default">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                </div>
                <span>{item.q}</span>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"></path>
                </svg>
              </button>
              <div className="faq-item__answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   CONTACT SECTION
   ========================================================================== */
function Contact() {
  return (
    <section className="section section--soft" id="contact">
      <div className="container">
        <div className="section-title">
          <span className="section-title__label">Contact Information</span>
          <span className="section-title__line"></span>
          <h2>Get in Touch</h2>
          <p>Reach out for appointments, inquiries, clinical referrals, or a surgical second opinion.</p>
        </div>

        <div className="contact-grid">
          <div className="scroll-reveal scroll-reveal--fade-right">
            <div className="contact-info">
              <div className="contact-card card">
                <h3>Surgical Consultation Clinic</h3>
                <p className="contact-card__role">Lead General Surgeon</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-card__address"
                >
                  Kathmandu, Nepal (Clinical location details on request)
                </a>
              </div>

              <div className="contact-card card">
                <h3>Academic &amp; Training Pedigree</h3>
                <p className="contact-card__role">Professional Credentials</p>
                <p>MS in General Surgery, NAIHS, Tribhuvan University</p>
                <p>MBBS, Sun Yat-sen University, Guangzhou, China</p>
                <p style={{ marginTop: '0.25rem', fontWeight: 600 }}>NMC Reg. No. 25037</p>
              </div>

              <div className="contact-details">
                <a href="tel:+9779800000000" className="contact-detail">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.01l-2.2-2.22z"></path>
                  </svg>
                  +977 9800000000
                </a>
                <a href="mailto:info@drsiddhant.com.np" className="contact-detail">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                  </svg>
                  info@drsiddhant.com.np
                </a>
              </div>
            </div>
          </div>

          <div className="scroll-reveal scroll-reveal--fade-left" style={{ transitionDelay: '150ms' }}>
            {/* Embedded static Map placeholder or generic interactive map */}
            <div className="contact-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625953046!2d85.28493299719308!3d27.70895594454795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1b545d9757!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Kathmandu Clinic Map Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FOOTER
   ========================================================================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__logo-col">
            <div className="footer__logo">
              <strong>Dr. Siddhant K. Mahato</strong>
              <span>General &amp; Laparoscopic Surgeon</span>
            </div>
            <p className="footer__desc">
              Specialist general surgeon with daycare clinical focuses. Providing advanced surgical precision and compassionate care using modern, evidence-based daycare pathways.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Facebook">
                <span>FB</span>
              </a>
              <a href="#" aria-label="LinkedIn">
                <span>LN</span>
              </a>
              <a href="#" aria-label="Twitter">
                <span>TW</span>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Dr. Mahato</a></li>
              <li><a href="#expertise">Clinical Expertise</a></li>
              <li><a href="#treatments">Surgical Menu</a></li>
            </ul>
          </div>

          <div className="footer__links">
            <h3>Resources</h3>
            <ul>
              <li><a href="#research">Publications</a></li>
              <li><a href="#blogs">Health Guides</a></li>
              <li><a href="#faqs">FAQs Help</a></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h3>Contact Details</h3>
            <ul>
              <li>
                <strong>Clinical Office</strong>
                Kathmandu, Nepal
              </li>
              <li>
                <strong>Call Consultation</strong>
                <a href="tel:+9779800000000">+977 9800000000</a>
              </li>
              <li>
                <strong>Email Address</strong>
                <a href="mailto:info@drsiddhant.com.np">info@drsiddhant.com.np</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Dr. Siddhant Kishan Mahato. MS (General Surgery) | NMC Reg. 25037. All rights reserved.</p>
          <p className="footer__disclaimer">
            Disclaimer: The health information on this clinical website is provided for educational and introductory purposes only. It is not intended to replace direct professional medical diagnostics, surgical consultations, or personalized care plans.
          </p>
          <div className="footer__powered">
            Created with medical care standard · Inspired by Birendra Bhagat Portfolio
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   MOBILE QUICK FLOATING ACTIONS BAR
   ========================================================================== */
function MobileQuickActions() {
  return (
    <div className="mobile-quick-actions" aria-hidden="true">
      <div className="mobile-quick-actions__bar">
        <a href="tel:+9779800000000" className="mobile-quick-actions__item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.01l-2.2-2.22z"></path>
          </svg>
          <span>Call Surgeon</span>
        </a>
        <a href="#contact" className="mobile-quick-actions__item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span>Book Visit</span>
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   APP MAIN
   ========================================================================== */
export default function App() {
  useScrollReveal();

  return (
    <div className="app-layout">
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Expertise />
        <Treatments />
        <WhyChoose />
        <AppointmentCTA />
        <Research />
        <Testimonials />
        <Blogs />
        <FAQs />
        <Contact />
      </main>
      <Footer />
      <MobileQuickActions />
    </div>
  );
}
