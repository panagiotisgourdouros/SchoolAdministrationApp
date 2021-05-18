document.body.onload = function () {

    var courseAssignmentStudents = getCourseAssignmentStudents();
//    var courseAssignmentStudents = null; // Case to reset date to initial one.

    if (courseAssignmentStudents === null) {

        courseAssignmentStudents = [];

        setCourseAssignmentStudents(courseAssignmentStudents);
    }

    // Retrieve and set assignments from local storage.
    var assignments = JSON.parse(localStorage.getItem("assignments"));
    var a;
    for (a of assignments) {
        var option = document.createElement('option');
        option.value = option.text = a.description + " " + a.submissionDate;
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
    
     // Retrieve and set students from local storage.
    var students = JSON.parse(localStorage.getItem("students"));
    var s;
    for (s of students) {
        var option = document.createElement('option');
        option.value = option.text = s.fname + " " + s.lname;
        document.getElementById("student").add(option);
    }

    updateTable();
};

var rIndex,
        table = document.getElementById('table');

function checkInput() {
    var assignment = document.getElementById("assignment").value,
            course = document.getElementById("course").value,
            student = document.getElementById("student").value;

    if (assignment === "" || course === "" || student === "") {
        alert("select student, assignment and course");
        return false;
    }
    return true;
}

function AddHtmlTableRow() {
    
    if (checkInput()) {

        var courseAssignmentStudents = getCourseAssignmentStudents();

        courseAssignmentStudents.push({
            assignment: document.getElementById("assignment").value, 
            course: document.getElementById("course").value,
            student: document.getElementById("student").value
        });

        setCourseAssignmentStudents(courseAssignmentStudents);

        updateTable();
    }
}

function selectedRowToInput() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            document.getElementById('assignment').value = this.cells[0].innerHTML;
            document.getElementById('course').value = this.cells[1].innerHTML;
            document.getElementById('student').value = this.cells[2].innerHTML;
        };
    }
}
selectedRowToInput();

function editHtmlTableSelectedRow() {
    
    var assignment = document.getElementById("assignment").value,
            course = document.getElementById("course").value,
            student = document.getElementById("student").value;

    if (checkInput()) {

        var courseAssignmentStudents = getCourseAssignmentStudents();
        
        var cas = courseAssignmentStudents[rIndex - 1];

        if (cas === undefined)
            return; // If row not selected.

        cas.assignment = assignment;
        cas.course = course;
        cas.student = student;

        setCourseAssignmentStudents(courseAssignmentStudents);

        updateTable();
    }
}

function removeSelectedRow() {
    
    var courseAssignmentStudents = getCourseAssignmentStudents();

    courseAssignmentStudents.splice(rIndex - 1, 1);

//    console.log(assignments);

    setCourseAssignmentStudents(courseAssignmentStudents);

    updateTable();
    
    document.getElementById('assignment').value = courseAssignmentStudents[0].assignment;
    document.getElementById('course').value = courseAssignmentStudents[0].course;
    document.getElementById('student').value = courseAssignmentStudents[0].student;
    
}

function updateTable() {

    clearTable();

    var courseAssignmentStudents = getCourseAssignmentStudents();

    var cas;
    for (cas of courseAssignmentStudents) {
        var newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2);
        cell1.innerHTML = cas.assignment;
        cell2.innerHTML = cas.course;
        cell3.innerHTML = cas.student;
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
function getCourseAssignmentStudents() {
    return JSON.parse(localStorage.getItem("courseAssignmentStudents"));
}

// Save to local storage.
function setCourseAssignmentStudents(courseAssignmentStudents) {
    localStorage.setItem("courseAssignmentStudents", JSON.stringify(courseAssignmentStudents));
}
