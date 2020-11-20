# dente labe 3.0
####  so sweet it hurts

**Project Start Date:** Started 10/18/2020

Dente labe is a canvas API game that was developed to provide minutes of fun for all.  lathough thegame is not finished, the code Louisville requiremnts should have been met.

Since it was uncertain if using using Canvas API would meet the requirments, I have also met the folowing:



#### Technical Summary
  - Javascript
  - Canvas API
  - HTML5
  - CSS

CL REQUIREMENTS (Installation, test files, and logins at the bottom of this file)
-------------
##### Number of Commits: 8 Commits

##### Create a class, then create at least one object of that class and populate it with data

        products\models.py | class Products

  - This is the main product class and drives all other functionality in the products module.  It is called whenever a reference is made to the Product table.
  - This can be seen in action on the front-end using the View Inventory Details button.  This calls the view defined in products/views.py | product_detail_view
  - This can also be seen in use in the hidden non-admin Add Products (/products/templates/product/newproduct.html) and Edit form (/products/templates/product/newproduct.html)
  - This is also used in numerous other places including /products/views.py | product_upload when the inventory is updated and when the database is read out as a QuerySet for processing prior to loading over to JSON.
  Also see: products/models.py | thumbnail_preview

 -------------


Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application

Create and use a function that accepts two or more values (parameters), calculates or determines a new value based on those inputs, and returns a new value

Implement a log that records errors, invalid inputs, or other important events and writes them to a text file

Calculate and display data based on an external factor (ex: get the current date, and display how many days remaining until some event)

Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app
