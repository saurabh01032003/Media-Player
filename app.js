let playSection = document.querySelector("#play-section");
let playBtn = document.querySelector("#play-btn");
let songList = document.querySelector("#song-list");
let progress = document.querySelector("#progress");
let prevBtn = document.querySelector(".fa-backward"); // Selecting backward button
let nextBtn = document.querySelector(".fa-forward");  // Selecting forward button

let songs = [
  {
    name: "Tum Ankhon se batana - Dikshant",
    id: 1,
  },
  {
    name: "Mi Amor - The Paul",
    id: 2,
  },
  {
    name: "Tere Hawale - Arijit Singh",
    id: 3,
  },
  {
    name: "Dilbar - Pritam",
    id: 4,
  },
];

let currentSongIndex = 0; // Track the current song index
let audio = new Audio(`./assets/song${songs[currentSongIndex].id}.mp3`);

// Display all songs in the list
for (let song of songs) {
  let li = document.createElement("li");
  li.innerText = song.name;
  li.setAttribute("id", song.id);
  songList.append(li);
}

// Play/pause functionality
playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    playBtn.children[0].classList.remove("fa-play");
    playBtn.children[0].classList.add("fa-pause");
    updatePlayingEffect();  // Add effect to the current song
  } else {
    audio.pause();
    playBtn.children[0].classList.add("fa-play");
    playBtn.children[0].classList.remove("fa-pause");
  }
});

// Update progress bar based on song progress
audio.addEventListener("timeupdate", function () {
  let currentProg = (audio.currentTime * 100) / audio.duration;
  progress.value = currentProg;
});

// Seek functionality based on progress bar
progress.addEventListener("input", function () {
  let updateTime = (audio.duration * progress.value) / 100;
  audio.currentTime = updateTime;
});

// Select a song by clicking from the list
songList.addEventListener("click", function (e) {
  let idd = e.target.getAttribute("id");
  currentSongIndex = songs.findIndex((song) => song.id == idd); // Update index
  switchSong(currentSongIndex);
  updatePlayingEffect();  // Add effect to the current song
});

// Switch to the previous song
prevBtn.addEventListener("click", function () {
  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = songs.length - 1; // Go to last song if at the first
  }
  switchSong(currentSongIndex);
  updatePlayingEffect();  // Add effect to the current song
});

// Switch to the next song
nextBtn.addEventListener("click", function () {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0; // Loop back to the first song
  }
  switchSong(currentSongIndex);
  updatePlayingEffect();  // Add effect to the current song
});

// Function to switch and play a song
function switchSong(index) {
  audio.src = `./assets/song${songs[index].id}.mp3`;
  audio.currentTime = 0;
  audio.play();
  playBtn.children[0].classList.remove("fa-play");
  playBtn.children[0].classList.add("fa-pause");
}

// Function to add effect on current playing song
function updatePlayingEffect() {
  let songItems = document.querySelectorAll("#song-list li");
  
  // Remove 'current-playing' class from all songs
  songItems.forEach((item) => {
    item.classList.remove("current-playing");
  });
  
  // Add 'current-playing' class to the current song
  songItems[currentSongIndex].classList.add("current-playing");
}
