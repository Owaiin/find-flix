# FindFlix - [Live Site Here](https://find-flix.netlify.app)

When trying to find where we Stream the Harry Potter films over Christmas, and having to switch between different apps on the TV, it was time to make this easier. So I spent the next few days putting this together! It's fully responsive and follows a design style similar to Netflix for familiarity. When used on Mobile, the links to the streaming services will direct you to the app (if you have it downloaded) and you can then instantly cast to your device. 

## Main Goal
The goal of this is to help find where to watch TV Shows and Movies across all major streaming services within the UK.

## How
Using a combination of the IMDB API and the UTelly API to provide a cohesive user experience that helps people find what they're looking for, and where to watch it.
The IMDB API is the main search component. This helps find all of the content and is the key part of the tool. The UTelly API uses the IMDB response UID to search its database for the streaming locations and the urls to the content on each platform.
### Design
The design was built to follow the ideas of Netflix to help integrate users into how to use the UI.
Frame-Motion was used to do the smooth animation transitions for the card pop-up and the scroll-to-top when clicking on related items.
### Hosting
Netlify

## Learning Outcomes:
 - Create more components
    - Whilst this was a small project, on a larger project using such few components would become difficult to keep cohesive. Things such as Buttons, Containers, Cards should be put into a single Component file with variations exported.

 - Use Context (Prop drilling can be messy)
    - When passing data to and from the SearchResults and the SelectedTitle, it doesn't read all that well in the code and can be a bit confusing to go over. Putting this into Context would have been better (especially for larger scale projects), so that the information state can be accessed easier and more elequently.
