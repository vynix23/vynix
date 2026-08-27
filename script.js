/* =====================================
   DATA AKUN
===================================== */

let accounts = JSON.parse(
    localStorage.getItem("accounts")
) || [];


/* =====================================
   ADMIN UTAMA
===================================== */

let adminAccount = accounts.find(
    account =>
        account.username.toLowerCase() === "admin"
);


if (!adminAccount) {

    accounts.push({
        username: "admin",
        password: "12345",
        role: "admin"
    });

}

else {

    adminAccount.role = "admin";

}


localStorage.setItem(
    "accounts",
    JSON.stringify(accounts)
);


/* =====================================
   MOBILE SIDEBAR
===================================== */

function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    if (!sidebar) return;

    sidebar.classList.toggle("open");

    if (overlay) {

        overlay.classList.toggle(
            "show"
        );

    }

}


function closeSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    if (sidebar) {

        sidebar.classList.remove("open");

    }

    if (overlay) {

        overlay.classList.remove("show");

    }

}


/* =====================================
   LOGIN
===================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    const usernameInput =
        document.getElementById("username");

    const passwordInput =
        document.getElementById("password");

    const message =
        document.getElementById("message");

    const togglePassword =
        document.getElementById("togglePassword");


    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            function () {

                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";

                    togglePassword.textContent =
                        "🙈";

                }

                else {

                    passwordInput.type =
                        "password";

                    togglePassword.textContent =
                        "👁";

                }

            }
        );

    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                usernameInput.value.trim();

            const password =
                passwordInput.value;


            const account =
                accounts.find(
                    account =>
                        account.username.toLowerCase() ===
                        username.toLowerCase() &&
                        account.password === password
                );


            if (account) {

                message.textContent =
                    "✓ Login berhasil!";

                message.style.color =
                    "#4ade80";


                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(account)
                );


                setTimeout(
                    function () {

                        if (
                            account.role ===
                            "admin"
                        ) {

                            window.location.href =
                                "admin.html";

                        }

                        else {

                            window.location.href =
                                "home.html";

                        }

                    },
                    500
                );

            }

            else {

                message.textContent =
                    "✕ Username atau password salah!";

                message.style.color =
                    "#f87171";

                passwordInput.value = "";

            }

        }
    );

}


/* =====================================
   ADMIN PANEL
===================================== */

const accountTable =
    document.getElementById(
        "accountTable"
    );


if (accountTable) {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    if (
        !currentUser ||
        currentUser.role !== "admin"
    ) {

        window.location.href =
            "index.html";

    }

    else {

        displayAccounts();

    }

}


/* =====================================
   DISPLAY AKUN
===================================== */

function displayAccounts() {

    const table =
        document.getElementById(
            "accountTable"
        );

    const total =
        document.getElementById(
            "totalAccounts"
        );


    if (!table) return;


    table.innerHTML = "";


    accounts.forEach(
        function (account, index) {

            const row =
                document.createElement("tr");


            const roleName =
                account.role === "admin"
                    ? "👑 Admin"
                    : "👤 User";


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${account.username}
                </td>

                <td>
                    ${roleName}
                </td>

                <td>

                    <button
                        class="action-button edit-button"
                        onclick="editAccount(${index})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-button delete-button"
                        onclick="deleteAccount(${index})"
                    >
                        Hapus
                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );


    if (total) {

        total.textContent =
            accounts.length;

    }

}


/* =====================================
   MODAL
===================================== */

function openModal(index = null) {

    const modal =
        document.getElementById(
            "accountModal"
        );

    const title =
        document.getElementById(
            "modalTitle"
        );

    const username =
        document.getElementById(
            "newUsername"
        );

    const password =
        document.getElementById(
            "newPassword"
        );

    const role =
        document.getElementById(
            "newRole"
        );

    const editIndex =
        document.getElementById(
            "editIndex"
        );


    if (!modal) return;


    modal.classList.add("show");


    if (index !== null) {

        title.textContent =
            "Edit Akun";

        username.value =
            accounts[index].username;

        password.value =
            accounts[index].password;

        role.value =
            accounts[index].role;

        editIndex.value =
            index;

    }

    else {

        title.textContent =
            "Tambah Akun";

        username.value = "";

        password.value = "";

        role.value = "user";

        editIndex.value = "";

    }

}


function closeModal() {

    const modal =
        document.getElementById(
            "accountModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

}


/* =====================================
   FORM AKUN
===================================== */

const accountForm =
    document.getElementById(
        "accountForm"
    );


if (accountForm) {

    accountForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById(
                        "newUsername"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "newPassword"
                    )
                    .value;


            const role =
                document
                    .getElementById(
                        "newRole"
                    )
                    .value;


            const editIndex =
                document
                    .getElementById(
                        "editIndex"
                    )
                    .value;


            if (username === "") {

                alert(
                    "Username tidak boleh kosong."
                );

                return;

            }


            if (password.length < 4) {

                alert(
                    "Password minimal 4 karakter."
                );

                return;

            }


            const duplicate =
                accounts.some(
                    function (
                        account,
                        index
                    ) {

                        return (
                            account.username.toLowerCase() ===
                            username.toLowerCase() &&
                            index != editIndex
                        );

                    }
                );


            if (duplicate) {

                alert(
                    "Username sudah digunakan."
                );

                return;

            }


            if (editIndex !== "") {

                accounts[editIndex] = {

                    username:
                        username,

                    password:
                        password,

                    role:
                        role

                };

            }

            else {

                accounts.push({

                    username:
                        username,

                    password:
                        password,

                    role:
                        role

                });

            }


            localStorage.setItem(
                "accounts",
                JSON.stringify(accounts)
            );


            displayAccounts();

            closeModal();


            alert(
                "Akun berhasil disimpan!"
            );

        }
    );

}


/* =====================================
   EDIT
===================================== */

function editAccount(index) {

    openModal(index);

}


/* =====================================
   DELETE
===================================== */

function deleteAccount(index) {

    if (
        accounts[index].username.toLowerCase() ===
        "admin"
    ) {

        alert(
            "Admin utama tidak dapat dihapus."
        );

        return;

    }


    const yakin =
        confirm(
            "Yakin ingin menghapus akun " +
            accounts[index].username +
            "?"
        );


    if (yakin) {

        accounts.splice(index, 1);


        localStorage.setItem(
            "accounts",
            JSON.stringify(accounts)
        );


        displayAccounts();

    }

}


/* =====================================
   LOGOUT
===================================== */

function logoutAdmin() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "index.html";

}


/* =====================================
   TUTUP SIDEBAR SAAT TEKAN ESC
===================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeSidebar();

            closeModal();

        }

    }
);


/* =====================================
   KLIK DI LUAR MODAL
===================================== */

const modal =
    document.getElementById(
        "accountModal"
    );


if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );

}