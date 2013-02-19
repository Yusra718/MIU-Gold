// Yusra Ahmed
// Project 2: Web App Part 2
// Visual Frameworks Term 1211

var today = new Date();
document.write(today);

function sliderChange(val) {
    document.getElementById('sliderStatus').innerHTML = val;
};

window.addEventListener("DOMContentLoaded", function() {

	function getId(id) {
        var element = document.getElementById(id)
        return element
    };

    var decorType = ["What would you like?", "Tinsel", "Lights", "Ceiling", "Balloons", "Banners"],
    	save = getId("save"),
    	displayData = getId("displaydata"),
    	clear = getId("clearstoreddata"),
    	blue = getId("blue"),
    	green = getId("green"),
    	red = getId("red"),
    	pink = getId("pink"),
    	purple = getId("purple"),
    	orange = getId("orange"),
    	black = getId("black"),
    	white = getId("white"),
    	yellow = getId("yellow"),
    	grey = getId("grey"),
    	packTypeValue,
    	colorTypeValue,
        colorAmountValue,
        myColors = [blue, green, red, pink, purple, orange, black, white, yellow, grey],
        errorList = getId("error"),
        colors = [],
        localArray = [];

    function toggleDisplay(n){
        switch(n){
            case "on":
                getId("new").style.display = "none";
                getId("page1").style.display = "none";
                getId("displayPage").style.display = "none";
                clear.style.display = "inline";
                displayData.style.display = "none";
                getId("addItem").style.display = "inline";
                break;
            case "off":
                // getId("new").style.display = "block";
                // getId("decorateTypeForm").style.display = "block";
                // getId("colorType").style.display = "block";
                // getId("colorPerPiece").style.display = "block";
                // getId("colors").style.display = "block";
                // getId("order").style.display = "block";
                // getId("extraForm").style.display = "block";
                // getId("page1").style.display = "block";
                getId("displayPage").style.display = "block";
                clear.style.display = "inline-block";
                displayData.style.display = "inline-block";
                getId("addItem").style.display = "none";
                getId("decor").style.display = "none";
                break;
            default:
                return false;
        }
    };

	function makeType(){
	        var form = document.getElementsByTagName("form"),
	            selectLi = getId("select"),
	            makeSelect = document.createElement("select");
	            makeSelect.setAttribute("id", "type");
	        for(var i=0, j=decorType.length; i<j; i++){
	            var makeOption = document.createElement("option");
	            var optText = decorType[i];
	            makeOption.setAttribute("value", optText);
	            makeOption.innerHTML = optText;
	            makeSelect.appendChild(makeOption);
	           }
	        selectLi.appendChild(makeSelect);
	};

	function colorStyle(){
		var styleColor = $("input:radio[name=colorStyle]");
        for(var i=0; i<styleColor.length; i++) {
            if (styleColor[i].checked){
                colorTypeValue = styleColor[i].value;
            }
        }
    };

    function colorAmount(){
    	var amountColor = $("input:radio[name=colorAmount]");
        for(var i=0; i<amountColor.length; i++) {
            if (amountColor[i].checked){
                colorAmountValue = amountColor[i].value;
            }
        }
    };

    function colorsPush() {
        colors = [];
        for(var i=0, j=myColors.length; i<j; i++) {
            if (myColors[i].checked){
                colors.push(myColors[i].value);
            }
        }
    };

    function defaultData(){
        for(var d in json){
            localArray.push(json[d]);
            var id = Math.floor(Math.random()*10000001);
            for(var i=0, j=localArray.length; i<j; i++){
                localStorage.setItem(id, JSON.stringify(localArray[i]));
            }
        }
    }

	function saveData(key){

		if(!key){
            var id = Math.floor(Math.random()*10000001);
        } else {
            id = key;
        }
		colorStyle();
		colorAmount();
        var decor = {};
			decor.dectype = ["Type: ", getId("type").value];
            if(getId("type").value == "Balloons" || getId("type").value == "Ceiling" || getId("type").value == "Banners"){
			    decor.colorType = ["Color Style: ", colorTypeValue];
            }
			decor.colorAmount = ["Multiple/Separate: ", colorAmountValue];
			decor.colors = ["Color(s): ", colors];
            decor.occasion = ["Occasion: ", getId("occasion").value];
            decor.notes = ["Notes: ", getId("notes").value];
            decor.typePack = ["Business/Personal: ", getId("packAmount").value];
            decor.packs = ["How many packs? : ", getId("howMany").value];
        localArray.push(decor);
        for(var i=0, j=localArray.length; i<j; i++){
    		localStorage.setItem(id, JSON.stringify(localArray[i]));
    		alert("Saved!");
	    }
    };

	function getData(){
        toggleDisplay("on");
        if(localStorage.length === 0){
            alert("You have not added any data, so default data was added.");
            defaultData();
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "decor");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        for (var i=0, j=localStorage.length; i<j;i++) {
            var makeli = document.createElement("li");
            var links = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            storeImage(obj.dectype[1], makeSubList);
            for (var n in obj){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(links);
            }
            makeItemLinks(localStorage.key(i), links);
        }
    };

    // function arrangingStorage(){
    //     if(localStorage.length >=1){
    //         var localArray = [];
    //         for (var i=0, j=i+1; i<localStorage.length;i++){
    //             if(localStorage(i).key>localStorage(j).key){
    //                 localStorage(i).insertBefore(localStorage(j))
    //             } else if(localStorage(j).key>localStorage(i).key){
    //                 localStorage(j).insertBefore(localStorage(i))
    //             }
    //             localArray.push(localStorage.key(i));
    //         }
    //     }
    //     var sortData = localArray.reverse();
    //     return sortData;
    // }

    function newData(){
        var newPage = getId("newItems");
        if(localStorage.length === 0){
            var newp = document.createElement("p");
            var pText =  document.createTextNode("There are no new items");
            newp.appendChild(pText);
            newPage.appendChild(newp);
        } else if(localStorage.length >=1){
            var newList = document.createElement("ul");
            newPage.appendChild(newList);
            for(var i=0, j=3; i<j; i++){
                var makeli = document.createElement("li");
                var links = document.createElement("li");
                newList.appendChild(makeli);
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                var makeSubList = document.createElement("ul");
                makeli.appendChild(makeSubList);
                storeImage(obj.dectype[1], makeSubList);
                for (var n in obj){
                    var makeSubli = document.createElement("li");
                    makeSubList.appendChild(makeSubli);
                    var optSubText = obj[n][0]+" "+obj[n][1];
                    makeSubli.innerHTML = optSubText;
                    makeSubList.appendChild(links);
                }
                makeItemLinks(localStorage.key(i), links);
            }
        }
    }

    function toggleCS(){
        if (getId("type").value == "Tinsel" || getId("type").value == "Lights"){
            getId("colorStyle").style.display = "none";
        } else {
            getId("colorStyle").style.display = "block";
        }

        if (getId("type").value == "Lights"){
            getId("blackli").style.display = "none";
            getId("greyli").style.display = "none";
        } else{
            getId("blackli").style.display = "block";
            getId("greyli").style.display = "block";
        }

        for(var i=1, j=getId("type").length; i<j; i++){
            for(var k=0, m=myColors.length; k<m; k++){
                if(getId("type").value == "Tinsel"){
                    var imageID = myColors[k].value + "Image";
                    getId(imageID).setAttribute("src", "Img/TinselColors/" + myColors[k].value + "Tinsel.jpeg");
                } else if(getId("type").value == "Lights"){
                    var imageID = myColors[k].value + "Image";
                    getId(imageID).setAttribute("src", "Img/LightsColors/" + myColors[k].value + "Lights.jpeg");
                } else if(getId("type").value == "Ceiling"){
                    var imageID = myColors[k].value + "Image";
                    getId(imageID).setAttribute("src", "Img/CeilingColors/" + myColors[k].value + "Ceiling.jpeg");
                } else if(getId("type").value == "Balloons"){
                    var imageID = myColors[k].value + "Image";
                    getId(imageID).setAttribute("src", "Img/BalloonsColors/" + myColors[k].value + "Balloons.jpeg");
                } else if(getId("type").value == "Banners"){
                    var imageID = myColors[k].value + "Image";
                    getId(imageID).setAttribute("src", "Img/BannersColors/" + myColors[k].value + "Banners.jpeg");
                }
            }
        }

    }    

    function editDisplay(){
        getId("displayData").style.display = "block";
        var displayArray = [getId("select"), getId("colorType"), getId("colorPerPiece"), getId("colors"), getId("saveForm"), getId("extraForm")];
        var editUl = document.createElement("ul");
        var displayPage = getId("displayPage");
        for(var i=0, j=displayArray.length; i<j; i++){
            var editLi = document.createElement("li");
            displayArray[i].style.display = "inline-block";
            editLi.appendChild(displayArray[i]);
            editUl.appendChild(editLi);
        }
        displayPage.appendChild(editUl);
    }

    function storeImage(image, makeSubList){
        var imageLi = document.createElement("li");
        makeSubList.appendChild(imageLi);
        var imgTag = document.createElement("img");
        var makeSrc = imgTag.setAttribute("src", "Img/"+ image + ".jpeg");
        imageLi.appendChild(imgTag);
    }

    function makeItemLinks(key, links){
        var edit = document.createElement("a");
        edit.href = "#";
        edit.key = key;
        var editText = "Edit Item";
        edit.addEventListener("click", editItem);
        edit.innerHTML = editText;
        links.appendChild(edit);
        edit.style.display = "block"

        var remove = document.createElement("a");
        remove.href = "#";
        remove.key = key;
        var removeText = "Remove Item";
        remove.addEventListener("click", deleteItem);
        remove.innerHTML = removeText;
        links.appendChild(remove);
        remove.style.display = "block"
    }

    function editItem() {
        var value = localStorage.getItem(this.key);
        var decor = JSON.parse(value);

        toggleDisplay("off");
        editDisplay();

        getId("type").value = decor.dectype[1];
        
        if(getId("type").value == "Tinsel" || getId("type").value == "Lights"){
            getId("colorType").style.display = "none";
        } else {
            getId("colorType").style.display = "block";
        }

        if(getId("type").value == "Balloons" || getId("type").value == "Ceiling" || getId("type").value == "Banners"){
            var colorTypeRadios = $("input:radio[name=colorStyle]");
            for(var i=0, j=colorTypeRadios.length; i<j; i++){
                if(colorTypeRadios[i].value == "Metallic" && decor.colorType[1] == "Metallic"){
                    colorTypeRadios[i].setAttribute("checked", "checked");
                } else if(colorTypeRadios[i].value == "Regular" && decor.colorType[1] == "Regular"){
                    colorTypeRadios[i].setAttribute("checked", "checked");
                }
            }
        }

        var colorRadios = $("input:radio[name=colorAmount]");
        for(var i=0, j=colorRadios.length; i<j; i++){
            if(colorRadios[i].value == "Multiple Colors" && decor.colorAmount[1] == "Multiple Colors"){
                colorRadios[i].setAttribute("checked", "checked");
            } else if(colorRadios[i].value == "Separate Colors" && decor.colorAmount[1] == "Separate Colors"){
                colorRadios[i].setAttribute("checked", "checked");
            }
        }

        for(var k=0, l=decor.colors[1].length; k<l; k++){
            for(var i=0, j=myColors.length; i<j; i++){
                if (decor.colors[1][k] == myColors[i].value){
                    myColors[i].setAttribute("checked", "checked");
                }
            }
        }

        getId("occasion").value = decor.occasion[1];
        getId("notes").value = decor.notes[1];
        getId("packAmount").value = decor.typePack[1];
        getId("howMany").value = decor.packs[1];
        sliderChange(getId("howMany").value);
        
        save.removeEventListener("click", validate);
        getId("save").value = "Edit Item";
        var editSave = getId("save");
        editSave.addEventListener("click", validate);
        editSave.key = this.key;


    }

    function deleteItem(){
        var ask = confirm("Remove from cart?");
        if(ask){
            localStorage.removeItem(this.key);
            window.location.reload();
        }else{
            alert("Item NOT removed.");
        }
    }

    function validate(eventData){
        errorList.innerHTML = "";
        getId("type").style.border = "none";
        getId("colors").style.border = "none";
        getId("packs").style.border = "none";
        getId("packAmount").style.border = "none";
        var errors = [],
        validatingColorAmount = [],
        validatingColorStyle = [];
        if(getId("type").value == "What would you like?"){
            var typeError = "Please choose Type.";
            getId("type").style.border = "1px solid red";
            errors.push(typeError);
        }

        if(getId("type").value == "Balloons" || getId("type").value == "Ceiling" || getId("type").value == "Banners"){
            var colorStyleValidate = $("input:radio[name=colorStyle]");
            for(var i=0, j=colorStyleValidate.length; i<j; i++){
                if(colorStyleValidate[i].checked){
                    validatingColorStyle.push(colorStyleValidate[i].value);
                }
            }
            if(validatingColorStyle.length === 0){
             var clrStyleErr = "Please choose Color Type.";
             getId("colorType").style.border = "1px solid red";
             errors.push(clrStyleErr);
            } else if(validatingColorStyle.length >=1){
                getId("colorType").style.border = "none";
            }
        }


        var amountColorValidate = $("input:radio[name=colorAmount]");
        for(var i=0, j=amountColorValidate.length; i<j; i++){
            if(amountColorValidate[i].checked){
                validatingColorAmount.push(amountColorValidate[i].value);
            }
        }

        if(validatingColorAmount.length === 0){
             var clrAmntErr = 'Please choose "Multiple" or "Separate" colors.';
             getId("colorPerPiece").style.border = "1px solid red";
             errors.push(clrAmntErr);
        } else if(validatingColorAmount.length >=1){
            getId("colorPerPiece").style.border = "none";
        }

        if(getId("packAmount").value == "Business/Personal"){
            var packAmountErr = "Please choose Business or Personal order.";
            getId("packAmount").style.border = "1px solid red";
            errors.push(packAmountErr);
        }

        if(colors.length === 0){
            var colorsError = "A minimum of one color chosen is required.";
            getId("colors").style.border = "1px solid red";
            errors.push(colorsError);
        }
        if(getId("howMany").value == "0"){
            var packsError = "Please choose a minimum of one pack.";
            getId("packs").style.border = "1px solid red"
            errors.push(packsError);
        }
        if(errors.length >=1){
            for(var i=0, j=errors.length; i<j; i++){
                var errorText = document.createElement("li");
                errorText.innerHTML = errors[i];
                errorList.appendChild(errorText);
                errorList.style.color = "red";
            }
            eventData.preventDefault();
            return false;
        } else {
            saveData(this.key);
            window.location.reload();
        }   
    }



	function clearData() {
        if (localStorage.length === 0) {
            alert("Nothing to clear!")
            window.location.reload();
        } else {
            localStorage.clear();
            alert("Data Cleared!");
            window.location.reload();
            return false;
        }
    }

  	makeType();
    getId("select").addEventListener("click", toggleCS)
    save.addEventListener("click", colorsPush);
    save.addEventListener("click", validate);
	displayData.addEventListener("click", getData);
	clear.addEventListener("click", clearData);
    newData();

});