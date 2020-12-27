"use strict";
let main = {
    GAMEOVER: false,
    load: function(){
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
        pill.start();
    }
}