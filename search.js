// 상품명 검색
$('#searchProduct').on('input', function() {
    let keyword = this.value;
    $('.card-container').html('');

    for(key in productDB) {
        // 상품명에 keyword가 포함되어있으면
        let idx = key.indexOf(keyword);
        if(idx>=0) {
            // keyword에만 하이라이트
            let highlighted = key.substring(0,idx)+`<span class="highlighted">`+key.substr(idx, keyword.length)+`</span>`+key.substring(idx+keyword.length);
            // 후 해당 카드 추가
            $('.card-container').append(
            `<div class="card" draggable="true">
                <img src="./${productDB[key].photo}" class="card-img-top" alt="No Image" draggable="false">
                <div class="card-body">
                    <h5 class="card-title">${highlighted}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${productDB[key].brand}</h6>
                    <p class="card-text">가격: ${productDB[key].price}</p>
                    <button type="button" class="btn btn-dark">담기</button>
                </div>
            </div>`);
        }
    }
});