/**
 * View file for displaying content
 */

    /**
     * Main view object
     *
     *
     */


var vpView = {

    /**
     * Set Page Title to empty string
     */
    clrPageTitle: function () {
    document.querySelector("#pageTitle").innerHTML = "";
    },

    /**
     * Set Content to empty string
     */
    clrPageContent: function () {
        document.querySelector("#pageContent").innerHTML = "";
    },

    /**
     * Set Page Title and Content to empty strings
     */
    clrPrimary: function () {
        vpView.clrPageTitle();
        vpView.clrPageContent();
    },

    /**
     * Display the indicated title on the page
     * @param newTitle {string} title to be displayed
     */
    displayTitle: function (newTitle) {
        document.querySelector("#pageTitle").innerHTML = newTitle;
    },

    displayContent: function (newContent) {
        document.querySelector("#pageContent").innerHTML = newContent;
    },

    displayCurPost: function () {
        vpView.clrPrimary();
        vpView.displayTitle(vpModel.getCurTitle());
        vpView.displayContent(vpModel.getCurContent());
    },

    /**
     * Display the list of available posts
     */
    displayList: function() {
        let divElem, titleElem, linkElem, slug = null,
            contentElem = document.querySelector("#pageContent");

        vpModel.fetchPosts();
        vpModel.resetIterator();
        vpView.clrPrimary();

        vpView.displayTitle("Posts");

        while (vpModel.getNextPost() ) {

            slug = vpModel.getCurSlug();

            divElem = document.createElement("div");
            titleElem = document.createElement("h3");
            linkElem = document.createElement("a");

            linkElem.innerHTML = vpModel.getCurTitle();
            linkElem.setAttribute("href", vpRouter.makeURLFromPostSlug(slug));
            linkElem.classList.add("post-title");
            linkElem.classList.add(slug);

            titleElem.appendChild(linkElem);

            divElem.appendChild(titleElem);
            divElem.appendChild(document.createElement("hr"));

            contentElem.appendChild(divElem);
        }

    },

    /**
     * Page not found
     * @param page {string} page requested
     */
    display404: function (page) {
        let errMsg = document.createElement("div");

        vpView.clrPrimary();
        errMsg.innerHTML = 'I\'m sorry, but the <span style="color:red">' + page + '</span> page does not exist!';
        document.querySelector("#pageContent").appendChild(errMsg);
    },

    /**
     * Calls initial View methods
     *
     */
    init: function() {

        document.querySelector('#db-init').addEventListener('click', vpModel.initDB);
        document.querySelector('#db-clr').addEventListener('click', vpModel.clrDB);

    }
};



