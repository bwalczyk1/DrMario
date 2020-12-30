"use strict";
let pill = {
    id: 0,
    mainPositionX: 0,
    mainPositionY: 0,
    sidePositionX: 0,
    sidePositionY: 0,
    color1: "",
    color2: "",
    falling: false,
    pressingKey: false,
    gravity: false,
    atLeastOnePulledDown: false,
    start: function(){
        document.body.addEventListener("keydown", pill.checkKey);
        document.body.addEventListener("keyup", ()=>{
            this.pressingKey = false;
        });
        this.new();
    },
    checkKey: function(e){
        if(!main.GAMEOVER && !pill.falling && !pill.pressingKey){
            var x = e.keyCode;
            if(x == 39){
                pill.pressingKey = true;
                pill.moveRight(pill.mainPositionX + "_" + pill.mainPositionY, pill.sidePositionX + "_" + pill.sidePositionY);
            }   
            else if(x == 37){
                pill.pressingKey = true;
                pill.moveLeft(pill.mainPositionX + "_" + pill.mainPositionY, pill.sidePositionX + "_" + pill.sidePositionY);
            }   
            else if(x == 38){
                pill.pressingKey = true;
                pill.rotateCounter(pill.mainPositionX + "_" + pill.mainPositionY, pill.sidePositionX + "_" + pill.sidePositionY);
            }  
            else if(x == 16){
                pill.pressingKey = true;
                pill.rotateClockwise(pill.mainPositionX + "_" + pill.mainPositionY, pill.sidePositionX + "_" + pill.sidePositionY);
            }
            else if(x == 40){
                pill.pressingKey = true;
                pill.falling = true;
                setTimeout(this.move2, 1);
            }
        }
    },
    new: function(){
        this.create();
        this.falling = false;
        this.gravity = false;
        setTimeout(this.move2, 600);
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
        if(this.color1 == "brown")
            document.getElementById(this.mainPositionX + "_" + this.mainPositionY).style.backgroundImage = "url('img/br_left.png')";
        else if(this.color1 == "yellow")
            document.getElementById(this.mainPositionX + "_" + this.mainPositionY).style.backgroundImage = "url('img/yl_left.png')";
        else if(this.color1 == "blue")
            document.getElementById(this.mainPositionX + "_" + this.mainPositionY).style.backgroundImage = "url('img/bl_left.png')";
        document.getElementById(this.sidePositionX + "_" + this.sidePositionY).className = this.id.toString();
        document.getElementById(this.sidePositionX + "_" + this.sidePositionY).style.backgroundColor = this.color2;
        if(this.color2 == "brown")
            document.getElementById(this.sidePositionX + "_" + this.sidePositionY).style.backgroundImage = "url('img/br_right.png')";
        else if(this.color2 == "yellow")
            document.getElementById(this.sidePositionX + "_" + this.sidePositionY).style.backgroundImage = "url('img/yl_right.png')";
        else if(this.color2 == "blue")
            document.getElementById(this.sidePositionX + "_" + this.sidePositionY).style.backgroundImage = "url('img/bl_right.png')";
    },
    randColor: function(){
        let clr = Math.floor(Math.random() * 3);
        if(clr == 0) return "brown";
        else if(clr == 1) return "yellow";
        else return "blue";
    },
    move1: function(id1){
        if(parseInt(id1.substring(2, id1.length)) < 15){
            console.log(id1);
            let newId1 = id1.substring(0, 2) + (parseInt(id1.substring(2, id1.length)) + 1);
            console.log(newId1);
            if(document.getElementById(newId1).className == "empty"){
                document.getElementById(newId1).className = document.getElementById(id1).className;
                document.getElementById(newId1).style.backgroundColor = document.getElementById(id1).style.backgroundColor;
                document.getElementById(newId1).style.backgroundImage = document.getElementById(id1).style.backgroundImage;
                document.getElementById(id1).className = "empty";
                document.getElementById(id1).style.backgroundColor = "";
                document.getElementById(id1).style.backgroundImage = "";
                pill.atLeastOnePulledDown = true;
            }
        }
    },
    move2: function(id1 = "0", id2 = "0"){
        if(id1 == "0" && id2 == "0"){
            id1 = pill.mainPositionX + "_" + pill.mainPositionY;
            id2 = pill.sidePositionX + "_" + pill.sidePositionY;
        }
        if(parseInt(id1.substring(2, id1.length)) < 15){
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
                document.getElementById(newId1).style.backgroundImage = document.getElementById(id1).style.backgroundImage;
                document.getElementById(id1).className = "empty";
                document.getElementById(id1).style.backgroundColor = "";
                document.getElementById(id1).style.backgroundImage = "";
                document.getElementById(newId2).className = document.getElementById(id2).className;
                document.getElementById(newId2).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                document.getElementById(newId2).style.backgroundImage = document.getElementById(id2).style.backgroundImage;
                document.getElementById(id2).className = "empty";
                document.getElementById(id2).style.backgroundColor = "";
                document.getElementById(id2).style.backgroundImage = "";
                if(!pill.gravity){
                    pill.mainPositionX = parseInt(newId1.substring(0, 1));
                    pill.mainPositionY = parseInt(newId1.substring(2, newId1.length));
                    pill.sidePositionX = parseInt(newId2.substring(0, 1));
                    pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
                    if(pill.falling)
                        setTimeout(pill.move2, 50);
                    else
                        setTimeout(pill.move2, 600);
                }
                else
                    pill.atLeastOnePulledDown = true;
            }
            else if(!pill.gravity){
                pill.delete4();
            } 
        }
        else if(!pill.gravity){
            pill.delete4();
        }
    },
    delete4: function(){
        let toDeleteArr = new Array();
        let id, classname;
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 16; j++){
                id = i + "_" + j;
                if(i <= 4){
                    if(document.getElementById(id).className != "empty" 
                    && document.getElementById(id).style.backgroundColor == document.getElementById((i + 1) + "_" + j).style.backgroundColor
                    && document.getElementById((i + 1) + "_" + j).style.backgroundColor == document.getElementById((i + 2) + "_" + j).style.backgroundColor
                    && document.getElementById((i + 2) + "_" + j).style.backgroundColor == document.getElementById((i + 3) + "_" + j).style.backgroundColor){
                        for(let n = 0; n < 4; n++)
                            toDeleteArr.push((i + n) + "_" + j);
                    }
                }
                if(j <= 12){
                    if(document.getElementById(id).className != "empty"
                    && document.getElementById(id).style.backgroundColor == document.getElementById(i + "_" + (j + 1)).style.backgroundColor
                    && document.getElementById(i + "_" + (j + 1)).style.backgroundColor == document.getElementById(i + "_" + (j + 2)).style.backgroundColor
                    && document.getElementById(i + "_" + (j + 2)).style.backgroundColor == document.getElementById(i + "_" + (j + 3)).style.backgroundColor){
                        for(let n = 0; n < 4; n++)
                            toDeleteArr.push(i + "_" + (j + n));
                    }
                }
            }
        }
        if(toDeleteArr.length > 0){
            for(let i = 0; i < toDeleteArr.length; i++){
                id = toDeleteArr[i];
                if(document.getElementById(id).className == "virus"){
                    main.score += 100;
                    main.updateScore();
                    if(document.getElementById(id).style.backgroundColor == "brown")
                        document.getElementById(id).style.backgroundImage = "url('img/br_x.png')";
                    else if(document.getElementById(id).style.backgroundColor == "yellow")
                        document.getElementById(id).style.backgroundImage = "url('img/yl_x.png')";
                    else if(document.getElementById(id).style.backgroundColor == "blue")
                        document.getElementById(id).style.backgroundImage = "url('img/bl_x.png')";
                }
                else{
                    if(document.getElementById(id).style.backgroundColor == "brown")
                        document.getElementById(id).style.backgroundImage = "url('img/br_o.png')";
                    else if(document.getElementById(id).style.backgroundColor == "yellow")
                        document.getElementById(id).style.backgroundImage = "url('img/yl_o.png')";
                    else if(document.getElementById(id).style.backgroundColor == "blue")
                        document.getElementById(id).style.backgroundImage = "url('img/bl_o.png')";
                }
                classname = document.getElementById(id).className;
                document.getElementById(id).className = "empty";
                if(document.getElementsByClassName(classname).length == 1 && classname != "virus"){
                    if(document.getElementsByClassName(classname)[0].style.backgroundColor == "brown")
                        document.getElementsByClassName(classname)[0].style.backgroundImage = "url('img/br_dot.png')";
                    else if(document.getElementsByClassName(classname)[0].style.backgroundColor == "yellow")
                        document.getElementsByClassName(classname)[0].style.backgroundImage = "url('img/yl_dot.png')";
                    else if(document.getElementsByClassName(classname)[0].style.backgroundColor == "blue")
                        document.getElementsByClassName(classname)[0].style.backgroundImage = "url('img/bl_dot.png')";
                }
                setTimeout(pill.delete, 50, id);
            }
            setTimeout(pill.gravityForce, 100);
        }
        else{
            if(document.getElementsByClassName("virus").length == 0){
                console.log("STAGE COMPLETED");
                document.getElementById("sc").style.display = "block";
                if(main.score > localStorage.getItem("top")){
                    localStorage.setItem("top", main.score);
                }
            }
            else if(document.getElementById("3_0").className != "empty" || document.getElementById("4_0").className != "empty"){
                console.log("GAME OVER");
                document.getElementById("go").style.display = "block";
                document.getElementById("go_dr").style.display = "block";
                if(main.score > localStorage.getItem("top")){
                    localStorage.setItem("top", main.score);
                }
                main.GAMEOVER = true;
            }
            else
                pill.new();
        }
    },
    delete: function(id){
        document.getElementById(id).style.backgroundColor = "";
        document.getElementById(id).style.backgroundImage = "";
        document.getElementById("virus1").src = "img/cyfry/" + Math.floor(document.getElementsByClassName("virus").length / 10) + ".png";
        document.getElementById("virus2").src = "img/cyfry/" + document.getElementsByClassName("virus").length % 10 + ".png";
    },
    gravityForce: function(){
        pill.gravity = true;
        pill.atLeastOnePulledDown = false;
        let testedClassNames = new Array();
        let testedClassName;
        let x;
        let id0, id1;
        for(let i = 15; i >= 0; i--){
            for(let j = 7; j >= 0; j--){
                testedClassName = document.getElementById(j + "_" + i).className;
                if(testedClassName != "empty" && testedClassName != "virus"){
                    if(!testedClassNames.includes(testedClassName)){
                        x = document.getElementsByClassName(testedClassName).length;
                        if(x == 1){
                            pill.move1(document.getElementsByClassName(testedClassName)[0].id);
                        }
                        else if(x == 2){
                            id0 = document.getElementsByClassName(testedClassName)[0].id;
                            id1 = document.getElementsByClassName(testedClassName)[1].id;
                            if(id1 == id0.substring(0, 2) + (parseInt(id0.substring(2, id0.length)) + 1))
                                pill.move2(document.getElementsByClassName(testedClassName)[1].id, document.getElementsByClassName(testedClassName)[0].id);
                            else if(id1 == (parseInt(id0.substring(0, 1)) + 1) + id0.substring(1, id0.length))
                                pill.move2(document.getElementsByClassName(testedClassName)[0].id, document.getElementsByClassName(testedClassName)[1].id);
                        }
                        testedClassNames.push(testedClassName);
                    }
                }
            }
        }
        if(pill.atLeastOnePulledDown)
            setTimeout(pill.gravityForce, 50);
        else
            pill.delete4();
    },
    moveRight: function(id1, id2){
        if(parseInt(id2.substring(0, 1)) < 7){
            console.log(id1);
            console.log(id2);
            let newId1 = (parseInt(id1.substring(0, 1)) + 1) + id1.substring(1, id1.length);
            console.log(newId1);
            let newId2 = (parseInt(id2.substring(0, 1)) + 1) + id2.substring(1, id2.length);
            console.log(newId2);
            if(document.getElementById(newId2).className == "empty" && (document.getElementById(newId1).className == "empty" 
            || document.getElementById(newId1).className == document.getElementById(id2).className)){
                document.getElementById(newId2).className = document.getElementById(id2).className;
                document.getElementById(newId2).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                document.getElementById(newId2).style.backgroundImage = document.getElementById(id2).style.backgroundImage;
                document.getElementById(id2).className = "empty";
                document.getElementById(id2).style.backgroundColor = "";
                document.getElementById(id2).style.backgroundImage = "";
                document.getElementById(newId1).className = document.getElementById(id1).className;
                document.getElementById(newId1).style.backgroundColor = document.getElementById(id1).style.backgroundColor;
                document.getElementById(newId1).style.backgroundImage = document.getElementById(id1).style.backgroundImage;
                document.getElementById(id1).className = "empty";
                document.getElementById(id1).style.backgroundColor = "";
                document.getElementById(id1).style.backgroundImage = "";
                pill.mainPositionX = parseInt(newId1.substring(0, 1));
                pill.mainPositionY = parseInt(newId1.substring(2, newId1.length));
                pill.sidePositionX = parseInt(newId2.substring(0, 1));
                pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
            }
        }
    },
    moveLeft: function(id1, id2){
        if(parseInt(id1.substring(0, 1)) > 0){
            console.log(id1);
            console.log(id2);
            let newId1 = (parseInt(id1.substring(0, 1)) - 1) + id1.substring(1, id1.length);
            console.log(newId1);
            let newId2 = (parseInt(id2.substring(0, 1)) - 1) + id2.substring(1, id2.length);
            console.log(newId2);
            if(document.getElementById(newId1).className == "empty" && (document.getElementById(newId2).className == "empty" 
            || document.getElementById(newId2).className == document.getElementById(id1).className)){
                document.getElementById(newId1).className = document.getElementById(id1).className;
                document.getElementById(newId1).style.backgroundColor = document.getElementById(id1).style.backgroundColor;
                document.getElementById(newId1).style.backgroundImage = document.getElementById(id1).style.backgroundImage;
                document.getElementById(id1).className = "empty";
                document.getElementById(id1).style.backgroundColor = "";
                document.getElementById(id1).style.backgroundImage = "";
                document.getElementById(newId2).className = document.getElementById(id2).className;
                document.getElementById(newId2).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                document.getElementById(newId2).style.backgroundImage = document.getElementById(id2).style.backgroundImage;
                document.getElementById(id2).className = "empty";
                document.getElementById(id2).style.backgroundColor = "";
                document.getElementById(id2).style.backgroundImage = "";
                pill.mainPositionX = parseInt(newId1.substring(0, 1));
                pill.mainPositionY = parseInt(newId1.substring(2, newId1.length));
                pill.sidePositionX = parseInt(newId2.substring(0, 1));
                pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
            }
        }
    },
    rotateClockwise: function(id1, id2){
        console.log(id1);
        console.log(id2);
        if(id2 == (parseInt(id1.substring(0, 1)) + 1) + id1.substring(1, id1.length) && parseInt(id1.substring(2, id1.length)) > 0){
            console.log(id1);
            let newId2 = (parseInt(id2.substring(0, 1)) - 1) + "_" + (parseInt(id2.substring(2, id2.length)) - 1);
            console.log(newId2);
            if(document.getElementById(newId2).className == "empty"){
                document.getElementById(newId2).className = document.getElementById(id2).className;
                document.getElementById(newId2).style.backgroundColor = document.getElementById(id1).style.backgroundColor;
                document.getElementById(newId2).style.backgroundImage = document.getElementById(id1).style.backgroundImage.substring(0, 11) + '_up.png")';
                document.getElementById(id1).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                document.getElementById(id1).style.backgroundImage = document.getElementById(id2).style.backgroundImage.substring(0, 11) + '_down.png")';
                document.getElementById(id2).className = "empty";
                document.getElementById(id2).style.backgroundColor = "";
                document.getElementById(id2).style.backgroundImage = "";
                pill.sidePositionX = parseInt(newId2.substring(0, 1));
                pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
            }
        }
        else if(id2 == id1.substring(0, 2) + (parseInt(id1.substring(2, id1.length)) - 1)){
            if(parseInt(id1.substring(0, 1)) == 7){
                let newId1 = (parseInt(id1.substring(0, 1)) - 1) + id1.substring(1, id1.length);
                let newId2 = id1;
                if(document.getElementById(newId1).className == "empty"){
                    document.getElementById(newId1).className = document.getElementById(id1).className;
                    document.getElementById(newId1).style.backgroundColor = document.getElementById(id1).style.backgroundColor;
                    document.getElementById(newId1).style.backgroundImage = document.getElementById(id1).style.backgroundImage.substring(0, 11) + '_left.png")';
                    document.getElementById(newId2).className = document.getElementById(id2).className;
                    document.getElementById(newId2).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                    document.getElementById(newId2).style.backgroundImage = document.getElementById(id2).style.backgroundImage.substring(0, 11) + '_right.png")';
                    document.getElementById(id2).className = "empty";
                    document.getElementById(id2).style.backgroundColor = "";
                    document.getElementById(id2).style.backgroundImage = "";
                    pill.mainPositionX = parseInt(newId1.substring(0, 1));
                    pill.mainPositionY = parseInt(newId1.substring(2, newId1.length));
                    pill.sidePositionX = parseInt(newId2.substring(0, 1));
                    pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
                }
            }
            else{
                let newId2 = (parseInt(id2.substring(0, 1)) + 1) + "_" + (parseInt(id2.substring(2, id2.length)) + 1);
                if(document.getElementById(newId2).className == "empty"){
                    document.getElementById(newId2).className = document.getElementById(id2).className;
                    document.getElementById(newId2).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                    document.getElementById(newId2).style.backgroundImage = document.getElementById(id2).style.backgroundImage.substring(0, 11) + '_right.png")';
                    document.getElementById(id1).style.backgroundImage = document.getElementById(id1).style.backgroundImage.substring(0, 11) + '_left.png")';
                    document.getElementById(id2).className = "empty";
                    document.getElementById(id2).style.backgroundColor = "";
                    document.getElementById(id2).style.backgroundImage = "";
                    pill.sidePositionX = parseInt(newId2.substring(0, 1));
                    pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
                }
            }
        }
    },
    rotateCounter: function(id1, id2){
        console.log(id1);
        console.log(id2);
        if(id2 == (parseInt(id1.substring(0, 1)) + 1) + id1.substring(1, id1.length) && parseInt(id1.substring(2, id1.length)) > 0){
            console.log(id1);
            let newId2 = (parseInt(id2.substring(0, 1)) - 1) + "_" + (parseInt(id2.substring(2, id2.length)) - 1);
            console.log(newId2);
            if(document.getElementById(newId2).className == "empty"){
                document.getElementById(newId2).className = document.getElementById(id2).className;
                document.getElementById(newId2).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                document.getElementById(newId2).style.backgroundImage = document.getElementById(id2).style.backgroundImage.substring(0, 11) + '_up.png")';
                document.getElementById(id1).style.backgroundImage = document.getElementById(id1).style.backgroundImage.substring(0, 11) + '_down.png")';
                document.getElementById(id2).className = "empty";
                document.getElementById(id2).style.backgroundColor = "";
                document.getElementById(id2).style.backgroundImage = "";
                pill.sidePositionX = parseInt(newId2.substring(0, 1));
                pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
            }
        }
        else if(id2 == id1.substring(0, 2) + (parseInt(id1.substring(2, id1.length)) - 1)){
            if(parseInt(id1.substring(0, 1)) == 7){
                let newId1 = (parseInt(id1.substring(0, 1)) - 1) + id1.substring(1, id1.length);
                let newId2 = id1;
                if(document.getElementById(newId1).className == "empty"){
                    document.getElementById(newId1).className = document.getElementById(id1).className;
                    document.getElementById(newId1).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                    document.getElementById(newId1).style.backgroundImage = document.getElementById(id2).style.backgroundImage.substring(0, 11) + '_left.png")';
                    document.getElementById(newId2).className = document.getElementById(id2).className;
                    document.getElementById(newId2).style.backgroundColor = document.getElementById(id1).style.backgroundColor;
                    document.getElementById(newId2).style.backgroundImage = document.getElementById(id1).style.backgroundImage.substring(0, 11) + '_right.png")';
                    document.getElementById(id2).className = "empty";
                    document.getElementById(id2).style.backgroundColor = "";
                    document.getElementById(id2).style.backgroundImage = "";
                    pill.mainPositionX = parseInt(newId1.substring(0, 1));
                    pill.mainPositionY = parseInt(newId1.substring(2, newId1.length));
                    pill.sidePositionX = parseInt(newId2.substring(0, 1));
                    pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
                }
            }
            else{
                let newId2 = (parseInt(id2.substring(0, 1)) + 1) + "_" + (parseInt(id2.substring(2, id2.length)) + 1);
                if(document.getElementById(newId2).className == "empty"){
                    document.getElementById(newId2).className = document.getElementById(id2).className;
                    document.getElementById(newId2).style.backgroundColor = document.getElementById(id1).style.backgroundColor;
                    document.getElementById(newId2).style.backgroundImage = document.getElementById(id1).style.backgroundImage.substring(0, 11) + '_right.png")';
                    document.getElementById(id1).style.backgroundColor = document.getElementById(id2).style.backgroundColor;
                    document.getElementById(id1).style.backgroundImage = document.getElementById(id2).style.backgroundImage.substring(0, 11) + '_left.png")';
                    document.getElementById(id2).className = "empty";
                    document.getElementById(id2).style.backgroundColor = "";
                    document.getElementById(id2).style.backgroundImage = "";
                    pill.sidePositionX = parseInt(newId2.substring(0, 1));
                    pill.sidePositionY = parseInt(newId2.substring(2, newId2.length));
                }
            }
        }
    }
}