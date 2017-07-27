# Vanilla Press by @kunikla, Version 0.2

###Assignment for [JavaScript for WordPress](https://javascriptforwp.com/), by Zac Gordon

* Lesson 1.6.08 – Pages
* Lesson 1.6.09 - Updating the Model
* Lesson 1.6.10 - Building the View Menu
* Lesson 1.6.11 - The Single Content View

Modify V0.1 as follows:
* New data file with posts and pages
* Create a dynamic menu of pages
* Display Home page when url is empty
* Display other pages when menu clicked
* Display blog posts on Blog page


I listened to the lectures to understand the desired behavior, but the JS coding is my own.

###Release Notes

* Version 0.2.0 - initial commit, clean-up V0.1 before beginning V.02, set up to use Babel
  * created src/ folder, moved js/ folder into src/ folder
  * created dist/folder, moved css/folder into dist/ folder
  * renamed .js files to .es6 files
  * (/js/data.es6)
    * Replaced with new file from Lesson 1.6.08, updated to ECMA6
  * Model (js/model.es6)
    * Added variables for pages
    * store Pages and Posts in separate "tables" in database
    * initDB and clrDB now read/write both posts and pages
    * init() now sets up for both posts and pages
    * removed initCurPost()
  * HTML (index.html)
    * changed title in head and header to 0.2
    * added link to Google font "Montserrat"
    * removed in-line styles for divs in header
    * updated paths & names of CSS & JS files
  * CSS (css/styles.css)
    * added background color to body to be consistent w/Zac
    * added styling for divs in header previously found in-line
  * other
    * updated LICENSE.md with to Version 0.2
    * deleted Zac's source files (previously kept for reference)


* Version 0.1.1 - 7/21/17 - after watching 1.6.06
  * (js/data.js)
  * vpModel (js/model.js)
    * use window.localStorage instead of localStorage
    * fetchPosts() now deals with empty windows.localStorage
    * sortPosts() and init() now deal with empty allPosts[]
    * event listeners initDB() and clrDB() created
    * removed code that was commented out
  * vpRouter (js/router.js)
    * use window.location instead of location
    * goToNewPage() created to display page when user clicks on a link
    * goToNewPage() calls vpView methods to display appropriate Primary Content
    * linkToListStub(), linkListStub() and linkStub() removed
    * getCurPostName() and getPostLinkFromSlug() removed
  * vpView (js/view.js)
    * init no longer clears the Primary Content
    * init no longer sets event handler on page title
    * displayCurPost(), displayList(), and display404() now clear the Primary Content (just a formality)
    * displayList() no longer adds event handler to links
  * vanillaPress (js/app.js)
    * mainline code calls goToNewPage
    * removed code that was commented out
  * HTML (index.html)
    * divided header into 3 divs: logo, title, buttons for database
    * added second heart in footer
  * CSS (css/styles.css)
    * added styling for the new divs in the header
    * changed color of links to green
    * changed font for h1 in page-header to green

* Version 0.1.0 - 07/21/17
  * Initial upload
