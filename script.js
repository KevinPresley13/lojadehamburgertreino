const c = (el)=> document.querySelector(el);
const cl = (el)=> document.querySelectorAll(el);


hamburguerjason.map((item, index)=> {
    let hambitem = c('.models .hamb-item').cloneNode(true);//criando função hambitem para facilitar a leitura do codigo 
    //preencher informaçoes em hambitens
    
    hambitem.querySelector('.hamb-item--image img').src = item.img;
    hambitem.querySelector('.hamb-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    hambitem.querySelector('.hamb-item--name').innerHTML = item.name;
    hambitem.querySelector('.hamb-item--description').innerHTML = item.description;


    c('.hamb--area').append(hambitem);// 'append'adiciona itens ao invés de substituir
});