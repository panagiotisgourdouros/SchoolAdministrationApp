document.body.onload = function () {

    var courseAssignments = getCourseAssignments();
//    var courseAssignments = null; // Case to reset date to initial one.

    if (courseAssignments === null) {

        courseAssignments = [];

        setCourseAssignments(courseAssignments);
    }

    // Retrieve and set assignments from local storage.
    var assignments = JSON.parse(localStorage.getItem("assignments"));
    var a;
    for (a of assignments) {
        var option = document.createElement('option');
        option.value = option.text = a.description;
        document.getElementById("assignment").add(option);
    }
    
    // Retrieve and set courses from local storage.
    var courses = JSON.parse(localStorage.getItem("courses"));
    var c;
    for (c of courses) {
        var option = document.createElement('option');
        option.value = option.text = c.title + " " + c.stream + " " + c.type;
        document.getElementById("course").add(option);
    }

    updateTable();
};

var rIndex,
        table = document.getElementById('table');

function checkInput() {
    var assignment = document.getElementById("assignment").value,
            course = document.getElementById("course").value;

    if (assignment === "" || course === "") {
        alert("select assignment and course");
        return false;
    }
    return true;
}

function AddHtmlTableRow() {
    
    if (checkInput()) {

        var courseAssignments = getCourseAssignments();

        courseAssignments.push({
            assignment: document.getElementById("assignment").value, 
            course: document.getElementById("course").value
        });

        setCourseAssignments(courseAssignments);

        updateTable();
    }
}

function selectedRowToInput() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            document.getElementById('assignment').value = this.cells[0].innerHTML;
            document.getElementById('course').value = this.cells[1].innerHTML;
        };
    }
}
selectedRowToInput();

function editHtmlTableSelectedRow() {
    
    var assignment = document.getElementById("assignment").value,
            course = document.getElementById("course").value;

    if (checkInput()) {

        var courseAssignments = getCourseAssignments();
        
        var ca = courseAssignments[rIndex - 1];

        if (ca === undefined)
            return; // If row not selected.

        ca.assignment = assignment;
        ca.course = course;

        setCourseAssignments(courseAssignments);

        updateTable();
    }
}

function removeSelectedRow() {
    
    var courseAssignments = getCourseAssignments();

    courseAssignments.splice(rIndex - 1, 1);

//    console.log(assignments);

    setCourseAssignments(courseAssignments);

    updateTable();
    
    document.getElementById('assignment').value = courseAssignments[0].assignment;
    document.getElementById('course').value = courseAssignments[0].course;
    
}

function updateTable() {

    clearTable();

    var courseAssignments = getCourseAssignments();

    var ca;
    for (ca of courseAssignments) {
        var newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1);
        cell1.innerHTML = ca.assignment;
        cell2.innerHTML = ca.course;
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
function getCourseAssignments() {
    return JSON.parse(localStorage.getItem("courseAssignments"));
}

// Save to local storage.
function setCourseAssignments(courseAssignments) {
    localStorage.setItem("courseAssignments", JSON.stringify(courseAssignments));
}
