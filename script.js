let searchBox = document.getElementById('search-box') 
let filterBox = document.getElementById('region')
let backButton = document.getElementById('backButton')
let mode = document.getElementById('mode')
let stateChange = false
let data = []


let upperContainer = document.getElementById('upperContainer')
let countryContainer = document.getElementById('countryContainer')
let detailsContainer = document.getElementById('detailsContainer')
let countryDetailContainer = document.getElementById('countryDetails')

const fetchCounteries = async () =>{
    try {
        const response = await fetch('data.json')
        if(!response.ok){
            throw new Error('No Response: '+ response.statusText)
        }
        
        data = await response.json()

        displayCounteries(data)

    } catch (error) {
        console.error(error)   
    }
}


const displayCounteries = (counteries) =>{
    countryContainer.innerHTML = ``

    counteries.forEach(country => {
        let card = document.createElement('div')
        card.classList.add('card')
    
        if (stateChange) {
            card.classList.add('dark-mode'); 
        } else {
            card.classList.remove('dark-mode'); 
        }

        let flag = document.createElement('div')
        flag.classList.add('flag')
        let flagImg = document.createElement('img')
        flagImg.src = `${country.flags.png}`
        flagImg.alt = `${country.name}`
    
        flag.appendChild(flagImg)
    
        let info = document.createElement('div')
        info.classList.add('info')
    
        let title = document.createElement('div')
        title.classList.add('card_title')
        title.textContent = `${country.name}`
    
        let population = document.createElement('div')
        population.classList.add('population')
        population.innerHTML = `<b>Population:<b/> ${country.population}`
    
        let region = document.createElement('div')
        region.classList.add('region')
        region.innerHTML = `<b>Region:<b/> ${country.region}`
    
        let capital = document.createElement('div')
        capital.classList.add('capital')
        capital.innerHTML = `<b>Capital:<b/> ${country.capital}`
    
        info.appendChild(title)
        info.appendChild(population)
        info.appendChild(region)
        info.appendChild(capital)
        
        card.appendChild(flag)
        card.appendChild(info)
        card.addEventListener('click', ()=>{
            countryDetails(country)
            countryContainer.style.display = 'none'
            upperContainer.style.display = 'none'
            detailsContainer.style.display = 'flex'
        })
        
        countryContainer.appendChild(card)
    });

}

searchBox.addEventListener('input',()=>{
    let searchCountry = searchBox.value
    let searchCardData = data.filter((country)=>{
        if(country.name.toLowerCase().includes(searchCountry)){
            return country
        }
    })  

    displayCounteries(searchCardData)
})

filterBox.addEventListener('change',()=>{
    let selectedRegion = filterBox.value.toLowerCase()
    let filterCardData = data.filter((country)=>{
        if(country.region.toLowerCase() == selectedRegion)
        {
            return country
        }
    })

    displayCounteries(filterCardData)
})


const countryDetails = (country) =>{
    countryDetailContainer.innerHTML = ``
    let flagInDetail = document.createElement('div')
    flagInDetail.classList.add('flagInDetail')

    let flagImg = document.createElement('img')
    flagImg.src = `${country.flags.png}`
    flagImg.alt = `${country.name}`

    flagInDetail.appendChild(flagImg)

    let mainDetails = document.createElement('div')
    mainDetails.classList.add('mainDetails')

    let countryName = document.createElement('div')
    countryName.classList.add('countryName')
    countryName.textContent = `${country.name}`

    let description = document.createElement('div')
    description.classList.add('description')

    
    let descriptionLeft = document.createElement('div')
    descriptionLeft.classList.add('descriptionLeft')
    
    let nativeName = document.createElement('p')
    let population = document.createElement('p')
    let region = document.createElement('p')
    let subRegion = document.createElement('p')
    let capital = document.createElement('p')

    nativeName.classList.add('nativeName')
    population.classList.add('population')
    region.classList.add('region')
    subRegion.classList.add('subRegion')
    capital.classList.add('capital')

    nativeName.innerHTML = `<b>Native Name:</b> ${country.nativeName}`
    population.innerHTML = `<b>Population:</b> ${country.population}`
    region.innerHTML = `<b>Region:</b> ${country.region}`
    subRegion.innerHTML = `<b>Sub Region:</b> ${country.subregion}`
    capital.innerHTML = `<b>Capital:</b> ${country.capital}`

    descriptionLeft.appendChild(nativeName)
    descriptionLeft.appendChild(population)
    descriptionLeft.appendChild(region)
    descriptionLeft.appendChild(subRegion)
    descriptionLeft.appendChild(capital)

    
    let descriptionRight = document.createElement('div')
    descriptionRight.classList.add('descriptionRight')

    let topLevelDomain = document.createElement('p')
    let currencies = document.createElement('p')
    let languages = document.createElement('p')

    topLevelDomain.classList.add('topLevelDomain')
    currencies.classList.add('currencies')
    languages.classList.add('languages')

    topLevelDomain.innerHTML = `<b>Top Level Domain:</b> ${country.topLevelDomain}`
    currencies.innerHTML = `<b>Currency:</b> ${country.currencies[0].name}`
    languages.innerHTML = `<b>Languages:</b> ${country.languages.map(lang => lang.name).join(', ')}`

    descriptionRight.appendChild(topLevelDomain)
    descriptionRight.appendChild(currencies)
    descriptionRight.appendChild(languages)

    description.appendChild(descriptionLeft)
    description.appendChild(descriptionRight)


    let borderCounteries = document.createElement('div')
    borderCounteries.classList.add('borderCounteries')
    borderCounteries.innerHTML = `<b>Border Counteries:</b>`

    if(country.borders){
        country.borders.forEach(border => {
            let borderCountry = document.createElement('div');
            borderCountry.classList.add('borderCountry');
            borderCountry.textContent = getCountryNameFromCode(border);
            borderCounteries.appendChild(borderCountry);
        });
    }
    else{
        borderCounteries.innerHTML = `<b>Border Counteries:</b> none`
    }
     

    mainDetails.appendChild(countryName)
    mainDetails.appendChild(description)
    mainDetails.appendChild(borderCounteries)

    countryDetailContainer.appendChild(flagInDetail)
    countryDetailContainer.appendChild(mainDetails)
}

