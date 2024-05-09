import { Header, Bag_arr, reload_categoties } from "../../modules/functions";
import axios from "axios";
import { getData, postData, delete_item } from "../../modules/http.js";

let main = document.querySelector('.main')
let dialog = document.querySelector('[data-modal]')

Header(main, dialog)

let nothing = document.querySelector('.nothing')
let btn = nothing.querySelector('button')
let addid = document.querySelector('.addid')
let all_prod = document.querySelector('.all_prod')
let all_sale = document.querySelector('.all_sale')
let h1 = document.querySelector('.price h1')

btn.onclick = () => {
    location.assign('/')
}

let category_ul = document.querySelector('.category_ul')

getData('/goods')
    .then(res => {
        if (res.status === 201 || res.status === 200) {

            let categories = ["All", ...new Set(res.data.map(item => item.type))]

            reload_categoties(categories, category_ul)
        }
    })

getData('/bag')
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            let all_sum = 0
            let all_aksiy = 0

            res.data.forEach(elem => {
                all_sum += Math.round(elem.price - (elem.price * elem.salePercentage / 100))
                all_aksiy += elem.price - Math.round(elem.price - (elem.price * elem.salePercentage / 100))
            });

            h1.innerHTML = (all_sum) + ' ' + 'сум'
            all_prod.innerHTML = 'Итого товаров: ' + res.data.length 
            all_sale.innerHTML = 'Итого скидки: ' + (all_aksiy) + ' ' + 'сум'
            if(res.data.length === 0){
                nothing.style.display = 'flex'
                addid.style.display = "none"
            }
            Bag_arr(res.data)
        }
    })