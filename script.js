// =========================================
// StarTrax — Now playing player
// =========================================

// ---------- Review data ----------
// Each review is an object (a bundle of named details).
// The list of reviews is an array. To add a review, add another { ... } block.
const reviews = [
  {
    type: "album",
    title: "[Album title]",
    artist: "[Artist]",
    rating: 4,
    opening: "[Opening line of this album review]",
    cover: "conic-gradient(from 200deg, #f6c8e8, #c9d6ff, #b8f0e6, #fff2c4, #e6c9ff, #f6c8e8)"
  },
  {
    type: "song",
    title: "[Song title]",
    artist: "[Artist] · from [Album title]",
    rating: 5,
    opening: "[Opening line of this song review]",
    cover: "conic-gradient(from 90deg, #ff4fd8, #7b5ed6, #ff9be9, #ffd0f4, #ff4fd8)"
  },
  {
    type: "album",
    title: "[Album title]",
    artist: "[Artist]",
    rating: 3,
    opening: "[Opening line of this album review]",
    cover: "conic-gradient(from 0deg, #5ff3ff, #1d6f8a, #b8f0e6, #e6fbff, #5ff3ff)"
  },
  {
    type: "song",
    title: "[Song title]",
    artist: "[Artist] · from [Album title]",
    rating: 4,
    opening: "[Opening line of this song review]",
    cover: "conic-gradient(from 300deg, #ffd84f, #ff9b4f, #fff2c4, #ffe9a8, #ffd84f)"
  }
];

// ---------- Elements we'll update ----------
const player = document.querySelector(".player-screen");
const tag = document.querySelector(".tag");
const label = document.querySelector(".np-label");
const title = document.querySelector(".np-title");
const artist = document.querySelector(".np-artist");
const stars = document.querySelector(".stars");
const marqueeText = document.querySelector(".marquee-text");
const progressFill = document.querySelector(".progress-fill");
const cover = document.querySelector(".cover");
const discLabel = document.querySelector(".disc-label");
const playBtn = document.querySelector(".play-btn");

// ---------- Player state ----------
let current = 0;        // which review is showing (arrays start counting at 0)
let elapsed = 0;        // milliseconds spent on the current review
let playing = true;     // is autoplay on?
const DURATION = 6000;  // each review shows for 6 seconds

// ---------- Helpers ----------
// Turns a number like 4 into ★★★★☆
function makeStars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

// ---------- Show a review in the player ----------
function showReview(index) {
  const review = reviews[index];
  const trackNumber = String(index + 1).padStart(2, "0");

  tag.textContent = review.type === "album" ? "ALBUM REVIEW" : "SONG REVIEW";
  tag.classList.toggle("tag-song", review.type === "song");
  label.textContent = `NOW PLAYING · TRACK ${trackNumber}`;
  title.textContent = review.title;
  artist.textContent = review.artist;
  stars.textContent = makeStars(review.rating);
  stars.setAttribute("aria-label", `Rating: ${review.rating} out of 5`);
  marqueeText.textContent = `${review.opening}     ★     ${review.opening}     ★     `;
  cover.style.background = review.cover;
  discLabel.style.background = `radial-gradient(circle, #0a1a1f 6px, transparent 7px), ${review.cover}`;
}

// ---------- Autoplay timer ----------
// Runs every 100 milliseconds.
setInterval(function () {
  if (!playing) return;

  elapsed += 100;

  // After 6 seconds, move to the next review (wrapping back to the first)
  if (elapsed >= DURATION) {
    elapsed = 0;
    current = (current + 1) % reviews.length;
    showReview(current);
  }

  progressFill.style.width = (elapsed / DURATION) * 100 + "%";
}, 100);

// ---------- Play / pause ----------
playBtn.addEventListener("click", function () {
  playing = !playing;
  player.classList.toggle("is-paused", !playing);
  playBtn.textContent = playing ? "❚❚" : "▶";
  playBtn.setAttribute("aria-label", playing ? "Pause autoplay" : "Resume autoplay");
});

// ---------- Start ----------
showReview(current);

// =========================================
// On my radar — upcoming albums
// =========================================

const upcoming = [
  {
    title: "[Album title]",
    artist: "[Artist]",
    releaseDate: "[release date]",
    hype: 95,
    cover: "linear-gradient(135deg, #2b1d55, #7b5ed6)"
  },
  {
    title: "[Album title]",
    artist: "[Artist]",
    releaseDate: "[release date]",
    hype: 80,
    cover: "linear-gradient(135deg, #1d3a35, #5ff3ff)"
  },
  {
    title: "[Album title]",
    artist: "[Artist]",
    releaseDate: "[release date]",
    hype: 70,
    cover: "linear-gradient(135deg, #4a1b3c, #ff4fd8)"
  },
  {
    title: "[Album title]",
    artist: "[Artist]",
    releaseDate: "[release date]",
    hype: 55,
    cover: "linear-gradient(135deg, #3d2a05, #ffd84f)"
  }
];

// Builds the HTML for one upcoming-album card
function buildRadarCard(album, index) {
  return `
    <article class="radar-card" style="animation-delay: ${index * 0.1}s">
      <div class="radar-cover" style="background: ${album.cover}">
        [cover art]
        <span class="radar-date">${album.releaseDate}</span>
      </div>
      <h3 class="radar-title">${album.title}</h3>
      <p class="radar-artist">${album.artist}</p>
      <div class="hype">
        <span>hype</span>
        <div class="hype-track" role="img" aria-label="Hype level: ${album.hype} out of 100">
          <div class="hype-fill" style="width: ${album.hype}%; animation-delay: ${0.4 + index * 0.15}s"></div>
        </div>
      </div>
    </article>
  `;
}

// Build every card and put them on the page
const radarGrid = document.querySelector(".radar-grid");
radarGrid.innerHTML = upcoming.map(buildRadarCard).join("");