// ============================================
// TERRAZZA DI SOLE - Main Application JS
// ============================================

// API Configuration
const API_BASE = '/api';
let authToken = localStorage.getItem('terrazza_token');

// ============================================
// DOM Elements
// ============================================

const mainNav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const heroVideo = document.getElementById('heroVideo');
const soundToggle = document.getElementById('soundToggle');
const bookingModal = document.getElementById('bookingModal');
const openBookingBtn = document.getElementById('openBookingModal');
const closeModalBtn = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');
const contactForm = document.getElementById('contactForm');
const propertiesGrid = document.getElementById('propertiesGrid');
const toast = document.getElementById('toast');

// ============================================
// Navigation
// ============================================

// Scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// ============================================
// Hero Video & Sound
// ============================================

let isMuted = true;
if (heroVideo) {
  heroVideo.muted = isMuted;
}

if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    if (heroVideo) {
      heroVideo.muted = isMuted;
    }
    soundToggle.querySelector('.sound-on').style.display = isMuted ? 'none' : 'block';
    soundToggle.querySelector('.sound-off').style.display = isMuted ? 'block' : 'none';
  });
}

// ============================================
// Booking Modal
// ============================================

if (openBookingBtn) {
  openBookingBtn.addEventListener('click', () => {
    if (!authToken) {
      showToast('Please login to make a reservation');
      window.location.href = '/login?redirect=booking';
      return;
    }
    bookingModal.classList.add('active');
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    bookingModal.classList.remove('active');
  });
}

// Close modal on overlay click
if (bookingModal) {
  bookingModal.querySelector('.modal-overlay').addEventListener('click', () => {
    bookingModal.classList.remove('active');
  });
}

// Booking form submission
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      property_id: 1, // Default property
      check_in: document.getElementById('checkin').value,
      check_out: document.getElementById('checkout').value,
      guests: document.getElementById('guests').value,
      special_requests: document.getElementById('requests').value
    };
    
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showToast('Reservation request submitted! Our concierge will contact you shortly.');
        bookingModal.classList.remove('active');
        bookingForm.reset();
      } else {
        showToast(data.error || 'Failed to submit reservation');
      }
    } catch (error) {
      showToast('Connection error. Please try again.');
    }
  });
}

// Update booking summary
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

function updateSummary() {
  const checkin = new Date(checkinInput?.value);
  const checkout = new Date(checkoutInput?.value);
  const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
  
  const summaryDuration = document.getElementById('summaryDuration');
  const summaryTotal = document.getElementById('summaryTotal');
  
  if (summaryDuration) {
    summaryDuration.textContent = nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : '— nights';
  }
  
  if (summaryTotal) {
    const pricePerNight = 850; // Default price
    const total = nights > 0 ? nights * pricePerNight : 0;
    summaryTotal.textContent = `€${total.toLocaleString()}`;
  }
}

if (checkinInput) checkinInput.addEventListener('change', updateSummary);
if (checkoutInput) checkoutInput.addEventListener('change', updateSummary);

// ============================================
// Contact Form
// ============================================

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showToast('Message sent! Our concierge team will respond shortly.');
        contactForm.reset();
      } else {
        showToast(data.error || 'Failed to send message');
      }
    } catch (error) {
      showToast('Connection error. Please try again.');
    }
  });
}

// ============================================
// Properties Loading
// ============================================

async function loadProperties() {
  if (!propertiesGrid) return;
  
  try {
    const response = await fetch(`${API_BASE}/properties`);
    const data = await response.json();
    
    if (data.properties && data.properties.length > 0) {
      propertiesGrid.innerHTML = data.properties.map(property => `
        <article class="property-card" data-id="${property.id}">
          <div class="property-image">
            ${property.is_featured ? '<span class="property-badge">Featured</span>' : ''}
            <img src="${property.main_image || '/images/property-placeholder.jpg'}" alt="${property.title}" loading="lazy">
          </div>
          <div class="property-content">
            <h3 class="property-title">${property.title}</h3>
            <p class="property-location">${property.location}</p>
            <div class="property-price">
              <span class="price-amount">€${property.price_per_night.toLocaleString()}</span>
              <span class="price-period">/ night</span>
            </div>
          </div>
        </article>
      `).join('');
      
      // Add click handlers
      document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', () => {
          window.location.href = `/property/${card.dataset.id}`;
        });
      });
    } else {
      // Show demo properties if API not available
      propertiesGrid.innerHTML = getDemoProperties();
    }
  } catch (error) {
    // Show demo properties on error
    propertiesGrid.innerHTML = getDemoProperties();
  }
}

