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
    hambitem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        let key = e.target.closest('.hamb-item').getAttribute('data-key');
        c('.hamburguerimagearea img').src = hamburguerjason[key].img;
        c('.hamb--info h1').innerHTML = hamburguerjason[key].name;
        c('.hamb--info--desc').innerHTML = hamburguerjason[key].description;
        c('.hamb--info--actualprice').innerHTML = `R$ ${hamburguerjason[key].price.toFixed(2)}`;

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
