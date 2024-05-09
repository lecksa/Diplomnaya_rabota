import { Header, relatable_one, Heart_btn, Bag_btn, reload_categoties } from "../../modules/functions";
import { postData, getData, delete_item } from "../../modules/http";
import axios from "axios";

let main = document.querySelector('.main')
let dialog = document.querySelector('[data-modal]')
let add_to_bag = document.querySelector('.add_to_bag')

let add_to_lov = document.querySelector('.add_to_lov img')

Header(main, dialog)

let category_ul = document.querySelector('.category_ul')

getData('/goods')
    .then(res => {
        if (res.status === 201 || res.status === 200) {

            let categories = ["All", ...new Set(res.data.map(item => item.type))]

            reload_categoties(categories, category_ul)
        }
    })

let slider_1 = document.querySelector('.mySwiper .swiper-wrapper')
let slider_2 = document.querySelector('.mySwiper2 .swiper-wrapper')

const product_id = location.search.split('=').at(-1)

const product_desc = document.querySelector('.description h2')
const product_rate = document.querySelector('.rate_add p')
const product_name = document.querySelector('.name')
const product_price_friday = document.querySelector('.price p')
const product_price = document.querySelector('.price span')
const product_color = document.querySelector('.color span')
let colours = document.querySelector('.colours')

let minus = document.querySelector('.how_much .minus')
let how_much_p = document.querySelector('.how_much p')
let btn_rel = document.querySelector('.relatable_prods button')
let plus = document.querySelector('.how_much .plus')

getData('/goods/' + product_id)
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            product_name.innerHTML = res.data.title
            product_desc.innerHTML = res.data.description
            product_rate.innerHTML = res.data.rating
            product_price.innerHTML = res.data.price + " " + 'сум'
            product_price_friday.innerHTML = Math.round(res.data.price - (res.data.price * res.data.salePercentage / 100)) + " " + "сум"
            console.log(res.data.price);
            colours.innerHTML = ""

            for (let item of res.data.colors) {
                let colour = document.createElement('div')
                let cvet = document.createElement('div')

                colour.classList.add('colour')
                cvet.classList.add('cvet')

                cvet.style.backgroundColor = item

                colours.append(colour)
                colour.append(cvet)

                colour.onclick = () => {
                    product_color.innerHTML = item
                }
            }

            slider_1.innerHTML = ''
            slider_2.innerHTML = ''

            for (let item of res.data.media) {
                let swiper_slide = document.createElement('div')
                let img = document.createElement('img')

                swiper_slide.classList.add('swiper-slide')
                img.src = item

                slider_1.append(swiper_slide)
                swiper_slide.append(img)
            }

            for (let item of res.data.media) {
                let swiper_slide = document.createElement('div')
                let img = document.createElement('img')

                swiper_slide.classList.add('swiper-slide')
                img.src = item

                slider_2.append(swiper_slide)
                swiper_slide.append(img)
            }

            let count_num = 0
            let total = Math.round(res.data.price - (res.data.price * res.data.salePercentage / 100))

            minus.onclick = () => {
                if (count_num > 1) {
                    how_much_p.innerHTML = --count_num
                    product_price_friday.innerHTML = (Math.round(res.data.price - (res.data.price * res.data.salePercentage / 100)) * count_num).toFixed(2)
                    total = parseFloat((total - Math.round(res.data.price - (res.data.price * res.data.salePercentage / 100))).toFixed(2))
                    product_price_friday.innerHTML = total + ' ' + 'сум'
                } else {
                    how_much_p.innerHTML = 0
                    product_price_friday.innerHTML = total + ' ' + 'сум'
                }
            }

            plus.onclick = () => {
                how_much_p.innerHTML = ++count_num
                if (count_num > 1) {
                    product_price_friday.innerHTML = (Math.round(res.data.price - (res.data.price * res.data.salePercentage / 100)) * count_num).toFixed(2)
                    total = parseFloat((total + Math.round(res.data.price - (res.data.price * res.data.salePercentage / 100))).toFixed(2))
                    product_price_friday.innerHTML = total + ' ' + 'сум'
                }
            }

            let main_prod = res.data

            getData('/goods')
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        relatable_one(main_prod, res.data, 'small', product_id)

                        btn_rel.onclick = () => {
                            if (btn_rel.innerHTML === "Показать ещё") {
                                relatable_one(main_prod, res.data, 'full', product_id)
                                btn_rel.innerHTML = "Скрыть"
                            } else {
                                relatable_one(main_prod, res.data, 'small', product_id)
                                btn_rel.innerHTML = "Показать ещё"
                            }
                        }
                    }
                })

            getData('/favourites')
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        res.data.forEach(elem => {
                            if (elem.id === main_prod.id) {
                                add_to_lov.src = '../../public/added.svg'
                            }
                        });

                        add_to_lov.onclick = () => {
                            Heart_btn(main_prod, res.data, add_to_lov)
                            location.assign('/pages/product_page/?id=' + product_id)
                        }
                    }
                })

            getData('/bag')
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        add_to_bag.onclick = () => {
                            Bag_btn(main_prod, res.data)
                            location.assign('/pages/product_page/?id=' + product_id)
                        }
                    }
                })
        }
    })


var swiper = new Swiper(".mySwiper", {
    // loop: true,
    spaceBetween: 5,
    direction: "vertical",
    mousewheel: 'true',
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper = new Swiper(".mySwiper2", {
    // loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    thumbs: {
        swiper: swiper,
    },
});

