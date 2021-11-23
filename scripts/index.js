const API_BASE_URL = 'https://rickandmortyapi.com/api/'

window.onload = () => {
    /* OBTENCIÓN DE LOS BOTONES */
    const characters_btn = document.getElementById('characters-btn');
    const locations_btn = document.getElementById('locations-btn');
    const episodes_btn = document.getElementById('episodes-btn');
    const display_data = document.getElementById('display-data');
    
    /* EJECUCIÓN DE SOLICITUDES */
    const getView = async view_name => {
        const view = await fetch(`views/${view_name}.html`)
        return view.text()
    }

    const get_charapters = async () => {
        const chapters = await fetch(`${API_BASE_URL}/character`);
        return chapters.json();
    }

    const get_locations = async () => {
        const chapters = await fetch(`${API_BASE_URL}/location`);
        return chapters.json();
    }

    const get_episodes = async () => {
        const chapters = await fetch(`${API_BASE_URL}/episode`);
        return chapters.json();
    }


    /* Mostrando Vistas */
    function get_view_chapters() {
        getView('characters')
            .then(response => {
                display_data.innerHTML = response;
                get_charapters()
                    .then(data => {
                        localStorage.clear();
                        data.results.map(({ id, name, status, image, species, gender, type }) => {
                            const status_parse = status == 'Alive' ? 'alive' : status == 'Dead' ? 'dead' : 'default';
                            const type_parse = type == '' ? 'Oops, there`s no info' : type;

                            const div = document.createElement('div');
                            div.classList.add('card-complete');
                            div.setAttribute('id', 'card-complete');

                            const img = document.createElement('img');
                            img.src = image;
                            img.alt = name;
                            div.appendChild(img);

                            const div_info = document.createElement('div');
                            div_info.classList.add('card-info');

                            const span_name = document.createElement('span');
                            span_name.classList.add('name-card');
                            span_name.innerHTML = `${name}`;

                            div_info.appendChild(span_name);
                            const br = document.createElement('br');
                            div_info.appendChild(br);

                            const btn_more = document.createElement('button');
                            btn_more.classList.add('btn');
                            btn_more.setAttribute('id', `more-${id}`);
                            btn_more.setAttribute('data-bs-toggle', 'modal');
                            btn_more.setAttribute('data-bs-target', `#chapter_id${id}`);
                            div_info.appendChild(btn_more);

                            const modal_main = document.createElement('div');
                            modal_main.classList.add('modal', 'fade');
                            modal_main.setAttribute('id', `chapter_id${id}`);
                            modal_main.setAttribute('tabindex', '-1');
                            modal_main.setAttribute('labelledby', 'exampleModalLabel');
                            modal_main.setAttribute('aria-hidden', 'true');

                            const modal = `<!-- Modal -->
                    <div class="modal-dialog modal-main">
                        <div class="modal-content">
                            <div class="modal-header d-flex align-items-center justify-content-center heder-card">
                                <h5 class="modal-title" id="exampleModalLabel">${name} - ${status}</h5>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-7">
                                        <img src="${image}" alt="${name}">
                                    </div>
                                    <div class="col-5">
                                        <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
                                            <div class="card-header">Type</div>
                                            <div class="card-body">
                                                <p class="card-text">${type_parse}</p>
                                            </div>
                                        </div>
                                        <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
                                            <div class="card-header">Gender</div>
                                            <div class="card-body">
                                                <p class="card-text">${gender}</p>
                                            </div>
                                        </div>
                                        <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
                                            <div class="card-header">Specie</div>
                                            <div class="card-body">
                                                <p class="card-text">${species}</p>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer d-flex align-items-center justify-content-center">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                    `;
                            modal_main.innerHTML = modal;
                            div_info.appendChild(modal_main);

                            const img_icon = document.createElement('img');
                            img_icon.src = './assets/icons/more.svg';
                            img_icon.alt = 'more';
                            img_icon.classList.add('icon_');
                            btn_more.appendChild(img_icon);

                            div.appendChild(div_info);

                            const container = document.getElementById('container');
                            container.appendChild(div);
                        });
                    })
                    .catch((error) => {
                        alert(error);
                        alert('Existen problemas para consultar la RICK AND MORTY API');
                    });

                if (!document.getElementById('btn_alive')) {
                    const btn_alive = document.createElement('button');
                    btn_alive.classList.add('btn', 'btn-outline-secondary');
                    btn_alive.setAttribute('type', 'button');
                    btn_alive.setAttribute('id', 'btn_alive');
                    btn_alive.innerText = 'Alive';

                    const btn_dead = document.createElement('button');
                    btn_dead.classList.add('btn', 'btn-outline-secondary');
                    btn_dead.setAttribute('type', 'button');
                    btn_dead.setAttribute('id', 'btn_dead');
                    btn_dead.innerText = 'Dead';

                    const btn_unknown = document.createElement('button');
                    btn_unknown.classList.add('btn', 'btn-outline-secondary');
                    btn_unknown.setAttribute('type', 'button');
                    btn_unknown.setAttribute('id', 'btn_unknown');
                    btn_unknown.innerText = 'Unknown';

                    document.getElementById('btns').appendChild(btn_alive);
                    document.getElementById('btns').appendChild(btn_dead);
                    document.getElementById('btns').appendChild(btn_unknown);

                }

            }).catch(() => {
                alert('No existe el documento solicitado');
            });
    }

    get_view_chapters();

    characters_btn.addEventListener('click', () => {
        display_data.innerHTML = '';
        get_view_chapters();
    });

    locations_btn.addEventListener('click', () => {
        if(document.getElementById('btn_alive')){
            const btn_alive = document.getElementById('btn_alive');
            const btn_dead = document.getElementById('btn_dead');
            const btn_unknown = document.getElementById('btn_unknown');
            btn_alive.remove();
            btn_dead.remove();
            btn_unknown.remove();
        }
        display_data.innerHTML = '';
        getView('locations')
        .then(response => {
            display_data.innerHTML = response;
            get_locations()
                .then(data => {
                    localStorage.clear();

                    data.results.map(({id, dimension, name, type}) =>{
                        const div = document.createElement('div');
                        div.classList.add('card-complete');

                        const div_header = document.createElement('div');
                        div_header.classList.add('my-card-header', 'card-header');
                        div_header.innerHTML = `<h5 class="card-title">${name}</h5>`;
                        div.appendChild(div_header);

                        const div_info = document.createElement('div');

                        // const span_info = document.createElement('span');
                        // span_info.innerHTML = `${type}`;

                        // const br = document.createElement('br');

                        const span_info1 = document.createElement('span');
                        span_info1.innerHTML = `${dimension}`;

                        // div_info.appendChild(span_info);
                        // div_info.appendChild(br);
                        div_info.appendChild(span_info1);

                        div_info.classList.add('card-info');

                        const btn_more = document.createElement('button');
                        btn_more.classList.add('btn');
                        btn_more.setAttribute('id', `more-${id}`)

                        const br1 = document.createElement('br');
                        div_info.appendChild(br1);
                        div_info.appendChild(btn_more);
        
                        const img_icon = document.createElement('img');
                        img_icon.src = './assets/icons/more.svg';
                        img_icon.alt = 'more';
                        img_icon.classList.add('icon_');
                        btn_more.appendChild(img_icon);
                        
                        div.appendChild(div_info);
                        const container = document.getElementById('container');
                        container.appendChild(div);
                    })
                })
                .catch((error) => {
                    alert('Existen problemas para consultar la RICK AND MORTY API');
                });
        }).catch(() => {
            alert('No existe el documento solicitado');
        });
    });

    episodes_btn.addEventListener('click', () => {
        if(document.getElementById('btn_alive')){
            const btn_alive = document.getElementById('btn_alive');
            const btn_dead = document.getElementById('btn_dead');
            const btn_unknown = document.getElementById('btn_unknown');
            btn_alive.remove();
            btn_dead.remove();
            btn_unknown.remove();
        }
        display_data.innerHTML = '';
        getView('episodes')
        .then(response => {
            display_data.innerHTML = response;
            get_episodes()
                .then(data => {
                    localStorage.clear();
                    data.results.map(({id, air_date, created, episode,name}) =>{
                        const div = document.createElement('div');
                        div.classList.add('card-complete');

                        const div_header = document.createElement('div');
                        div_header.classList.add('my-card-header', 'card-header');
                        div_header.innerHTML = `<h5 class="card-title">${name}</h5>`;
                        div.appendChild(div_header);

                        const div_info = document.createElement('div');

                        const span_info = document.createElement('span');
                        span_info.innerHTML = `${episode}`;

                        // const br = document.createElement('br');

                        // const span_info1 = document.createElement('span');
                        // span_info1.innerHTML = `${air_date}`;

                        div_info.appendChild(span_info);
                        // div_info.appendChild(br);
                        // div_info.appendChild(span_info1);

                        div_info.classList.add('card-info');

                        const btn_more = document.createElement('button');
                        btn_more.classList.add('btn');
                        btn_more.setAttribute('id', `more-${id}`)

                        const br1 = document.createElement('br');
                        div_info.appendChild(br1);
                        div_info.appendChild(btn_more);
        
                        const img_icon = document.createElement('img');
                        img_icon.src = './assets/icons/more.svg';
                        img_icon.alt = 'more';
                        img_icon.classList.add('icon_');
                        btn_more.appendChild(img_icon);
                        
                        div.appendChild(div_info);
                        const container = document.getElementById('container');
                        container.appendChild(div);
                    })
                })
                .catch((error) => {
                    console.error(error);
                    alert('Existen problemas para consultar la RICK AND MORTY API');
                })
        }).catch(() => {
            alert('No existe el documento solicitado');
        });
    });

    /* Animacion boton Search*/
    const icon = document.querySelector('.icon');
    const search = document.querySelector('.search');
    icon.onclick = () => {
        search.classList.toggle('active');
    }
    
    function fn_filter (value){
        value = value.toUpperCase();
        /*Función para filtrar */
        const listCards = document.getElementById('container');
        const card_complete = listCards.querySelectorAll('.card-complete');
        for (const element of card_complete){
            const card_info = element.innerText.toUpperCase();
            localStorage.setItem(`${card_info}`,element.innerHTML);
            element.remove();
            // console.log(`${typeof(card_info)} -> ${card_info} -> ${value} -> ${card_info.includes(value)}`);
        }
        //console.log(localStorage)
        for( const element in localStorage){
            if(element.includes(value)){
                //console.log(`${typeof(element)} -> ${element}`);
                const item = localStorage.getItem(element);
                const el = document.createElement('div');
                el.setAttribute('id', 'card-complete');
                el.classList.add('card-complete');
                el.innerHTML = item
                listCards.appendChild(el);
                localStorage.removeItem(element);
            }
        }
    }

    // Obtenemos lo ingresado por teclado
    const searchInput = document.getElementById('mySearch');

    searchInput.addEventListener('input', (e) =>{
        const value =  e.target.value;
        fn_filter(value);
    });

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        console.log(htmlString)
        div.innerHTML = htmlString.trim();
      
        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild; 
      }
}