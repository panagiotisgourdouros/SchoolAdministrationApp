document.body.onload = function () {

    var courses = getCourses();
//    var courses = null; // Case to reset date to initial one.
    
    if (courses === null) {

        courses = [];

        courses.push({title: "Computer Science", stream: "Java",
            type: "Full-Time", startDate: "13/09/2020", endDate: "14/05/2021"});
        courses.push({title: "Finance", stream: "Banking",
            type: "Part-Time", startDate: "15/09/2020", endDate: "15/01/2021"});
        courses.push({title: "Music", stream: "Classical Music",
            type: "Full-Time", startDate: "16/10/2020", endDate: "03/06/2021"});
        courses.push({title: "English Literature", stream: "Poetry",
            type: "Part-Time", startDate: "13/09/2020", endDate: "13/01/2021"});

        setCourses(courses);
    }

    updateTable();
};

// To set date in ISO format.
Date.prototype.toISODate = function() {
    return this.getFullYear() + '-' +
           ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
           ('0'+ this.getDate()).slice(-2);
  };

var rIndex,
    table = document.getElementById('table');
    
function courseAlreadyExists(title) {
    var courses = getCourses();
    var c;
    for (c of courses) {
        if (c.title === title) {
            return true;
        }
    }
    return false;
}

function checkInput(update) {
    var ctitle = document.getElementById("title").value,
        cstream = document.getElementById("stream").value,
        ctype = document.getElementById("type").value,
        csdate = document.getElementById("sdate").value,
        cedate = document.getElementById("edate").value;

    if (ctitle === "") {
        alert("Course title cannot be empty");
        return false;
    } else if (!update && courseAlreadyExists(ctitle)) {
        alert("This course already exists");
        return false;
    }
    else if (cstream === "") {
        alert("Course stream cannot be empty");
        return false;
    }
    else if (ctype === "") {
        alert("Course type cannot be empty");
        return false;
    }
    else if (csdate === "") {
        alert("Course starting date cannot be empty");
        return false;
    }
    else if (cedate === "") {
        alert("Course ending date cannot be empty");
        return false;
    } else if (csdate > cedate) {
        alert("Course start date cannot be after end date");
        return false;
    }
    return true;
}

function AddHtmlTableRow () {
    
     if (checkInput(false)) {

        var courses = getCourses();
        
        var datePartsStart = document.getElementById("sdate").value.split("-");
        var datePartsEnd = document.getElementById("edate").value.split("-");

        courses.push({
            title: document.getElementById('title').value,
            stream: document.getElementById('stream').value,
            type: document.getElementById('type').value,
            startDate: datePartsStart[2] + "/" + datePartsStart[1] + "/" + datePartsStart[0],
            endDate: datePartsEnd[2] + "/" + datePartsEnd[1] + "/" + datePartsEnd[0]
        });

        setCourses(courses);

        updateTable();
    }
}

function selectedRowToInput() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            document.getElementById('title').value = this.cells[0].innerHTML;
            document.getElementById('stream').value = this.cells[1].innerHTML;
            document.getElementById('type').value = this.cells[2].innerHTML;
            
            var dateParts = this.cells[3].innerHTML.split("/");
            var d = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
            document.getElementById('sdate').value = d.toISODate();
            
            dateParts = this.cells[4].innerHTML.split("/");
            d = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
            document.getElementById('edate').value = d.toISODate();
        };
    }
}

selectedRowToInput();

function editHtmlTableSelectedRow() {
    var ctitle = document.getElementById("title").value,
    cstream = document.getElementById("stream").value,
    ctype = document.getElementById("type").value,
    csdate = document.getElementById("sdate").value,
    cedate = document.getElementById("edate").value;
    
    if (checkInput(true)) {

        var courses = getCourses();
        var c = courses[rIndex - 1];

        if (c === undefined)
            return; // If row not selected.

        c.title = ctitle;
        c.stream = cstream;
        c.type = ctype;
        var datePartsStart = csdate.split("-");
        c.startDate = datePartsStart[2] + "/" + datePartsStart[1] + "/" + datePartsStart[0];
        var datePartsEnd = cedate.split("-");
        c.endDate = datePartsEnd[2] + "/" + datePartsEnd[1] + "/" + datePartsEnd[0];

        setCourses(courses);

        updateTable();
    }
} 

function removeSelectedRow() {
    
    var courses = getCourses();

    courses.splice(rIndex - 1, 1);

//    console.log(assignments);

    setCourses(courses);

    updateTable();
    
    document.getElementById('title').value = "";
    document.getElementById('stream').value = "";
    document.getElementById('type').value = "";
    document.getElementById('sdate').value = "";
    document.getElementById('edate').value = "";
}

function updateTable() {

    clearTable();

    var courses = getCourses();

    var c;
    for (c of courses) {
        var newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2),
                cell4 = newRow.insertCell(3),
                cell5 = newRow.insertCell(4);
        cell1.innerHTML = c.title;
        cell2.innerHTML = c.stream;
        cell3.innerHTML = c.type;
        cell4.innerHTML = c.startDate;
        cell5.innerHTML = c.endDate;
    }
    selectedRowToInput();
}

function clearTable() {

    var rows = table.rows.length;

    for (var i = 1; i < rows; i++) {
        table.deleteRow(1); // 1 because 0 is head, and after 1 is deleted, 
        // second is also 1 until empty.
    }
}

// Retrieve from local storage.
function getCourses() {
    return JSON.parse(localStorage.getItem("courses"));
}

// Save to local storage.
function setCourses(courses) {
    localStorage.setItem("courses", JSON.stringify(courses));
}