var paper;
function createAllMap(){
	var mapJsonObj = getMapJson ();
	//alert(mapJsonObj);
	 paper = Raphael(document.getElementById("mapContainer"), 400, 300);
	for (oneBuildingCount in mapJsonObj){
		var oneBuilding= mapJsonObj[oneBuildingCount];
		var oneRect = paper.rect(oneBuilding["x"],oneBuilding["y"],oneBuilding["width"], oneBuilding["height"]).attr({fill: "#FFD390", stroke:"#FFB037", text:"textObj"});
		oneRect.node.id=oneBuilding["id"];
		labelPath(oneRect, oneBuilding["id"]);
		
		//oneRect.node.text="Hello";
		//oneRect.node.onclick  =(function(){ });
	}
	//paper.setViewBox(0,0, 700, 1200);
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

function labelPath( pathObj, text, textattr )
{
    if ( textattr == undefined )
        textattr = { 'font-size': 10, fill: '#000', stroke: 'none', 'font-family': 'Arial,Helvetica,sans-serif', 'font-weight': 400 };
    var bbox = pathObj.getBBox();
    var textObj = pathObj.paper.text( bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, text ).attr( textattr );
    return textObj;
}

/*Thanks Aladaar*/
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