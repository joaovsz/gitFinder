let form = document.getElementById('myForm')

let validation = form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let search = document.getElementById('search').value.split(' ').join('');// Retira os espaços do valor digitado
        if (search.length < 3) {
            alert('Digite um nome de usuário válido')
            } else {
            getContent(search)
            }
        })



 async function getContent(search){
        let response = await fetch(`https://api.github.com/users/${search}`)
        let data = await response.json(); // Guarda os dados em um objeto
        let joined= data.created_at
        let copy = {...joined} 
        let formatedData = `
        Ingressou em: 
        ${copy[8]}${copy[9]}/${copy[5]}${copy[6]}/${copy[0]}${copy[1]}${copy[2]}${copy[3]}` // Literals usado para formatação da data a partir da posição de cada elemento do array.
        let informativo = 'Indisponível'
        let location = data.location == null || String.length==0 ? informativo : data.location
        let twitter = data.twitter_username == null || String.length==0 ? informativo : data.twitter
        let blog = data.blog == "" ? informativo : data.blog
        let bio = data.bio == null|| String.length==0 ? informativo : data.bio
        let company = data.company == null|| String.length==0 ? informativo : data.company
        let userInfo = document.getElementById('main')
        userInfo.innerHTML = `
            <div class="user-info">
            <div id="user-photo">
            <img src='${data.avatar_url}' id="profile-photo">
            </div>
            <div class="data">
              <div id="username">
                <h3>${data.name}</h3>
                <p>${formatedData}</p>
              
              </div>
              <div class="bio"><p>${bio}</p></div>
              <div class="followers-info">
                <div class="repos">
                  <p class="label-flwrs">
                  Repos
                  </p>
                  <p>${data.public_repos}</p>
                </div>
                <div class="followers">
                  <p class="label-flwrs">Followers</p>
                  <p>${data.followers}</p>
                </div>
                <div class="following">
                  <p class="label-flwrs">Following</p>
                  <p>${data.following}</p>
                </div>
              </div>
              <div class="contact-info">
                <div class="city">
                  <img src="images/pin.png" />
                  <p>${location}</p>
                </div>
                <div class="twitter">
                  <img src="images/twitter.png" />
                  <p>${twitter}</p>
                </div>
                <div class="site">
                  <img src="images/link.png" />
                  <p>${blog}</p>
                </div>
                <div class="company">
                  <img src="images/business-and-trade.png" alt="" />
                  <p>${company}</p>
                </div>
              </div>
            </div>
          </div>
            `

        }
        
        



