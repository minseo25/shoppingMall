// 장바구니에 담기(button click)
$('.card-container').on('click', function(e) {
    if($(e.target).hasClass('btn')) {
        // 처음이면 비우고 ('여기에 드래그' 문자 지우기)
        if(checkIsCartEmpty()) {
            $('#cart').html('');
        }

        let clickedItem = $(e.target).siblings('.card-title').text();
        clickedItem = productDB[clickedItem];
        addCardToCart(clickedItem);
        calcTotalCost();
    }
});

// 장바구니 input 직접 수정
$('#cart').on('change', function(e) {
    let changedItem = $(e.target).siblings('.card-title').text();
    changedItem = productDB[changedItem];
    let cnt = $(e.target).val().trim();

    // 빈칸 혹은 수량=0은 해당 element 지운다
    if(cnt=='' || parseInt(cnt,10)==0) {
        changedItem.count = 0;
        $(e.target).closest('.card').remove();
    } else {
        changedItem.count = parseInt(cnt,10);
    }

    calcTotalCost();
    if(checkIsCartEmpty()) {
        $('#cart').html('<h5 style="color:white">여기로 드래그</h5>');
    }
});

// 드래그하는 항목 기억하기
let draggedItem;
$('.card-container').on('dragstart', function(e) {
    draggedItem = $(e.target).find('.card-title').text();
});

// 장바구니에 담기(drag&drop)
$('#cart').on('dragover', function(e) {
    // prevent default behavior to allow dropping
    e.preventDefault();
});
$('#cart').on('drop', function(e) {
    if(checkIsCartEmpty()) {
        $('#cart').html('');
    }
    
    draggedItem = productDB[draggedItem];
    addCardToCart(draggedItem);
    calcTotalCost();
});

function addCardToCart(item) {
    // cart에 없으면 카드 추가
    if(item.count<=0) {
        $('#cart').append(`
        <div class="card">
            <img src="./${item.photo}" class="card-img-top" alt="No Image" draggable="false">
            <div class="card-body card-in-cart">
                <h5 class="card-title">${item.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${item.brand}</h6>
                <p class="card-text">${item.price}</p>
                <input type="input" id="card_in_cart_${item.id}">
            </div>
        </div>`);
    }
    // 수량 업데이트
    item.count++;
    $(`#card_in_cart_${item.id}`).val(item.count);
}