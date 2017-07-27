/**
 * Model file for working with data
 */

/**
 * Main Model Object
 *
 */

let vpModel = {

    allPosts: {},
    curPost: {
        date: helpers.timeStamp(),
        modified: helpers.timeStamp(),
        type: "post",
        title: "",
        content: "",
        slug: "",
        id: "0"
    },
    maxPostID: 0,
    curPostID: 0,
    allPages: {},
    curPage: {
        date: helpers.timeStamp(),
        modified: helpers.timeStamp(),
        type: "page",
        title: "",
        content: "",
        slug: "",
        id: "0"
    },
    maxPageID: 0,
    curPageID: 0,
    listIterator: 0,

    /**
     * sorts the posts in allPosts by their ID's
     */
    sortPosts: function () {

        if (vpModel.allPosts.length > 0) {
            vpModel.allPosts.sort((x, y) => ((x.id < y.id) ? 1 : -1));
        }
    },

    /**
     * sorts the posts in allPages by their ID's
     */
    sortPages: function () {

        if (vpModel.allPages.length > 0) {
            vpModel.allPages.sort((x, y) => ((x.id < y.id) ? 1 : -1));
        }
    },

    /**
     * Fetch the list of posts from the "database" (localStorage for now)
     * store them in an array
     */
    fetchPosts: function () {

        vpModel.allPosts = JSON.parse(window.localStorage.getItem('vpdb_posts'));
        if (null === vpModel.allPosts) {
            vpModel.allPosts = [];
        }

    },

    /**
     * Fetch the list of pages from the "database" (localStorage for now)
     * store them in an array
     */
    fetchPages: function () {

        vpModel.allPages = JSON.parse(window.localStorage.getItem('vpdb_pages'));
        if (null === vpModel.allPages) {
            vpModel.allPages = [];
        }

    },

    /**
     * Store all the posts to the "database" (localStorage for now)
     *
     */
    storePosts: function () {
        window.localStorage.setItem('vpdb_posts', JSON.stringify(vpModel.allPosts));
    },

    /**
     * Store all the pages to the "database" (localStorage for now)
     *
     */
    storePages: function () {
        window.localStorage.setItem('vpdb_pages', JSON.stringify(vpModel.allPages));
    },

    initDB: function () {
        vpModel.allPosts = posts;
        vpModel.storePosts();
        vpModel.allPages = pages;
        vpModel.storePages();
        vpRouter.goToNewPage();
    },

    clrDB: function () {
        vpModel.allPosts = [];
        vpModel.storePosts();
        vpModel.allPages = [];
        vpModel.storePages();
        vpRouter.goToNewPage();
    },

    /**
     * Copy a single post into the current post
     * @param id {string} id of post sought
     * return {boolean} was matching post found?
     */
    getPostByID: function (id) {
        for (post of vpModel.allPosts) {
            if (id === post.id) {
                vpModel.curPost = post;
                return true;
            }
        }
        return false;
    },

    /**
     * Copy a single post into the current post
     * @param slug {string} slug of post sought
     * @return {boolean} was matching post found?
     */
    getPostBySlug: function (slug) {
        for (post of vpModel.allPosts) {
            if (slug === post.slug) {
                vpModel.curPost = post;
                return true;
            }
        }
        return false;
    },

    /**
     *
     * @returns {string} the title of the current post
     */
    getCurTitle: function () {
        return vpModel.curPost.title;
    },

    /**
     *
     * @returns {string} the content of the current post
     */
    getCurContent: function () {
        return vpModel.curPost.content;
    },

        /**
         *
         * @returns {string} the slug of the current post
         */
    getCurSlug: function () {
        return vpModel.curPost.slug;
    },

    /**
     *
     * @returns {string} the id of the current post
     */
    getCurID: function () {
        return vpModel.curPost.id;
    },

    /**
     *
     * @returns {string} the date the current post was created
     */
    getCurDate: function () {
        return vpModel.curPost.date;
    },

    /**
     *
     * @returns {string} the date the current post was last modified
     */
    getCurModified: function () {
        return vpModel.curPost.modified;
    },

    /**
     * Store new title in current post
     * @param newTitle {string} value to be stored as title of current post
     */
    updatePostTitle: function (newTitle) {
        vpModel.curPost.title = newTitle;
    },

    /**
     * Store new content in current post
     * @param newContent {string} value to be stored as content of current post
     */
    updatePostContent: function (newContent) {
        vpModel.curPost.content = newContent;
    },

    /**
     * Store new slug in current post
     * @param newSlug {string} value to be stored as slug of current post
     */
    updatePostSlug: function (newSlug) {
        vpModel.curPost.slug = newSlug;
    },

    /**
     * Update the current post in temporary storage
     * @param newTitle {string} value to be stored as the current post's title
     * @param newContent {string} value to be stored as the current post's content
     * @param newSlug {string} value to be stored as the current post's slug
     */
    updateCurPost: function (newTitle, newContent, newSlug) {

        vpModel.curPost.title = newTitle;
        vpModel.curPost.content = newContent;
        vpModel.curPost.slug = newSlug;
    },

    /**
     * Update the local copy of the database with curPost. If no match on id, create a new post.
     * Write the local copy of the database to localStorage
     * @return returns false if the slug in curPost is already being used by another post
     *
     * NOTE:
     * We must check the slug for duplicates because they can be based on user input
     * We will assume no duplicate ids because they are always generated by the app
     */
    saveCurPost: function () {
        let curTimeStamp = helpers.timeStamp(),
            foundAlready = false,
            postIndex = null;

        for (let i = 0, max = vpModel.allPosts.length; i < max; i++) {
            // check for duplicate slugs
            if (vpModel.allPosts[i].slug === vpModel.curPost.slug)
                if (foundAlready) {
                    return false;
                } else {
                    foundAlready = true;
                }
            // check for matching id
            if (vpModel.allPosts[i].id === vpModel.curPost.id) {
                postIndex = i;
            }
        }

        // create a new id and a new post if we didn't find a match
        if (null === postIndex) {
            vpModel.curPost.id = vpModel.maxPostID++;
            vpModel.curPost.date = curTimeStamp;
            postIndex = vpModel.allPosts.push(vpModel.curPost) - 1; // length - 1
        }

        vpModel.curPost.modified = curTimeStamp;
        vpModel.allPosts[postIndex] = vpModel.curPost;
        vpModel.storePosts();
        return true;

    },

    /**
     * Set the index to the first element in allPosts
     */
    resetIterator: function () {
        vpModel.listIterator = 0;
    },

    /**
     * Get the post at allPosts[listIterator] and increment listIterator
     * @return {boolean} return false if we're at the end of the list
     */
    getNextPost: function () {
        if (vpModel.listIterator < vpModel.allPosts.length) {
            vpModel.curPost = vpModel.allPosts[vpModel.listIterator++];
            return true;
        } else {
            return false;
        }
    },

    /**
     * Initialize the Model object
     */
    init: function() {

        vpModel.fetchPosts();
        vpModel.sortPosts();
        if (0 === vpModel.allPosts.length) {
            vpModel.maxPostID = 0;
            vpModel.curPostID = 0;
        } else {
            vpModel.maxPostID = vpModel.allPosts[vpModel.allPosts.length-1].id;
            vpModel.curPostID = vpModel.allPosts[0].id;
        }

        vpModel.fetchPages();
        vpModel.sortPages();
        if (0 === vpModel.allPages.length) {
            vpModel.maxPageID = 0;
            vpModel.curPageID = 0;
        } else {
            vpModel.maxPageID = vpModel.allPages[vpModel.allPages.length-1].id;
            vpModel.curPageID = vpModel.allPages[0].id;
        }
    },

    /**
     * Get ready to end the app
     * @param saveFlag {boolean} should the current post be saved?
     */
    quiesce: function(saveFlag) {
        if (saveFlag) {
            vpModel.saveCurPost(); // ignore errors for now
        } else {
            vpModel.storePosts();
        }
    }
};
