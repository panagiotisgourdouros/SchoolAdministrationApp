document.body.onload = function () {

    var courseTrainers = getCourseTrainers();
//    var courseTrainers = null; // Case to reset date to initial one.

    if (courseTrainers === null) {

        courseTrainers = [];

        setCourseTrainers(courseTrainers);
    }

    // Retrieve and set trainers from local storage.
    var trainers = JSON.parse(localStorage.getItem("trainers"));
    var t;
    for (t of trainers) {
        var option = document.createElement('option');
        option.value = option.text = t.fname + " " + t.lname;
        document.getElementById("trainer").add(option);
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
    var trainer = document.getElementById("trainer").value,
            course = document.getElementById("course").value;

    if (trainer === "" || course === "") {
        alert("select trainer and course");
        return false;
    }
    return true;
}

function AddHtmlTableRow() {
    
    if (checkInput()) {

        var courseTrainers = getCourseTrainers();

        courseTrainers.push({
            trainer: document.getElementById("trainer").value, 
            course: document.getElementById("course").value
        });

        setCourseTrainers(courseTrainers);

        updateTable();
    }
}

function selectedRowToInput() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            document.getElementById('trainer').value = this.cells[0].innerHTML;
            document.getElementById('course').value = this.cells[1].innerHTML;
        };
    }
}
selectedRowToInput();

function editHtmlTableSelectedRow() {
    
    var trainer = document.getElementById("trainer").value,
            course = document.getElementById("course").value;

    if (checkInput()) {

        var courseTrainers = getCourseTrainers();
        
        var ct = courseTrainers[rIndex - 1];

        if (ct === undefined)
            return; // If row not selected.

        ct.trainer = trainer;
        ct.course = course;

        setCourseTrainers(courseTrainers);

        updateTable();
    }
}

function removeSelectedRow() {
    
    var courseTrainers = getCourseTrainers();

    courseTrainers.splice(rIndex - 1, 1);

//    console.log(assignments);

    setCourseTrainers(courseTrainers);

    updateTable();
    
    document.getElementById('trainer').value = courseTrainers[0].trainer;
    document.getElementById('course').value = courseTrainers[0].course;
    
}

function updateTable() {

    clearTable();

    var courseTrainers = getCourseTrainers();

    var ct;
    for (ct of courseTrainers) {
        var newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1);
        cell1.innerHTML = ct.trainer;
        cell2.innerHTML = ct.course;
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
function getCourseTrainers() {
    return JSON.parse(localStorage.getItem("courseTrainers"));
}

// Save to local storage.
function setCourseTrainers(courseTrainers) {
    localStorage.setItem("courseTrainers", JSON.stringify(courseTrainers));
}
