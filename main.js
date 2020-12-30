"use strict";
let main = {
    GAMEOVER: false,
    level: 5,
    score: 0,
    load: function(){
        if(!localStorage.getItem("top"))
            localStorage.setItem("top", 0);
        document.body.style.position = "relative";
        let pf = document.createElement("img");
        pf.src = "img/pf.png";
        pf.style.position = "absolute";
        pf.style.left = "20px";
        pf.style.top = "20px";
        document.body.appendChild(pf);
        let tab = document.createElement("table");
        tab.style.borderCollapse = "collapse";
        tab.style.position = "absolute";
        tab.style.top = "116px";
        tab.style.left = "292px";
        for(let i = 0; i < 16; i++){
            let tr = tab.appendChild(document.createElement("tr"));
            for(let j = 0; j < 8; j++){
                let td = tr.appendChild(document.createElement("td"));
                td.id = j + "_" + i;
                td.className = "empty";
                td.style.width = "16px";
                td.style.height = "16px";
                td.style.border = "0";
                td.style.borderCollapse = "collapse";
                td.style.padding = "0";
                td.style.fontSize = "10px";
            }
        }
        document.body.appendChild(tab);
        for(let i = 7; i >= 1; i--){
            let top1 = document.createElement("img");
            top1.id = "top" + (8 - i);
            top1.src = "img/cyfry/" + ((localStorage.getItem("top") % (10 ** i) - localStorage.getItem("top") % (10 ** (i - 1))) / (10 ** (i - 1))) + ".png";
            top1.style.height = "16px";
            top1.style.position = "absolute";
            top1.style.top = "99px";
            top1.style.left = (101 + (7 - i) * 16) + "px";
            document.body.appendChild(top1);
            let score1 = document.createElement("img");
            score1.id = "score" + (8 - i);
            score1.src = "img/cyfry/" + ((main.score % (10 ** i) - main.score % (10 ** (i - 1))) / (10 ** (i - 1))) + ".png";
            score1.style.height = "16px";
            score1.style.position = "absolute";
            score1.style.top = "147px";
            score1.style.left = (101 + (7 - i) * 16) + "px";
            document.body.appendChild(score1);
        }
        let sc = document.createElement("img");
        sc.id = "sc";
        sc.src = "img/sc.png";
        sc.style.height = "80px";
        sc.style.display = "none";
        sc.style.position = "absolute";
        sc.style.top = "148px";
        sc.style.left = "212px";
        document.body.appendChild(sc);
        let go = document.createElement("img");
        go.id = "go";
        go.src = "img/go.png";
        go.style.height = "80px";
        go.style.display = "none";
        go.style.position = "absolute";
        go.style.top = "148px";
        go.style.left = "244px";
        document.body.appendChild(go);
        let go_dr = document.createElement("img");
        go_dr.id = "go_dr";
        go_dr.src = "img/go_dr.png";
        go_dr.style.height = "112px";
        go_dr.style.display = "none";
        go_dr.style.position = "absolute";
        go_dr.style.top = "68px";
        go_dr.style.left = "500px";
        document.body.appendChild(go_dr);
        main.createViruses();
        let virus1 = document.createElement("img");
        virus1.id = "virus1";
        virus1.src = "img/cyfry/" + Math.floor(document.getElementsByClassName("virus").length / 10) + ".png";
        virus1.style.height = "16px";
        virus1.style.position = "absolute";
        virus1.style.top = "355px";
        virus1.style.left = "581px";
        document.body.appendChild(virus1);
        let virus2 = document.createElement("img");
        virus2.id = "virus2";
        virus2.src = "img/cyfry/" + document.getElementsByClassName("virus").length % 10 + ".png";
        virus2.style.height = "16px";
        virus2.style.position = "absolute";
        virus2.style.top = "355px";
        virus2.style.left = "597px";
        document.body.appendChild(virus2);
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
                if(document.getElementsByClassName("virus").length % 3 == 1){
                    virusElement.style.backgroundColor = "brown";
                    virusElement.style.backgroundImage = "url('img/covid_brown.png')";
                }
                else if(document.getElementsByClassName("virus").length % 3 == 2){
                    virusElement.style.backgroundColor = "yellow";
                    virusElement.style.backgroundImage = "url('img/covid_yellow.png')";
                }
                else if(document.getElementsByClassName("virus").length % 3 == 0){
                    virusElement.style.backgroundColor = "blue";
                    virusElement.style.backgroundImage = "url('img/covid_blue.png')";
                }
            }
        }while(document.getElementsByClassName("virus").length < main.level * 4 + 4);
    },
    updateScore: function(){
        for(let i = 7; i >= 1; i--){
            document.getElementById("score" + (8 - i)).src = "img/cyfry/" + ((main.score % (10 ** i) - main.score % (10 ** (i - 1))) / 10 ** (i - 1)) + ".png";
        }
    }
}