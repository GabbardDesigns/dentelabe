# dente labe 3.0
####  so sweet it hurts

**Project Start Date:** Started 10/18/2020

Dente labe is a canvas API game that was developed to provide minutes of fun for all.  Although the game is not finished, the code Louisville requirements should have been met.

Since it was uncertain if using using Canvas API would meet the requirements, I have also met the following:

#### Technical Summary
  - Javascript
  - Canvas API
  - HTML5
  - CSS

CL REQUIREMENTS (Installation, test files, and logins at the bottom of this file)
-------------
##### Number of Commits: 8 Commits


##### Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX)
  js\app.js | lines 82 -100
  - A call is made to https://www.gabbarddesigns.com to retrieve a JSOn file, which once received is parsed.
 -------------

##### Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app

  js\app.js | lines 82 -100
  - A JSON file is read in and parsed into the candyList array, which provides the image data and defines a unique options list for the enemies.

 -------------

 ##### Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application

  js\app.js | createCandy (lines 439-463)  Populates array candyList with a list of candies providing random vales and assigning the candies unique look/feel.
  js\app.js | drawCandy (lines 398-436)  Uses the candyList array to move and remap each candy, check for collisions and redraws the screen.

 -------------

##### Implement a regular expression (regex) to ensure a field either a phone number or an email address is always stored and displayed in the same format

Email taken, validated shown at the end

 -------------
##### Implement CanvasAPI
  js\app.js   |   pretty much the rest of the entire thing

##### Things to Know

When you resize the game pauses, please push "p" to unpause.
This was designed to run on a desktop or laptop computer and not mobile (like most Canvas pizel based games).]
There is audio, so please be aware of that.

Note the game is not complete:
 You have to reload to replay.
 The cookie storage is not implemented, so to you have to redo the form to play.
 There is no game win logic.
 The mute sound button has to be in focus, so click twice to mute the first time.