const getCountryNameFromCode = (code) => {
    let borderCountry = data.find(country => country.alpha3Code === code);
    return borderCountry ? borderCountry.name : code;
};


backButton.addEventListener('click',()=>{
    detailsContainer.style.display = 'none'
    countryContainer.style.display = 'grid'
    upperContainer.style.display = 'flex'
})

fetchCounteries()

mode.addEventListener('click', () => {
    stateChange = !stateChange;

    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    document.getElementById('nav').style.transition = 'background-color 0.5s ease';
    document.getElementById('search').style.transition = 'background-color 0.5s ease, color 0.5s ease';
    document.getElementById('region').style.transition = 'background-color 0.5s ease, color 0.5s ease';
    backButton.style.transition = 'background-color 0.5s ease';

    let search = document.getElementById('search-box');
    search.style.transition = 'background-color 0.5s ease, color 0.5s ease';

    let regionSelect = document.getElementById('region');
    regionSelect.style.transition = 'background-color 0.5s ease, color 0.5s ease';

    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.transition = 'background-color 0.5s ease';
    }

    if (stateChange) {
        // Dark Mode
        mode.innerHTML = `
            <span class="modeChange" title="Light Theme">
                <i class="fa-regular fa-sun"></i>&nbsp;
                Light Mode
            </span>
        `
        document.body.style.backgroundColor = '#202d36';
        document.body.style.color = 'white';
        document.getElementById('nav').style.backgroundColor = '#2b3743';
        document.getElementById('search').style.backgroundColor = '#2b3743';
        document.getElementById('region').style.backgroundColor = '#2b3743';
        document.getElementById('search').style.color = '#ffffff';

        let search = document.getElementById('search-box');
        search.style.backgroundColor = '#2b3743';
        search.style.color = 'white';

        let regionSelect = document.getElementById('region');
        regionSelect.style.backgroundColor = '#2b3743';
        regionSelect.style.color = 'white';

        let option = document.getElementsByClassName('options');
        for (let i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = '#2b3743';
        }

        let cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.add('dark-mode');
        }

        backButton.style.backgroundColor = '#2b3743';
        document.getElementById('backButtonImg').innerHTML = `<img src="assets/arrow-white.png" alt="dark back arrow">`;

    } else {
        mode.innerHTML = `
            <span class="modeChange" title="Dark Theme">
                <i class="fa-regular fa-moon"></i>&nbsp;
                Dark Mode
            </span>
        `
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        document.getElementById('nav').style.backgroundColor = 'white';
        document.getElementById('search').style.backgroundColor = 'white';
        document.getElementById('region').style.backgroundColor = 'white';
        document.getElementById('search').style.color = 'black';

        let search = document.getElementById('search-box');
        search.style.backgroundColor = 'white';
        search.style.color = 'black';

        let regionSelect = document.getElementById('region');
        regionSelect.style.backgroundColor = 'white';
        regionSelect.style.color = 'black';

        let option = document.getElementsByClassName('options');
        for (let i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = 'white';
        }

        let cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('dark-mode');
        }

        backButton.style.backgroundColor = 'white';
        document.getElementById('backButtonImg').innerHTML = `<img src="assets/arrow.png" alt="light back arrow">`;
    }
});












