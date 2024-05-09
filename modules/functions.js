import { postData, getData, delete_item, patchData } from "./http"
import axios from "axios";
let user_loc = JSON.parse(localStorage.getItem('user'))

export function Header(place, sign_in) {
    let small = document.querySelector('.small input')

    let header = document.createElement('header')
    let logo = document.createElement('a')
    let logo_img = document.createElement('img')
    let logo_h1 = document.createElement('h1')
    let button_catalog = document.createElement('button')
    let box_cat = document.createElement('div')
    let up = document.createElement('div')
    let mid = document.createElement('div')
    let down = document.createElement('div')
    let catalog_h2 = document.createElement('h2')
    let poisk = document.createElement('div')
    let form = document.createElement('form')
    let input = document.createElement('input')
    let search_icon = document.createElement('div')
    let search_img = document.createElement('img')
    let profile = document.createElement('div')
    let sign = document.createElement('div')
    let img_1 = document.createElement('img')
    let h2_1 = document.createElement('h2')
    let favorite = document.createElement('div')
    let img_2 = document.createElement('img')
    let h2_2 = document.createElement('h2')
    let counter_1 = document.createElement('div')
    let bag = document.createElement('div')
    let img_3 = document.createElement('img')
    let h2_3 = document.createElement('h2')
    let counter_2 = document.createElement('div')

    let a = document.createElement('a')
    let a_2 = document.createElement('a')

    logo.classList.add('logo')
    logo.href = '/'
    logo_img.src = "../../public/logo_uzum.png"
    logo_h1.innerHTML = 'uzum market'
    button_catalog.classList.add('catalog')
    box_cat.classList.add('box_cat')
    up.classList.add('up')
    mid.classList.add('mid')
    down.classList.add('down')
    catalog_h2.innerHTML = "Каталог"
    poisk.classList.add('poisk')
    form.action = '#'
    input.setAttribute('type', 'text')
    input.setAttribute("placeholder", 'Искать товары и категории')
    search_icon.classList.add('search_icon')
    search_img.src = "../../public/search.svg"
    profile.classList.add('profile')
    sign.classList.add('item_prof', 'sign')
    img_1.src = "../../public/profile.svg"
    img_1.style.width = "24px"
    // if (user_loc !== undefined) {
        // h2_1.innerHTML = user_loc[0].name
    // } else {
        h2_1.innerHTML = "Войти"
    // }
    favorite.classList.add('item_prof', 'favorite')
    img_2.src = "../../public/heart.svg"
    img_2.style.width = "20px"
    h2_2.innerHTML = "Избранное"
    counter_1.classList.add('counter')
    getData("/favourites")
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                counter_1.innerHTML = res.data.length
            }
        })
    bag.classList.add('item_prof', 'bag')
    img_3.src = "../../public/shopping-bag.svg"
    h2_3.innerHTML = "Корзина"
    counter_2.classList.add('counter')
    getData("/bag")
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                counter_2.innerHTML = res.data.length
            }
        })

    a.href = '../../pages/favourite_page/index.html'
    a_2.href = '../../pages/want_to_buy_page/index.html'

    place.prepend(header)
    header.append(logo, button_catalog, poisk, profile)
    logo.append(logo_img, logo_h1)
    button_catalog.append(box_cat, catalog_h2)
    box_cat.append(up, mid, down)
    poisk.append(form)
    form.append(input, search_icon)
    search_icon.append(search_img)
    profile.append(sign, a, a_2)
    sign.append(img_1, h2_1)
    a.append(favorite)
    favorite.append(img_2, h2_2, counter_1)
    a_2.append(bag)
    bag.append(img_3, h2_3, counter_2)

    let categ = document.querySelector('.categ')
    let cancel = document.querySelector('.categ .cancel')

    button_catalog.onclick = () => {
        categ.showModal()
    }

    cancel.onclick = () => {
        categ.close()
    }

    sign.onclick = () => {
        sign_in.showModal()
    }

    let close = sign_in.querySelector('.close')

    close.onclick = () => {
        sign_in.close()
    }

    let finded_pr = document.querySelector('.finded_pr')
    let finded_ul = document.querySelector('.finded_ul')

    getData('/goods')
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                input.onkeyup = (e) => {
                    finded_pr.style.display = 'none'

                    let key_word = e.target.value.trim().toLowerCase()

                    let finded = res.data.filter(elem => {
                        let name = elem.title.toLocaleLowerCase()

                        if (name.includes(key_word)) {
                            return elem
                        } else {
                            finded_pr.style.display = 'flex'
                        }
                    })
                    reload_poisks(finded, finded_ul)
                }

                small.onkeyup = (e) => {
                    finded_pr.style.display = 'none'

                    let key_word = e.target.value.trim().toLowerCase()

                    let finded = res.data.filter(elem => {
                        let name = elem.title.toLocaleLowerCase()

                        if (name.includes(key_word)) {
                            return elem
                        } else {
                            finded_pr.style.display = 'flex'
                        }
                    })
                    reload_poisks(finded, finded_ul)
                }
            }
        })
}

