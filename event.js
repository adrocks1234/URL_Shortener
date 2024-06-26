// Define an object to store the mapping of long URLs to short codes
let urlDatabase = [];
// Function to generate a random alphanumeric string of fixed length
function generateShortCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortCode = '';
  for (let i = 0; i < length; i++) {
    shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortCode;
}
// Function to shorten a long URL
function shortenURL(longURL, length = 6) {
  // Check if the input URL is valid
  if (!isValidURL(longURL)) {
    throw new Error('Invalid URL');
  }
  // Generate a unique short code
  let shortCode;
  do {
    shortCode = generateShortCode(length);
  } while (urlDatabase[shortCode]);
  // Store the mapping of short code to long URL in the database
  urlDatabase[shortCode] = longURL;
  // Return the shortened URL
  return `https://short.com/${shortCode}`;
}
// Function to validate URL format
function isValidURL(url) {
  const urlPattern = /^(http|https):\/\/([\w-]+(?:\.[\w-]+)*)(\S*)$/;
  return urlPattern.test(url);
}
// Function to decode and redirect a shortened URL to the original long URL
function redirectToOriginalURL(shortURL) {
  // Extract the short code from the shortened URL
  const shortCode = shortURL.split('/').pop();

  // Check if the short code exists in the database
  if (urlDatabase[shortCode]) {
    // Redirect the user to the original long URL
    console.log( "Long URL :", urlDatabase[shortCode])
  } else {
    console.error('Shortened URL not found!');
  }
}

function encodeURL(){
    var text_url = document.getElementById('txt_url')
    // Example usage:
    const longURL = text_url.value;
    try {
        const shortURL = shortenURL(longURL);
        console.log('Shortened URL:', shortURL);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function decodeURL(){
    var text_url = document.getElementById('txt_url')
    const shortURL = text_url.value;
    redirectToOriginalURL(shortURL);
}
