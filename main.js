"use strict";
let main = {
    GAMEOVER: false,
    level: 3,
    score: 0,
    load: function(){
        if(!localStorage.getItem("top"))
            localStorage.setItem("top", 0);
        document.body.style.position = "relative";
        let tab = document.createElement("table");
        tab.style.borderCollapse = "collapse";
        tab.style.position = "absolute";
        tab.style.top = "100px";
        tab.style.left = "100px";
        for(let i = 0; i < 16; i++){
            let tr = tab.appendChild(document.createElement("tr"));
            for(let j = 0; j < 8; j++){
                let td = tr.appendChild(document.createElement("td"));
                td.id = j + "_" + i;
                td.className = "empty";
                td.style.width = "24px";
                td.style.height = "24px";
                td.style.border = "1px solid black";
                td.style.borderCollapse = "collapse";
                td.style.padding = "0";
            }
        }
        document.body.appendChild(tab);
        let p1 = document.createElement("p");
        p1.id = "p1";
        p1.style.position = "absolute";
        p1.style.top = "500px";
        p1.style.left = "100px";
        p1.innerHTML = "TOP: " + localStorage.getItem("top") + "<br>SCORE: " + main.score;
        document.body.appendChild(p1);
        main.createViruses();
        pill.start();
    },
    createViruses: function(){
        let x, y, id;
        let virusIds = new Array();
        let virusElement;
        do{
            x = Math.floor(Math.random() * 8);
            y = Math.floor(Math.random() * 12) + 4;
            id = x + "_" + y;
            if(!virusIds.includes(id)){
                virusElement = document.getElementById(id)
                virusElement.className = "virus";
                virusElement.innerHTML = "V";
                if(document.getElementsByClassName("virus").length % 3 == 1)
                    virusElement.style.backgroundColor = "red";
                else if(document.getElementsByClassName("virus").length % 3 == 2)
                    virusElement.style.backgroundColor = "yellow";
                else if(document.getElementsByClassName("virus").length % 3 == 0)
                    virusElement.style.backgroundColor = "blue";
            }
        }while(document.getElementsByClassName("virus").length < main.level * 4 + 4);
    }
}