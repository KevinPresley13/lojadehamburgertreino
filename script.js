const c = (el)=> {
    return document.querySelector(el);
} 

hamburguerjason.map((intem, index)=> {
    let hambitem = c('.models .hamb-item').cloneNode(true);//criando função hambitem para facilitar a leitura do codigo 
    //preencher informaçoes em hambitens
    c('.hamb--area').append(hambitem);// 'append'adiciona itens ao invés de substituir
});
