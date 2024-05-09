import { Header, reload, Favorite_arr, reload_categoties } from "../../modules/functions";
import axios from "axios";
import { getData, postData, delete_item } from "../../modules/http.js";

let main = document.querySelector('.main')
let dialog = document.querySelector('[data-modal]')
let close = dialog.querySelector('.close')

Header(main, dialog)

let category_ul = document.querySelector('.category_ul')
let nothing = document.querySelector('.nothing')
let btn = nothing.querySelector('button')
let bottom_line = document.querySelector('.bottom_line')

btn.onclick = () => {
    dialog.showModal()
}

close.onclick = () => {
    dialog.close()
}

getData('/goods')
    .then(res => {
        if (res.status === 201 || res.status === 200) {

            let categories = ["All", ...new Set(res.data.map(item => item.type))]

            reload_categoties(categories, category_ul)
        }
    })

getData('/favourites')
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            if(res.data.length === 0){
                nothing.style.display = 'flex'
                bottom_line.style.display = "none"
            }
            Favorite_arr(res.data)
        }
    })