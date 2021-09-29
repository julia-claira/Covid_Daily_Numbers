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
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

            var myCounties=[];
            data1.forEach(row=> {
                if (myCounties.includes(row.county));
                else {myCounties.push(row.county)};
            });
            idFieldCounty.append("option").text("Select").attr('value',"selectC");
                idFieldCounty.append("option").text("Entire State (default)").attr('value',"entire");
            myCounties.forEach((value) => {
                idFieldCounty.append("option").text(value).attr('value',value);
            });
    
        });
   
        
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


                if ((idFieldCounty.property("value")==="entire" || idFieldCounty.property("value")==="selectC") && this.id !="selDataset"){
                    stateInformation();
                }
                else{
                    createLine(myCounties,"bar");
                };
            });
        }

    //Finds all the objects for the state and county
  function stateInformation() { 
        var theStateinfo=[];//an array holding all the state information
        data.forEach(stateObject => {
            
            if (stateObject.state===idField.property("value")){
                theStateinfo.push(stateObject)
            }
        });
        d3.select("#bar").html("");
        if (idField.property("value")==="select"){
            d3.select("#bar").html("");
            d3.select("#county").html("");
            idFieldCounty.html("").html("");
        }
        else if ((idFieldCounty.property("value")==="entire" || idFieldCounty.property("value")==="selectC") && this.id !="selDataset") {
            createLine(theStateinfo,"bar",idField.property("value"));
        }
        else { 
            createLine(theStateinfo,"bar",this.id);
            findCounties();
        }
    }



    //LINE GRAPH DRAW
    function createLine(myState,graphLocation,myEvent){
        if ((idFieldCounty.property("value")!="entire" && idFieldCounty.property("value")!="selectC") && myEvent!="selDataset") {//this is old as now the graph is drawn in the same place
            var titleLocation=idFieldCounty.property("value");
            var metaLocation ="#sample-metadata";
            //var zoom ="#zoom-2";
        }
        else {
            var titleLocation=states[idField.property("value")];
            var metaLocation ="#sample-metadata";

        }
        //if the last entry doesn't have values yet, this eliminates it
        var arrayLength=myState.length-1;

        if (myState[arrayLength]["actuals.newCases"]===""){
            while (myState[arrayLength]["actuals.newCases"]==="" && arrayLength!=0){
               arrayLength=arrayLength-1;
            }
        }


        //slices out information depending on if zoom is checked
        var lastEntry=myState[arrayLength];//finds last entry with values
        var myStateSelection=myState;
        myStateSelection=myStateSelection.slice(0,arrayLength+1);

      
    
        //Creates Trace
        var selectorOptions = {
            buttons: [{
                step: 'month',
                stepmode: 'backward',
                count: 1,
                label: '1m'
            }, {
                step: 'month',
                stepmode: 'backward',
                count: 3,
                label: '3m'
            },
                {
                step: 'month',
                stepmode: 'backward',
                count: 6,
                label: '6m'
            }, {
                step: 'year',
                stepmode: 'todate',
                count: 1,
                label: 'YTD'
            }, {
                step: 'year',
                stepmode: 'backward',
                count: 1,
                label: '1y'
            }, {
                step: 'all',
            }],
        };
        var trace2 = {
            type: 'line',
            line: {
                width: 1.2,
                color: "#277da1"
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
                color: "#f3722c",
                width: 1.2
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

        //title for graph


        //Layout and Plot
        layout = {
            title: {
                text:`${titleLocation}`,
                y:.993,
                x:.15,
                font:{size:28}
            },
            title_x: 0,
            autosize: true,
            margin: {
                l: 100,
                r: 70,
                b: 40,
                t: 80,
                pad: 2
            },
            legend: {
                y: 1,
                x: 0.2,
                xanchor: 'right',
                bgcolor: 'white',
              },
            yaxis: {
                title: {
                    text:'New Cases',
                    font:{size: 16,
                        color:"#277da1"}
                },
                titlefont: {color:"#277da1"},
                tickfont: {color:"#277da1"},
                fixedrange: true,
            },
            yaxis2: {
                title: {
                    text:'New Deaths',
                    font:{size: 16,
                        color:"#f3722c"}
                },
                titlefont: {color: "#f3722c"},
                tickfont: {color: "#f3722c"},
                overlaying: 'y',
                side: 'right',
                range: [0,Math.max(...(sortZero(myStateSelection,'actuals.newDeaths')))*3],
                showgrid: false,
                fixedrange: true,
                
            },
            xaxis: {
                rangeselector: selectorOptions
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
        var sevenCases=myStateSeven[7]["actuals.cases"]-myStateSeven[0]["actuals.cases"];
        var fourteenCases=myStateFourteen[7]["actuals.cases"]-myStateFourteen[0]["actuals.cases"];
        var casesChangeRaw=100-(fourteenCases/sevenCases*100);
        var casesChange="";
        var dateSplit=lastEntry["date"].split("-");
        var dateArrange=`${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`;
        if (casesChangeRaw>0) {casesChange=`+${casesChangeRaw.toFixed(1)}%`}
        else {casesChange=`${casesChangeRaw.toFixed(1)}%`};

        var fullyVacc = (+lastEntryVacc["metrics.vaccinationsCompletedRatio"]*100);
        var partVacc = (+lastEntryVacc["metrics.vaccinationsInitiatedRatio"]*100)-fullyVacc;
        metaHTML=metaHTML+`<p><b>Updated:</b> ${dateArrange}</p>`;
        metaHTML=metaHTML+`<p><b>Total Cases:</b> ${commas(lastEntry["actuals.cases"])}</p>`;
       // metaHTML=metaHTML+`<p><b>New Cases Trend:</b> ${casesChange}</p>`;
        metaHTML=metaHTML+`<p><b>Total Deaths:</b> ${commas(lastEntry["actuals.deaths"])}</p>`;
        metaHTML=metaHTML+`<p><b>Fully Vaccinated :</b> ${fullyVacc.toFixed(1)}%</p>`;
        metaHTML=metaHTML+`<p><b>Partially Vaccinated :</b> ${partVacc.toFixed(1)}%</p>`;
        //metaHTML=metaHTML+`<p><b>Risk Level Overall :</b> ${lastEntry["riskLevels.overall"]}</p>`;

        meta.node().innerHTML=metaHTML;

       createGauge(lastEntry["riskLevels.overall"])


       //GAUGE GRAPH DRAW
        function createGauge(theRisk){

            var defAdjust=0;
            if (theRisk==0 || theRisk==2)defAdjust=10;
            var RiskLevelDef={0:' Low',1:'Medium',2:' High',3:'Critical',4:'Very High',5:'Extreme'};

            //gauge title and footer
            d3.select("#gaugeTitle").html("");
            d3.select("#gaugeFooter").html("");
            var gaugeSVG=d3.select("#gaugeTitle").append("svg").attr('height',30).attr('width',200);
            gaugeSVG.append('text').text('Risk Level').attr("x", 60).attr("y",15)
            .style("fill","black").attr('font-size','19px');

            var footerSVG=d3.select("#gaugeFooter").append("svg").attr('height',60).attr('width',200);
            footerSVG.append('text').text(RiskLevelDef[theRisk]).attr("x", 75+defAdjust).attr("y",15)
            .style("fill","black").attr('font-size','15px').style("font-style","italic");

            //gauge title and footer for small screen
            d3.select("#gaugeTitle_xs").html("");
            d3.select("#gaugeFooter_xs").html("");
            var gaugeSVG=d3.select("#gaugeTitle_xs").append("svg").attr('height',30).attr('width',200);
            gaugeSVG.append('text').text('Risk Level').attr("x", 60).attr("y",15)
            .style("fill","black").attr('font-size','19px');

            var footerSVG=d3.select("#gaugeFooter_xs").append("svg").attr('height',60).attr('width',200);
            footerSVG.append('text').text(RiskLevelDef[theRisk]).attr("x", 75+defAdjust).attr("y",15)
            .style("fill","black").attr('font-size','15px').style("font-style","italic");

            var alertColors=["#43aa8b", "#90be6d", "#f9c74f","#f94144", "#f9844a", "white"];
            var data = [
                {
                domain: { x: [0, 1], y: [0, 1] },
                value: theRisk,
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    bar: {
                        thickness:0.2,
                        color: "#277da1"  
                    },
                    axis: { range: [0, 5],
                        showticklabels:false,
                        ticks:false,
                        visible:false
                        },
                    steps: [
                    { range: [0, 1], color: alertColors[0]},
                    { range: [1, 2], color: alertColors[1] },
                    { range: [2, 3], color: alertColors[2] },
                    { range: [3, 4], color: alertColors[4] },
                    { range: [4, 5], color: alertColors[3] },
                    ],
                    threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: theRisk
                    }
                }
                }
            ];
            
            var layout = { width: 180, height: 75, margin: { l:20,r:0,t: 0, b: 0 } };
            Plotly.newPlot('gauge', data, layout,{displayModeBar: false});
            Plotly.newPlot('gauge_xs', data, layout,{displayModeBar: false});
    
        }

        //add arrow indicator
        d3.select("#polyarrow").html("");
        var svg=d3.select("#polyarrow").append("svg").attr("width","200").attr("height","180");
    
        
        //up arrow
        var arrowColor="";
        if (casesChangeRaw>=0){arrowColor="#f94144"}
        else {arrowColor="#43aa8b"};
        
        var aM=.13;
        var aX=48;
        var aY=8;
        var aU=[(110*aM)+aX,(450*aM)+aY,(360*aM)+aX,(50*aM)+aY,(610*aM)+aX,(450*aM)+aY];

        if (casesChangeRaw>=0){
            var upArrow=svg
            .append('polyline').attr('opacity',1)
            .attr('points', `${aU[0]} ${aU[1]}, ${aU[2]} ${aU[3]+10}, ${aU[4]} ${aU[5]}`)
            .style('fill', arrowColor);

            var myBoxLine=svg.append('rect').attr("width", 28).attr("height", 40)
            .attr("x", 80.2).attr("y", 60).style("fill",arrowColor);
        }
        else {
            aY=10;
            aD=[(110*aM)+aX,(450*aM)+aY,(360*aM)+aX,(980*aM)+aY,(610*aM)+aX,(450*aM)+aY]
        
            var downArrow=svg
            .append('polyline').attr('opacity',1)
            .attr('points', `${aD[0]} ${aD[1]}, ${aD[2]} ${aD[3]-30}, ${aD[4]} ${aD[5]}`)
            .style('fill', arrowColor);

            var myBoxLine=svg.append('rect').attr("width", 28).attr("height", 40)
            .attr("x", 80.2).attr("y", 30).style("fill",arrowColor);
        }
        

        svg.append('text').text(casesChange).attr("x", 50.2).attr("y",140)
        .style("fill","black")
        .attr('font-size','24px');

        svg.append('text').text('New Cases Trend').attr("x", 18.2).attr("y",15)
        .style("fill","black")
        .attr('font-size','20px');

        //add arrow indicator for small screens
        d3.select("#polyarrow_xs").html("");
        var svg=d3.select("#polyarrow_xs").append("svg").attr("width","200").attr("height","180");
    
        
        //up arrow
        var arrowColor="";
        if (casesChangeRaw>=0){arrowColor="#f94144"}
        else {arrowColor="#43aa8b"};
        
        var aM=.13;
        var aX=48;
        var aY=8;
        var aU=[(110*aM)+aX,(450*aM)+aY,(360*aM)+aX,(50*aM)+aY,(610*aM)+aX,(450*aM)+aY];

        if (casesChangeRaw>=0){
            var upArrow=svg
            .append('polyline').attr('opacity',1)
            .attr('points', `${aU[0]} ${aU[1]}, ${aU[2]} ${aU[3]+10}, ${aU[4]} ${aU[5]}`)
            .style('fill', arrowColor);

            var myBoxLine=svg.append('rect').attr("width", 28).attr("height", 40)
            .attr("x", 80.2).attr("y", 60).style("fill",arrowColor);
        }
        else {
            aY=10;
            aD=[(110*aM)+aX,(450*aM)+aY,(360*aM)+aX,(980*aM)+aY,(610*aM)+aX,(450*aM)+aY]
        
            var downArrow=svg
            .append('polyline').attr('opacity',1)
            .attr('points', `${aD[0]} ${aD[1]}, ${aD[2]} ${aD[3]-30}, ${aD[4]} ${aD[5]}`)
            .style('fill', arrowColor);

            var myBoxLine=svg.append('rect').attr("width", 28).attr("height", 40)
            .attr("x", 80.2).attr("y", 30).style("fill",arrowColor);
        }
        

        svg.append('text').text(casesChange).attr("x", 50.2).attr("y",140)
        .style("fill","black")
        .attr('font-size','24px');

        svg.append('text').text('New Cases Trend').attr("x", 18.2).attr("y",15)
        .style("fill","black")
        .attr('font-size','20px');


        //icu bar horizontal
    
        if(myEvent==="selDataset"){
            icu=d3.select("#icu").html("");
            icu=d3.select("#icu").append("svg");

            //header
            icu.append('text').text('State ICU Beds Capacity').attr("x", 0).attr("y",15)
                .style("fill","black")
                .attr('font-size','19px');
            
                var icuBox=icu.append('rect').attr("width", 180).attr("height", 30)
            .attr("x", 14).attr("y", 30).style("stroke","black").style("fill","white") .attr("stroke-width",1);

            
            var icuCovid=lastEntry["actuals.icuBeds.currentUsageCovid"];
            var icuNormal=lastEntry["actuals.icuBeds.currentUsageTotal"]-lastEntry["actuals.icuBeds.currentUsageCovid"];
            var icuTotal=lastEntry["actuals.icuBeds.capacity"];


            var icuCovidPerc=icu.append('rect').attr("width", (icuCovid/icuTotal*180)).attr("height", 30)
            .attr("x", 14).attr("y", 30).style("fill","#577590");

            var icuNormalPerc=icu.append('rect').attr("width", (icuNormal/icuTotal*180)).attr("height", 30)
            .attr("x", 14+icuCovid/icuTotal*180).attr("y", 30).style("fill","#43aa8b");

            // icu readouts
            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 67).style("fill","#577590").style("stroke","black");

            icu.append('text').text(`Covid Usage:  ${icuCovid}`).attr("x", 30).attr("y",78)
            .style("fill","black")
            .attr('font-size','15px');

            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 87).style("fill","#43aa8b").style("stroke","black");

            icu.append('text').text(`Other Usage:  ${icuNormal}`).attr("x", 30).attr("y",98)
            .style("fill","black")
            .attr('font-size','15px');

            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 107).style("fill","white").style("stroke","black");

            icu.append('text').text(`Open Beds:  ${icuTotal-icuNormal-icuCovid}`).attr("x", 30).attr("y",118)
            .style("fill","black")
            .attr('font-size','15px');
        };

            //icu bar horizontal
    
        if(myEvent==="selDataset"){
            icu=d3.select("#icu").html("");
            icu=d3.select("#icu").append("svg");

            //header
            icu.append('text').text('State ICU Beds Capacity').attr("x", 0).attr("y",15)
                .style("fill","black")
                .attr('font-size','19px');
            
                var icuBox=icu.append('rect').attr("width", 180).attr("height", 30)
            .attr("x", 14).attr("y", 30).style("stroke","black").style("fill","white") .attr("stroke-width",1);

            
            var icuCovid=lastEntry["actuals.icuBeds.currentUsageCovid"];
            var icuNormal=lastEntry["actuals.icuBeds.currentUsageTotal"]-lastEntry["actuals.icuBeds.currentUsageCovid"];
            var icuTotal=lastEntry["actuals.icuBeds.capacity"];


            var icuCovidPerc=icu.append('rect').attr("width", (icuCovid/icuTotal*180)).attr("height", 30)
            .attr("x", 14).attr("y", 30).style("fill","#577590");

            var icuNormalPerc=icu.append('rect').attr("width", (icuNormal/icuTotal*180)).attr("height", 30)
            .attr("x", 14+icuCovid/icuTotal*180).attr("y", 30).style("fill","#43aa8b");

            // icu readouts
            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 67).style("fill","#577590").style("stroke","black");

            icu.append('text').text(`Covid Usage:  ${icuCovid}`).attr("x", 30).attr("y",78)
            .style("fill","black")
            .attr('font-size','15px');

            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 87).style("fill","#43aa8b").style("stroke","black");

            icu.append('text').text(`Other Usage:  ${icuNormal}`).attr("x", 30).attr("y",98)
            .style("fill","black")
            .attr('font-size','15px');

            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 107).style("fill","white").style("stroke","black");

            icu.append('text').text(`Open Beds:  ${icuTotal-icuNormal-icuCovid}`).attr("x", 30).attr("y",118)
            .style("fill","black")
            .attr('font-size','15px');
        };

        //icu bar horizontal for small screen
    
        if(myEvent==="selDataset"){
            icu=d3.select("#icu_xs").html("");
            icu=d3.select("#icu_xs").append("svg");

            //header
            icu.append('text').text('State ICU Beds Capacity').attr("x", 0).attr("y",15)
                .style("fill","black")
                .attr('font-size','19px');
            
                var icuBox=icu.append('rect').attr("width", 180).attr("height", 30)
            .attr("x", 14).attr("y", 30).style("stroke","black").style("fill","white") .attr("stroke-width",1);

            
            var icuCovid=lastEntry["actuals.icuBeds.currentUsageCovid"];
            var icuNormal=lastEntry["actuals.icuBeds.currentUsageTotal"]-lastEntry["actuals.icuBeds.currentUsageCovid"];
            var icuTotal=lastEntry["actuals.icuBeds.capacity"];


            var icuCovidPerc=icu.append('rect').attr("width", (icuCovid/icuTotal*180)).attr("height", 30)
            .attr("x", 14).attr("y", 30).style("fill","#577590");

            var icuNormalPerc=icu.append('rect').attr("width", (icuNormal/icuTotal*180)).attr("height", 30)
            .attr("x", 14+icuCovid/icuTotal*180).attr("y", 30).style("fill","#43aa8b");

            // icu readouts
            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 67).style("fill","#577590").style("stroke","black");

            icu.append('text').text(`Covid Usage:  ${icuCovid}`).attr("x", 30).attr("y",78)
            .style("fill","black")
            .attr('font-size','15px');

            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 87).style("fill","#43aa8b").style("stroke","black");

            icu.append('text').text(`Other Usage:  ${icuNormal}`).attr("x", 30).attr("y",98)
            .style("fill","black")
            .attr('font-size','15px');

            icu.append('rect').attr("width", 10).attr("height", 10)
            .attr("x", 15).attr("y", 107).style("fill","white").style("stroke","black");

            icu.append('text').text(`Open Beds:  ${icuTotal-icuNormal-icuCovid}`).attr("x", 30).attr("y",118)
            .style("fill","black")
            .attr('font-size','15px');
        };
        

    };


    //MAIN----------------------------------------
    var idField= d3.select("#selDataset");//
    stateAbb.forEach((value) => {
        idField.append("option").text(value).attr('value',value);
    });
    idField.on("change", stateInformation);

    var idFieldCounty= d3.select("#selDatasetCounty");//
    idFieldCounty.on("change", countyData);
    
 

    var countycode = "data/fips_zip_x.txt";  
    d3.csv(countycode).then((importedData2)=>{
        var data3 = importedData2;
        });


});  

