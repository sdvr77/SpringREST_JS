//Получение всех пользователей ===========================================================================
async function getUsers() {
    const response = await fetch("/api/admin/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const users = await response.json();
        console.log(users)
        let temp = '';
        users.forEach(user => {
            temp += row(user);
        });
        document.getElementById('userTable').innerHTML = temp;
    }
}
//Получение одного пользователя ===========================================================================
async function getUser(id) {
    const response = await fetch("/api/admin/users/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    //Заполнение форм
    if (response.ok === true) {
        const user = await response.json();
        document.getElementById('editId').value = user.id;
        document.getElementById('deleteId').value = user.id;

        document.getElementById('editName').value = user.name;
        document.getElementById('deleteName').value = user.name;

        document.getElementById('editSurname').value = user.surName;
        document.getElementById('deleteSurname').value = user.surName;

        document.getElementById('editLogin').value = user.username;
        document.getElementById('deleteLogin').value = user.username;

        document.getElementById('editAge').value = user.age;
        document.getElementById('deleteAge').value = user.age;

        document.getElementById('editPassword').value = null;
        document.getElementById('deletePassword').value = null;
    }
}

//Добавление нового пользователя ================================================================
async function createUser() {
    const userRole = {
        id: 2,
        name: 'ROLE_USER'
    }
    const adminRole = {
        id: 1,
        name: 'ROLE_ADMIN'
    }

    let newRoles = []

    if ($("#newRole").val().length === 2) {
        newRoles.push(adminRole)
        newRoles.push(userRole)
    } else if ($("#newRole").val()[0] === 'ROLE_ADMIN') {
        newRoles.push(adminRole)
    } else newRoles.push(userRole);

    let modelUser = {
        name:$("#newName").val(),
        surName:$("#newSurname").val(),
        age:$("#newAge").val(),
        username:$("#newLogin").val(),
        password:$("#newPassword").val(),
        roles: newRoles
    };
    const response = await fetch("http://localhost:8080/api/admin/users", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(modelUser)
    });
    await getUsers();
    document.getElementById('nav-table-tab').click();
}
// Изменение пользователя ========================================================================
async function editUser() {
    const userRole = {
        id: 2,
        name: 'ROLE_USER'
    }
    const adminRole = {
        id: 1,
        name: 'ROLE_ADMIN'
    }

    let newRoles = []

    if ($("#editRole").val().length === 2) {
        newRoles.push(adminRole)
        newRoles.push(userRole)
    } else if ($("#editRole").val()[0] === 'ROLE_ADMIN') {
        newRoles.push(adminRole)
    } else newRoles.push(userRole);

    let modelUser = {
        id:$("#editId").val(),
        name:$("#editName").val(),
        surName:$("#editSurname").val(),
        age:$("#editAge").val(),
        username:$("#editLogin").val(),
        password:$("#editPassword").val(),
        roles: newRoles
    };
    console.log(modelUser)
    const response = await fetch("http://localhost:8080/api/admin/users", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(modelUser)
    });
    await getUsers();
}

// Удаление пользователя =======================================================================
async function deleteUser() {
    const response = await fetch("http://localhost:8080/api/admin/users/" + $("#deleteId").val(), {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    await getUsers();
}

//Заполнение таблицы пользователей ===========================================================================
function row(user) {
    let userRole = '';
    user.roles.forEach(role => {
        userRole += role.name.substring(5) + ' ';
    })
    let temp = '';
    temp += '<tr id="' + user.id + '">';
    temp += '<td>' + user.id + '</td>';
    temp += '<td>' + user.name + '</td>';
    temp += '<td>' + user.surName + '</td>';
    temp += '<td>' + user.username + '</td>';
    temp += '<td>' + user.age + '</td>';
    temp += '<td>' + userRole + '</td>';
    temp += '<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#editUserForm" onclick="getUser(' + user.id + ')">Edit</button></td>';
    temp += '<td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteUserForm" onclick="getUser(' + user.id + ')">Delete</button></td></tr>';
    return temp;
}

getUsers();

