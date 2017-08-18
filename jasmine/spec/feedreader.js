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
         * empty. Experimented with this before starting on
         * the rest of this project.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * that is not empty.
         */
        it('have defined urls', function() {
            for(var i in allFeeds) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that is not empty.
         */
         it('have defined names', function() {
            for(var i in allFeeds) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
            expect(typeof allFeeds[i].name).toBe('string');
            }
        });
    });

         /* I created a new test suite named "The menu" */
         /* The test hides the menu element by default. An analysis of the HTML and
         * the CSS was completed to determine how performing the
         * hiding/showing of the menu element is achieved.
         */
         describe('Menu', function() {
            var menuHide = $('body').hasClass('menu-hidden');

        //When the page loads, the test below will check to see that the body has .menu-hidden
         it('menu is hidden by default', function() {
            expect(menuHide).toEqual(true);
         });

         /* I created a test that ensures the menu changes are
          * shown when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu visibility changes on click', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
          });
      });

    /* I created a new test suite named "Initial Entries" */
       describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Note that loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });    
         });

        //This test checks to verify that at least 1 feed entry has been added
        //Updated to search for .entry inside .feed, instead of the entire DOM
         it('has an .entry element after loading', function (done) {
            var entryCount = $('.feed .entry').length;
            done();
        });
    });

    /* I created a new test suite named "New Feed Selection" */
        describe('New Feed Selection', function() {
            var compareFeedFirst;
            var compareFeedSecond;

        /* I created a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */

         //beforeEach to wait for asynchronous calls to conclude
        beforeEach(function(done) {
            loadFeed(1, function() {
                compareFeedFirst = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });        
         });

         //afterEach to reload the first entry
        afterEach(function() {
            loadFeed(0);
        });

        //This test will determine that each entry is defined
        //compares both headers from compareFeedFirst and compareFeedSecond 
        //to determine that the entry has indeed changed
         it('displays feed content change on menu select', function() {
            expect(compareFeedFirst).toBeDefined();
            compareFeedSecond = $('.feed').html();
            expect(compareFeedSecond).toBeDefined();
            expect(compareFeedFirst).not.toEqual(compareFeedSecond);
         }); 
    });     
}());