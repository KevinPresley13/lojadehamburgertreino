let cart =[];
let modalqt = 1;
let modalkey=0;
const c = (el)=> document.querySelector(el);
const cl = (el)=> document.querySelectorAll(el);
//alert('Esse site é somente para TREINO,tudo o conteudo dele é de TESTE, Click em ok para continuar');

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
        modalkey = key;
        c('.hamburguerimagearea img').src = hamburguerjason[key].img;
        c('.hamb--info h1').innerHTML = hamburguerjason[key].name;
        c('.hamb--info--desc').innerHTML = hamburguerjason[key].description;
        c('.hamb--info--actualprice').innerHTML = `R$ ${hamburguerjason[key].price.toFixed(2)}`;
        c('.hamb--info--size.active').classList.remove('active');
        cl('.hamb--info--size').forEach((size, sizeindex)=>{
            if(sizeindex == 0) {
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

c('.hamb--info--qtmenos').addEventListener('click',()=>{
    if(modalqt>1){
        modalqt--;
        c('.hamb--inf--qt').innerHTML = modalqt;
    }
});
c('.hamb--info--qtmais').addEventListener('click',()=>{
    modalqt++;
    c('.hamb--inf--qt').innerHTML = modalqt;
    
});

cl('.hamb--info--size').forEach((size, sizeindex)=>{//modificar o tamanho do hamburguer
    size.addEventListener('click',(e)=>{
        c('.hamb--info--size.active').classList.remove('active');
        size.classList.add('active');
    });
});

c('.hamb--addbuton').addEventListener('click',()=>{
    let size = parseInt(c('.hamb--info--size.active').getAttribute('data-key'));
    let indentifier = hamburguerjason[modalkey].id+'@'+size;
    let key = cart.findIndex((item)=>item.indentifier == indentifier);
    if(key>-1){
        cart[key].quantidade += modalqt;
    } else{
        cart.push({
            indentifier,
            id:hamburguerjason[modalkey].id,
            size,
            quantidade:modalqt
        });
    }  
    updateCart();  
    closemodal();
});
function updateCart(){
    if(cart.length>0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
        for (let i in cart) {
            let hambitem = hamburguerjason.find((item)=>item.id == cart[i].id );
            let cartitem = c('.models .cart--item').cloneNode(true);
            let hambSizeName;
            switch(cart[i].size) {
                case 0:
                    hambSizeName = 'P'
                    break;
                case 1:
                    hambSizeName = 'M'
                    break;
                case 2:
                    hambSizeName = 'G'
                    break;
            };

            let hambCartName = `${hambitem.name} (${hambSizeName})`;
            cartitem.querySelector('img').src = hambitem.img;
            cartitem.querySelector('.cart--item-nome').innerHTML = hambCartName;
            cartitem.querySelector('.cart--item--qt').innerHTML = cart[i].quantidade;
            cartitem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].quantidade>1){
                    cart[i].quantidade --;
                }else{
                    cart.splice(i,1)
                };
                
                updateCart();
            }),
            cartitem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                if(cart[i].quantidade>=1){
                    cart[i].quantidade ++;
                    updateCart();
                };    
            }),
            c('.cart').append(cartitem);
        }
    } else{
        c('aside').classList.remove('show')
    };
};



c('.cart--finalizar').addEventListener('click',()=>{
    alert('Pedido não pode ser efetuado...SITE apenas para Portifólio!!!Obrigado por testar!!');
    cart.splice(cart);
    c('aside').classList.remove('show');
});