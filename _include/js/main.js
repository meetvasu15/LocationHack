var paper;
var p ;
var coderect;
var allrectNodes= new Array();
var confDataJson;
var wconfRoomJson;

function createAllMap(){
	var mapJsonObj = getMapJson ();
	var wJsonObj = JSON.parse(wMapStr);
	confDataJson=JSON.parse(confDataStr);
	wconfRoomJson=JSON.parse(wConfRoom);
	//alert(mapJsonObj);
	 paper = Raphael(document.getElementById("mapContainer"), 600, 500);
	 Raphael.st.draggable = function() {
	  var me = this,
		  lx = 0,
		  ly = 0,
		  ox = 0,
		  oy = 0,
		  moveFnc = function(dx, dy) {
			  lx = dx + ox;
			  ly = dy + oy;
			  me.transform('t' + lx + ',' + ly);
		  },
		  startFnc = function() {},
		  endFnc = function() {
			  ox = lx;
			  oy = ly;
		  };

	  this.drag(moveFnc, startFnc, endFnc);
	};
var mySet = paper.set();
	for (oneBuildingCount in mapJsonObj){
		var oneBuilding= mapJsonObj[oneBuildingCount];
		var oneRect = paper.rect(oneBuilding["x"],oneBuilding["y"],oneBuilding["width"], oneBuilding["height"]).attr({fill: "#FFD390", stroke:"#FFB037"});
		allrectNodes[oneBuilding["id"]] = oneRect;
		mySet.push(oneRect);
		oneRect.node.id=oneBuilding["id"];
		//labelPath(oneRect, oneBuilding["id"]);
		
			mySet.push(labelPath(oneRect, oneBuilding["id"]), 9);
		
		//oneRect.node.text="Hello";
		//oneRect.node.onclick  =(function(){ });
	}
	
	for(onePortionCount in wJsonObj ){
		var onePortion= wJsonObj[onePortionCount];
		var oneRect = paper.rect(onePortion["x"],onePortion["y"],onePortion["width"], onePortion["height"]).attr({ stroke:"#3C46D1", 'stroke-width':'0.8'});
		mySet.push(oneRect);
		//oneRect.node.id=onePortion["id"];
		//labelPath(oneRect, onePortion["id"]);
		//mySet.push(labelPath(oneRect, onePortion["id"]));
	}
	for(oneWCOnfCount in wconfRoomJson ){
		var onePortion= wconfRoomJson[oneWCOnfCount];
		var oneRect = paper.rect(onePortion["x"],onePortion["y"],onePortion["width"], onePortion["height"]).attr({ stroke:"#3C46D1", 'stroke-width':'0.8'});
		oneRect.node.id=onePortion["id"];
		//labelPathone(oneRect, onePortion["id"]);
		allrectNodes[onePortion["id"]] = oneRect;
		mySet.push(labelPathone(oneRect, onePortion["id"]));
		mySet.push(oneRect);
	}
	
	 coderect = mySet.push( paper.rect(20,166.6479,688.57141, 834.28571).attr({ stroke:"none", fill:"rgb(250, 255, 134)", opacity:"0.2"}));
mySet.draggable();
	//paper.setViewBox(0,0, 700, 1200);
	
			//glow
		var glow = false;





}
function getMapJson (){
	//alert(buildingmap);
	var mapJson = JSON.parse(buildingmap); 
	return mapJson;
}
function clickListener(id){
	alert (id);
}
createAllMap();

		//showSearchResult("","");
		
function labelPath( pathObj, text,   textattr )
{
    if ( textattr == undefined )
        textattr = { 'font-size': 9, fill: '#000', stroke: 'none', 'font-family': 'Arial,Helvetica,sans-serif', 'font-weight': 400 };
    var bbox = pathObj.getBBox();
    var textObj = pathObj.paper.text( bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, text ).attr( textattr );
    return textObj;
}
function labelPathone( pathObj, text,   textattr )
{
    if ( textattr == undefined )
        textattr = { 'font-size': 1, fill: '#000', stroke: 'none', 'font-family': 'Arial,Helvetica,sans-serif', 'font-weight': 10};
    var bbox = pathObj.getBBox();
    var textObj = pathObj.paper.text( bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, text ).attr( textattr );
    return textObj;
}

/*resize and zoom and drag*/
paper.setViewBox(0,0,paper.width,paper.height);



