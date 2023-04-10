import requests
from bs4 import BeautifulSoup
import urllib.request

# URL of website to scrape
url = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fwater-on-floor&psig=AOvVaw1xv-6zBQOvFzc4mKBtMD5S&ust=1681053050248000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMjAr5vJmv4CFQAAAAAdAAAAABAE"

# Send HTTP request to the URL and get the HTML content
response = requests.get(url)
html_content = response.content

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Find all <img> tags on the page
img_tags = soup.find_all('img')

# Create a list to store the image URLs
img_urls = []

# Extract the src attribute of each <img> tag and append to the list
for img in img_tags:
    img_urls.append(img.get('src'))

# Download each image from the URL and save to a local file
for url in img_urls:
    filename = url.split("/")[-1] # Extract the filename from the URL
    urllib.request.urlretrieve(url, filename)

# Print a message to confirm the download is complete
print("Images downloaded successfully!")
