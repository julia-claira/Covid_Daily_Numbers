    //The Dropbox Selection
    const stateAbb = [
        "select","AK", "AL", "AR", "AZ", "CA", "CO", "CT",
        "DC", "DE", "FL", "GA", "HI", "IA", "ID",
        "IL", "IN", "KS", "KY", "LA", "MA", "MD",
        "ME", "MI", "MN", "MO", "MP", "MS", "MT",
        "NC", "ND", "NE", "NH", "NJ", "NM", "NV",
        "NY", "OH", "OK", "OR", "PA", "PR", "RI",
        "SC", "SD", "TN", "TX", "UT", "VA", "VT",
        "WA", "WI", "WV", "WY"
    ];

    var states = {
        'AZ': 'Arizona',
        'AL': 'Alabama',
        'AK': 'Alaska',
        'AR': 'Arkansas',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DC': 'District of Columbia',
        'DE': 'Delaware',
        'FL': 'Florida',
        'GA': 'Georgia',
        'HI': 'Hawaii',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'IA': 'Iowa',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'ME': 'Maine',
        'MD': 'Maryland',
        'MA': 'Massachusetts',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MS': 'Mississippi',
        'MO': 'Missouri',
        'MT': 'Montana',
        'NE': 'Nebraska',
        'NV': 'Nevada',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NY': 'New York',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PA': 'Pennsylvania',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VT': 'Vermont',
        'VA': 'Virginia',
        'WA': 'Washington',
        'WV': 'West Virginia',
        'WI': 'Wisconsin',
        'WY': 'Wyoming',
        'AS': "American Samoa",
        'GU': "Guam",
        'MP': "Northern Mariana Islands",
        'PR': "Puerto Rico",
        'VI': "U.S. Virgin Islands",
        'UM': "U.S. Minor Outlying Islands",
      };

      var statesLoc = {
        'AZ': [34.048928,-111.093731],
        'AL': [32.318231,-86.902298],
        'AK': [63.588753,-154.493062],
        'AR': [	35.20105,-91.831833],
        'CA': [	36.778261,-119.417932],
        'CO': [],
        'CT': [],
        'DC': [],
        'DE': [],
        'FL': [],
        'GA': 'Georgia',
        'HI': 'Hawaii',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'IA': 'Iowa',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'ME': 'Maine',
        'MD': 'Maryland',
        'MA': 'Massachusetts',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MS': 'Mississippi',
        'MO': 'Missouri',
        'MT': 'Montana',
        'NE': 'Nebraska',
        'NV': 'Nevada',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NY': 'New York',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': [43.804133,-120.554201],
        'PA': 'Pennsylvania',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VT': 'Vermont',
        'VA': 'Virginia',
        'WA': 'Washington',
        'WV': 'West Virginia',
        'WI': 'Wisconsin',
        'WY': 'Wyoming',
        'AS': "American Samoa",
        'GU': "Guam",
        'MP': "Northern Mariana Islands",
        'PR': "Puerto Rico",
        'VI': "U.S. Virgin Islands",
        'UM': "U.S. Minor Outlying Islands",
      };
      

