// 구매하기 누르면 모달창 띄움
$('#purchase').on('click', function() {
    $('.black-bg').css({
        'opacity': '1',
        'visibility': 'visible'
    });
});

// 모달창 입력완료
$('#enterInfo').on('click', function() {
    let receipt_format = 
    `<p>${new Date().toLocaleString()}</p>
    <p>이름: ${$('#name-input').val()}&nbsp;&nbsp;&nbsp;&nbsp;연락처: ${$('#phone-input').val()}</p>`;


    $('.black-bg').css({
        'opacity': '0',
        'visibility': 'collapse'
    });
    // 영수증 내용 채우기
    $('.modal-body').html('');
    for(key in productDB) {
        let item = productDB[key];
        if(item.count>0) {
            receipt_format += `<p>
            <span class="item-title">${item.title}</span>
            <br>${item.brand}
            <br>가격: ${item.price}
            <br>수량: ${item.count}
            <br>합계: ${item.count*item.price}</p>
            `;
        }
    }
    receipt_format += `<p>총 합계 : ${$('#totalCost').text()}</p>`
    receipt_format += `<div class="image-container">
                        <img src="./verynice.png" alt="Good Job" class="mini-image">
                        </div>`;
    $('.modal-body').append(receipt_format);

    // 영수증 띄우기
    $('.receipt-container').css({
        'opacity': '1',
        'visibility': 'visible'
    });
});
// 모달창 닫기
$('#closeModal').on('click', function() {
    $('.black-bg').css({
        'opacity': '0',
        'visibility': 'collapse'
    });
});

// 검은색 배경 클릭하면 닫히게
$('.black-bg').on('click', function(e) {
    if($(e.target).hasClass("black-bg")) {
        $('.black-bg').css({
            'opacity': '0',
            'visibility': 'collapse'
        });
    }
});

// 영수증 창 닫기
$('.receipt-container').on('click', function(e) {
    var clickEvent = e.target.id;
    if(clickEvent=='receiptClose1' || clickEvent=='receiptClose2') {
        $('.receipt-container').css({
            'opacity': '0',
            'visibility': 'collapse'
        });
    }
});