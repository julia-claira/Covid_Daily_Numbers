# Covid State and County Daily Numbers

## Description 

I developed this user-friendly app with a basic interface to make it easier to track daily numbers in one's area. Other sites require digging through pages of complex data and graphs, information that the average person doesn't care about. I've learned that to effectively reach people, what you leave is just as important as what you include.



## Table of Contents
* [Run](#Results)
* [Tools](#Tools)
* [Data](#Data)
* [Graphs](#Graphs)
* [Contact](#Contact)



## Run

The below link takes you to the app, running on Heroku:

[Covid Daily Numbers app](https://covid-county.herokuapp.com/?fbclid=IwAR2fmy3hkjaIgXuhbl1QnknUD2_0nLjfaNe43LTqdZ1HGwLp1rvEMU4ewE4)


  
## Graphs

Daily cases and deaths for entire pandemic. User can zoom in as well as see daily tallies by moving their cursor over the graph.  

![Sample Graph](static/graph_sample.png)

Shows the risk level, trend, and ICU capacity for the area presently. (I calculate trend by taking the total confirmed cases of the last seven days and comparing it the previous week.)

![Sample Graphs](static/graphs_3.png)



## Tools

JavaScript, Plotly.js, D3, Bootstrap, HTML5, CSS, Flask, Python



## Data

This app pulls data the following data from the [COVID ACT NOW API](https://apidocs.covidactnow.org/).

<b>New Cases:</b>  New confirmed or suspected cases.<br>
<b>New Deaths:</b>  New deaths since previous report with erratic values removed by outlier detection.<br>
<b>Total Cases:</b>  Cumulative confirmed or suspected cases.<br>
<b>Total Deaths:</b>  Cumulative deaths that are suspected or confirmed to have been caused by COVID-19.<br>
<b>Fully Vaccinated:</b>  Total number of people completing vaccination - currently those completing their second shot.<br>
<b>Partially Vaccinated:</b>  Ratio of population that has initiated vaccination.<br>
<b>Risk Level:</b>  The overall risk level is based on caseDensity, testPositivityRatio, and infectionRate.<br>
<b>New Cases Trend:</b>  The increase or decrease of newly confirmed cases for state or county as compared to the previous week.<br>
<b>Icu Bed Capacity:</b>  Information about ICU bed utilization details.<br>



## Contact

Feel free to contact me with examples or any questions via the information below:

GitHub: [@julia-claira](https://api.github.com/users/julia-claira)

Email: julia-claira@gmail.com