function getDemoProperties() {
  const demos = [
    {
      id: 1,
      title: 'Cliffside Suite',
      location: 'Positano, Amalfi Coast',
      price: 850,
      featured: true
    },
    {
      id: 2,
      title: 'Limonaia Suite',
      location: 'Ravello, Amalfi Coast',
      price: 1200,
      featured: true
    },
    {
      id: 3,
      title: 'Villa Terrazza',
      location: 'Praiano, Amalfi Coast',
      price: 3500,
      featured: false
    }
  ];
  
  return demos.map(p => `
    <article class="property-card" data-id="${p.id}">
      <div class="property-image">
        ${p.featured ? '<span class="property-badge">Featured</span>' : ''}
      </div>
      <div class="property-content">
        <h3 class="property-title">${p.title}</h3>
        <p class="property-location">${p.location}</p>
        <div class="property-price">
          <span class="price-amount">€${p.price.toLocaleString()}</span>
          <span class="price-period">/ night</span>
        </div>
      </div>
    </article>
  `).join('');
}

// ============================================
// Toast Notifications
// ============================================

function showToast(message, duration = 4000) {
  const toastMessage = toast.querySelector('.toast-message');
  if (toastMessage) {
    toastMessage.textContent = message;
  }
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ============================================
// Scroll Animations
// ============================================

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Observe timeline phases
document.querySelectorAll('.timeline-phase').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Observe stakeholder cards
document.querySelectorAll('.stakeholder-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Observe property cards
document.querySelectorAll('.property-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// Authentication Check
// ============================================

async function checkAuth() {
  if (!authToken) return null;
  
  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      updateUIForUser(data.user);
      return data.user;
    } else {
      localStorage.removeItem('terrazza_token');
      authToken = null;
      return null;
    }
  } catch (error) {
    return null;
  }
}

function updateUIForUser(user) {
  // Update nav actions
  const navActions = document.querySelector('.nav-actions');
  if (navActions) {
    navActions.innerHTML = `
      <a href="/profile" class="nav-btn nav-btn-outline">My Account</a>
      <button onclick="logout()" class="nav-btn nav-btn-primary">Logout</button>
    `;
  }
  
  // Update mobile actions
  const mobileActions = document.querySelector('.mobile-actions');
  if (mobileActions) {
    mobileActions.innerHTML = `
      <a href="/profile" class="nav-btn nav-btn-outline">My Account</a>
      <button onclick="logout()" class="nav-btn nav-btn-primary">Logout</button>
    `;
  }
}

window.logout = function() {
  localStorage.removeItem('terrazza_token');
  window.location.href = '/';
};

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  loadProperties();
  checkAuth();
  
  // Set min date for booking form
  const today = new Date().toISOString().split('T')[0];
  if (checkinInput) checkinInput.min = today;
  if (checkoutInput) checkoutInput.min = today;
});

// ============================================
// Service Worker Registration (PWA)
// ============================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, but app still works
    });
  });
}

// ============================================
// Parallax Effects
// ============================================

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Hero parallax
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
  
  // Service panels horizontal parallax
  document.querySelectorAll('.service-content').forEach((content, index) => {
    const rect = content.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const translateX = (index % 2 === 0 ? 1 : -1) * (progress - 0.5) * 50;
      content.style.transform = `translateX(${translateX}px)`;
    }
  });
});

// ============================================
// Map Interactivity
// ============================================

document.querySelectorAll('.landmark').forEach(landmark => {
  landmark.addEventListener('click', function() {
    const name = this.dataset.name;
    showToast(`Explore ${name}`);
  });
});

console.log('🌊 Terrazza di Sole MVP initialized');