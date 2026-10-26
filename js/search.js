// Google Maps Initializer
let map;

function initMap() {
  const manhattanCoords = { lat: 40.7831, lng: -73.9712 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: manhattanCoords,
    disableDefaultUI: false,
    zoomControl: true,
  });

  // Mock property marker locations
  const locations = [
    { lat: 40.7736, lng: -73.9566, title: "$1,250,000 - Upper East Side" },
    { lat: 40.7233, lng: -74.0030, title: "$2,400,000 - SoHo West" },
    { lat: 40.7465, lng: -74.0014, title: "$890,000 - Chelsea" },
    { lat: 40.7336, lng: -74.0027, title: "$3,100,000 - Greenwich Village" }
  ];

  locations.forEach((loc) => {
    new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map: map,
      title: loc.title,
    });
  });
}

// UI Event Handlers
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const mapViewBtn = document.getElementById("mapViewBtn");
  const listViewBtn = document.getElementById("listViewBtn");
  const mapContainer = document.getElementById("map");
  const listingsContainer = document.getElementById("listingsContainer");
  const headerPlaceholder = document.getElementById("header-placeholder");
  const footerPlaceholder = document.getElementById("footer-placeholder");

  // Dynamic Header Loader
  if (headerPlaceholder) {
    fetch("header.html")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then((html) => {
        headerPlaceholder.innerHTML = html;
      })
      .catch(() => {
        // Fallback header markup if fetch fails
        headerPlaceholder.innerHTML = `
          <header class="header-placeholder" style="display:flex; justify-content:space-between; align-items:center; padding:16px 32px; background:#fff; border-bottom:1px solid #e2e8f0;">
            <div class="logo"><a href="/" style="font-weight:800; font-size:24px; text-decoration:none; color:#151717;">FIND</a></div>
            <nav class="nav-links">
              <a href="/search" style="margin:0 12px; text-decoration:none; color:#4a5568;">Search</a>
              <a href="/agents" style="margin:0 12px; text-decoration:none; color:#4a5568;">Agents</a>
              <a href="/about" style="margin:0 12px; text-decoration:none; color:#4a5568;">About</a>
            </nav>
            <div class="header-actions"><a href="#" style="background:#151717; color:#fff; padding:8px 18px; border-radius:20px; text-decoration:none;">Sign In</a></div>
          </header>
        `;
      });
  }

  // Dynamic Footer Loader
  if (footerPlaceholder) {
    fetch("footer.html")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then((html) => {
        footerPlaceholder.innerHTML = html;
      })
      .catch(() => {
        // Fallback footer markup if fetch is unavailable
        footerPlaceholder.innerHTML = `
          <footer style="padding: 24px 32px; text-align: center; color: #718096; font-size: 14px; background: #ffffff; border-top: 1px solid #e2e8f0;">
            <p>&copy; 2026 FIND Real Estate. All rights reserved.</p>
          </footer>
        `;
      });
  }

  // Clear Search Input
  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
    });
  }

  // View Toggle Handlers
  if (mapViewBtn && listViewBtn && mapContainer && listingsContainer) {
    mapViewBtn.addEventListener("click", () => {
      mapViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
      mapContainer.style.display = "block";
      listingsContainer.style.display = "grid";

      // Trigger map resize event so Google Maps fills the container properly
      if (map && typeof google !== "undefined" && google.maps) {
        google.maps.event.trigger(map, "resize");
      }
    });

    listViewBtn.addEventListener("click", () => {
      listViewBtn.classList.add("active");
      mapViewBtn.classList.remove("active");
      mapContainer.style.display = "none";
      listingsContainer.style.display = "grid";
    });
  }
});