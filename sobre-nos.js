var pessoasGrupo = [
    {
        id: 1,
        name: 'Adriana Neves',
        GitHub: 'https://github.com/DriRSantos',
        pictureURL: 'https://avatars.githubusercontent.com/u/105232781?v=4'
    },
    {
        id: 2,
        name: 'Caio Oliveira',
        GitHub: 'https://github.com/caioOliveiraF',
        pictureURL: 'https://avatars.githubusercontent.com/u/127253982?v=4'
    },
    {
        id: 3,
        name: 'Caio Botelho',
        pictureURL: ''
    },
    {
        id: 4,
        name: 'Fernanda Meirelles',
        pictureURL: 'https://avatars.githubusercontent.com/u/99287995?v=4'
    },
    {
        id: 5,
        name: 'Rodrigo Bastos',
        GitHub: 'https://github.com/bastosrodrigo',
        pictureURL: 'https://avatars.githubusercontent.com/u/106568230?v=4'
    },
    {
        id: 6,
        name: 'William Tinoco',
        GitHub: 'https://github.com/willtinoco97',
        pictureURL: 'https://avatars.githubusercontent.com/u/127336854?v=4'
    }   
]

window.onload = () => {
    var htmlString = "";

    pessoasGrupo.forEach(pessoaG => {
        htmlString += `<div class="grupo6">
            <img src="${pessoasGrupo.pictureURL}" alt="${pessoasGrupo.name}">
            <div class="contentContainer">
                <span class="title">${pessoasGrupo.name}</span>
                <span class="jobTitle">${cpessoasGrupo.GitHub}</span>
            </div>
        </div>`
    })

    document.getElementById("grupo6").innerHTML = htmlString
}