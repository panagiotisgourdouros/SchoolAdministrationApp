document.body.onload = function () {

    var trainers = getTrainers();
//    var trainers = null; // Case to reset date to initial one.

    if (trainers === null) {

        trainers = [];

        trainers.push({fname: "Andrew", lname: "Hendricks",
            subject: "Computer Science", email: "andrew_hendricks@gmail.com"});
        trainers.push({fname: "Alice", lname: "Cooper",
            subject: "Music", email: "alice_cooper@gmail.com"});
        trainers.push({fname: "Lisa", lname: "Nichols",
            subject: "Finance", email: "lisa_nichols@yahoo.com"});
        trainers.push({fname: "Mary", lname: "Poppins",
            subject: "English Literature", email: "mary_poppins@yahoo.com"});

        setTrainers(trainers);
    }

    // Retrieve and set subjects from courses.
    var courses = JSON.parse(localStorage.getItem("courses"));
    var c;
    for (c of courses) {
        var option = document.createElement('option');
        option.value = option.text = c.title;
        document.getElementById("subj").add(option);
    }

    updateTable();
};

var rIndex,
        table = document.getElementById('table');

function checkInput() {
    var cfname = document.getElementById("fname").value,
            clname = document.getElementById("lname").value,
            csubj = document.getElementById("subj").value,
            cmail = document.getElementById("mail").value;

    if (cfname === "" || !/^[a-zA-Z]+$/.test(cfname)) {
        alert("first name is not valid");
        return false;
    } else if (clname === "" || !/^[a-zA-Z]+$/.test(clname)) {
        alert("last name is not valid");
        return false;
    } else if (csubj === "") {
        alert("subject is not selected");
        return false;
    } else if (cmail === "") {
        alert("email cannot be empty");
        return false;
    } else if (!validateEmail(cmail)) {
        alert("email is not valid");
        return false;
    }
    return true;
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function AddHtmlTableRow() {
    if (checkInput()) {

        var trainers = getTrainers();

        trainers.push({
            fname: document.getElementById('fname').value,
            lname: document.getElementById('lname').value,
            subject: document.getElementById('subj').value,
            email: document.getElementById('mail').value
        });

        setTrainers(trainers);

        updateTable();
    }
}

function selectedRowToInput() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            document.getElementById('fname').value = this.cells[0].innerHTML;
            document.getElementById('lname').value = this.cells[1].innerHTML;
            document.getElementById('subj').value = this.cells[2].innerHTML;
            document.getElementById('mail').value = this.cells[3].innerHTML;
        };
    }
}
selectedRowToInput();

function editHtmlTableSelectedRow() {
    var cfname = document.getElementById("fname").value,
            clname = document.getElementById("lname").value,
            csubj = document.getElementById("subj").value,
            cmail = document.getElementById("mail").value;

    if (checkInput()) {

        var trainers = getTrainers();
        var t = trainers[rIndex - 1];

        if (t === undefined)
            return; // If row not selected.

        t.fname = cfname;
        t.lname = clname;
        t.subject = csubj;
        t.email = cmail;

        setTrainers(trainers);

        updateTable();
    }
}

function removeSelectedRow() {
    var trainers = getTrainers();

    trainers.splice(rIndex - 1, 1);

//    console.log(assignments);

    setTrainers(trainers);

    updateTable();
    
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('subj').value = "";
    document.getElementById('mail').value = "";
}

function updateTable() {

    clearTable();

    var trainers = getTrainers();

    var t;
    for (t of trainers) {
        var newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2),
                cell4 = newRow.insertCell(3);
        cell1.innerHTML = t.fname;
        cell2.innerHTML = t.lname;
        cell3.innerHTML = t.subject;
        cell4.innerHTML = t.email;
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
function getTrainers() {
    return JSON.parse(localStorage.getItem("trainers"));
}

// Save to local storage.
function setTrainers(trainers) {
    localStorage.setItem("trainers", JSON.stringify(trainers));
}