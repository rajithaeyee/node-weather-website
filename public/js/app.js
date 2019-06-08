//console.log("Client side js");
/**
 * test fetch
 */
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });

/**
 * 
 */
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event)=>{
event.preventDefault();
const url = `/weather?address=${search.value}`;
messageOne.textContent='loading...';
messageTwo.textContent='';
fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error;
        }else{
            messageOne.textContent = data.forcast+' with temp :'+ data.temp;
        }
    }); 
});
});