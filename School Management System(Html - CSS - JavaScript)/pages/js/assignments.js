
document.body.onload = function () {

    var assignments = getAssignments();
//    var assignments = null; // Case to reset date to initial one.
    
    if (assignments === null) {

        assignments = [];

        assignments.push({title: "Computer Science", description: "Java Classes and Objects",
            submissionDate: "14/03/2021", oralMark: null, totalMark: null});
        assignments.push({title: "Finance", description: "Banking Model",
            submissionDate: "02/12/2020", oralMark: null, totalMark: null});
        assignments.push({title: "Music", description: "The major Scale",
            submissionDate: "03/03/2021", oralMark: null, totalMark: null});
        assignments.push({title: "English Literature", description: "Writing a poem",
            submissionDate: "13/12/2020", oralMark: null, totalMark: null});

        setAssignments(assignments);
    }

    updateTable();
};

// Retrieve from local storage.
function getAssignments() {
    return JSON.parse(localStorage.getItem("assignments"));
}

// Save to local storage.
function setAssignments(assignments) {
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

var rIndex,
        table = document.getElementById('table');

function checkInput() {
    var ctitle = document.getElementById("title").value,
            cdesc = document.getElementById("desc").value,
            csubdate = document.getElementById("subdate").value,
            comark = document.getElementById("omark").value,
            ctmark = document.getElementById("tmark").value;

    if (ctitle === "") {
        alert("title cannot be empty");
        return false;
    }
    else if (cdesc === "") {
        alert("description cannot be empty");
        return false;
    }
    else if (csubdate === "") {
        alert("submission date cannot be empty");
        return false;
    }
    else if (comark !== "" && comark > 20) {
        alert("oral mark cannot be greater than 20");
        return false;
    } 
    else if (ctmark !== "" && ctmark > 100) {
       alert("total mark cannot be greater than 100");
        return false; 
    }
    return true;
}

function updateTable() {
    
    clearTable();
    
    var assignments = getAssignments();
    
    var a;
    for (a of assignments) {
        var newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2),
                cell4 = newRow.insertCell(3),
                cell5 = newRow.insertCell(4);
        cell1.innerHTML = a.title;
        cell2.innerHTML = a.description;
        cell3.innerHTML = a.submissionDate;
        cell4.innerHTML = a.oralMark;
        cell5.innerHTML = a.totalMark;
    }
    selectedRowToInput();
}

function clearTable() {
    
    var rows = table.rows.length;

    for (var i = 1; i < rows; i ++) {
        table.deleteRow(1); // 1 because 0 is head, and after 1 is deleted, 
        // second is also 1 until empty.
    }
}

function AddHtmlTableRow() {
    
    if (checkInput()) {
        
        var assignments = getAssignments();
        
        var dateParts = document.getElementById("subdate").value.split("-");
        
        assignments.push({
            title: document.getElementById("title").value, 
            description: document.getElementById("desc").value,
            submissionDate: dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0], 
            oralMark: document.getElementById("omark").value, 
            totalMark: document.getElementById("tmark").value
        });
        
        setAssignments(assignments);
        
        updateTable();
    }
}

// To set date in ISO format.
Date.prototype.toISODate = function() {
    return this.getFullYear() + '-' +
           ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
           ('0'+ this.getDate()).slice(-2);
  };

function selectedRowToInput() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            document.getElementById('title').value = this.cells[0].innerHTML;
            document.getElementById('desc').value = this.cells[1].innerHTML;
            var dateParts = this.cells[2].innerHTML.split("/");
            var d = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);

            document.getElementById('subdate').value = d.toISODate();
            document.getElementById('omark').value = this.cells[3].innerHTML;
            document.getElementById('tmark').value = this.cells[4].innerHTML;
        };
    }
}
selectedRowToInput();

function editHtmlTableSelectedRow() {
    var ctitle = document.getElementById("title").value,
            cdesc = document.getElementById("desc").value,
            csubdate = document.getElementById("subdate").value,
            comark = document.getElementById("omark").value,
            ctmark = document.getElementById("tmark").value;

    if (checkInput()) {
        var assignments = getAssignments();
        var a = assignments[rIndex - 1];
        if (a === undefined) return; // If row not selected.
        a.title = ctitle;
        a.description = cdesc;
        var dateParts = csubdate.split("-");
        a.submissionDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
        a.oralMark = comark;
        a.totalMark = ctmark;
        
        setAssignments(assignments);
        
        updateTable();
    } else {
        console.log("not valid input");
    }
}

function removeSelectedRow() {
    
    var assignments = getAssignments();

    assignments.splice(rIndex - 1, 1);
    
//    console.log(assignments);
    
    setAssignments(assignments);

    updateTable();
//    table.deleteRow(rIndex);
    document.getElementById('title').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('subdate').value = "";
    document.getElementById('omark').value = "";
    document.getElementById('tmark').value = "";
}