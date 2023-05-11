/*

USER STORIES: 

1.) As a user, I want to SEARCH FOR RECIPES, so that I can find NEW IDEAS FOR MEALS
2.) As a user, I wasnt to be able to UPDATE THE NUMBER OF SERVINGS, so that I can cook a meal for DIFFERENT NUMBER OF PEOPLE 
3.) As a user, I want to BOOKMARK RECIPES, so that I can REVIEW THEM LATER
4.) As a user, I want to be able to CREATE MY OWN RECIPES, so that I have them all ORGANIZED IN THE SAME APP
5.) As a user, I want to be able to SEE MY BOOKMARKS AND RECIPES SO THAT I CAN VIEW THEM LATER ONCE I CLOSE THE APP.


FEATURES: 

        User-1 - Search for items
1.) Search functionality: Input fields to send request to API with searched keywords
2.) Display results with multiple pages (pagination) for multiple results.
3.) Display recipe with cooking time, servings and ingredients 

        User-2 - Update servings
4.) Change servings functionality: Update all ingredients according th current number of servings

        User-3 - Bookmark recipes
5.) Bookmarking functionality: Display list of all bookmarked ingredients

        User-4 - Create recipes
6.) User can upload their own recipes
7.) User own recipes will automatically be bookmarked
8.) User can only see their own recipes, not recipes from other users.

        User-5 - See my bookmarks and recipes and come back later
9.) Store bookmark data in the browser using local storage.
10.) On page load, read saved bookmarks from local storage and display them on the page.

When working with your package.json file, a devDependency is an element that contains all the packages that your prject requires in the development process and not in the prodcution or testing environments/phases.

 ----------------------------------------------------------- SETTING UP PARCEL ---------------------------------------------------------------------

 - When we set up parcel, the folders that parcel create in the 'dist' folder are the real ones that we will use for future deployment.

- Since we referenced the css file within the <link rel>, parcel knows it needs to compile the sass file to css. href="src/sass/main.scss", that way parcel will know it needs to compile the sass css file to css in the end, and place that compiled code into the new index.html file that was created by parcel. The same works with the images, parcel will copy all of these files and give them a new name, and replace that image in the newly creaetd index.html file to the new image names that parcel has created.

- A module bundler takes our raw source code and compiles it into a nice package (folder) that browsers can understand, and then be shipped to the browser so that it can display this newly created source code.















































































































*/