///read in the samples--------------------------------------
//from: https://apidocs.covidactnow.org
var usVaccURL = "https://api.covidactnow.org/v2/states.timeseries.csv?apiKey=f4b150980078407182ca87e5794157be";  
d3.csv(usVaccURL).then((importedData)=>{
    var data = importedData;
    
    

    //FUNCTIONS-----------------------------------


    function commas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    //Replaces "" fields with 0
    function sortZero(theArray,theKey){
        var a=theArray.map(row=>{
            if (row[theKey]==="") return 0;
            else return parseInt(row[theKey]);
        });

        return a;
    };


    //finds county names and populate dropbox
    function findCounties(){
        var countiesVaccURL = `https://api.covidactnow.org/v2/county/${idField.property('value')}.timeseries.csv?apiKey=f4b150980078407182ca87e5794157be`;  
        d3.csv(countiesVaccURL).then((importedData)=>{
            var data1 = importedData;
            idFieldCounty.html("");//clears field

            var myCounties=['select'];
            data1.forEach(row=> {
                if (myCounties.includes(row.county));
                else {myCounties.push(row.county)};
            });

            myCounties.forEach((value) => {
                idFieldCounty.append("option").text(value).attr('value',value);
            });
            
        });
        d3.select("#county").html("<h2>Select Your County</2>");
    }

        //finds county info -- start here
        function countyData(){
            var countiesVaccURL = `https://api.covidactnow.org/v2/county/${idField.property('value')}.timeseries.csv?apiKey=f4b150980078407182ca87e5794157be`;  
            d3.csv(countiesVaccURL).then((importedData)=>{
                var data1 = importedData
    
                var myCounties=[];
                data1.forEach(countyObject => {
                    
                    if (countyObject.county===idFieldCounty.property("value")){
                        myCounties.push(countyObject)
                    }
                });
                d3.select("#county").html("");
                createLine(myCounties,"county");
            });
        }

    //Finds all the objects for the state -- I'm going to append to take county info also
    function stateInformation() { 
        
        var theStateinfo=[];//an array holding all the state information
        data.forEach(stateObject => {
            
            if (stateObject.state===idField.property("value")){
                theStateinfo.push(stateObject)
            }
        });
        d3.select("#bar").html("");
        if (idField.property("value")==="select"){
            d3.select("#bar").html("<h2>Select Your State</2>");
            d3.select("#county").html("");
            idFieldCounty.html("").html("");
        }
        else {
            createLine(theStateinfo,"bar");
            if (this.type!='checkbox') findCounties();
        }

    }



    //LINE GRAPH DRAW
    function createLine(myState,graphLocation){
        if (graphLocation==="county") {
            var titleLocation=idFieldCounty.property("value");
            var graphColors=['green','purple'];
            var metaLocation ="#sample-metadata-county";
            var zoom ="#zoom-2";
        }
        else {
            var titleLocation=states[idField.property("value")];
            var graphColors=['blue','orange'];
            var metaLocation ="#sample-metadata";
            var zoom ="#zoom";
        }
        //if the last entry doesn't have values yet, this eliminates it
        var arrayLength=myState.length-1;

        if (myState[arrayLength]["actuals.newCases"]===""){
            while (myState[arrayLength]["actuals.newCases"]==="" && arrayLength!=0){
               arrayLength=arrayLength-1;
            }
        }

        //checks to see if zoom is on
        if(d3.select(zoom).property('checked')===false){
            var startPoint=0;//includes the whole period
        }
        else {
            var startPoint=arrayLength-60;//will just look for the last two months;
        };

        //slices out information depending on if zoom is checked
        var lastEntry=myState[arrayLength];//finds last entry with values
        var myStateSelection=myState;
        myStateSelection=myStateSelection.slice(startPoint,arrayLength+1);

      
    
        //Creates Trace
        var trace2 = {
            type: 'line',
            line: {
                color: graphColors[0]
            },
            x: myStateSelection.map(row=>row['date']),
            y: myStateSelection.map(row=>row['actuals.newCases']),
            fill: 'tonexty',
            type: 'scatter',
            name:'New Cases'
        };

        var trace1 = {
            type: 'line', 
            line: {
                color: graphColors[1],
              },
            showInLegend: true,
            x: myStateSelection.map(row=>row['date']),
            y: myStateSelection.map(row=>row['actuals.newDeaths']),
            yaxis: 'y2',
            name: 'New Deaths',
            fill: 'tonexty',
            type: 'scatter'
        };

        var myData=[trace1,trace2];

        //Layout and Plot
        layout = {
            title: {text:`${titleLocation} Covid Info`},
            title_x: 0,
            autosize: false,
            width: 1000,
            height: 500,
            margin: {
                l: 70,
                r: 200,
                b: 100,
                t: 30,
                pad: 4
            },
            legend: {
                y: 1,
                x: 1.1,
                bgcolor: 'transparent',
              },
            yaxis: {title: 'New Cases',
                titlefont: {color: graphColors[0]},
                tickfont: {color: graphColors[0]},
            },
            yaxis2: {
                title: 'New Deaths',
                titlefont: {color: graphColors[1]},
                tickfont: {color: graphColors[1]},
                overlaying: 'y',
                side: 'right',
                range: [0,Math.max(...(sortZero(myStateSelection,'actuals.newDeaths')))*3],
                showgrid: false
            },
            xanchor: 'left',
            display:'none',
            hovermode:'x unified'
        }
        Plotly.newPlot(graphLocation, myData,layout,{displayModeBar: false});

        
   

        //META GRAPH VALUES AND PRINT
        var meta=d3.select(metaLocation);
        var metaHTML="";
        
        //makes sure that the last entry has been updated and if not moves one back
  
        var lastEntry=myState[arrayLength];
 
        //if vacc info hasn't been updated this will look for the last entry with it entered
        var arrayLengthVacc=arrayLength;
            if (myState[arrayLengthVacc]["metrics.vaccinationsCompletedRatio"]===""){
                while (myState[arrayLengthVacc]["metrics.vaccinationsCompletedRatio"]==="" && arrayLengthVacc!=0){
                    arrayLengthVacc=arrayLengthVacc-1;
                }
             }
  
        var lastEntryVacc=myState[arrayLengthVacc];
             
        //calculates changes over a week
        var myStateSeven=myState.slice(arrayLength+1-8,arrayLength+1);
        var myStateFourteen=myState.slice(arrayLength+1-15,arrayLength+1-7);
        console.log(myStateSeven[0]['locationId']);
        console.log(myStateFourteen);
        var sevenCases=myStateSeven[7]["actuals.cases"]-myStateSeven[0]["actuals.cases"];
        var fourteenCases=myStateFourteen[7]["actuals.cases"]-myStateFourteen[0]["actuals.cases"];
        var casesChange=100-(fourteenCases/sevenCases*100);
        if (casesChange>0) {casesChange=`+${casesChange.toFixed(1)}%`}
        else {casesChange=`${casesChange.toFixed(1)}%`};

        var fullyVacc = (+lastEntryVacc["metrics.vaccinationsCompletedRatio"]*100);
        var partVacc = (+lastEntryVacc["metrics.vaccinationsInitiatedRatio"]*100)-fullyVacc;
        console.log(+lastEntry["metrics.vaccinationsCompletedRatio"]+20000);
        metaHTML=metaHTML+`<p><b>Date:</b> ${lastEntry["date"]}</p>`;
        metaHTML=metaHTML+`<p><b>Total Cases:</b> ${commas(lastEntry["actuals.cases"])}</p>`;
        metaHTML=metaHTML+`<p><b>New Cases Trend:</b> ${casesChange}</p>`;
        metaHTML=metaHTML+`<p><b>Total Deaths:</b> ${commas(lastEntry["actuals.deaths"])}</p>`;
        metaHTML=metaHTML+`<p><b>Fully Vaccinated :</b> ${fullyVacc.toFixed(1)}%</p>`;
        metaHTML=metaHTML+`<p><b>Partially Vaccinated :</b> ${partVacc.toFixed(1)}%</p>`;
        metaHTML=metaHTML+`<p><b>Risk Level Overall :</b> ${lastEntry["riskLevels.overall"]}</p>`;

        meta.node().innerHTML=metaHTML;


    };





    //MAIN----------------------------------------
    var idField= d3.select("#selDataset");//
    stateAbb.forEach((value) => {
        idField.append("option").text(value).attr('value',value);
    });
    idField.on("change", stateInformation);

    var idFieldCounty= d3.select("#selDatasetCounty");//
    idFieldCounty.on("change", countyData);
    

    var zoomBox= d3.select("#zoom");//
    zoomBox.on("change", stateInformation);

    var zoomBox2= d3.select("#zoom-2");//
    zoomBox2.on("change", countyData);
    

    var countycode = "data/fips_zip_x.txt";  
    d3.csv(countycode).then((importedData2)=>{
        var data3 = importedData2;
        console.log(data3)});
/*
    var myMap = L.map("map", {
      center: statesLoc['OR'],
        zoom: 7
      });
*/
      
      
      // Adding a tile layer (the background map image) to our map
      // We use the addTo method to add objects to our map
     /* L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      }).addTo(myMap);
    */

});  

