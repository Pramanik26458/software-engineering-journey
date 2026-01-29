const reels = [
  {
    username: "bolly_editz",
    isMuted: true,
    likecount: 120,
    repostcount: 9,
    isliked: false,
    cmtcount: 12,
    caption: "Dhurandhar mode ON 🔥 Akshaye Khanna’s entry hits different.what a comback bro",
    video: "video/video1.mp4",
    userprofile: "https://images.unsplash.com/photo-1617647858823-2424b6dc472f",
    sharecount: 18,
    isfollowed: false,
  },
  {
    username: "desi_vibes",
    isMuted: true,
    likecount: 342,
    repostcount: 21,
    isliked: true,
    cmtcount: 41,
    caption: "Mondal brothers Krish & Kishor singing straight from the soul 🎶❤️",
    video: "./video/video2.mp4",
    userprofile: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    sharecount: 56,
    isfollowed: true,
  },
  {
    username: "car_lovers_ig",
    isMuted: true,
    likecount: 980,
    repostcount: 65,
    isliked: false,
    cmtcount: 89,
    caption: "Fortuner in beast mode 🚙💨 💪💪💪 Power || presence || attitude.",
    video: "./video/video3.mp4",
    userprofile: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    sharecount: 112,
    isfollowed: false,
  },
  {
    username: "music_station",
    isMuted: true,
    likecount: 215,
    repostcount: 14,
    isliked: true,
    cmtcount: 19,
    caption: "Vishal’s voice + emotions = goosebumps every time 🎧✨",
    video: "./video/video4.mp4",
    userprofile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    sharecount: 27,
    isfollowed: true,
  },
  {
    username: "auto_diaries",
    isMuted: true,
    likecount: 1500,
    repostcount: 120,
    isliked: true,
    cmtcount: 132,
    caption: "Cars don’t need words, they speak speed and style 🏎️🔥",
    video: "./video/video5.mp4",
    userprofile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    sharecount: 210,
    isfollowed: true,
  },
  {
    username: "retro_tunes",
    isMuted: true,
    likecount: 430,
    repostcount: 33,
    isliked: false,
    cmtcount: 36,
    caption: "Feel Masakali vibes ✨ old soul, timeless melody 🎵🕊️",
    video: "./video/video6.mp4",
    userprofile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    sharecount: 64,
    isfollowed: false,
  }
];



var allReels = document.querySelector(".all-reels");
var userMuted = true; 



function addData() {
  let sum = "";

  reels.forEach(function (elem, idx) {
    sum += `
      <div class="reel">
        <video 
          src="${elem.video}" 
          autoplay 
          loop 
          muted
          playsinline
          data-index="${idx}"
        ></video>

        <div class="mute" id="${idx}">
          <i class="${
            userMuted ? "ri-volume-mute-fill" : "ri-volume-up-fill"
          }"></i>
        </div>

        <div class="bottom">
          <div class="user">
            <img src="${elem.userprofile}" />
            <h4>${elem.username}</h4>
            <button id="${idx}" class="follow">
              ${elem.isfollowed ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div class="title">
            <h3>${elem.caption}</h3>
          </div>
        </div>

        <div class="right">
          <div id="${idx}" class="like">
            <h4>${
              elem.isliked
                ? '<i class="love ri-heart-3-fill"></i>'
                : '<i class="ri-heart-3-line"></i>'
            }</h4>
            <h6>${elem.likecount}</h6>
          </div>

          <div>
            <h4><i class="ri-chat-ai-line"></i></h4>
            <h6>${elem.cmtcount}</h6>
          </div>

          <div>
            <h4><i class="ri-send-ins-line"></i></h4>
            <h6>${elem.sharecount}</h6>
          </div>

          <div>
            <h4><i class="ri-repeat-line"></i></h4>
            <h6>${elem.repostcount}</h6>
          </div>

          <div>
            <h4><i class="ri-more-2-fill"></i></h4>
          </div>
        </div>
      </div>
    `;
  });

  allReels.innerHTML = sum;
  handleReelAudio();
}

addData();


function handleReelAudio() {
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          videos.forEach((v) => (v.muted = true));

          if (!userMuted) {
            video.muted = false;
            video.play();
          }
        }
      });
    },
    { threshold: 0.7 }
  );

  videos.forEach((video) => observer.observe(video));
}



allReels.addEventListener("click", function (dets) {

  const likeBox = dets.target.closest(".like");
  if (likeBox) {
    const id = likeBox.id;
    reels[id].isliked = !reels[id].isliked;
    reels[id].likecount += reels[id].isliked ? 1 : -1;
    addData();
  }

  if (dets.target.className === "follow") {
    const id = dets.target.id;
    reels[id].isfollowed = !reels[id].isfollowed;
    addData();
  }


  const muteBox = dets.target.closest(".mute");
  if (muteBox) {
    userMuted = !userMuted;

    const videos = document.querySelectorAll("video");
    videos.forEach((v) => (v.muted = userMuted));

    addData();
  }
});
