const NASA_API_KEY = ""; // ADD KEY

document.getElementById("submit").onclick = getImage;

function getImage() {
  const date = document.getElementById("date").value;

  const nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`;

  fetch(nasaURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // Add photo title to DOM
      document.querySelector("h2").innerText = data.title;

      // Remove image/video from DOM if present
      const img = document.querySelector("img");
      img.src = "";
      document.querySelector("iframe")?.remove();

      // media_type 'other' = no media, 9/15/25
      // media_type 'image' = most dates
      if (data.media_type === "image") {
        img.src = data.url;
      }

      // media_type 'video' = 9/14/25
      if (data.media_type === "video") {
        const iframe = document.createElement("iframe");
        iframe.src = data.url;
        iframe.width = 300;
        document.querySelector("div").appendChild(iframe);
      }

      document.querySelector("h3").innerText = data.explanation;
    })
    .catch((err) => console.error(err));
}
