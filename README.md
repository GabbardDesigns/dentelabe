# dente labe 3.0
####  so sweet it hurts

**Project Start Date:** Started 10/18/2020

#### Technical Summary
  - Javascript
  - Canvas API
  - HTML5
  - CSS


Dente labe is a canvas API game that was developed to provide minutes of fun for all. Although the game is not finished, the code Louisville requirements should have been met.

This game was born out of an idea my kids and I had for a game when we attended a Halloween game jam. I mentioned the "scariest" thing about Halloween was the cavities and "tooth pain". The kids loved this idea for a game and so "dente labe" was born. All artwork, sound effects, and game design are mine. The background track is Blippy Trance by Kevin MacLeod.

This is a work in progress and has a lot of room for improvement in refactoring and dryer code. This is the first JavaScript game I have created, so keep that in mind as you review it.

Also, this was initially create as a part of code Louisville, and since it was uncertain if using Canvas API would meet the requirements, I have also met the following:

CL REQUIREMENTS (Installation, test files, and logins at the bottom of this file)
-------------
##### Number of Commits: 8 Commits


##### Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX)
  js\app.js | lines 78 -90
  - A call is made to https://www.gabbarddesigns.com to retrieve a JSOn file, which once received is parsed.
 -------------

##### Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app

  js\app.js | lines 78 -90
A JSON file is read in and parsed into the candyList array, which provides the image data and defines a unique options list for the enemies (the image URL, height, width).  This is dispalyed whenthe images themselves are rendered.

 -------------

 ##### Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application

  js\app.js | createCandy (lines 464-488)  Populates array candyList with a list of candies providing random vales and assigning the candies unique look/feel.
  js\app.js | drawCandy (lines 426-461)  Uses the candyList array to move and remap each candy, check for collisions and redraws the screen.

 -------------

##### Implement a regular expression (regex) to ensure a field either a phone number or an email address is always stored and displayed in the same format
On the mid form, an email is taken, validated, and is displayed at the end after you lose.

 -------------
##### Implement CanvasAPI
  js\app.js   |   pretty much the rest of the entire thing

##### Things to Know

When you resize the game pauses, please push "P" to unpause.
This was designed to run on a desktop or laptop computer and not mobile (like most Canvas pizel based games).]
There is audio, so please be aware of that.

Note the game is not complete:
 You have to reload to replay.
 The cookie storage is not implemented, so to you have to redo the form to play.
 There is no game win logic.
 The mute sound button has to be in focus, so click twice to mute the first time.

