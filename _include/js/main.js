function createAllMap(){
	var mapJsonObj = getMapJson ();
	//alert(mapJsonObj);
	var paper = Raphael(document.getElementById("mapContainer"), 744.09448819, 1052.3622047);
	for (oneBuildingCount in mapJsonObj){
		var oneBuilding= mapJsonObj[oneBuildingCount];
		var oneRect = paper.rect(oneBuilding["x"],oneBuilding["y"],oneBuilding["width"], oneBuilding["height"]).attr({fill: "#FFD390", stroke:"#FFB037", text:"textObj"});
		oneRect.node.id=oneBuilding["id"];
		labelPath(oneRect, oneBuilding["id"]);
		//oneRect.node.text="Hello";
		oneRect.node.onclick  = clickListener;
	}
}
function getMapJson (){
	//alert(buildingmap);
	var mapJson = JSON.parse(buildingmap); 
	return mapJson;
}
function clickListener(){
	alert ("hello");
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