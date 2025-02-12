async function loadAfterThreeSecondsAndApi(status,brandName){
    // console.log('after 3 seconds')
    document.getElementById('loading-spinner').classList.add('hidden')


    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName}`)
    const data = await response.json()
    

    displayFromApi(data.data,status)
    
}


//load all phones from api-->> make phone cards
const displayFromApi =(data,status) =>{
    const cardContainer = document.getElementById('card-container')
    if(data.length===0){
        cardContainer.classList.remove('grid')
        cardContainer.innerHTML=`
            <h1 class="text-3xl text-center text-red-500">NO Data Found. Try a new search!</h1>
        `
        return;
    }
    else{
        cardContainer.classList.add('grid')
    }


    let phones;
    if(status){
        phones = (data)
    }
    else{
        phones = (data.slice(0,6))
    }
    if(phones.length===6){
        document.getElementById('show-all-button').classList.remove('hidden')
    }
    // console.log(phones)

    
    cardContainer.innerHTML=``
    phones.forEach((phone)=>{
    
    const {brand,phone_name,slug,image} = phone
    const div = document.createElement('div')
    div.innerHTML=`
<div class="card border">
  <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone_name}</h2>
    <div class="card-actions">
      <button onclick="showModalDetails('${slug}')" class="btn btn-primary mt-2">Details</button>
    </div>
  </div>
</div>   
    `
    cardContainer.appendChild(div)
    })
}


//modal detail + modal creation
const showModalDetails = async(slugs)=>{

    const modalId = document.getElementById('my_modal')
    modalId.showModal();
    // console.log(modalId)

    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
    const dataApi = await response.json()
    console.log(dataApi.data)


    const {image,brand,others,mainFeatures,releaseDate,name,slug} = dataApi.data
    

    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML=``

        const div = document.createElement('div')  
        div.innerHTML=`
        <div>
        <img src="${image}"/>
        </div>
        <h1 class="text-xl font-semibold">${name}</h1>
        <p class="">${brand}</p>
        
        <p class="">${others?.WLAN}</p>
        <p class="">${others?.Bluetooth}</p>
        <p class="">${others?.GPS}</p>
        <p class="">${others?.USB}</p>
        `
        modalContent.appendChild(div)
    
}


//show all button
const ShowAll = () => {
    const searchText = document.getElementById('user-input').value
    loadAfterThreeSecondsAndApi(true,searchText)
    document.getElementById('show-all-button').classList.add('hidden')
}





//spinner function form search button
function setTimeOutFunc(){

    document.getElementById('loading-spinner').classList.remove('hidden')

    const searchText = document.getElementById('user-input').value
    setTimeout(()=>{
        loadAfterThreeSecondsAndApi(false,searchText)
    },3000)

}
