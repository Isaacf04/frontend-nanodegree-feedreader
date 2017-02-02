
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Wrote a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('all feed urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            })
        })

        /* Wrote a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    
        it('all feed names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        })


    });

    /* Wrote a new test suite named "The menu" */

    describe('The Menu', function() {

        /* Wrote a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var hamburger = $('.menu-icon-link');
        var hiddenMenu = $('body').hasClass('menu-hidden');
        it('is hidden by default', function() {
            expect(hiddenMenu).toBe(true);
        })

         /* Wrote a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('The menu visibility changed on click', function() {
            hamburger.click();
            //Two expectations here, one true and one false
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            hamburger.click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        })

    })

    /* Wrote a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* Wrote a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        })

        it('within the feed container there is a minimum of 1 entry', function() {
            var entryNum = $('.feed .entry').length;
            expect(entryNum).toBeGreaterThan(0);
        })

    })

    /* Wrote a new test suite named "New Feed Selection"
        /* Wrote a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

    describe('New feed Selection', function() {

        var originalEntry;
        var newEntry;

        beforeEach(function(done) {
        //We must have two different feeds;
            loadFeed(1, function() {
                originalEntry = $('.feed').text();
                loadFeed(0, function() {
                    newEntry = $('.feed').text();
                    done();
                    
                })
            })
        })

        //Here, we expect our content to change when new feeds load
        it('changes when new feed loads', function() {
            expect(newEntry).not.toBe(originalEntry);
        })

    })

}());
