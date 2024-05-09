import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

export const getData = async (path) => {
    try {
        const res = await axios.get(baseURL + path)

        return res
    } catch (e) {
        console.log(e);
    }
}

export const postData = async (path, body) => {
    try {
        const res = await axios.post(baseURL + path, body)

        return res
    } catch (e) {
        console.log(e);
    }
}

export const delete_item = async (path) => {
    try {
        const res = await axios.delete(baseURL + path);

        if (res.status === 200 || res.status === 201) {
            console.log("Товар успешно удален");
        } else {
            console.error(`Ошибка удаления товара. Код состояния: ${res.status}`);
        }
    } catch (error) {
        console.log("Не удалось удалить товар.");
    }
};

export const patchData = async (path, body) => {
    try {
        const res = await axios.patch(baseURL + path, body)

        if (res.status === 200 || res.status === 201) {
            return res.data
        }
    } catch (e) {
        alert(e.message)
        return e
    }
}