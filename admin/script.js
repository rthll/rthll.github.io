document.addEventListener("DOMContentLoaded", function() {
    displayAdminData();
});

function saveAdminData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = new Date().toLocaleString();

    if (name && email) {
        const formData = {
            id: Date.now(),
            date: date,
            name: name,
            email: email
        };

        let dataList = JSON.parse(localStorage.getItem('adminData')) || [];
        dataList.push(formData);
        localStorage.setItem('adminData', JSON.stringify(dataList));

        displayAdminData();
        clearForm();  
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function displayAdminData(filteredData = null) {
    const dataList = filteredData || JSON.parse(localStorage.getItem('adminData')) || [];
    const ul = document.getElementById('adminDataList');
    ul.innerHTML = '';

    dataList.forEach((data, index) => {
        const li = document.createElement('li');
        li.textContent = `Data: ${data.date}, Nome: ${data.name}, Email: ${data.email}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluior';
        deleteButton.onclick = function() {
            deleteAdminItem(index);
        };
        
        li.appendChild(deleteButton);
        ul.appendChild(li);
    });
}

function deleteAdminItem(index) {
    let dataList = JSON.parse(localStorage.getItem('adminData')) || [];
    dataList.splice(index, 1);
    localStorage.setItem('adminData', JSON.stringify(dataList));
    displayAdminData();
}

function deleteAllAdmin() {
    localStorage.removeItem('adminData');
    displayAdminData();
}

function clearForm() {
    document.querySelector('form').reset();
}

function searchAdminData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    let dataList = JSON.parse(localStorage.getItem('adminData')) || [];
    
    const filteredData = dataList.filter(data => 
        data.name.toLowerCase().includes(searchInput) || 
        data.email.toLowerCase().includes(searchInput)
    );

    displayAdminData(filteredData);
}
