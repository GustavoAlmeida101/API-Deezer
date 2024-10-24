let bnt = document.getElementById("bnt");

bnt.addEventListener("click", function () {

    //https://cors-anywhere.herokuapp.com/corsdemo - para abilitar o cors temporario para fazer a requisição 

    const nome_do_artista = document.getElementById("search").value; // Nome do artista
    const apiUrl = `https://api.deezer.com/search/artist?q=${encodeURIComponent(nome_do_artista)}`;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const div = document.querySelector("#artist");

    // Função para consumir a API
    async function getArtistData() {
        try {
            const response = await fetch(proxyUrl + apiUrl);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = await response.json();
            console.log(data); // Exibe os resultados da busca

            const exactArtist = data.data.filter(artist => artist.name.toLowerCase() === nome_do_artista.toLowerCase());

            if (exactArtist.length > 0) {
                console.log('Artista encontrado:', exactArtist[0]); // Pega o primeiro resultado exato
                div.innerHTML = `
                <div>
                        
                        <img src="${exactArtist[0].picture_medium}" alt="${exactArtist[0].name}">
                        </div>
                        <div>
                        <p> Nome : ${exactArtist[0].name}<p>
                        <p>ID: ${exactArtist[0].id}</p>
                        <p>Fans: ${exactArtist[0].nb_fan}</p>
                        
                        <p>Type: ${exactArtist[0].type
                    }</p>  
                    </div>`;// Exibe informações do artista

            } else {
                div.innerHTML = '<p>Nenhum artista com esse nome exato foi encontrado.</p>';
                console.log('Nenhum artista com esse nome exato foi encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar o artista:', error);
            div.innerHTML = '<p>Erro ao buscar o artista. Tente novamente.</p>'; // Mensagem de erro para o usuário
        }
    }



    // Chamar a função
    getArtistData();

});


window.addEventListener('load', () => {

    const list = document.querySelector("#playlist")


    async function searchPlaylist() {



        fetch('https://cors-anywhere.herokuapp.com/' + `https://api.deezer.com/chart/0/tracks`)

            .then(playList => playList.json())
            .then(data => {
                console.log(data.data[0])

                const album = data.data[0]
                list.innerHTML = `
                <div>
                  <img src="${album.album.cover_medium}"  alt="${album.album.title}">
                  </div>
                  <div>
                  <h3>Playlist mais tocada</h3>
                  <h5>Album: ${album.id}</h5>
                  <p>Title Album: ${album.album.title}</p>
                  <p>Type: ${album.album.type}</p>
                  <p>Posicion: ${album.position}</p>
                  <p>Name of Artist: ${album.artist.name}</p>
                  </div>
                </div>
                
                `
            })
            .catch(
                error => {
                    console.error('Erro:', error);
                });


    }

    searchPlaylist();
})