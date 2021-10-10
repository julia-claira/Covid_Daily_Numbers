# Web-Scraper: Transgender issues in The New York Times

## Description 

Visibility is key to understanding, acceptance, and ultimately, hopefully, equality.  I wanted to measure how transgender representation has evolved over the decades. To that end, I scraped The New York Times' archives, seeing that periodical as a valid barometer for the cutural milieu.
  



## Table of Contents
* [Results](#Results)
* [Tools](#Tools)
* [Methodology](#Methodology)
* [Data-Cleaning](#Data-Cleaning)
* [Contact](#Contact)

  

## Results

![line graph](/images/nytimes_trans_graph.png)

Articles were few and far between for the 1980s and 1990s. With lesbian and gay issues coming more to the forefront in the 2000s, there was an small increase in transgender related articles. In 2014 and 2015 the number of articles rocketed, most likely due to the visibility of people like actress Laverne Cox and Caitlyn Jenner. The following years, issues such as trans women in sports became a heated topic covered by media.

![pie graph](/images/nytimes_pie_combined.jpg)

In the past 20 years, Trans people's representation grew in sections such as Arts, Sports, and Life, indicating broader cultural visibility.



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
