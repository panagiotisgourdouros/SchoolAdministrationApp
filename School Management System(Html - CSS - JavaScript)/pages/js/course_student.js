document.body.onload = function () {

    var courseStudents = getCourseStudents();
//    var courseStudents = null; // Case to reset date to initial one.

    if (courseStudents === null) {

        courseStudents = [];

        setCourseStudents(courseStudents);
    }

    // Retrieve and set students from local storage.
    var students = JSON.parse(localStorage.getItem("students"));
    var s;
    for (s of students) {
        var option = document.createElement('option');
        option.value = option.text = s.fname + " " + s.lname;
        document.getElementById("student").add(option);
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
    var student = document.getElementById("student").value,
            course = document.getElementById("course").value;

    if (student === "" || course === "") {
        alert("select student and course");
        return false;
    }
    return true;
}

function AddHtmlTableRow() {
    
    if (checkInput()) {

        var courseStudents = getCourseStudents();

        courseStudents.push({
            student: document.getElementById("student").value, 
            course: document.getElementById("course").value
        });

        setCourseStudents(courseStudents);

        updateTable();
    }
}

function selectedRowToInput() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            document.getElementById('student').value = this.cells[0].innerHTML;
            document.getElementById('course').value = this.cells[1].innerHTML;
        };
    }
}
selectedRowToInput();

function editHtmlTableSelectedRow() {
    
    var student = document.getElementById("student").value,
            course = document.getElementById("course").value;

    if (checkInput()) {

        var courseStudents = getCourseStudents();
        
        var cs = courseStudents[rIndex - 1];

        if (cs === undefined)
            return; // If row not selected.

        cs.student = student;
        cs.course = course;

        setCourseStudents(courseStudents);

        updateTable();
    }
}

function removeSelectedRow() {
    
    var courseStudents = getCourseStudents();

    courseStudents.splice(rIndex - 1, 1);

//    console.log(assignments);

    setCourseStudents(courseStudents);

    updateTable();
    
    document.getElementById('student').value = courseStudents[0].student;
    document.getElementById('course').value = courseStudents[0].course;
    
}

function updateTable() {

    clearTable();

    var courseStudents = getCourseStudents();

    var cs;
    for (cs of courseStudents) {
        var newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1);
        cell1.innerHTML = cs.student;
        cell2.innerHTML = cs.course;
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
function getCourseStudents() {
    return JSON.parse(localStorage.getItem("courseStudents"));
}

// Save to local storage.
function setCourseStudents(courseStudents) {
    localStorage.setItem("courseStudents", JSON.stringify(courseStudents));
}
