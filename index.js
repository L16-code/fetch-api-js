async function fetchtodo() {
    try {
        const response = await fetch('https://jsonplaceholder.org/posts', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Network error: ' + response.statusText);
        }
        const data = await response.json();
        let innerHtml = '';
        let i = 1;
        data.forEach(items => {
            innerHtml += `
            <tr>
            <td>${i++}</td>
            <td>${items.category}</td>
            `;
            let content = items.content.substring(1, 50);
            innerHtml += `
            <td>${content}...</td>
            <td><img src="${items.image}" height=50px></td>
            <td> <span class="badge">${items.status}</span> </td>
            <td>
            <button onclick=" Edit_val(${items.id})">Edit</button>
            <button onclick=" delete_val(${items.id})">Delete</button>
            </td>
            </tr>
            `;
        });
        document.getElementById('data_table').innerHTML = innerHtml;
        // console.log(json);
    } catch (error) {
        console.error("Fetch error: please contact the admin", error);
    }
}
function ShowAddButton() {
    let  modal = document.getElementById("myModal");
    modal.style.display = "block";
}
function close_modal(check){
    // console.log("hjello")
    switch(check){
        case "add":
            let  modal = document.getElementById("myModal");
            modal.style.display = "none";
        break;
        case "edit":
            let  modal1 = document.getElementById("EditModal");
            modal1.style.display = "none";
            break;
        default: console.log("incorrect ")
    }
    
}
window.onclick = function (event) {
    let modal = document.getElementById("myModal");
    let modal1 = document.getElementById("EditModal");

    if (event.target == modal) {
        modal.style.display = "none";
        modal1.style.display = "none";
    }
}

async function delete_val(id){
    try {
        const response =await fetch(`https://jsonplaceholder.org/posts/${id}`,{
            method:'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network error: ' + response.statusText);
        }
        const data = await response.json();
        fetchtodo()
        console.log(data)
    } catch (error) {
        console.error("please check the code"+error)
    }
}
async function Edit_val(id){
    try {
        console.log(id)
        const response = await fetch(`https://jsonplaceholder.org/posts/${id}`,{
            method:'GET'
        });
        if (!response.ok) {
            throw new Error('Network error: ' + response.statusText);
        }
        const data = await response.json();
        
        document.getElementById('EditCategory').value=`${data.category}`;
        document.getElementById('Editstatus').value=`${data.status}`;
        document.getElementById('edit_id').value=`${id}`;
        document.getElementById('Editcontent').innerHTML=`${data.content}`;
        document.getElementById('show_edit_img').src=`${data.image}`;

        // show_edit_img
        
        document.getElementById("EditModal").style.display = "block";
        
    } catch (error) {
        console.error("please check the code" + error)
    }
}

async function update_val(){
    try {
        const dataBody=new FormData(document.getElementById('edit_form'))
        // console.log(dataBody)
        let id = dataBody.get('edit_id');
        let category = dataBody.get('Category');
        let content = dataBody.get('content');
        let image = dataBody.get('image'); 
        let status = dataBody.get('status');
        const bodyData = {
            category: category,
            content: content,
            image: image,
            status: status
        };
        console.log(`https://jsonplaceholder.org/posts/${id}`)
        const response= await fetch(`https://jsonplaceholder.org/posts/${id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
            
        });
        if (!response.ok) {
            throw new Error('Network error: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);
        let  modal1 = document.getElementById("EditModal");
        modal1.style.display = "none";
        fetchtodo();
    } catch (error) {
        console.error("please check th4e code" +  error);
    }
}