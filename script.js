let modalqt = 1;
const c = (el)=> document.querySelector(el);
const cl = (el)=> document.querySelectorAll(el);


hamburguerjason.map((item, index)=> {
    let hambitem = c('.models .hamb-item').cloneNode(true);//criando função hambitem para facilitar a leitura do codigo 
    //preencher informaçoes em hambitens

    hambitem.setAttribute('data-key',index)
    hambitem.querySelector('.hamb-item--image img').src = item.img;
    hambitem.querySelector('.hamb-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    hambitem.querySelector('.hamb-item--name').innerHTML = item.name;
    hambitem.querySelector('.hamb-item--description').innerHTML = item.description;
    hambitem.querySelector('a').addEventListener('click',(e)=>{//setando informaçoes dentro da tela de pedidos 
        e.preventDefault();
        modalqt = 1;
        let key = e.target.closest('.hamb-item').getAttribute('data-key');
        c('.hamburguerimagearea img').src = hamburguerjason[key].img;
        c('.hamb--info h1').innerHTML = hamburguerjason[key].name;
        c('.hamb--info--desc').innerHTML = hamburguerjason[key].description;
        c('.hamb--info--actualprice').innerHTML = `R$ ${hamburguerjason[key].price.toFixed(2)}`;
        c('.hamb--info--size.active').classList.remove('active');
        cl('.hamb--info--size').forEach((size, sizeindex)=>{
            if(sizeindex == 2) {
                size.classList.add('active');
            };
            size.querySelector('span').innerHTML = hamburguerjason[key].sizes[sizeindex];
        });
        c('.hamb--inf--qt').innerHTML = modalqt;//zerando quantidade de item selecionado

        //setando função de animaçao da tela de adcionar pedidos
        c('.hamburgerwindowarea').style.opacity = 0;
        c('.hamburgerwindowarea').style.display = 'flex';
        setTimeout(()=>{
            c('.hamburgerwindowarea').style.opacity = 1;
        },200);
       
    });
    //fechar tela de adicionar pedidos
    c('.hamb--area').append(hambitem);// 'append'adiciona itens ao invés de substituir
});
//eventos do modal
const closemodal = ()=>{//funçao de fechar janela de pedidos
    c('.hamburgerwindowarea').style.opacity = 0;
    setTimeout(()=>{ 
        c('.hamburgerwindowarea').style.display = 'none';
    },500);   
}
cl('.hamb--cancelbuton, .hambInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closemodal);
});
