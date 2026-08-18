## Old Project Structure

In the old project all the code was stored in one file, this made logic weird and kind of confusing. You'll learn as you go, less code per file is much better **AS LONG AS YOU HAVE GOOD ORGANISATION**. The key to any good project is the file archetecture

## New Project Structure

In the new template each class will have their own file. That way logic is seperate and self contained. How this works is, the index.html has a line that says <script type="module" src="js/app.js"></script>, what this does is call for the file that has the phaser settings in it. What that then does is call the next scene which will preload all the assets and then that scene will start the title screen and the title screen starts the game

## Merge requests and making new features

This is where the code writing happens but before you can do that you need to open a new branch, once this is done you make the code and publish the branch. Once its been merged in you need switch back to main and pull down the changes