export function reload(arr) {
    let gaming = document.querySelector('.pc_prods')
    let btn = document.querySelector('.products .gaming button')
    let audio = document.querySelector('.aud_prods')
    let tv = document.querySelector('.tv_prods')
    let furniture = document.querySelector('.fur_prods')

    let tempArr = []

    for (let item of arr) {
        let favorites = []
        let bags = []

        let product = document.createElement('div')
        let photo = document.createElement('div')
        let heart = document.createElement('img')
        let img_prod = document.createElement('img')
        let info = document.createElement('div')
        let name = document.createElement('p')
        let rating = document.createElement('span')
        let origin = document.createElement('span')
        let end_price = document.createElement('p')
        let add = document.createElement('button')
        let bag = document.createElement('img')

        product.classList.add('item', 'item_pop')
        photo.classList.add('photo')
        getData('/favourites')
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    res.data.forEach(elem => {
                        if (elem.id === item.id) {
                            heart.src = '../../public/added.svg'
                        }
                    });
                }
            })
        heart.src = "../../public/heart.svg"
        heart.classList.add('heart')
        img_prod.src = item.media[0]
        img_prod.classList.add('img_prod')
        info.classList.add('info')
        name.innerHTML = item.title
        rating.style.padding = "5px 0px 8px 0px"
        rating.style.textDecoration = "none"
        origin.innerHTML = item.price + " " + "сум"
        end_price.innerHTML = Math.round(item.price - (item.price * item.salePercentage / 100)) + " " + "сум"
        add.classList.add('add')
        bag.src = "../../public/add.svg"

        if (item.type === "furniture" || item.type === 'PC') {
            tempArr.push(item)
            gaming.append(product)
        }
        btn.onclick = () => {
            if (btn.innerHTML === "Показать ещё 10") {
                for_gaming(tempArr, gaming, "full")
                btn.innerHTML = "Скрыть"
            } else {
                for_gaming(tempArr, gaming, "small")
                btn.innerHTML = "Показать ещё 10"
            }
        }
        if (item.type === 'audio') {
            audio.append(product)
        }
        if (item.type === 'TV') {
            tv.append(product)
        }
        if (item.type === 'kitchen') {
            furniture.append(product)
        }

        product.append(photo, info)
        photo.append(heart, img_prod)
        info.append(name, rating, origin, end_price, add)
        rating.innerHTML = `<img src="../../public/star.png"> ${item.rating}`
        add.append(bag)

        heart.onclick = () => {
            Heart_btn(item, favorites, heart)
        }

        bag.onclick = () => {
            Bag_btn(item, bags)
            location.assign('/')
        }

        img_prod.onclick = () => {
            location.assign('/pages/product_page/?id=' + item.id)
        }
    }
}

