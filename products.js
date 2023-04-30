// key=title, value=object(product info)
let productDB = {};

function checkIsCartEmpty() {
    for(key in productDB) {
        if(productDB[key].count>0) {
            return false;
        }
    }
    return true;
}
function calcTotalCost() {
    let totalCost = 0;
    for(key in productDB) {
        totalCost += productDB[key].price * productDB[key].count
    }
    $('#totalCost').text(totalCost);
}

$.get('./store.json')
.done(function(data) {
    data["products"].forEach((item) => {
        // 장바구니 수량 추가하여 DB 생성
        item['count'] = 0;
        productDB[item.title] = item;
        $('.card-container').append(
        `<div class="card" draggable="true">
            <img src="./${item.photo}" class="card-img-top" alt="No Image" draggable="false">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${item.brand}</h6>
                <p class="card-text">가격: ${item.price}</p>
                <button type="button" class="btn btn-dark">담기</button>
            </div>
        </div>`);
    })
})
.fail(function() {
    alert("Fail to Load data...");
});