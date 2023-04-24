import { menuArray, orderArray } from './data.js'

// VARIABLES

const menu = document.getElementById('menu')
const orderTitle = document.getElementById('order-title')
const order = document.getElementById('order')
const checkout = document.getElementById('checkout')
const paymentModal = document.getElementById('payment-modal')
const closeModalBtn = document.getElementById('close-modal-btn')
const paymentForm = document.getElementById('payment-form')

// EVENT LISTENERS

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    else if(e.target.dataset.complete){
        paymentModal.style.display = 'block';
    }
})

closeModalBtn.addEventListener('click', function(){
    paymentModal.style.display = 'none';
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')
    
    paymentModal.style.display = 'none';
    order.style.display = 'none';
    checkout.style.display = 'none';
    orderTitle.innerHTML = `
    <div class='thank-you-message'>
        <h2>Thanks, ${fullName}! Your order is on its way!</h2>
    </div>
    `
})

// MENU ITEMS

function getMenu() {
    let menuHtml = ''
    
    menuArray.forEach(function(item) {
        menuHtml+=`
        <div class='menu-item'>
            <div class='menu-image'>${item.emoji}</div>
                <div class='menu-description'>
                    <p class='menu-item-name'>${item.name}</p>
                    <p class='menu-item-ingredients'>${item.ingredients}</p>
                    <p class='menu-item-price'>$${item.price}</p>
                </div>
                <button class='add-btn' id='add-btn' data-add='${item.id}'>+</button>
        </div>`
    })
    return menuHtml
}

function addItem(itemId) {
    const targetItemObj = menuArray.find(function(item){
        return item.id == itemId
    })
    orderArray.push(targetItemObj)
    render()
    getTotalPrice()
}

// ORDER TITLE

function getOrderTitle() {
    let orderTitleHtml = ''
    
    if(orderArray.length > 0){
        orderTitleHtml+=`
        <h2>Your Order</h2>
        `
    }
    return orderTitleHtml
}

// ORDER DETAILS

function getOrder() {
    let orderHtml = ''
    
    orderArray.forEach(function(item, index){
        orderHtml+=`
        <div class='order-summary'>
            <p class='item-name'>${item.name}</p>
            <small class='remove-btn' data-remove='${index}'>REMOVE</small>
        </div>
        <p class='item-price'>$${item.price}</p>
        `
    })
    return orderHtml
}

function removeItem(orderIndex) {
    orderArray.splice(orderIndex, 1)
    render()
    getTotalPrice()
}

// CHECKOUT DETAILS

function showCheckout() {
    checkout.style.display = 'block';
}

function hideCheckout() {
    checkout.style.display = 'none';
}

function getTotalPrice() {
    let totalPrice = 0
    
    orderArray.forEach(function(item){
        totalPrice += item.price
    })
    if(orderArray.length === 0){
        hideCheckout()
    } else {
        checkout.innerHTML =`
        <hr/>
        <div class='total-price'>
            <p>Total Price: </p>
            <p>$${totalPrice}</p>
        </div>
        <button class='complete-order-btn' data-complete='complete'>Complete Order</button>
        `
        showCheckout()
    }
}

// RENDER ITEMS

function render() {
    menu.innerHTML = getMenu()
    orderTitle.innerHTML = getOrderTitle()
    order.innerHTML = getOrder()
}

render()
