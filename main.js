"use strict";
let main = {
    GAMEOVER: false,
    level: 0,
    score: 0,
    flyingPillFrame: 1,
    flyingPillPositions: [
        [10, 3], [10, 3],
        [9, 2], [9, 2],
        [8, 1], [8, 1],
        [7, 1], [7, 1],
        [6, 1], [6, 1],
        [5, 1], [5, 1],
        [4, 1], [4, 1],
        [3, 1], [3, 1],
        [2, 1], [2, 1],
        [1, 2], [1, 2],
        [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
    ],
    flyingPillInterval: 0,
    bigVirusesFrame: 0,
    bigVirusesPositions: [
        [1, 4],
        [1, 5],
        [2, 6],
        [2, 7],
        [3, 7],
        [4, 7],
        [5, 7],
        [6, 7],
        [7, 6],
        [7, 5],
        [7, 4],
        [7, 3],
        [6, 2],
        [5, 2],
        [4, 2],
        [3, 2],
        [2, 3],
        [1, 4]
    ],
    bigVirusBrPos: 0,
    bigVirusBlPos: 6,
    bigVirusYlPos: 12,
    bigVirusesInterval: 0,
    load: function(){
        if(!localStorage.getItem("top"))
            localStorage.setItem("top", 0);
        document.body.style.position = "relative";
        document.addEventListener("keydown", pill.checkKey);
        document.addEventListener("keyup", ()=>{
            pill.pressingKey = false;
        });
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
            }
        }
        document.body.appendChild(tab);
        let tab2 = document.createElement("table");
        tab2.style.borderCollapse = "collapse";
        tab2.style.position = "absolute";
        tab2.style.top = "20px";
        tab2.style.left = "340px";
        for(let i = 0; i < 8; i++){
            let tr = tab2.appendChild(document.createElement("tr"));
            for(let j = 0; j < 12; j++){
                let td = tr.appendChild(document.createElement("td"));
                td.id = "_" + j + "_" + i;
                td.style.width = "16px";
                td.style.height = "16px";
                td.style.backgroundSize = "16px 16px";
                td.style.border = "0";
                td.style.borderCollapse = "collapse";
                td.style.padding = "0";
            }
        }
        document.body.appendChild(tab2);
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
        let bigVirusBr = document.createElement("img");
        bigVirusBr.id = "bigVirusBr";
        bigVirusBr.src = "img/lupa/br/2.png";
        bigVirusBr.style.height = "48px";
        bigVirusBr.style.position = "absolute";
        bigVirusBr.style.top = "276px";
        bigVirusBr.style.left = "52px";
        document.body.appendChild(bigVirusBr);
        let bigVirusBl = document.createElement("img");
        bigVirusBl.id = "bigVirusBl";
        bigVirusBl.src = "img/lupa/bl/2.png";
        bigVirusBl.style.height = "48px";
        bigVirusBl.style.position = "absolute";
        bigVirusBl.style.top = "324px";
        bigVirusBl.style.left = "116px";
        document.body.appendChild(bigVirusBl);
        let bigVirusYl = document.createElement("img");
        bigVirusYl.id = "bigVirusYl";
        bigVirusYl.src = "img/lupa/yl/2.png";
        bigVirusYl.style.height = "48px";
        bigVirusYl.style.position = "absolute";
        bigVirusYl.style.top = "244px";
        bigVirusYl.style.left = "132px";
        document.body.appendChild(bigVirusYl);
        main.bigVirusesInterval = setInterval(main.bigViruses, 250);
        this.grabPill();
        pill.flying = true;
        main.flyingPillInterval = setInterval(main.flyingPill, 15);
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
    },
    grabPill: function(){
        pill.color1 = pill.randColor();
        pill.color2 = pill.randColor();
        if(pill.color1 == "brown")
            document.getElementById("_10_3").style.backgroundImage = "url('img/br_left.png')";
        else if(pill.color1 == "yellow")
            document.getElementById("_10_3").style.backgroundImage = "url('img/yl_left.png')";
        else if(pill.color1 == "blue")
            document.getElementById("_10_3").style.backgroundImage = "url('img/bl_left.png')";
        if(pill.color2 == "brown")
            document.getElementById("_11_3").style.backgroundImage = "url('img/br_right.png')";
        else if(pill.color2 == "yellow")
            document.getElementById("_11_3").style.backgroundImage = "url('img/yl_right.png')";
        else if(pill.color2 == "blue")
            document.getElementById("_11_3").style.backgroundImage = "url('img/bl_right.png')";
        document.getElementById("_11_4").style.backgroundImage = "url('img/hands/up_1.png')";
        document.getElementById("_11_5").style.backgroundImage = "url('img/hands/up_2.png')";
        document.getElementById("_11_6").style.backgroundImage = "url('img/hands/up_3.png')";
        
    },
    flyingPill: function(){
        let i = main.flyingPillFrame;
        document.getElementById("_" + main.flyingPillPositions[i - 1][0] + "_" + main.flyingPillPositions[i - 1][1]).style.backgroundImage = "";
        document.getElementById("_" + (main.flyingPillPositions[i - 1][0] + 1) + "_" + main.flyingPillPositions[i - 1][1]).style.backgroundImage = "";
        document.getElementById("_" + main.flyingPillPositions[i - 1][0] + "_" + (main.flyingPillPositions[i - 1][1] - 1)).style.backgroundImage = "";
        let imageBase1, imageBase2;
        if(pill.color1 == "brown")
            imageBase1 = "url('img/br";
        else if(pill.color1 == "yellow")
            imageBase1 = "url('img/yl";
        else if(pill.color1 == "blue")
            imageBase1 = "url('img/bl";
        if(pill.color2 == "brown")
            imageBase2 = "url('img/br";
        else if(pill.color2 == "yellow")
            imageBase2 = "url('img/yl";
        else if(pill.color2 == "blue")
            imageBase2 = "url('img/bl";
        if(i <= 20){
            if(i % 4 == 0){
                document.getElementById("_" + main.flyingPillPositions[i][0] + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = imageBase1 + "_left.png')";
                document.getElementById("_" + (main.flyingPillPositions[i][0] + 1) + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = imageBase2 + "_right.png')";
            }
            else if(i % 4 == 1){
                document.getElementById("_" + main.flyingPillPositions[i][0] + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = imageBase1 + "_down.png')";
                document.getElementById("_" + main.flyingPillPositions[i][0] + "_" + (main.flyingPillPositions[i][1] - 1)).style.backgroundImage = imageBase2 + "_up.png')";
            }
            else if(i % 4 == 2){
                document.getElementById("_" + main.flyingPillPositions[i][0] + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = imageBase2 + "_left.png')";
                document.getElementById("_" + (main.flyingPillPositions[i][0] + 1) + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = imageBase1 + "_right.png')";
            }
            else if(i % 4 == 3){
                document.getElementById("_" + main.flyingPillPositions[i][0] + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = imageBase2 + "_down.png')";
                document.getElementById("_" + main.flyingPillPositions[i][0] + "_" + (main.flyingPillPositions[i][1] - 1)).style.backgroundImage = imageBase1 + "_up.png')";
            }
        }
        else{
            document.getElementById("_" + main.flyingPillPositions[i][0] + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = imageBase1 + "_left.png')";
            document.getElementById("_" + (main.flyingPillPositions[i][0] + 1) + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = imageBase2 + "_right.png')";
        }
        if(i == 4){
            document.getElementById("_11_4").style.backgroundImage = "";
            document.getElementById("_10_5").style.backgroundImage = "url('img/hands/middle11.png')";
            document.getElementById("_11_5").style.backgroundImage = "url('img/hands/middle12.png')";
            document.getElementById("_10_6").style.backgroundImage = "url('img/hands/middle21.png')";
            document.getElementById("_11_6").style.backgroundImage = "url('img/hands/middle22.png')";
        }
        else if(i == 7){
            document.getElementById("_10_5").style.backgroundImage = "";
            document.getElementById("_11_5").style.backgroundImage = "";
            document.getElementById("_10_6").style.backgroundImage = "";
            document.getElementById("_11_6").style.backgroundImage = "url('img/hands/down_1.png')";
            document.getElementById("_11_7").style.backgroundImage = "url('img/hands/down_2.png')";
        }
        else if(i == 24){
            document.getElementById("_" + main.flyingPillPositions[i][0] + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = "";
            document.getElementById("_" + (main.flyingPillPositions[i][0] + 1) + "_" + main.flyingPillPositions[i][1]).style.backgroundImage = "";
            main.flyingPillFrame = 0;
            pill.new();
            document.getElementById("_11_7").style.backgroundImage = "";
            main.grabPill();
            clearInterval(main.flyingPillInterval);
        }
        main.flyingPillFrame += 1;
    },
    bigViruses: function(){
        let i = main.bigVirusesFrame;
        if(i % 4 == 1){
            document.getElementById("bigVirusBr").src = "img/lupa/br/1.png";
            document.getElementById("bigVirusBl").src = "img/lupa/bl/1.png";
            document.getElementById("bigVirusYl").src = "img/lupa/yl/1.png";
        }
        else if(i % 4 == 3){
            document.getElementById("bigVirusBr").src = "img/lupa/br/3.png";
            document.getElementById("bigVirusBl").src = "img/lupa/bl/3.png";
            document.getElementById("bigVirusYl").src = "img/lupa/yl/3.png";
        }
        else{
            document.getElementById("bigVirusBr").src = "img/lupa/br/2.png";
            document.getElementById("bigVirusBl").src = "img/lupa/bl/2.png";
            document.getElementById("bigVirusYl").src = "img/lupa/yl/2.png";
        }
        if(i % 4 == 0){
            document.getElementById("bigVirusBr").style.top = (212 + main.bigVirusesPositions[(main.bigVirusBrPos + (i / 4)) % 18][1] * 16) + "px";
            document.getElementById("bigVirusBr").style.left = (36 + main.bigVirusesPositions[(main.bigVirusBrPos + (i / 4)) % 18][0] * 16) + "px";
            document.getElementById("bigVirusBl").style.top = (212 + main.bigVirusesPositions[(main.bigVirusBlPos + (i / 4)) % 18][1] * 16) + "px";
            document.getElementById("bigVirusBl").style.left = (36 + main.bigVirusesPositions[(main.bigVirusBlPos + (i / 4)) % 18][0] * 16) + "px";
            document.getElementById("bigVirusYl").style.top = (212 + main.bigVirusesPositions[(main.bigVirusYlPos + (i / 4)) % 18][1] * 16) + "px";
            document.getElementById("bigVirusYl").style.left = (36 + main.bigVirusesPositions[(main.bigVirusYlPos + (i / 4)) % 18][0] * 16) + "px";
        }
        main.bigVirusesFrame += 1;
    },
    bigVirusesGO: function(){
        let i = main.bigVirusesFrame;
        if(i == 1){
            document.getElementById("bigVirusBl").style.left = (parseInt(document.getElementById("bigVirusBl").style.left) + 1) + "px";
        }
        if(i % 2 == 1){
            document.getElementById("bigVirusBr").src = "img/lupa/br/4.png";
            document.getElementById("bigVirusBl").style.left = (parseInt(document.getElementById("bigVirusBl").style.left) + 1) + "px";
            document.getElementById("bigVirusBl").src = "img/lupa/bl/4.png";
            document.getElementById("bigVirusYl").src = "img/lupa/yl/4.png";
        }
        else{
            document.getElementById("bigVirusBr").src = "img/lupa/br/2.png";
            document.getElementById("bigVirusBl").style.left = (parseInt(document.getElementById("bigVirusBl").style.left) - 1) + "px";
            document.getElementById("bigVirusBl").src = "img/lupa/bl/2.png";
            document.getElementById("bigVirusYl").src = "img/lupa/yl/2.png";
        }
        main.bigVirusesFrame += 1;
    }
}