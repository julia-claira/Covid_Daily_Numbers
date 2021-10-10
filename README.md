# Covid State and County Daily Numbers

## Description 

I developed this user-friendly app with a basic interface to make it easier to track daily numbers in one's area. Other sites require digging through pages of complex data and graphs, information that the average person doesn't care about. I've learned that to effectively reach people, what you leave is just as important as what you include.
  
## Run

The below link takes you to the app, running on Heroku:

[Covid Daily Numbers app](https://covid-county.herokuapp.com/?fbclid=IwAR2fmy3hkjaIgXuhbl1QnknUD2_0nLjfaNe43LTqdZ1HGwLp1rvEMU4ewE4)


## Table of Contents
* [Run](#Results)
* [Tools](#Tools)
* [Data](#Data)
* [Graphs](#Graphs)
* [Data-Cleaning](#Data-Cleaning)
* [Contact](#Contact)



## Tools

JavaScript, Plotly.js, D3, Bootstrap, HTML5, CSS, Flask, Python

  

## Data

This app pulls data from [Covid Act Now API](https://apidocs.covidactnow.org/)



## Tools

Web-Scraper: Jupyter Notebook, Python, BeautifulSoup, Splinter

Database:Pandas

Graphs: Matplotlib



## Methodology

The bot uses Chrome Driver to open New York Times and enter a specified search word between the given dates. This brings up anything that contains even a passing references the word 'transgender', so to ensure that the term is important to the article, the bot only pulls those that contain the word (or a related specified word) in the headline or subheader.

![jupyter_notebook_image](/images/j_notebook.png)

The bot pulls the headline, subheader, URL, date, and section for any given article that matches the requirement and stores it in a database.



## Data-Cleaning

Since the sections were quite broad and sometimes ambiguous, I categorized the sections into bins.

<b>Arts:</b>. Movies, Books, Book Review, Theater, Arts, Style, Television, Fashion, First Chapters, Theater Reviews, Art & Design, Dance, Media, Awards Season, Music, International Arts, Art, The Learning Network, DealBook, Fashion & Beauty, Food
            
<b>US New:</b>. U.S., New York, Connecticut, Americas, Education, Education Life, Politics, Elections
            
<b>World News:</b>  World, Africa, Europe, Asia Pacific, Global Opinion, Middle East, Canada, Australia

<b>Sports:</b>  Sports, Olympics, College Basketball, Soccer, Golf, N.B.A., Baseball, Hockey, Tennis

<b>Life:</b>  Home & Garden, Travel, Your Money, Real Estate, Job Market, Smarter Living, Family, Retirement, Self-Care, Parenting, Love, Business
            
<b>Science:</b>  Psychology, Science, Technology, Personal Tech, Mind, Climate, Health, Fertility
            
<b>Misc:</b>  The City, Magazine, Week in Review, Archives, Long Island, Sunday Review, Views, The Upshot, Times Insider, T Magazine, Booming, NYT Now, Giving, Live, The Daily, Today’s Paper, Lesson Plans, Lens, Briefing, Letters, Move, Well, Reader Center, Podcasts, Crosswords & Games, Opinion, Obituaries, Westchester

As the language evolved over time, I further labeled articles with the term used: <b>Transsexual, Transgender, Other</b> (e.g., non-binary, transvestite, etc.)

![database](/images/ny_trans_db.png)



## Contact

Feel free to contact me with examples or any questions via the information below:

GitHub: [@julia-claira](https://api.github.com/users/julia-claira)

Email: julia-claira@gmail.com
