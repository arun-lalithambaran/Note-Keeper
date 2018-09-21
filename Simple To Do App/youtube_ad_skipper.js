var timer = setInterval(function() {
	var video_ad = document.querySelector(".ytp-ad-skip-button");
	var overlay_ad = document.querySelector(".ytp-ad-overlay-close-button");
	console.log("checking!");
	if(overlay_ad != null) {
		overlay_ad.click();
		console.log("Overlay Ad skipped");
  }
  if(video_ad != null) {
    video_ad.click();
    console.log("Video ad skipped!");
  }
}, 1000);
