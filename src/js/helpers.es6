/**
 * Helper file for extra helper functions
 */

let helpers = {

    /**
     * Gets the current date and time
     * @returns {string} time stamp in human-readable format
     */
    timeStamp: function () {
        return(new Date(Date.now).toString());
    },

    /**
     * formula for creating slug out of title
     * @param newTitle {string} title to be converted
     * @returns {string} appropriate slug
     */
    titleToSlug(newTitle) {
        return(newTitle.toLowerCase().replace(" ", "-"));
    }
};