function for_gaming(arr, place, size) {
    place.innerHTML = ''

    let tempArr = []
    if (size === 'small') tempArr = arr.slice(0, 10)
    else if (size === 'full') tempArr = arr

    for (let item of tempArr) {
        let favorites = []
        let bags = []

        let product = document.createElement('div')
        let photo = document.createElement('div')
        let heart = document.createElement('img')
        let img_prod = document.createElement('img')
        let info = document.createElement('div')
        let name = document.createElement('p')
        let rating = document.createElement('span')
        let origin = document.createElement('span')
        let end_price = document.createElement('p')
        let add = document.createElement('button')
        let bag = document.createElement('img')

        product.classList.add('item', 'item_pop')
        photo.classList.add('photo')
        getData('/favourites')
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    res.data.forEach(elem => {
                        if (elem.id === item.id) {
                            heart.src = './public/added.svg'
                        }
                    });
                }
            })
        heart.src = "./public/heart.svg"
        heart.classList.add('heart')
        img_prod.src = item.media[0]
        img_prod.classList.add('img_prod')
        info.classList.add('info')
        name.innerHTML = item.title
        rating.style.padding = "5px 0px 8px 0px"
        rating.style.textDecoration = "none"
        origin.innerHTML = item.price + " " + "сум"
        end_price.innerHTML = Math.round(item.price - (item.price * item.salePercentage / 100)) + " " + "сум"
        add.classList.add('add')
        bag.src = "./public/add.svg"

        place.append(product)
        product.append(photo, info)
        photo.append(heart, img_prod)
        info.append(name, rating, origin, end_price, add)
        rating.innerHTML = `<img src="./public/star.png"> ${item.rating}`
        add.append(bag)

        heart.onclick = () => {
            Heart_btn(item, favorites, heart)
        }

        bag.onclick = () => {
            Bag_btn(item, bags)
        }

        img_prod.onclick = () => {
            location.assign('/pages/product_page/?id=' + item.id)
        }
    }
}

export function relatable_one(tovar, arr, size, id) {
    let relatable_prod = document.querySelector('.relatable')
    relatable_prod.innerHTML = ''

    let tempArr = []
    if (size === 'small') tempArr = arr.slice(0, 6)
    else if (size === 'full') tempArr = arr

    for (let item of tempArr) {
        let favorites = []
        let bags = []

        let product = document.createElement('div')
        let photo = document.createElement('div')
        let heart = document.createElement('img')
        let img_prod = document.createElement('img')
        let info = document.createElement('div')
        let name = document.createElement('p')
        let rating = document.createElement('span')
        let origin = document.createElement('span')
        let end_price = document.createElement('p')
        let add = document.createElement('button')
        let bag = document.createElement('img')

        product.classList.add('item', 'item_pop')
        photo.classList.add('photo')
        getData('/favourites')
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    res.data.forEach(elem => {
                        if (elem.id === item.id) {
                            heart.src = '../../public/added.svg'
                        }
                    });
                }
            })
        heart.src = "../../public/heart.svg"
        heart.classList.add('heart')
        img_prod.src = item.media[0]
        img_prod.classList.add('img_prod')
        info.classList.add('info')
        name.innerHTML = item.title
        rating.style.padding = "5px 0px 8px 0px"
        rating.style.textDecoration = "none"
        origin.innerHTML = item.price + " " + "сум"
        end_price.innerHTML = Math.round(item.price - (item.price * item.salePercentage / 100)) + " " + "сум"
        add.classList.add('add')
        bag.src = "../../public/add.svg"

        product.append(photo, info)
        photo.append(heart, img_prod)
        info.append(name, rating, origin, end_price, add)
        rating.innerHTML = `<img src="../../public/star.png"> ${item.rating}`
        add.append(bag)

        if (item.type === tovar.type && item.title !== tovar.title) {
            relatable_prod.append(product)
        }

        product.append(photo, info)
        photo.append(heart, img_prod)
        info.append(name, rating, origin, end_price, add)
        rating.innerHTML = `<img src="../../public/star.png"> ${item.rating}`
        add.append(bag)

        heart.onclick = () => {
            Heart_btn(item, favorites, heart)
            // location.assign('/pages/product_page/?id=' + id)
        }

        bag.onclick = () => {
            Bag_btn(item, bags)
        }

        img_prod.onclick = () => {
            location.assign('/pages/product_page/?id=' + item.id)
        }
    }
}

