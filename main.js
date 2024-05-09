var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    }
});

import { getData, postData, delete_item } from "./modules/http.js";
import { Header, reload, reload_categoties } from "./modules/functions.js";
import axios from "axios";

let main = document.querySelector('.main')
let dialog = document.querySelector('[data-modal]')
let category_ul = document.querySelector('.category_ul')

Header(main, dialog)

getData('/goods')
    .then(res => {
        if (res.status === 201 || res.status === 200) {
            reload(res.data)

            let categories = ["All", ...new Set(res.data.map(item => item.type))]

            reload_categoties(categories, category_ul)
        }
    })


let one = document.querySelector('.one')
let two = document.querySelector('.two')
let three = document.querySelector('.three')
let four = document.querySelector('.four')
let five = document.querySelector('.five')

one.onclick = () => {
    location.assign('/pages/product_page/?id=47')
}

two.onclick = () => {
    location.assign('/pages/favourite_page/')
}

three.onclick = () => {
    location.assign('/pages/product_page/?id=42')
}

four.onclick = () => {
    location.assign('/pages/product_page/?id=23')
}

five.onclick = () => {
    location.assign('/pages/product_page/?id=41')
}

const form = document.forms.ph_num

form.onsubmit = (e) => {
    e.preventDefault()

    const user = {}

    const fm = new FormData(e.target)

    fm.forEach((val, key) => user[key] = val)

    const { name, surname } = user
    console.log(user);

    if (name && surname) {
        getData('/users?name=' + name)
            .then(res => {
                const [res_user] = res.data

                if (res_user) {
                    alert('user found!');
                    localStorage.setItem("user", JSON.stringify(res.data))
                    location.assign('/')
                    return
                } else {
                    postData('/users', user)
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            localStorage.setItem("user", JSON.stringify(res.data))
                            location.assign('/')
                        }
                    })
                }
                dialog.close()

                delete_item('/favourites')
                delete_item('/bag')
            })
    }
}