var viewBoxWidth = paper.width;
var viewBoxHeight = paper.height;
var canvasID = "#paper";
var startX,startY;
var mousedown = false;
var dX,dY;
var oX = 100, oY = 320, oWidth = viewBoxWidth, oHeight = viewBoxHeight;
var viewBox = paper.setViewBox(oX, oY, viewBoxWidth, viewBoxHeight);
viewBox.X = oX;
viewBox.Y = oY;
//var vB = paper.rect(viewBox.X,viewBox.Y,viewBoxWidth,viewBoxHeight)
 //   .attr({stroke: "#009", "stroke-width": 3});;


    /** This is high-level function.
     * It must react to delta being more/less than zero.
     */
    function handle(delta) {
        vBHo = viewBoxHeight;
        vBWo = viewBoxWidth;
        if (delta < 0) {
        viewBoxWidth *= 0.95;
        viewBoxHeight*= 0.95;
        }
        else {
        viewBoxWidth *= 1.05;
        viewBoxHeight *= 1.05;
        }
                        
  viewBox.X -= (viewBoxWidth - vBWo) / 2;
  viewBox.Y -= (viewBoxHeight - vBHo) / 2;          paper.setViewBox(viewBox.X,viewBox.Y,viewBoxWidth,viewBoxHeight);
    }

    /** Event handler for mouse wheel event.
     */
    function wheel(event){
            var delta = 0;
            if (!event) /* For IE. */
                    event = parent.window.event;
            if (event.wheelDelta) { /* IE/Opera. */
                    delta = event.wheelDelta/120;
            } else if (event.detail) { /** Mozilla case. */
                    /** In Mozilla, sign of delta is different than in IE.
                     * Also, delta is multiple of 3.
                     */
                    delta = -event.detail/3;
            }
            /** If delta is nonzero, handle it.
             * Basically, delta is now positive if wheel was scrolled up,
             * and negative, if wheel was scrolled down.
             */
            if (delta)
                    handle(delta);
            /** Prevent default actions caused by mouse wheel.
             * That might be ugly, but we handle scrolls somehow
             * anyway, so don't bother here..
             */
            if (event.preventDefault)
                    event.preventDefault();
        event.returnValue = false;
    }

    /** Initialization code.
     * If you use your own event management code, change it as required.
     */
    if (parent.window.addEventListener)
            /** DOMMouseScroll is for mozilla. */
            parent.window.addEventListener('DOMMouseScroll', wheel, false);
    /** IE/Opera. */
    parent.window.onmousewheel = parent.document.onmousewheel = wheel;
		/*coderect is the rect that sits on the back of the playground*/
        coderect.mousedown(function(e){
            
            if (paper.getElementByPoint( e.pageX, e.pageY ) != null) {return;}
            mousedown = true;
            startX = e.pageX;
            startY = e.pageY;    
        });

        coderect.mousemove(function(e){
            if (mousedown == false) {return;}
            dX = startX - e.pageX;
            dY = startY - e.pageY;
            x = viewBoxWidth / paper.width;
            y = viewBoxHeight / paper.height;

            dX *= x;
            dY *= y;
            
            paper.setViewBox(viewBox.X + dX, viewBox.Y + dY, viewBoxWidth, viewBoxHeight);

        })
            
        coderect.mouseup(function(e){
            if ( mousedown == false ) return;
            viewBox.X += dX;
            viewBox.Y += dY;
            mousedown = false;
            
        });

// search listener and handler

//start
		function showSearchResult(bldId){
		for(resetColor in allrectNodes){
			allrectNodes[resetColor].attr({fill: "#FFD390"});
		}
			var searchedBldElt = allrectNodes[bldId];
			searchedBldElt.attr({fill: "red"});
		}
	function searchListener(){
		var srchtext =document.getElementById('searchBoxInput').value ;
		var resultText;
		if(confDataJson.rooms[srchtext]!= undefined && confDataJson.rooms[srchtext]!= "" ){
			showSearchResult(confDataJson.rooms[srchtext].bldg)
			resultText = " Building : " +confDataJson.rooms[srchtext].bldg +"<br> Room Num : "+confDataJson.rooms[srchtext].number+"<br> Name: "+confDataJson.rooms[srchtext].name+"<br> Bldg Level : "+confDataJson.rooms[srchtext].level ;
			//$("#searchresultdiv").html("");
			$("#searchresultdiv").html(resultText);
			var bldid = confDataJson.rooms[srchtext].bldg ;
			if(bldid==="W"){
				showSearchResult(srchtext);
			}else{
			showSearchResult(confDataJson.rooms[srchtext].bldg);
			}
		}else{
		return "Nothing found with search : '"+srchtext+"'";
		}
		//alert(srchtext);
	}
	// search listener end


	
		//type ahead start
	var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};
 
var confroom = ["All Y' all","Annapurna","Apollo","APTD","Auditorium","Backyard","Scrub Oak","Barton Creek 1","Barton Creek 2","Barton Creek 3","Bear Creek","Beaumont","Berry Creek","Blue Devils","Bluebonnet1","Bonsai","Canyon Lake","Capitol","Carlsbad 1","Carlsbad 2","Cartwright","Catfish Pond","Cedar","Cerro Alto","Command Center","Corsicana","Cottonwood","DSD Quality","Everest","Fenway Park","Flamingo","Forbes Field","Frio","Guadalupe","High Yield","K2","Keystone","Lake Buchanan","Lavaca","Leadership","Longhorn","Magnolia","Marble Falls","Marula","Mesquite","Mirage","Mission Control","Momentum 1","Momentum 2","Nacodoches","North Padre","Nueces","Oasis","Opportunity","Pecan Grove 1 & 2","Pecos","Pedernales","Pelican","Penny Lake","Pennybacker","Red River","Sabine","San Gabriel","San Jacinto","San Marcos","San Saba","Seneca","Shark Tank","Silver Creek 1","Silver Creek 2","Silver Creek 3","Simplify","Situation Room","Sonora","South Padre","Spicewood","St. Andrews 1","Strawberry Fields","Sunset Canyon","Tejas","Three Rivers","Thunderdome","Town Lake","Treaty Oak","Trinity 1","Trinity 2","Trinity 3","Tripoli Shores","Tropicana","Twin Lakes","Vandalay","Vegas","Walnut Creek","War Room","Waterloo","Waxahachie","WWW","Yahoo","Zephyr","Zilker","Zin", "Karen" , "Chris","Vasu","Anshu"];
 
$('.input-group .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'confroom',
  displayKey: 'value',
  source: substringMatcher(confroom)
});
	//type ahead end