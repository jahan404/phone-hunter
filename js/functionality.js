async function loadAfterThreeSecondsAndApi(status,brandname){
    // console.log('after 3 seconds')
    document.getElementById('loading-spinner').classList.add('hidden')


    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandname?brandname:'iphone'}`)
    const data = await response.json()
    
    if(status){
        displayFromApi(data.data)
    }
    else{
        displayFromApi(data.data.slice(0,6))
    }
}


//load all phones from api-->> make phone cards
const displayFromApi =(data) =>{
    // console.log(data)
    const cardContainer = document.getElementById('card-container')

    data.forEach((phone)=>{
    
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
      <button class="btn btn-primary mt-2">Details</button>
    </div>
  </div>
</div>   
    `
    cardContainer.appendChild(div)
    })
}



//show all button
const ShowAll = () => {
    loadAfterThreeSecondsAndApi(true,'iphone')
}





//spinner function form search button
function setTimeOutFunc(){

    document.getElementById('loading-spinner').classList.remove('hidden')

    const searchText = document.getElementById('user-input').value
    setTimeout(()=>{
        loadAfterThreeSecondsAndApi(false,searchText)
    },3000)
}


// loadAfterThreeSecondsAndApi('','')