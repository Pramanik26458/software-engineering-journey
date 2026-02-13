const reels = [
  {
    username: "bolly_editz",
    isMuted: true,
    likecount: 120,
    repostcount: 9,
    isliked: false,
    cmtcount: 12,
    caption:
      "Dhurandhar mode ON 🔥 Akshaye Khanna’s entry hits different. What a comeback bro!",
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
    caption:
      "Is DSA Going to Die in 2 Years ?@anubhavintech#sheryians #insidetheindustry",
    video: "video/video2.mp4",
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
    caption:
      "|| Dil Lagana Mna Tha || Kishore Mondal || #kishoremondal  #song #music #shorts",
    video: "video/video3.mp4",
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
    caption: "Jaatey Hue Lamho | Vishal Mishra | Border 2",
    video: "video/video4.mp4",
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
    caption:
      "Blue eyesss #takkila #dance #viral #hookstep #bollywood #trending #honeysingh #fyp",
    video: "video/video5.mp4",
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
    caption: "DSA VS DEVELOPMENT ..? : #striver#takeuforward#insidetheindustry",
    video: "video/video6.mp4",
    userprofile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    sharecount: 64,
    isfollowed: false,
  },
  {
    username: "car_lovers_ig",
    isMuted: true,
    likecount: 980,
    repostcount: 65,
    isliked: false,
    cmtcount: 89,
    caption: "Fortuner in beast mode 🚙💨 Power || presence || attitude.",
    video: "video/video7.mp4",
    userprofile: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    sharecount: 112,
    isfollowed: false,
  },
  {
    username: "car_lovers_ig",
    isMuted: true,
    likecount: 980,
    repostcount: 65,
    isliked: false,
    cmtcount: 89,
    caption:
      "Harkirat Singh: Software Developer Roadmap in 25 SECONDS! | Ishan Sharma",
    video: "video/video8.mp4",
    userprofile: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    sharecount: 112,
    isfollowed: false,
  },
  {
    username: "car_lovers_ig",
    isMuted: true,
    likecount: 980,
    repostcount: 65,
    isliked: false,
    cmtcount: 89,
    caption:
      "WHO SAID BOYS CAN’T DANCE? 😎🕺Bahraich mein ladkiyan hi nahi,ladke bhi DJ ka remote chheen lete hain!",
    video: "video/video9.mp4",
    userprofile: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    sharecount: 112,
    isfollowed: false,
  },
];

const allReels = document.querySelector(".all-reels");
let userMuted = true;

function addData() {
  let html = "";

  reels.forEach((elem, idx) => {
    html += `
      <div class="reel">

        <video 
          src="${elem.video}" 
          autoplay 
          loop 
          muted
          playsinline
          data-index="${idx}"
        ></video>

        <i class="big-heart ri-heart-3-fill"></i>

        <div class="mute">
          <i class="ri-volume-mute-fill"></i>
        </div>

        <div class="bottom">
          <div class="user">
            <img src="${elem.userprofile}" />
            <h4>${elem.username}</h4>
            <button class="follow" data-id="${idx}">
              ${elem.isfollowed ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div class="title">
            <h3>${elem.caption}</h3>
          </div>
        </div>

        <div class="right">

  <!-- LIKE -->
  <div class="like" data-id="${idx}">
    <h4>
      ${
        elem.isliked
          ? '<i class="love ri-heart-3-fill"></i>'
          : '<i class="ri-heart-3-line"></i>'
      }
    </h4>
    <h6>${elem.likecount}</h6>
  </div>

  <!-- COMMENT -->
  <div class="comment" data-id="${idx}">
    <h4><i class="ri-chat-ai-line"></i></h4>
    <h6>${elem.cmtcount}</h6>
  </div>

  <!-- SHARE -->
  <div class="share" data-id="${idx}">
    <h4><i class="ri-send-plane-line"></i></h4>
    <h6>${elem.sharecount}</h6>
  </div>

  <!-- REPOST -->
  <div class="repost" data-id="${idx}">
    <h4><i class="ri-repeat-line"></i></h4>
    <h6>${elem.repostcount}</h6>
  </div>

  <!-- MORE -->
  <div>
    <h4><i class="ri-more-2-fill"></i></h4>
  </div>

</div>


      </div>
    `;
  });

  allReels.innerHTML = html;
  handleReelAudio();
}

addData();

/*INTERSECTION OBSERVER */
function handleReelAudio() {
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          videos.forEach((v) => v.pause());
          video.play();
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.7 },
  );

  videos.forEach((video) => observer.observe(video));
}

/* DOUBLE TAP */
allReels.addEventListener("dblclick", function (e) {
  const video = e.target.closest("video");
  if (!video) return;

  const reel = video.closest(".reel");
  const heart = reel.querySelector(".big-heart");
  const index = video.dataset.index;

  heart.style.opacity = 1;
  heart.style.transform = "translate(-50%, -50%) scale(1) rotate(0deg)";

  setTimeout(() => {
    heart.style.transform = "translate(-50%, -300%) scale(1) rotate(60deg)";
  }, 800);

  setTimeout(() => (heart.style.opacity = 0), 1000);
  setTimeout(() => {
    heart.style.transform = "translate(-50%, -50%) scale(0) rotate(-60deg)";
  }, 1200);

  if (!reels[index].isliked) {
    reels[index].isliked = true;
    reels[index].likecount++;

    const likeBox = reel.querySelector(".like");
    likeBox.querySelector("i").className = "love ri-heart-3-fill";
    likeBox.querySelector("h6").textContent = reels[index].likecount;
  }
});

/* CLICK EVENTS */
allReels.addEventListener("click", function (e) {
  // LIKE BUTTON
  const likeBox = e.target.closest(".like");
  if (likeBox) {
    const id = likeBox.dataset.id;

    reels[id].isliked = !reels[id].isliked;
    reels[id].likecount += reels[id].isliked ? 1 : -1;

    likeBox.querySelector("i").className = reels[id].isliked
      ? "love ri-heart-3-fill"
      : "ri-heart-3-line";

    likeBox.querySelector("h6").textContent = reels[id].likecount;
  }

  // FOLLOW BUTTON
  if (e.target.classList.contains("follow")) {
    const id = e.target.dataset.id;
    reels[id].isfollowed = !reels[id].isfollowed;
    e.target.textContent = reels[id].isfollowed ? "Unfollow" : "Follow";
  }

  // REPOST CLICK
  const repostBox = e.target.closest(".repost");
  if (repostBox) {
    const id = repostBox.dataset.id;
    reels[id].repostcount++;
    repostBox.querySelector("h6").textContent = reels[id].repostcount;
  }

  // MUTE
  const mute = e.target.closest(".mute");
  if (mute) {
    userMuted = !userMuted;

    document.querySelectorAll("video").forEach((v) => (v.muted = userMuted));

    document.querySelectorAll(".mute i").forEach((icon) => {
      icon.className = userMuted ? "ri-volume-mute-fill" : "ri-volume-up-fill";
    });
  }
});
