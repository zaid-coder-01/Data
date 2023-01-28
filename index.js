$(document).ready(() => {

    $('#sub').click(() => {
        let data = JSON.parse(localStorage.getItem("UserData"));
        let fname = $('#fname').val();
        let lname = $('#lname').val();
        let cont = $('#cont').val();
        let a = [];

        if (fname != "" && lname != "" && cont != "") {
            if (data == null) {
                a.push({
                    name: `${fname} ${lname}`,
                    contact: cont
                })
                localStorage.setItem("UserData", JSON.stringify(a))
            }
            else {
                let Nmatch = data.find((val) => val.name == `${fname} ${lname}`)
                let Cmatch = data.find((val) => val.contact == cont)
                if (Nmatch) {
                    alert("name present")
                }
                else if (Cmatch) {
                    alert("contact present")
                }
                else {
                    let newData = {
                        name: `${fname} ${lname}`,
                        contact: cont
                    }
                    data.push(newData);
                    localStorage.setItem("UserData", JSON.stringify(data))
                }
            }
            location.reload();
        }

        $('#frm').reset();
        tableValue()
        return false;
    })
    let tableValue = (() => {
        let value = [];
        let tab = document.getElementById("table");
        value = JSON.parse(localStorage.getItem("UserData"));
        value.map((value, index) => {
            let row = tab.insertRow();
            let col1 = row.insertCell();
            let col2 = row.insertCell();
            let col3 = row.insertCell();
            let col4 = row.insertCell();
            col1.innerHTML = index;
            col2.innerHTML = value.name
            col3.innerHTML = value.contact
            col4.innerHTML = `<button class='delbtn' onclick="remove(${index})">Remove</button>`
        })
    })
    tableValue()
})
let remove = (x) => {
     let c=confirm("do you want to delete");
    if(c==true)
    {
    let data = [];
    data = JSON.parse(localStorage.getItem("UserData"));
    data.splice(x, 1);
    localStorage.setItem("UserData", JSON.stringify(data))
    location.reload()
    }
}
// search 
let srch = () => {
    let search = $('#searchvalue').val().toUpperCase();
    let tab = document.getElementById("table")
    let row = tab.getElementsByTagName("tr")
    for (let i = 0; i < row.length; i++) {
        let col = row[i].getElementsByTagName("td")[1];
        if (col) {
            let colval = col.innerHTML;
            if (colval.toUpperCase().indexOf(search) > -1) {
                row[i].style.display = "";
            }
            else {
                row[i].style.display = "none"
            }
        }
    }
    return false;
}
function sortTable() {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
      let tab = document.getElementById("table")
    switching = true;
    dir = "asc";

    while (switching) {
      switching = false;
      rows = tab.getElementsByTagName("tr")

      for (i = 1; i < rows.length - 1; i++) { 
        shouldSwitch = false;
   
        x = rows[i].getElementsByTagName("td")[1];
        y = rows[i + 1].getElementsByTagName("td")[1];

        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
    
            shouldSwitch = true;
            break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
