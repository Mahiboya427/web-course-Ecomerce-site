

const wrapper = document.querySelector('.wrapper'); 
const loginLink = document.querySelector('.login-link');

const registerLink = document.querySelector('.register-link');

const btnpopup = document.querySelector('.login-button');


const iconclose= document.querySelector('.icon-close');
registerLink.addEventListener('click', () => { 
    wrapper.classList.add('active'); 
});

loginLink.addEventListener('click', () => { 
    wrapper.classList.remove('active');

});


btnpopup.addEventListener('click', () => { 
    
    wrapper.classList.add('active-popup'); 
    
});


iconclose.addEventListener('click', () => { 
    wrapper.classList.remove('active-popup'); 
});


const p1=()=>{
    console.log("p1 running");
    window.location.assign('./element11.html');
}
document.getElementById('p1').addEventListener('click',p1);


const p2=()=>{
    console.log("p2 running");
    window.location.assign('./element2.html');
}
document.getElementById('p2').addEventListener('click',p2);


const p3=()=>{
    console.log("p3 running");
    window.location.assign('./element5.html');
}
document.getElementById('p3').addEventListener('click',p3);


const p4=()=>{
    console.log("p4 running");
    window.location.assign('./element16.html');
}
document.getElementById('p4').addEventListener('click',p4);