export function Heart_btn(item, arr, img) {
    const productId = item.id;

    if (arr.some(favItem => favItem.id === productId)) {
        delete_item(`/favourites/${productId}`)
            .then(() => {
                img.src = "../../public/heart.svg"
            })
    } else {
        postData("/favourites", item)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    arr.push(item);
                    img.src = "../../public/added.svg"
                }
            })
    }
}

export function Bag_btn(item, arr) {
    const productId = item.id;

    if (arr.some(bagItem => bagItem.id === productId)) {
        alert('It is almost there!')
    } else {
        postData("/bag", item)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    arr.push(item);
                }
            })
    }
}

export function Favorite_arr(arr) {
    let my_favs = document.querySelector('.my_favs')
    my_favs.innerHTML = ''

    for (let item of arr) {
        let product = document.createElement('div')
        let photo = document.createElement('div')
        let heart = document.createElement('img')
        let img_prod = document.createElement('img')
        let info = document.createElement('div')
        let name = document.createElement('p')
        let rating = document.createElement('span')
        let origin = document.createElement('span')
        let end_price = document.createElement('p')
        let add = document.createElement('button')
        let bag = document.createElement('img')

        product.classList.add('item', 'item_pop')
        photo.classList.add('photo')
        heart.src = "../../public/added.svg"
        heart.classList.add('heart')
        img_prod.src = item.media[0]
        img_prod.classList.add('img_prod')
        info.classList.add('info')
        name.innerHTML = item.title
        rating.style.padding = "5px 0px 8px 0px"
        rating.style.textDecoration = "none"
        origin.innerHTML = item.price + " " + "сум"
        end_price.innerHTML = Math.round(item.price - (item.price * item.salePercentage / 100)) + " " + "сум"
        add.classList.add('add')
        bag.src = "../../public/add.svg"

        my_favs.append(product)
        product.append(photo, info)
        photo.append(heart, img_prod)
        info.append(name, rating, origin, end_price, add)
        rating.innerHTML = `<img src="../../public/star.png"> ${item.rating}`
        add.append(bag)

        heart.onclick = () => {
            delete_item(`/favourites/${item.id}`)
                .then(() => {
                    Favorite_arr(arr)
                    location.assign('/pages/favourite_page/index.html')
                })
        }

        img_prod.onclick = () => {
            location.assign('/pages/product_page/?id=' + item.id)
        }
    }
}

