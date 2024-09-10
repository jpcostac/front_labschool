const url = "http://localhost:3000/api"

function getTurma() {
    axios.get(`${url}/curso`).then(
        (response) => {
            const data = response.data.result

            let html = "<option disabled selected> Selecione uma opção</opcao>"

            for(let curso of data){
                html += `<option value="${curso.id}">${curso.nome}</option>`
            }
            document.getElementById('select-course').innerHTML = html
        }
    ).catch(err => console.error(err))
}

function getAlunos(){
    axios.get(`${url}/aluno`).then(
        (response) => {
            const data= response.data.result
            
            let html = ""

            for(let aluno of data){
                html += `<tr>
                <th scope= "row">${aluno.id}</th>
                <td>${aluno.nome}</td>
                <td>${aluno.telefone}</td>
                <td>${aluno.email}</td>
                <td><button class="btn btn-sucess" onclick="redirect(${aluno.id})">Editar</button></td>
                <td><button class="btn btn-danger" onclick="deleteAluno(${aluno.id})">Excluir</button></td>
                </tr>`
            }

            document.getElementById('table-body').innerHTML = html
        }
    ).catch(err => console.error(err))
}

function deleteAluno(codigo){
    axios.delete(`${url}/aluno/${codigo}`).then(
        (response) => {
            alert(response.data.result)
            getAlunos()
        }
    ).catch(err => console.error(err))
}

function saveAluno(){
    let image = document.getElementById('uploadImage').files[0]
    let nome = document.getElementById('inputName').value
    let email = document.getElementById('inputEmail').value
    let telefone = document.getElementById('inputPhone').value
    let data_nascimento = document.getElementById('inputDate').value

    let select = document.getElementById('select-course')
    let option = select.options[select.selectedIndex].value

    const data = {
        image: image,
        nome: nome,
        email: email,
        telefone: telefone,
        data_nascimento: data_nascimento,
        fk_curso: option
    }

    axios.post(`${url}/aluno`,data).then((response) => {
        alert(`Aluno ${$response.data.result.nome} cadastrado com sucessso`)
        window.location.href = "http://localhost/Front-labschool/matricula-alunos.html"
    }

    ).catch(err => console.error(err))
}

function redirect(id){
    window.location.href = `http://localhost/Front-labschool/atualizar-alunos.html?id=${id}`
}

function loadFields(id){
    let id = URLSearchParams(window.location)

    console.log
}