
/**
 * Router file for managing url changes
 */

var vpRouter = {

    /**
     * extract the slug from the URL stored by the browser
     * @returns {string} slug
     */
    getPostSlugFromURL: function () {
        return (window.location.hash.replace("#", ""));
    },

    /**
     *
     * @param slug {string} the slug used to reference a post
     * @returns {string} the URL to navigate to the desired post
     */
    makeURLFromPostSlug: function (slug) {
        return (window.location.pathname + "#" + slug);
    },

    /**
     * Event handler when user navigates to a new page in the VP app
     * also called when app first loaded
     */
    goToNewPage: function (e) {

        let slug = vpRouter.getPostSlugFromURL();

        vpView.clrPrimary();

        if ("" == slug) {
            vpView.displayList();
        } else {
            if (vpModel.getPostBySlug(slug)) {
                vpView.displayCurPost();
            } else {
                vpView.display404 (slug);
            }
        }
    },

    init: function () {

        window.addEventListener ('hashchange', vpRouter.goToNewPage);

    },

};