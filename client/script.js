// 🔄 LOAD EDITORS
async function loadEditors() {
    const res = await fetch("http://localhost:5000/editors");
    const data = await res.json();

    let html = "";

    data.forEach(e => {
        html += `
        <div class="card">
            <h3>${e.name}</h3>
            <p>${e.skill}</p>
        </div>
        `;
    });

    document.getElementById("editors").innerHTML = html;
}


// ➕ ADD EDITOR
async function addEditor() {
    const name = document.getElementById("name").value;
    const skill = document.getElementById("skill").value;

    if (!name || !skill) {
        alert("Please fill all fields");
        return;
    }

    const res = await fetch("http://localhost:5000/add-editor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, skill })
    });

    const msg = await res.text();
    alert(msg);

    loadEditors();
}