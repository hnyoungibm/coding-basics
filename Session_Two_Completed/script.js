// API KEY
const PEXELS_API_KEY = "YOUR_API_KEY_HERE"; // Replace this with your own Pexels API key


// This line asks the page: find the element with the ID generateBtn
const button = document.querySelector("#generateBtn");
// This line prints the button element to the console
console.log(button);

// This asks the page: find the input with the ID searchInput
const input = document.querySelector("#searchInput");
//We log it to confirm it worked
console.log(input);

// Near the top of your file add this line
// This line -> find all the divs inside the element with the class "board"
const box = document.querySelectorAll(".board div");


// UPDATED Function that define what happens when the button is clicked
async function handleClick() { // Add async to allow for await inside
  const userInput = input.value;
  console.log(userInput);
  console.log("Button clicked!");

  // call fetchPexelsImages() and log what comes back
  const results = await fetchPexelsImages(userInput); 
  //console.log("Pexels returned:", results); // log the full results
  console.log("Photos array:", results.photos);
  console.log("Number of photos:", results.photos.length);

  displayImages(results.photos); // Call displayImages with the photos array
}

// Create a function that asks Pexels for images
// async means this function talks to the internet and may take a moment
// userInput is the word the user typed, like "sunset"
async function fetchPexelsImages(userInput) {
  // Build the link we send to Pexels
  // We attach the user's word to the link
  const url =
    "https://api.pexels.com/v1/search?query=" +
    encodeURIComponent(userInput) +
    "&per_page=9"; // per_page=9 means we want 9 images back

  // Send the request to Pexels
  // We include our API key so Pexels knows we're allowed to ask
  const response = await fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  // Convert the response into usable JavaScript data
  const data = await response.json();

  // Send the data back to where this function was called
  return data;
}

// This function takes image data and shows it in the grid
function displayImages(photos) {
    // Loop over each div in the grid
    box.forEach((box, index) => {
    
        box.innerHTML = ""; // Clear any existing content

        // Create an image element
        const img = document.createElement("img");
        // Set the image's source to the Pexels photo URL
        img.src = photos[index].src.large;
        // OPTIONAL: set alt text
        img.alt = "Moodboard image";
        // appendChild -> Add the image to the div
        box.appendChild(img);

    });
}




// The code translate to: when the button is clicked, run handleClick
button.addEventListener("click", handleClick);

