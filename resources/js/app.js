/*import axios from 'axios';
import Noty from 'noty';
import moment from 'moment';
import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter')







addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        console.log(pizza);
        updateCart(pizza)
    })
})

function updateCart(pizza){
    axios.post('/update-cart', pizza)
        .then(res => {
            // Assuming `cartCounter` and `Noty` are defined elsewhere
            cartCounter.innerText = res.data.totalQty;
            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'Item added to cart',
                progressBar: false,
            }).show();
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
            // Handle the error here, such as displaying an error message to the user
            // For example:
            // alert('An error occurred while adding item to cart. Please try again later.');
        });
}

const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

initAdmin()



// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}
updateStatus(order);
*/


/*
import axios from 'axios';
import Noty from 'noty';
import moment from 'moment';
import { initAdmin } from './admin'

document.addEventListener('DOMContentLoaded', () => {
    let addToCart = document.querySelectorAll('.add-to-cart');
    let cartCounter = document.querySelector('#cartCounter');

    addToCart.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let pizza = JSON.parse(btn.dataset.pizza);
            updateCart(pizza);
        });
    });

    function updateCart(pizza) {
        axios.post('/update-cart', pizza)
            .then(res => {
                cartCounter.innerText = res.data.totalQty;
                new Noty({
                    type: 'success',
                    timeout: 1000,
                    text: 'Item added to cart',
                    progressBar: false,
                }).show();
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
                alert('An error occurred while adding item to cart. Please try again later.');
            });
    }

    const alertMsg = document.querySelector('#success-alert');
    if (alertMsg) {
        setTimeout(() => {
            alertMsg.remove();
        }, 2000);
    }

    initAdmin();

    // Change order status
    let statuses = document.querySelectorAll('.status_line');
    let hiddenInput = document.querySelector('#hiddenInput');
    let order = hiddenInput ? hiddenInput.value : null;
    
    order = JSON.parse(order);
   console.log(order);
   let time = document.createElement('small');

    function updateStatus(order) {
        statuses.forEach((status) => {
            status.classList.remove('step-completed');
            status.classList.remove('current');
        });
        let stepCompleted = true;
        statuses.forEach((status) => {
            let dataProp = status.dataset.status;
            if (stepCompleted) {
                status.classList.add('step-completed');
            }
            if (dataProp === order.status) {
                stepCompleted = false;
                time.innerText = moment(order.updatedAt).format('hh:mm A');
                status.appendChild(time);
                if (status.nextElementSibling) {
                    status.nextElementSibling.classList.add('current');
                }
            }
        });

        console.log('Order status updated:', order.status);
        statuses.forEach((status) => {
            console.log(status.classList);
        });
    }

    if (order) {
        updateStatus(order);
    }
});


// Socket
let socket = io()

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
} */



    import axios from 'axios'
    import Noty from 'noty'
    import { initAdmin } from './admin'
    import moment from 'moment'
    import { initStripe } from './stripe'
   
   let addToCart = document.querySelectorAll('.add-to-cart')
   let cartCounter = document.querySelector('#cartCounter')
   
   function updateCart(pizza) {
       axios.post('/update-cart', pizza).then(res => {
           cartCounter.innerText = res.data.totalQty
           new Noty({
               type: 'success',
               timeout: 1000,
               text: 'Item added to cart',
               progressBar: false,
           }).show();
       }).catch(err => {
           new Noty({
               type: 'error',
               timeout: 1000,
               text: 'Something went wrong',
               progressBar: false,
           }).show();
       })
   }
   
   addToCart.forEach((btn) => {
       btn.addEventListener('click', (e) => {
           let pizza = JSON.parse(btn.dataset.pizza)
           updateCart(pizza)
       })
   })
   
   // Remove alert message after X seconds
   const alertMsg = document.querySelector('#success-alert')
   if(alertMsg) {
       setTimeout(() => {
           alertMsg.remove()
       }, 2000)
   }
   
   
   
   // Change order status
   let statuses = document.querySelectorAll('.status_line')
   let hiddenInput = document.querySelector('#hiddenInput')
   let order = hiddenInput ? hiddenInput.value : null
   order = JSON.parse(order)
   let time = document.createElement('small')
   
   function updateStatus(order) {
       statuses.forEach((status) => {
           status.classList.remove('step-completed')
           status.classList.remove('current')
       })
       let stepCompleted = true;
       statuses.forEach((status) => {
          let dataProp = status.dataset.status
          if(stepCompleted) {
               status.classList.add('step-completed')
          }
          if(dataProp === order.status) {
               stepCompleted = false
               time.innerText = moment(order.updatedAt).format('hh:mm A')
               status.appendChild(time)
              if(status.nextElementSibling) {
               status.nextElementSibling.classList.add('current')
              }
          }
       })
   
   }
   
   updateStatus(order);

 


   

   // ajax form
  initStripe()




   
   // Socket
   let socket = io()
   
   // Join
   if(order) {
       socket.emit('join', `order_${order._id}`)
   }
   let adminAreaPath = window.location.pathname
   if(adminAreaPath.includes('admin')) {
       initAdmin(socket)
       socket.emit('join', 'adminRoom')
   }
   
   
   socket.on('orderUpdated', (data) => {
       const updatedOrder = { ...order }
       updatedOrder.updatedAt = moment().format()
       updatedOrder.status = data.status
       updateStatus(updatedOrder)
       new Noty({
           type: 'success',
           timeout: 1000,
           text: 'Order updated',
           progressBar: false,
       }).show();
   })
   