export function Bag_arr(arr) {
    let products_div = document.querySelector('.products')
    products_div.innerHTML = ''

    for (let item of arr) {
        let product = document.createElement('div')
        let img_prod = document.createElement('img')
        let info = document.createElement('div')
        let name = document.createElement('h2')
        let price = document.createElement('p')
        let how_much = document.createElement('div')
        let minus = document.createElement('button')
        let kol_vo = document.createElement('p')
        let plus = document.createElement('button')
        let dlt = document.createElement('button')

        product.classList.add('product')
        img_prod.src = item.media[0]
        info.classList.add('info')
        name.innerHTML = item.title
        price.innerHTML = Math.round(item.price - (item.price * item.salePercentage / 100)) + " " + "сум"
        how_much.classList.add('how_much')
        minus.innerHTML = '-'
        kol_vo.innerHTML = 1
        plus.innerHTML = '+'
        dlt.classList.add('dlt')
        dlt.innerHTML = 'Удалить'

        products_div.append(product)
        product.append(img_prod, info)
        info.append(name, price, how_much, dlt)
        how_much.append(minus, kol_vo, plus)

        let count_num = 0
        let total = Math.round(item.price - (item.price * item.salePercentage / 100))

        minus.onclick = () => {
            if (count_num > 1) {
                kol_vo.innerHTML = --count_num
                price.innerHTML = (Math.round(item.price - (item.price * item.salePercentage / 100)) * count_num).toFixed(2)
                total = parseFloat((total - Math.round(item.price - (item.price * item.salePercentage / 100))).toFixed(2))
                price.innerHTML = total + ' ' + 'сум'
            }
        }

        plus.onclick = () => {
            kol_vo.innerHTML = ++count_num
            if (count_num > 1) {
                price.innerHTML = (Math.round(item.price - (item.price * item.salePercentage / 100)) * count_num).toFixed(2)
                total = parseFloat((total + Math.round(item.price - (item.price * item.salePercentage / 100))).toFixed(2))
                price.innerHTML = total + ' ' + 'сум'
            }
        }

        dlt.onclick = () => {
            delete_item(`/bag/${item.id}`)
                .then(() => {
                    Bag_arr(arr)
                    location.assign('/pages/want_to_buy_page/index.html')
                })
        }

        img_prod.onclick = () => {
            location.assign('/pages/product_page/?id=' + item.id)
        }
    }
}

export function reload_categoties(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let idx = arr.indexOf(item)

        let li = document.createElement('li')
        let a = document.createElement('a')
        let how = document.createElement('div')
        if (idx === 0) li.classList.add('active')

        a.href = item
        a.innerHTML = item

        let massive = []
        getData('/goods')
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    res.data.forEach(elem => {
                        if (elem.type === item) {
                            massive.push(elem)
                        }
                    })
                    if (a.innerHTML === 'All') {
                        how.innerHTML = 'Товаров ' + 50
                    } else {
                        how.innerHTML = 'Товаров ' + massive.length
                    }
                }
            })
        how.classList.add('how')

        place.append(li)
        li.append(a, how)

        li.onclick = () => {
            if (a.innerHTML === 'All') {
                location.assign('/')
            }
            const previousElem = place.querySelector('.active')
            previousElem.classList.remove('active')

            li.classList.add('active')


            getData('/goods')
                .then(res => {
                    if (res.status === 200 || res.status === 201) {
                        let filtered = res.data.filter(elem => elem.type === item)

                        // if(location.assign !== '/'){
                        //     location.assign(`/${a.innerText}`)
                        // }

                        Categoty_arr(filtered)
                    }
                })
        }
    }
}

export function Categoty_arr(arr) {
    let gaming = document.querySelector('.products .gaming')
    let audio = document.querySelector('.products .audio')
    let tv = document.querySelector('.products .tv')
    let furniture = document.querySelector('.products .furniture')
    let separate = document.querySelector('.separate')

    gaming.style.display = 'none';
    audio.style.display = 'none';
    tv.style.display = 'none';
    furniture.style.display = 'none';
    separate.style.display = 'none';

    for (let item of arr) {
        if (item.type === "furniture" || item.type === 'PC') {
            gaming.style.display = 'flex'
        } else if (item.type === 'audio') {
            audio.style.display = 'flex'
        } else if (item.type === 'TV') {
            tv.style.display = 'flex'
        } else if (item.type === 'kitchen') {
            furniture.style.display = 'flex'
        }
    }
}

export function reload_poisks(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {

        let li = document.createElement('li')
        let a = document.createElement('a')

        a.href = '#'
        a.innerHTML = item.title

        let massive = []
        getData('/goods')
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    res.data.forEach(elem => {
                        if (elem.name === item) {
                            massive.push(elem)
                        }
                    })
                }
            })

        place.append(li)
        li.append(a)

        li.onclick = () => {
            location.assign('/pages/product_page/?id=' + item.id)
        }
    }
}