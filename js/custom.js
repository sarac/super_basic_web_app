// Note: console communicates with java script interpreter so "hello,world" will appear in the console 
// console.log("hello,world");

// this is to dynamically reload the page and change certain things (delete elements add new ones in)
// once the page loads then there is no more network traffic unless you want to save the data
// d3.select("h1").text
// d3 is only available because the page included d3 at the top so now we have access to the d3 object
// d3.select grabs a hold of different parts of the dom tree and then allows you to modify it
// eg d3.select("h1") grabs first element where h1 appears
// d3.select("h1").text("Todd") takes h1 whcih was hello and changes it to Todd
// d3.select("h1").remove() removes the first h1
// d3 documentation: https://github.com/mbostock/d3/wiki
// in css . is a class
// d3.select(".page-header").insert("p").text("i just inserted this element")
// instead of having instr 1 html etc you can just keep changing the class instructions
// this works in a for loop
// d3.select(".ipage-header").insert("img").attr("src","https://www.google.com/images/srpr/logo11w.png")
// d3.select("svg").insert("circle").attr("r","10").attr("fill","lightblue").attr("stroke","steelblue").attr("cx",150).attr("cy",150).attr("class","mylittlecircle")
// select by class use . , by id use #
// size is in pixels with 0,0 at top left. what we drew is fixed size. could also do responsive
// can center and it will center within the div where it is (e.g. container). you would have to disallow mobile browsers
// can use javascript to take over entire page

// search svg circle attributes

// when html page is reloaded custom script at the bottom will be called and the function will be defined

// creates a stage, inserts a center and comes back with pointer to new element, in here inserts an svg, to this applies a w,h
function makeStage(w,h) {
	var stage = d3.select(".container")
		.insert("center")
		.insert("svg")
		.attr("width",w)
		.attr("heigth",h);
	return stage;
}

function clearStimulus(stage) {
	stage.selectAll("circle").remove();
	// stage is pointer to svg and this is pointer to circles in the svg
}


function drawStimulus(stage, cx, cy, radius, fillcolor) {
	stage.insert("circle")
		.attr("cx",cx)
		.attr("cy",cy)
		.attr("r",radius)
		.style("fill",fillcolor)
		.style("stroke","steelblue")
		.style("stroke-width","5px");
}

function clearButton(stage) {
	d3.select(".container")
	  .selectAll("button")
	  .remove();
	// in clear stim had pointer to stage, here need to use d3
}
function makeButton(text, callback) {
	d3.select(".container")
		.insert("button")
		.attr("type","button")
		.attr("class","btn btn-primary btn-lg")
		.attr("cx",500/3.)
		.attr("cy",300/3.)
		.text(text)
		.on("click",function(d) {console.log("clicked"); callback();}); //d shows what was clicked
		// callback is just another variable but it's a reference to an anonymous function
		// prevents execution of line or defers it
		// could do this using node.js and a listen for event handler type thing
}

var trials  = [{"color":"lightblue","radius": 20},
               {"color":"lightgreen","radius": 20},
               {"color":"red","radius": 50},
               {"color":"blue","radius": 20}
              ];

var mystage = makeStage(500,400);

function doTrial(stage, stim_array) {
	if (stim_array.length>0) {
		var stim = stim_array.shift();
		clearStimulus(stage);
		clearButton();
		// fillcolor = '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
		drawStimulus(stage, 500/2., 400/2., stim["radius"], stim["color"]);
		makeButton("A", function() {doTrial(stage, stim_array); });
		makeButton("B", function() {doTrial(stage, stim_array); });
		// if passed mystage to this function it would look for it locally in the function and then gone up a lvel
	} else {
		alert("i'm done with experiment")
	}
}

doTrial(mystage, trials);



