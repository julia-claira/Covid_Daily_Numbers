/*d3.select("#dropdown").html("")
var a="testered"
var b="tony"
d3.select("#dropdown").append("option").text(a).attr('value',a);
d3.select("#dropdown").append("option").text(b).attr('value',b);
*/

var a=1000000;
var b=a.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");
console.log(b);