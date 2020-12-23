"use strict";
let pill = {
    id: 0,
    mainPositionX: 0,
    mainPositionY: 0,
    sidePositionX: 0,
    sidePositionY: 0,
    color1: "white",
    color2: "white",
    start: function(){
        this.create();
        this.startMoving2(this.mainPositionX + "_" + this.mainPositionY, this.sidePositionX + "_" + this.sidePositionY);
    },
    create: function(){
        this.id += 1;
        this.mainPositionX = 3;
        this.mainPositionY = 0;
        this.sidePositionX = 4;
        this.sidePositionY = 0;
        this.color1 = this.randColor();
        this.color2 = this.randColor();
        document.getElementById(this.mainPositionX + "_" + this.mainPositionY).className = this.id.toString();
        document.getElementById(this.mainPositionX + "_" + this.mainPositionY).style.backgroundColor = this.color1;
        document.getElementById(this.sidePositionX + "_" + this.sidePositionY).className = this.id.toString();
        document.getElementById(this.sidePositionX + "_" + this.sidePositionY).style.backgroundColor = this.color2;
    },
    randColor: function(){
        let clr = Math.floor(Math.random() * 3);
        if(clr == 0) return "red";
        else if(clr == 1) return "yellow";
        else return "blue";
    },
    startMoving1: function(id1){

    },
    startMoving2: function(id1, id2){
        setTimeout(this.move2, 500, id1, id2);
    },
    move2: function(id1, id2){
        console.log(id1);
        console.log(id2);
        let newId1 = id1.substring(0, 2) + (parseInt(id1.substring(2, id1.length)) + 1);
        console.log(newId1);
        let newId2 = id2.substring(0, 2) + (parseInt(id2.substring(2, id2.length)) + 1);
        console.log(newId2);
        if(document.getElementById(newId1).className == "empty" && (document.getElementById(newId2).className == "empty" 
        || document.getElementById(newId2).className == document.getElementById(id1).className)){
            document.getElementById(newId1).className = document.getElementById(id1).className;
            document.getElementById(newId1).style.backgroundColor = document.getElementById(id1).style.backgroundColor;
            document.getElementById(id1).className = "empty";
            document.getElementById(id1).style.backgroundColor = "white";
            document.getElementById(newId2).className = document.getElementById(id2).className;
            document.getElementById(newId2).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
            document.getElementById(id2).className = "empty";
            document.getElementById(id2).style.backgroundColor = "white";
            if(parseInt(newId1.substring(2, newId1.length)) < 15)
                setTimeout(pill.move2, 500, newId1, newId2);
        }
    }
}