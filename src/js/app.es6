/**
 * Main app file.  Initializes app components.
 */


/**
 * The main app object.
 *
 */
let vanillaPress = {


    init: function () {

        vpModel.init();
        vpRouter.init();
        vpView.init();

    },

};
/******
 * End of vanillaPress object
 */



/******
 * Start of mainline code
 */

vanillaPress.init();

vpRouter.goToNewPage();
